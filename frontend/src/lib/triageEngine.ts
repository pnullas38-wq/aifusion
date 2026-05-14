/**
 * Offline heuristic triage (NLP-lite + risk scoring) when the API is unavailable.
 * Aligns with care levels: home_care | clinic_visit | emergency_room.
 */

import type { CareLevel, PatientTriageContext, SeverityBand, TriageResponse } from "./types";

const ER_PATTERNS = [
  /\bchest\s+pain\b/i,
  /\b(can'?t|cannot)\s+breathe\b/i,
  /\bstruggling\s+to\s+breathe\b/i,
  /\bstroke\b/i,
  /\bunconscious\b/i,
  /\bsevere\s+bleeding\b/i,
  /\bsuicid/i,
  /\banaphylaxis\b/i,
  /\bface\s+drooping\b/i,
  /\bslurred\s+speech\b/i,
  /\bone\s+side\s+weak\b/i,
  /\bheart\s+attack\b/i,
  /\boverdose\b/i,
  /\bseizure\b.*\bongoing\b/i,
];

const CLINIC_PATTERNS = [
  /\bhigh\s+fever\b/i,
  /\b104\b|\b40\.?0\s*°?c\b/i,
  /\bvomit(ing)?\s+blood\b/i,
  /\bblood\s+in\s+stool\b/i,
  /\bpersistent\s+pain\b/i,
  /\bworse\s+over\s+(days|weeks)\b/i,
  /\bdehydrat/i,
  /\binfection\b/i,
  /\buti\b/i,
  /\bpregnant\b.*\bpain\b/i,
];

function extractSymptomTokens(text: string): string[] {
  const cleaned = text.toLowerCase().replace(/[^\w\s]/g, " ");
  const stop = new Set([
    "the", "a", "an", "and", "or", "but", "in", "on", "at", "to", "for", "of", "with", "i", "my", "me", "is", "am", "are", "was", "been", "have", "has", "it", "this", "that", "very", "some", "any",
  ]);
  const words = cleaned.split(/\s+/).filter((w) => w.length > 3 && !stop.has(w));
  return [...new Set(words)].slice(0, 12);
}

function matchAny(text: string, patterns: RegExp[]): boolean {
  return patterns.some((p) => p.test(text));
}

export function runLocalTriage(
  message: string,
  ctx: PatientTriageContext | undefined,
  sessionId: string
): TriageResponse {
  const text = message.trim();
  const lower = text.toLowerCase();
  const nlp_symptoms = extractSymptomTokens(text);
  const red_flags: string[] = [];

  const chronic = (ctx?.chronic_conditions || "").toLowerCase();
  const allergies = (ctx?.allergies || "").toLowerCase();
  if (chronic.includes("heart") || chronic.includes("cardiac")) red_flags.push("Cardiac history reported");
  if (chronic.includes("diabet")) red_flags.push("Diabetes history reported");
  if (allergies.length > 2) red_flags.push("Allergies on file");

  let care_level: CareLevel = "home_care";
  let severity: SeverityBand = "low";
  let risk_score = 22;
  let is_emergency = false;

  if (matchAny(text, ER_PATTERNS)) {
    care_level = "emergency_room";
    severity = "critical";
    risk_score = 94;
    is_emergency = true;
    red_flags.push("High-acuity language pattern — seek emergency care if symptoms are current");
  } else if (matchAny(text, CLINIC_PATTERNS) || lower.includes("fever") && lower.includes("days")) {
    care_level = "clinic_visit";
    severity = "moderate";
    risk_score = 58;
  } else if (lower.includes("pain") || lower.includes("hurt") || lower.includes("ache")) {
    care_level = "clinic_visit";
    severity = "moderate";
    risk_score = 48;
  } else if (lower.includes("cough") || lower.includes("cold") || lower.includes("mild")) {
    care_level = "home_care";
    severity = "low";
    risk_score = 28;
  }

  if (ctx?.age_band === "senior" && care_level === "home_care" && risk_score < 40) {
    risk_score = Math.min(55, risk_score + 12);
  }

  const careTitle =
    care_level === "emergency_room"
      ? "Emergency department — immediate in-person evaluation"
      : care_level === "clinic_visit"
        ? "Clinic or primary care — schedule evaluation"
        : "Home care — self-management & monitoring";

  const ai_message =
    care_level === "emergency_room"
      ? `Triage (offline engine): Possible emergency pattern from your description. ${careTitle}. This is not a diagnosis—if you are in danger, call your local emergency number now.`
      : care_level === "clinic_visit"
        ? `Triage (offline engine): Your symptoms may warrant a clinician visit soon. ${careTitle}. Bring a list of medications and when symptoms started.`
        : `Triage (offline engine): Pattern suggests self-care with monitoring may be reasonable. ${careTitle}. Seek care if symptoms worsen or new red flags appear.`;

  const follow =
    care_level === "emergency_room"
      ? "Are these symptoms happening right now? If yes, seek emergency care immediately. If not, when did they begin?"
      : "Can you share onset timing, severity 1–10, and any chronic conditions or medications?";

  const accessibility_note =
    "Designed for low-bandwidth and rural use: this offline pass runs entirely in your browser when the cloud triage link is down—connect when possible for fuller NLP analysis.";

  return {
    session_id: sessionId,
    ai_message,
    follow_up_question: follow,
    timestamp: new Date().toISOString(),
    care_level,
    risk_score,
    severity,
    is_emergency,
    nlp_symptoms,
    nlp_entities_summary: nlp_symptoms.length ? `Tokens: ${nlp_symptoms.slice(0, 6).join(", ")}` : "No structured tokens extracted",
    red_flags,
    care_recommendation_title: careTitle,
    accessibility_note,
  };
}
