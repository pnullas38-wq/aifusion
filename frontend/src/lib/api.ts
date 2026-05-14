import { TriageResponse } from "./types";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

function normalizeFollowUp(raw: unknown): string {
  if (raw == null) return "";
  if (typeof raw === "string") return raw.trim();
  if (Array.isArray(raw)) return raw.map((s) => String(s).trim()).filter(Boolean).join("\n");
  return String(raw).trim();
}

function normalizeTriagePayload(data: unknown): TriageResponse {
  if (!data || typeof data !== "object") throw new Error("Invalid triage payload");
  const o = data as Record<string, unknown>;
  const ai = o.ai_message;
  if (typeof ai !== "string" || !ai.trim()) throw new Error("Missing ai_message");
  const follow = normalizeFollowUp(o.follow_up_question);
  const sid = typeof o.session_id === "string" && o.session_id ? o.session_id : "";
  const ts = typeof o.timestamp === "string" ? o.timestamp : new Date().toISOString();
  return {
    session_id: sid,
    ai_message: ai.trim(),
    follow_up_question: follow,
    timestamp: ts,
  };
}

export async function sendTriageMessage(message: string, sessionId?: string): Promise<TriageResponse> {
  const res = await fetch(`${API_BASE}/api/triage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message, session_id: sessionId }),
  });

  let data: unknown;
  try {
    data = await res.json();
  } catch {
    throw new Error("Invalid JSON");
  }

  if (!res.ok) throw new Error("Connection Failure");

  return normalizeTriagePayload(data);
}
