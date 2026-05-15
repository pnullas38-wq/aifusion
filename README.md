# VITALIS AI — Healthcare triage demo

Monorepo-style layout: **FastAPI** backend (`backend/`) and **Next.js** frontend (`frontend/`).

## Quick start

1. **Backend** — copy `backend/.env.example` to `backend/.env`, add `GEMINI_API_KEY`, then:

   ```bash
   cd backend
   python -m venv .venv
   .venv\Scripts\activate
   pip install -r requirements.txt
   uvicorn main:app --reload --port 8000
   ```

2. **Frontend** — copy `frontend/.env.example` to `frontend/.env.local`, set `NEXT_PUBLIC_API_URL=http://localhost:8000`, then:

   ```bash
   cd frontend
   npm install
   npm run dev
   ```

## Disclaimer

Educational demo — not a substitute for licensed medical care. See in-app disclaimer.
