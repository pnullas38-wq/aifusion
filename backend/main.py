"""
VITALIS AI — FastAPI Backend
Advanced Healthcare Intelligence System
"""

import os
import json
import uuid
from typing import Optional
from datetime import datetime
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "")
ALLOWED_ORIGINS = os.getenv("ALLOWED_ORIGINS", "*").split(",")

genai.configure(api_key=GEMINI_API_KEY)

app = FastAPI(title="VITALIS AI CORE")

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

sessions = {}

class MessageRequest(BaseModel):
    session_id: Optional[str] = None
    message: str

def _parse_triage_json(raw: str) -> dict:
    text = raw.strip()
    for fence in ("```json", "```JSON", "```"):
        text = text.replace(fence, "")
    text = text.strip()
    start, end = text.find("{"), text.rfind("}")
    if start != -1 and end != -1 and end > start:
        text = text[start : end + 1]
    data = json.loads(text)
    if not isinstance(data, dict):
        raise ValueError("not an object")
    return data


@app.post("/api/triage")
async def triage(request: MessageRequest):
    sid = request.session_id or str(uuid.uuid4())
    ts = datetime.utcnow().isoformat()

    if not GEMINI_API_KEY:
        return {
            "session_id": sid,
            "ai_message": "VITALIS_CORE is online in offline mode (no GEMINI_API_KEY on server). I can still triage from your description—what symptoms are most urgent right now?",
            "follow_up_question": "When did this start, and did anything change just before it began?",
            "timestamp": ts,
        }

    model = genai.GenerativeModel("gemini-2.0-flash")

    prompt = f"""You are VITALIS CORE, a futuristic healthcare AI.
    A patient says: {request.message}

    Respond as a high-end medical OS. Be professional, empathetic, and sci-fi in tone.
    Suggest 2 follow-up questions combined into one string (two sentences).

    Respond with ONLY valid JSON (no markdown outside the object):
    {{
        "ai_message": "...",
        "follow_up_question": "First question. Second question."
    }}"""

    try:
        response = model.generate_content(prompt)
        raw_text = (response.text or "").strip()
        if not raw_text:
            raise ValueError("empty model response")
        data = _parse_triage_json(raw_text)
        ai_message = data.get("ai_message")
        follow = data.get("follow_up_question")
        if not isinstance(ai_message, str) or not ai_message.strip():
            raise ValueError("missing ai_message")
        if isinstance(follow, list):
            follow = " ".join(str(x) for x in follow if x)
        if follow is not None and not isinstance(follow, str):
            follow = str(follow)
        return {
            "session_id": sid,
            "ai_message": ai_message.strip(),
            "follow_up_question": (follow or "").strip(),
            "timestamp": ts,
        }
    except Exception:
        return {
            "ai_message": "Neural link unstable. I've noted your symptoms and I'm analyzing the telemetry.",
            "follow_up_question": "Can you describe the onset of these symptoms?",
            "session_id": sid,
            "timestamp": ts,
        }

@app.get("/health")
async def health():
    return {"status": "healthy", "system": "VITALIS_CORE_ACTIVE"}
