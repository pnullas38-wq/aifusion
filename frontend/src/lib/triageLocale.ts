import type { PatientTriageContext, TriageResponse } from "./types";

export type UILang = NonNullable<PatientTriageContext["language"]>;

type Dict = {
  assistantTitle: string;
  assistantSubtitle: string;
  profileToggle: string;
  ageBand: string;
  agePreferNot: string;
  ageChild: string;
  ageAdult: string;
  ageSenior: string;
  languageLabel: string;
  langEn: string;
  langHi: string;
  langKn: string;
  chronic: string;
  allergies: string;
  medications: string;
  phChronic: string;
  phAllergies: string;
  phMeds: string;
  riskLabel: string;
  emergencyBadge: string;
  nlpSymptoms: string;
  patientLabel: string;
  aiLabel: string;
  analyzing: string;
  inputPh: string;
  disclaimer: string;
  voiceUnsupported: string;
  channelError: string;
  chipCold: string;
  chipFever: string;
  chipChest: string;
  chipBreath: string;
  chipMh: string;
  careHome: string;
  careClinic: string;
  careEr: string;
  shareTitle: string;
  shareSubtitle: string;
  sharePhoneLabel: string;
  sharePhoneHint: string;
  sharePhonePlaceholder: string;
  shareInvalid: string;
  shareWhatsApp: string;
  shareSms: string;
  shareCopyText: string;
  shareCopied: string;
  shareCopyFail: string;
  shareNoReport: string;
  shareBuildWait: string;
  shareNote: string;
  videoTitle: string;
  videoOpenLink: string;
  videoEmbed: string;
  videoClose: string;
  videoNoUrl: string;
  videoHelp: string;
  videoEnvHint: string;
  videoEmbedBlocked: string;
  videoOpenNewTab: string;
  reportDownload: string;
  ehrDownload: string;
  ehrCopy: string;
  ehrCopied: string;
  ehrCopyFail: string;
  emergency911Title: string;
  emergency911Call: string;
  emergency911Text: string;
  emergency911Location: string;
  emergency911LiveOn: string;
  emergency911LiveOff: string;
  emergency911LiveHint: string;
  emergency911Maps: string;
  emergency911Copy: string;
  emergency911Copied: string;
  emergency911CopyFail: string;
  emergency911LocLoading: string;
  emergency911LocDenied: string;
  emergency911LocError: string;
  emergency911LocUnavailable: string;
  emergency911Note: string;
};

const en: Dict = {
  assistantTitle: "Healthcare Triage Assistant",
  assistantSubtitle: "NLP · Risk · Care levels",
  profileToggle: "Patient profile & medical history",
  ageBand: "Age band",
  agePreferNot: "Prefer not to say",
  ageChild: "Child",
  ageAdult: "Adult",
  ageSenior: "Senior",
  languageLabel: "Interface & voice language",
  langEn: "English",
  langHi: "Hindi",
  langKn: "Kannada",
  chronic: "Chronic conditions",
  allergies: "Allergies",
  medications: "Medications",
  phChronic: "e.g. asthma, diabetes, hypertension",
  phAllergies: "Drug or food allergies",
  phMeds: "Current medications",
  riskLabel: "Risk",
  emergencyBadge: "Emergency pattern",
  nlpSymptoms: "NLP symptoms",
  patientLabel: "Patient",
  aiLabel: "Triage assistant",
  analyzing: "Analyzing symptoms…",
  inputPh: "Describe symptoms (multi-turn supported)…",
  disclaimer:
    "Educational demo — not a substitute for licensed medical care. Prioritizes early intervention & appropriate care levels.",
  voiceUnsupported: "Voice recognition is not supported in this browser. Please use Chrome or Edge.",
  channelError: "Channel interrupted. Please retry. If symptoms are severe, contact emergency services.",
  chipCold: "Mild cold symptoms",
  chipFever: "Fever for 3 days",
  chipChest: "Chest pain on exertion",
  chipBreath: "Shortness of breath",
  chipMh: "Panic / anxiety spike",
  careHome: "Home care",
  careClinic: "Clinic visit",
  careEr: "Emergency room",
  shareTitle: "Share report (WhatsApp / SMS)",
  shareSubtitle:
    "Opens your device apps — no server-side SMS/WhatsApp is sent from VITALIS. Message intro matches your UI language (English / Hindi / Kannada).",
  sharePhoneLabel: "India mobile number",
  sharePhoneHint: "10 digits e.g. 6361258145, or 91XXXXXXXXXX",
  sharePhonePlaceholder: "6361258145",
  shareInvalid: "Enter a valid Indian mobile (10 digits starting 6–9, or 12 digits with 91).",
  shareWhatsApp: "Send via WhatsApp",
  shareSms: "Open SMS",
  shareCopyText: "Copy share text",
  shareCopied: "Copied to clipboard",
  shareCopyFail: "Copy failed — try another browser",
  shareNoReport: "Run triage first, then share. No saved session in this browser.",
  shareBuildWait: "Preparing report…",
  shareNote: "The shared summary uses your selected interface language for the disclaimer line.",
  videoTitle: "Video consultation",
  videoOpenLink: "Open telehealth link",
  videoEmbed: "Embed session",
  videoClose: "Close",
  videoNoUrl: "Set NEXT_PUBLIC_TELEHEALTH_URL in .env.local (Jitsi, Meet, or hospital portal).",
  videoHelp: "Jitsi / 8x8 embeds in-page. Google Meet, Zoom, and many hospital portals block iframes — use Open telehealth link.",
  videoEnvHint:
    "Put the variable in frontend/.env.local (same folder as package.json), then restart npm run dev so Next.js picks it up.",
  videoEmbedBlocked:
    "This URL cannot run inside an embedded frame (the provider blocks it). Use Open telehealth link or a Jitsi room for in-app video.",
  videoOpenNewTab: "Open in new tab",
  reportDownload: "AI health report",
  ehrDownload: "EHR-style export",
  ehrCopy: "Copy FHIR JSON",
  ehrCopied: "FHIR bundle copied",
  ehrCopyFail: "Could not copy — download JSON instead",
  emergency911Title: "911 · Location for dispatch",
  emergency911Call: "Call 911",
  emergency911Text: "Text 911 with location",
  emergency911Location: "Update location",
  emergency911LiveOn: "Live location on",
  emergency911LiveOff: "Stop live updates",
  emergency911LiveHint: "live",
  emergency911Maps: "Open map",
  emergency911Copy: "Copy coordinates",
  emergency911Copied: "Coordinates copied",
  emergency911CopyFail: "Copy failed",
  emergency911LocLoading: "Getting GPS location…",
  emergency911LocDenied: "Location blocked — allow location for this site in browser settings.",
  emergency911LocError: "Could not read GPS — try outdoors or enable high accuracy.",
  emergency911LocUnavailable: "Geolocation not available in this environment.",
  emergency911Note:
    "911 applies where supported (e.g. US/Canada). SMS-to-911 only works on supported carriers. VITALIS does not contact dispatch automatically — you place the call or text.",
};

const hi: Dict = {
  assistantTitle: "AI स्वास्थ्य ट्राइज सहायक",
  assistantSubtitle: "NLP · जोखिम · देखभाल स्तर",
  profileToggle: "रोगी प्रोफ़ाइल और चिकित्सा इतिहास",
  ageBand: "आयु वर्ग",
  agePreferNot: "न बताना चाहते",
  ageChild: "बच्चा",
  ageAdult: "वयस्क",
  ageSenior: "वरिष्ठ",
  languageLabel: "इंटरफ़ेस और आवाज़ की भाषा",
  langEn: "अंग्रेज़ी",
  langHi: "हिंदी",
  langKn: "कन्नड़",
  chronic: "दीर्घकालिक बीमारियाँ",
  allergies: "एलर्जी",
  medications: "दवाइयाँ",
  phChronic: "जैसे दमा, मधुमेह, उच्च रक्तचाप",
  phAllergies: "दवा या भोजन एलर्जी",
  phMeds: "वर्तमान दवाइयाँ",
  riskLabel: "जोखिम",
  emergencyBadge: "आपात संकेत",
  nlpSymptoms: "NLP लक्षण",
  patientLabel: "रोगी",
  aiLabel: "ट्राइज सहायक",
  analyzing: "लक्षणों का विश्लेषण…",
  inputPh: "लक्षण लिखें (बहु-चक्र वार्तालाप)…",
  disclaimer:
    "शैक्षिक डेमो — यह लाइसेंस प्राप्त चिकित्सा देखभाल का विकल्प नहीं है। उचित देखभाल स्तर पर जोर।",
  voiceUnsupported: "इस ब्राउज़र में आवाज़ पहचान समर्थित नहीं। कृपया Chrome या Edge उपयोग करें।",
  channelError: "संपर्क टूट गया। पुनः प्रयास करें। गंभीर लक्षण हों तो आपात सेवा कॉल करें।",
  chipCold: "हल्का सर्दी जुकाम",
  chipFever: "३ दिन से बुखार",
  chipChest: "श्रम पर छाती में दर्द",
  chipBreath: "साँस फूलना",
  chipMh: "घबराहट / चिंता",
  careHome: "घर पर देखभाल",
  careClinic: "क्लिनिक जाएँ",
  careEr: "आपात कक्ष",
  shareTitle: "रिपोर्ट साझा करें (WhatsApp / SMS)",
  shareSubtitle:
    "आपके फ़ोन का ऐप खुलता है — VITALIS सर्वर से SMS/WhatsApp नहीं जाता। संदेश की शुरुआत आपकी भाषा (अंग्रेज़ी / हिंदी / कन्नड़) में है।",
  sharePhoneLabel: "भारतीय मोबाइल नंबर",
  sharePhoneHint: "१० अंक, उदा. 6361258145 या 91XXXXXXXXXX",
  sharePhonePlaceholder: "6361258145",
  shareInvalid: "मान्य भारतीय मोबाइल दर्ज करें (६–९ से शुरू १० अंक, या 91 के साथ १२ अंक)।",
  shareWhatsApp: "WhatsApp पर भेजें",
  shareSms: "SMS खोलें",
  shareCopyText: "पाठ कॉपी करें",
  shareCopied: "क्लिपबोर्ड पर कॉपी हो गया",
  shareCopyFail: "कॉपी नहीं हुआ — दूसरा ब्राउज़र आज़माएँ",
  shareNoReport: "पहले ट्राइज चलाएँ, फिर साझा करें। इस ब्राउज़र में सत्र नहीं मिला।",
  shareBuildWait: "रिपोर्ट तैयार हो रही है…",
  shareNote: "साझा सारांश में अस्वीकरण आपकी चुनी भाषा में जुड़ता है।",
  videoTitle: "वीडियो परामर्श",
  videoOpenLink: "टेलीहेल्थ लिंक खोलें",
  videoEmbed: "ब्राउज़र में एम्बेड",
  videoClose: "बंद करें",
  videoNoUrl: ".env.local में NEXT_PUBLIC_TELEHEALTH_URL सेट करें (Jitsi, Meet, अस्पताल पोर्टल)।",
  videoHelp: "Jitsi / 8x8 पेज में एम्बेड हो सकता है। Google Meet, Zoom और कई अस्पताल पोर्टल iframe रोकते हैं — टेलीहेल्थ लिंक खोलें।",
  videoEnvHint: "चर frontend/.env.local में रखें (package.json वाला फ़ोल्डर), फिर npm run dev दोबारा चलाएँ।",
  videoEmbedBlocked:
    "यह URL एम्बेड फ़्रेम में नहीं चल सकता (प्रदाता ब्लॉक करता है)। टेलीहेल्थ लिंक खोलें या इन-ऐप वीडियो के लिए Jitsi कमरा उपयोग करें।",
  videoOpenNewTab: "नए टैब में खोलें",
  reportDownload: "AI स्वास्थ्य रिपोर्ट",
  ehrDownload: "EHR-शैली निर्यात",
  ehrCopy: "FHIR JSON कॉपी",
  ehrCopied: "FHIR बंडल कॉपी हो गया",
  ehrCopyFail: "कॉपी विफल — JSON डाउनलोड करें",
  emergency911Title: "911 · स्थान डिस्पैच के लिए",
  emergency911Call: "911 कॉल करें",
  emergency911Text: "स्थान के साथ 911 पर SMS",
  emergency911Location: "स्थान अपडेट करें",
  emergency911LiveOn: "लाइव स्थान चालू",
  emergency911LiveOff: "लाइव बंद करें",
  emergency911LiveHint: "लाइव",
  emergency911Maps: "नक्शा खोलें",
  emergency911Copy: "निर्देशांक कॉपी",
  emergency911Copied: "निर्देशांक कॉपी हो गए",
  emergency911CopyFail: "कॉपी विफल",
  emergency911LocLoading: "GPS स्थान प्राप्त हो रहा है…",
  emergency911LocDenied: "स्थान अवरुद्ध — ब्राउज़र में इस साइट के लिए अनुमति दें।",
  emergency911LocError: "GPS नहीं मिला — खुली जगह पर कोशिश करें।",
  emergency911LocUnavailable: "इस वातावरण में जियोलोकेशन उपलब्ध नहीं।",
  emergency911Note:
    "911 जहाँ समर्थित हो (जैसे US/Canada)। SMS-to-911 केवल समर्थित नेटवर्क पर। VITALIS स्वयं डिस्पैच से संपर्क नहीं करता।",
};

const kn: Dict = {
  assistantTitle: "AI ಆರೋಗ್ಯ ಟ್ರೈಜ್ ಸಹಾಯಕ",
  assistantSubtitle: "NLP · ಅಪಾಯ · ಆರೈಕೆ ಮಟ್ಟ",
  profileToggle: "ರೋಗಿ ಪ್ರೊಫೈಲ್ ಮತ್ತು ವೈದ್ಯಕೀಯ ಇತಿಹಾಸ",
  ageBand: "ವಯಸ್ಸಿನ ವರ್ಗ",
  agePreferNot: "ಹೇಳಲು ಇಚ್ಛಿಸುವುದಿಲ್ಲ",
  ageChild: "ಮಕ್ಕಳು",
  ageAdult: "ವಯಸ್ಕ",
  ageSenior: "ಹಿರಿಯರು",
  languageLabel: "ಮುಖಪುಟ ಮತ್ತು ಧ್ವನಿ ಭಾಷೆ",
  langEn: "ಇಂಗ್ಲಿಷ್",
  langHi: "ಹಿಂದಿ",
  langKn: "ಕನ್ನಡ",
  chronic: "ದೀರ್ಘಕಾಲಿಕ ಅಸ್ವಸ್ಥತೆಗಳು",
  allergies: "ಅಲರ್ಜಿಗಳು",
  medications: "ಔಷಧಿಗಳು",
  phChronic: "ಉದಾ. ಆಸ್ತ್ಮಾ, ಮಧುಮೇಹ, ರಕ್ತದೊತ್ತಡ",
  phAllergies: "ಔಷಧ ಅಥವಾ ಆಹಾರ ಅಲರ್ಜಿ",
  phMeds: "ಪ್ರಸ್ತುತ ಔಷಧಿಗಳು",
  riskLabel: "ಅಪಾಯ",
  emergencyBadge: "ತುರ್ತು ಸಂಕೇತ",
  nlpSymptoms: "NLP ಲಕ್ಷಣಗಳು",
  patientLabel: "ರೋಗಿ",
  aiLabel: "ಟ್ರೈಜ್ ಸಹಾಯಕ",
  analyzing: "ಲಕ್ಷಣಗಳ ವಿಶ್ಲೇಷಣೆ…",
  inputPh: "ಲಕ್ಷಣಗಳನ್ನು ವಿವರಿಸಿ (ಬಹು-ಸಂವಾದ)…",
  disclaimer:
    "ಶೈಕ್ಷಣಿಕ ಡೆಮೊ — ಪರವಾನಗಿ ಪಡೆದ ವೈದ್ಯಕೀಯ ಆರೈಕೆಯ ಬದಲಿ ಅಲ್ಲ. ಸರಿಯಾದ ಆರೈಕೆ ಮಟ್ಟಕ್ಕೆ ಆದ್ಯತೆ.",
  voiceUnsupported: "ಈ ಬ್ರೌಸರ್‌ನಲ್ಲಿ ಧ್ವನಿ ಗುರುತಿಸುವಿಕೆ ಬೆಂಬಲಿತವಲ್ಲ. Chrome ಅಥವಾ Edge ಬಳಸಿ.",
  channelError: "ಸಂಪರ್ಕ ತುಂಡಾಗಿದೆ. ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ. ತೀವ್ರ ಲಕ್ಷಣಗಳಿದ್ದರೆ ತುರ್ತು ಸೇವೆಗೆ ಕರೆ ಮಾಡಿ.",
  chipCold: "ಸೌಮ್ಯ ಶೀತಿ ಲಕ್ಷಣಗಳು",
  chipFever: "೩ ದಿನಗಳ ಜ್ವರ",
  chipChest: "ಪರಿಶ್ರಮದಲ್ಲಿ ಎದೆ ನೋವು",
  chipBreath: "ಉಸಿರಾಟದ ತೊಂದರೆ",
  chipMh: "ಆತಂಕ / ಭಯ",
  careHome: "ಮನೆ ಆರೈಕೆ",
  careClinic: "ಕ್ಲಿನಿಕ್ ಭೇಟಿ",
  careEr: "ತುರ್ತು ಕೊಠಡಿ",
  shareTitle: "ವರದಿ ಹಂಚಿಕೊಳ್ಳಿ (WhatsApp / SMS)",
  shareSubtitle:
    "ನಿಮ್ಮ ಫೋನ್ ಅಪ್ಲಿಕೇಶನ್ ತೆರೆಯುತ್ತದೆ — VITALIS ಸರ್ವರ್‌ನಿಂದ SMS/WhatsApp ಹೋಗುವುದಿಲ್ಲ. ಸಂದೇಶದ ಆರಂಭ ನಿಮ್ಮ ಭಾಷೆಗೆ (ಇಂಗ್ಲಿಷ್ / ಹಿಂದಿ / ಕನ್ನಡ) ಹೊಂದಿಕೆಯಾಗುತ್ತದೆ.",
  sharePhoneLabel: "ಭಾರತೀಯ ಮೊಬೈಲ್ ಸಂಖ್ಯೆ",
  sharePhoneHint: "೧೦ ಅಂಕೆಗಳು, ಉದಾ. 6361258145 ಅಥವಾ 91XXXXXXXXXX",
  sharePhonePlaceholder: "6361258145",
  shareInvalid: "ಮಾನ್ಯ ಭಾರತೀಯ ಮೊಬೈಲ್ ನಮೂದಿಸಿ (6–9 ರಿಂದ ಪ್ರಾರಂಭವಾಗುವ ೧೦ ಅಂಕೆಗಳು, ಅಥವಾ 91 ಒಂದಿಗೆ ೧೨ ಅಂಕೆಗಳು).",
  shareWhatsApp: "WhatsApp ಮೂಲಕ ಕಳುಹಿಸಿ",
  shareSms: "SMS ತೆರೆಯಿರಿ",
  shareCopyText: "ಪಠ್ಯ ನಕಲಿಸಿ",
  shareCopied: "ಕ್ಲಿಪ್‌ಬೋರ್ಡ್‌ಗೆ ನಕಲಿಸಲಾಗಿದೆ",
  shareCopyFail: "ನಕಲು ವಿಫಲ — ಬೇರೆ ಬ್ರೌಸರ್ ಪ್ರಯತ್ನಿಸಿ",
  shareNoReport: "ಮೊದಲು ಟ್ರೈಜ್ ಚಲಾಯಿಸಿ, ನಂತರ ಹಂಚಿಕೊಳ್ಳಿ. ಈ ಬ್ರೌಸರ್‌ನಲ್ಲಿ ಸೆಷನ್ ಇಲ್ಲ.",
  shareBuildWait: "ವರದಿ ತಯಾರಾಗುತ್ತಿದೆ…",
  shareNote: "ಹಂಚಿದ ಸಾರಾಂಶದಲ್ಲಿ ನಿರಾಕರಣೆ ನಿಮ್ಮ ಆಯ್ಕೆಯ ಭಾಷೆಯಲ್ಲಿ ಸೇರುತ್ತದೆ.",
  videoTitle: "ವೀಡಿಯೊ ಸಮಾಲೋಚನೆ",
  videoOpenLink: "ಟೆಲಿಹೆಲ್ತ್ ಲಿಂಕ್ ತೆರೆಯಿರಿ",
  videoEmbed: "ಬ್ರೌಸರ್‌ನಲ್ಲಿ ಎಂಬೆಡ್",
  videoClose: "ಮುಚ್ಚಿ",
  videoNoUrl: ".env.local ನಲ್ಲಿ NEXT_PUBLIC_TELEHEALTH_URL ಹೊಂದಿಸಿ (Jitsi, Meet, ಆಸ್ಪತ್ರೆ ಪೋರ್ಟಲ್).",
  videoHelp: "Jitsi / 8x8 ಪುಟದೊಳಗೆ ಎಂಬೆಡ್ ಆಗಬಹುದು. Google Meet, Zoom ಮತ್ತು ಹಲವು ಆಸ್ಪತ್ರೆ ಪೋರ್ಟಲ್‌ಗಳು iframe ನಿರ್ಬಂಧಿಸುತ್ತವೆ — ಟೆಲಿಹೆಲ್ತ್ ಲಿಂಕ್ ತೆರೆಯಿರಿ.",
  videoEnvHint: "ಪರಿವರ್ತನೆಯನ್ನು frontend/.env.local ನಲ್ಲಿ ಇರಿಸಿ (package.json ಇರುವ ಫೋಲ್ಡರ್), ನಂತರ npm run dev ಮತ್ತೆ ಚಲಾಯಿಸಿ.",
  videoEmbedBlocked:
    "ಈ URL ಅಂತರ್ಗತ ಫ್ರೇಮ್‌ನಲ್ಲಿ ಚಲಿಸುವುದಿಲ್ಲ (ಪೂರೈಕೆದಾರ ನಿರ್ಬಂಧಿಸುತ್ತಾರೆ). ಟೆಲಿಹೆಲ್ತ್ ಲಿಂಕ್ ಅಥವಾ Jitsi ಕೊಠಡಿ ಬಳಸಿ.",
  videoOpenNewTab: "ಹೊಸ ಟ್ಯಾಬ್‌ನಲ್ಲಿ ತೆರೆಯಿರಿ",
  reportDownload: "AI ಆರೋಗ್ಯ ವರದಿ",
  ehrDownload: "EHR-ಶೈಲಿ ರಫ್ತು",
  ehrCopy: "FHIR JSON ನಕಲಿಸಿ",
  ehrCopied: "FHIR ಬಂಡಲ್ ನಕಲಿಸಲಾಗಿದೆ",
  ehrCopyFail: "ನಕಲು ವಿಫಲ — JSON ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ",
  emergency911Title: "911 · ಡಿಸ್ಪ್ಯಾಚ್‌ಗೆ ಸ್ಥಾನ",
  emergency911Call: "911 ಗೆ ಕರೆ",
  emergency911Text: "ಸ್ಥಾನದೊಂದಿಗೆ 911 SMS",
  emergency911Location: "ಸ್ಥಾನ ನವೀಕರಿಸಿ",
  emergency911LiveOn: "ಲೈವ್ ಸ್ಥಾನ ಆನ್",
  emergency911LiveOff: "ಲೈವ್ ನಿಲ್ಲಿಸಿ",
  emergency911LiveHint: "ಲೈವ್",
  emergency911Maps: "ನಕ್ಷೆ ತೆರೆಯಿರಿ",
  emergency911Copy: "ನಿರ್ದೇಶಾಂಕ ನಕಲು",
  emergency911Copied: "ನಿರ್ದೇಶಾಂಕ ನಕಲಿಸಲಾಗಿದೆ",
  emergency911CopyFail: "ನಕಲು ವಿಫಲ",
  emergency911LocLoading: "GPS ಸ್ಥಾನ ಪಡೆಯಲಾಗುತ್ತಿದೆ…",
  emergency911LocDenied: "ಸ್ಥಾನ ನಿರ್ಬಂಧಿತ — ಬ್ರೌಸರ್‌ನಲ್ಲಿ ಅನುಮತಿ ನೀಡಿ.",
  emergency911LocError: "GPS ಓದಲು ಸಾಧ್ಯವಿಲ್ಲ — ಹೆಚ್ಚು ನಿಖರತೆ ಸಕ್ರಿಯಗೊಳಿಸಿ.",
  emergency911LocUnavailable: "ಈ ಪರಿಸರದಲ್ಲಿ ಜಿಯೋಲೊಕೇಶನ್ ಇಲ್ಲ.",
  emergency911Note:
    "911 ಅಮೆರಿಕಾ/ಕೆನಡಾದಲ್ಲಿ. SMS-to-911 ಬೆಂಬಲಿತ ವಾಹಕಗಳಲ್ಲಿ ಮಾತ್ರ. VITALIS ಸ್ವಯಂಚಾಲಿತವಾಗಿ ಡಿಸ್ಪ್ಯಾಚ್ ಅನ್ನು ಸಂಪರ್ಕಿಸುವುದಿಲ್ಲ.",
};

const map: Record<UILang, Dict> = { en, hi, kn };

export function t(lang: UILang): Dict {
  return map[lang] || en;
}

export function careLevelLabel(level: TriageResponse["care_level"], lang: UILang): string {
  const d = t(lang);
  if (level === "emergency_room") return d.careEr;
  if (level === "clinic_visit") return d.careClinic;
  return d.careHome;
}

export function welcomeMessage(lang: UILang): string {
  const d = t(lang);
  if (lang === "hi")
    return `मैं आपका ${d.assistantTitle} हूँ। लक्षण टेक्स्ट या आवाज़ में बताएँ। वैकल्पिक: ${d.profileToggle} भरें ताकि NLP ट्राइज एलर्जी, दवाएँ और आयु का उपयोग कर सके। यह प्रारंभिक मार्गदर्शन है—निदान नहीं।`;
  if (lang === "kn")
    return `ನಾನು ನಿಮ್ಮ ${d.assistantTitle}. ಲಕ್ಷಣಗಳನ್ನು ಪಠ್ಯ ಅಥವಾ ಧ್ವನಿಯಲ್ಲಿ ಹೇಳಿ. ಐಚ್ಛಿಕ: ${d.profileToggle} ತುಂಬಿಸಿ NLP ಟ್ರೈಜ್ ಅಲರ್ಜಿ, ಔಷಧಿ ಮತ್ತು ವಯಸ್ಸನ್ನು ಬಳಸುತ್ತದೆ. ಇದು ಪ್ರಾಥಮಿಕ ಮಾರ್ಗದರ್ಶನ—ರೋಗನಿರ್ಣಯ ಅಲ್ಲ.`;
  return `I am your ${d.assistantTitle}. Share symptoms in text or voice. Optional: fill ${d.profileToggle} so NLP triage can use allergies, medications, and age band. This is preliminary guidance—not a diagnosis.`;
}
