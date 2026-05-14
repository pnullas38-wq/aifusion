import type { UILang } from "./triageLocale";
import { buildHealthReportMarkdown } from "./healthReport";

/** Normalize to digits-only India MSISDN with country code 91 (no +). Returns null if invalid. */
export function normalizeIndiaMobileDigits(input: string): string | null {
  const d = input.replace(/\D/g, "");
  if (d.length === 10 && /^[6-9]/.test(d)) return `91${d}`;
  if (d.length === 12 && d.startsWith("91")) return d;
  if (d.length === 11 && d.startsWith("0")) return normalizeIndiaMobileDigits(d.slice(1));
  return null;
}

const TRUNC: Record<UILang, string> = {
  en: "\n\n[…truncated for WhatsApp/SMS length]",
  hi: "\n\n[…WhatsApp/SMS लंबाई सीमा के कारण छोटा किया गया]",
  kn: "\n\n[…WhatsApp/SMS ಉದ್ದ ಮಿತಿಯಿಂದ ಕತ್ತರಿಸಲಾಗಿದೆ]",
};

const SHARE_INTRO: Record<UILang, string> = {
  en: "VITALIS AI — Health triage & vitals summary (demo). Please review with a licensed clinician. Not a diagnosis.",
  hi: "VITALIS AI — स्वास्थ्य ट्राइज और वाइटल सारांश (डेमो)। कृपया लाइसेंस प्राप्त चिकित्सक से जाँच कराएँ। यह निदान नहीं है।",
  kn: "VITALIS AI — ಆರೋಗ್ಯ ಟ್ರೈಜ್ ಮತ್ತು ವೈಟಲ್ ಸಾರಾಂಶ (ಡೆಮೊ). ಪರವಾನಗಿ ವೈದ್ಯರೊಂದಿಗೆ ಪರಿಶೀಲಿಸಿ. ಇದು ರೋಗನಿರ್ಣಯ ಅಲ್ಲ.",
};

/** Text for WhatsApp / SMS (length-limited for WA URL safety). */
export async function buildShareText(lang: UILang, maxChars = 3500): Promise<string> {
  const intro = SHARE_INTRO[lang] || SHARE_INTRO.en;
  const body = await buildHealthReportMarkdown();
  const full = `${intro}\n\n${body}`;
  if (full.length <= maxChars) return full;
  const trunc = TRUNC[lang] || TRUNC.en;
  return `${intro}\n\n${body.slice(0, Math.max(0, maxChars - intro.length - trunc.length - 20))}${trunc}`;
}

export function openWhatsAppShare(msisdnDigits: string, message: string): void {
  const url = `https://wa.me/${msisdnDigits}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank", "noopener,noreferrer");
}

export function buildSmsHref(msisdnDigits: string, message: string): string {
  return `sms:+${msisdnDigits}?body=${encodeURIComponent(message)}`;
}
