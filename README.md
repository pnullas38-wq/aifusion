# VITALIS AI — Intelligent Health Triage Platform

> Educational demo only — not a replacement for a licensed doctor.

## Overview

VITALIS AI is an AI-powered healthcare assistance platform that helps users:
- Describe symptoms in natural language
- Get AI-assisted triage recommendations
- Monitor health indicators
- Track mental wellness
- Share medical summaries
- Access emergency and telehealth support

The platform is designed with India-focused accessibility and safety features including:
- 108 emergency support
- WhatsApp report sharing
- Hindi & Kannada support
- Offline fallback triage

---

# Problem Statement

Many people struggle to:
- Understand symptom urgency
- Access quick medical guidance
- Communicate symptoms clearly
- Use healthcare systems in regional languages
- Share reports easily with doctors/family
- Get support during low internet connectivity

Mental health is also often ignored in traditional triage systems.

---

# Solution

VITALIS AI provides:
- AI symptom triage
- Emergency risk detection
- Mental health integration
- Simulated biometric monitoring
- Shareable health reports
- Offline-safe fallback systems
- Interactive 3D medical visualization
- Telehealth consultation support

---

# Core Features

## 1. AI Triage Assistant

Users can describe symptoms in plain language.

Example:
"I have fever for 3 days and body pain."

The system analyzes:
- Symptoms
- Duration
- Medical history
- Allergies
- Medications
- Risk indicators

### Outputs
- Risk score
- Care recommendation:
  - Home Care
  - Clinic Visit
  - Emergency Care
- Red flag alerts
- Structured medical summary

### AI + Offline Safety
- Uses Gemini AI for structured triage
- Falls back to a custom rule-based engine if API fails
- Works partially offline in-browser

---

## 2. Mental Health Screening

Dedicated mental wellness panel inspired by:
- PHQ-2
- GAD-2

Features:
- Anxiety/stress check
- Mood screening
- Crisis escalation
- Integration into main triage pipeline

---

## 3. Emergency Safety System

Critical symptom patterns trigger:
- Emergency UI overlays
- Red alert warnings
- 108 ambulance guidance
- GPS location sharing support

Examples:
- Chest pain
- Breathing difficulty
- Stroke indicators
- Severe bleeding

---

## 4. Biological Intelligence Dashboard

Interactive monitoring system including:
- Simulated heart rate
- HRV tracking
- Readiness score
- Health trend graphs
- Biometrics dashboard

---

## 5. 3D Human Body Visualization

Built using Three.js.

Features:
- Rotating 3D human body
- Organ hotspots
- Educational interaction
- Medical visualization experience

---

## 6. Report Sharing System

Users can:
- Share reports through WhatsApp
- Generate SMS-ready summaries
- Copy formatted medical reports
- Export EHR-style JSON data

Privacy-focused design:
- No server-side messaging required
- Uses the user’s own device/apps

---

## 7. Telehealth Integration

Integrated consultation support:
- Zoom consultation launch
- Quick escalation workflow
- Doctor communication support

---

## 8. Multilingual Accessibility

Supported languages:
- English
- Hindi
- Kannada

Designed for:
- Rural accessibility
- Low digital literacy
- India-first healthcare usability

---

# Technology Stack

| Layer | Technology | Purpose |
|---|---|---|
| Frontend | Next.js 14 + React + TypeScript | Modern full-stack UI |
| Styling | Tailwind CSS + Framer Motion | Responsive medical UI |
| 3D Graphics | Three.js | Human body visualization |
| Backend | FastAPI (Python) | AI triage APIs |
| AI Engine | Gemini API | Symptom understanding |
| Offline Engine | Custom Rule System | API fallback |
| Authentication | JWT + PBKDF2 | Secure login |
| Storage | localStorage + JSON | Lightweight demo storage |
| Charts | Recharts | Health analytics |
| Public Health Data | disease.sh API | Outbreak awareness |
| Telehealth | Zoom integration | Video consultation |

---

# System Architecture

User Browser (Next.js)
├── AI Triage Assistant
│ ├── Gemini AI
│ └── Offline Rule Engine
│
├── Mental Health Module
├── Biometrics Dashboard
├── Share System (WhatsApp/SMS)
├── Authentication APIs
└── Zoom Consultation

FastAPI Backend
├── AI Processing
├── Structured Triage
└── Risk Evaluation

---

# Demo Workflow

## Step 1 — Login
Show secure authentication and protected routes.

## Step 2 — Basic Triage
Input:
"Fever for 3 days."

Output:
- Clinic/Home recommendation
- Risk analysis

## Step 3 — Emergency Scenario
Input:
"Chest pain and difficulty breathing."

Output:
- Emergency escalation
- 108 guidance
- Critical alert interface

## Step 4 — Mental Health
Complete screening questionnaire and merge results into triage.

## Step 5 — Dashboard
Display biometrics and health trends.

## Step 6 — Share Report
Open WhatsApp with pre-filled medical summary.

## Step 7 — Video Consultation
Launch Zoom consultation workflow.

---

# Safety Measures

- Emergency escalation
- 108 emergency guidance
- Red-flag symptom detection
- AI fallback systems
- Mental health crisis alerts
- Educational disclaimers
- Offline functionality support

---

# Innovation Highlights

- Combines physical + mental health triage
- AI + offline hybrid safety system
- India-focused emergency workflows
- Interactive medical visualization
- Privacy-friendly report sharing
- Multilingual accessibility
- Telehealth integration

---

# Limitations

This project is a hackathon/demo prototype.

Current limitations:
- Not medically certified
- AI outputs may be inaccurate
- Biometrics are simulated
- File-based storage is not scalable
- No production-grade hospital integration yet

---

# Future Scope

Potential future improvements:
- FHIR hospital integration
- Wearable device support
- Doctor dashboard
- Appointment scheduling
- Real-time sensor integration
- Secure cloud medical infrastructure
- Advanced multilingual NLP
- HIPAA-compliant deployment

---

# Impact

VITALIS AI aims to improve:
- Early health awareness
- Rural healthcare accessibility
- Emergency response guidance
- Multilingual healthcare support
- Digital health engagement

Especially valuable in:
- Low-connectivity regions
- Underserved communities
- First-response scenarios
- Student healthcare innovation ecosystems

---

# Repository

https://github.com/pnullas38-wq/aifusion
