"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Brain, Send, Phone, LifeBuoy } from "lucide-react";
import { getStoredUILang } from "@/lib/uiLang";

/** PHQ-2 / GAD-2–inspired screening (not a diagnostic instrument). */
const copy = {
  en: {
    title: "Mental health check-in",
    subtitle: "2-week mood + anxiety screen (research-style). Not a diagnosis.",
    q1: "Little interest or pleasure in doing things?",
    q2: "Feeling down, depressed, or hopeless?",
    q3: "Feeling nervous, anxious, or on edge?",
    q4: "Not able to stop or control worrying?",
    scale: ["Not at all", "Several days", "More than half", "Nearly every day"],
    crisis: "I need urgent help / thoughts of self-harm",
    submit: "Send scores to triage assistant",
    crisisNote: "If in immediate danger, call your local emergency number. India: Tele MANAS 14416, iCall 9152987821, Vandrevala Foundation 1860-2662-345.",
  },
  hi: {
    title: "मानसिक स्वास्थ्य जाँच",
    subtitle: "2 सप्ताह का मूड + चिंता स्क्रीन (अनुसंधान शैली)। निदान नहीं।",
    q1: "काम में रुचि या आनंद कम?",
    q2: "उदास, हताश या निराश महसूस?",
    q3: "घबराहट, चिंता या बेचैनी?",
    q4: "चिंता रोक नहीं पा रहे?",
    scale: ["बिल्कुल नहीं", "कई दिन", "आधे से अधिक दिन", "लगभग हर दिन"],
    crisis: "मुझे तुरंत मदद चाहिए / आत्महानि के विचार",
    submit: "स्कोर ट्राइज सहायक को भेजें",
    crisisNote:
      "तुरंत खतरे में स्थानीय आपात नंबर। भारत: Tele MANAS 14416, iCall 9152987821, Vandrevala 1860-2662-345।",
  },
  kn: {
    title: "ಮಾನಸಿಕ ಆರೋಗ್ಯ ಪರಿಶೀಲನೆ",
    subtitle: "2 ವಾರಗಳ ಮನೋಭಾವ + ಆತಂಕ ಪರದೆ (ಅಧ್ಯಯನ ಶೈಲಿ). ರೋಗನಿರ್ಣಯ ಅಲ್ಲ.",
    q1: "ಕೆಲಸಗಳಲ್ಲಿ ಆಸಕ್ತಿ ಅಥವಾ ಸಂತೋಷ ಕಡಿಮೆಯೇ?",
    q2: "ದುಃಖ, ನಿರಾಶೆ ಅಥವಾ ನಿರಾಶಾವಾದ?",
    q3: "ನರಗಳು, ಆತಂಕ ಅಥವಾ ಅಶಾಂತಿ?",
    q4: "ಚಿಂತೆಯನ್ನು ನಿಲ್ಲಿಸಲು ಅಸಾಧ್ಯವೇ?",
    scale: ["ಇಲ್ಲವೇ ಇಲ್ಲ", "ಹಲವು ದಿನಗಳು", "ಅರ್ಧಕ್ಕಿಂತ ಹೆಚ್ಚು", "ಬಹುತೇಕ ಪ್ರತಿದಿನ"],
    crisis: "ತಕ್ಷಣ ಸಹಾಯ ಬೇಕು / ಆತ್ಮಹಾನಿಯ ಚಿಂತನೆಗಳು",
    submit: "ಅಂಕಗಳನ್ನು ಟ್ರೈಜ್ ಸಹಾಯಕಕ್ಕೆ ಕಳುಹಿಸಿ",
    crisisNote:
      "ತಕ್ಷಣ ಅಪಾಯದಲ್ಲಿ ಸ್ಥಳೀಯ ತುರ್ತು ಸಂಖ್ಯೆ. ಭಾರತ: Tele MANAS 14416, iCall 9152987821, Vandrevala 1860-2662-345.",
  },
};

export default function MentalHealthPanel() {
  const [lang, setLang] = useState<"en" | "hi" | "kn">("en");
  const [v, setV] = useState([0, 0, 0, 0]);
  const [crisis, setCrisis] = useState(false);
  const c = copy[lang];

  useEffect(() => {
    setLang(getStoredUILang());
    const h = () => setLang(getStoredUILang());
    window.addEventListener("v-ui-lang", h as EventListener);
    return () => window.removeEventListener("v-ui-lang", h as EventListener);
  }, []);

  const submit = () => {
    const parts = [
      "[MENTAL_HEALTH_SCREEN]",
      `Language: ${lang}`,
      `Scores (0-3 each): interest=${v[0]}, mood=${v[1]}, anxiety=${v[2]}, worry=${v[3]}`,
      `Crisis flag: ${crisis}`,
      "Please triage: suggest care level and next steps.",
    ];
    window.dispatchEvent(
      new CustomEvent("v-prefill-triage", {
        detail: { message: parts.join("\n") },
      })
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="glass rounded-[40px] p-8 border border-v-cyan/15"
    >
      <div className="flex items-center gap-3 mb-4">
        <Brain className="text-v-cyan" size={28} />
        <div>
          <h3 className="text-xl font-black italic uppercase tracking-tight">{c.title}</h3>
          <p className="text-xs text-v-muted font-light">{c.subtitle}</p>
        </div>
      </div>

      <div className="space-y-5">
        {[c.q1, c.q2, c.q3, c.q4].map((label, idx) => (
          <div key={idx}>
            <p className="text-sm font-light text-v-text mb-2">{label}</p>
            <div className="flex flex-wrap gap-2">
              {c.scale.map((opt, j) => (
                <button
                  key={j}
                  type="button"
                  onClick={() => setV((s) => {
                    const n = [...s];
                    n[idx] = j;
                    return n;
                  })}
                  className={`px-3 py-2 rounded-xl text-[10px] font-mono uppercase border transition-all ${
                    v[idx] === j ? "border-v-cyan bg-v-cyan/15 text-v-cyan" : "border-white/10 text-v-muted hover:border-white/20"
                  }`}
                >
                  {j}: {opt}
                </button>
              ))}
            </div>
          </div>
        ))}

        <label className="flex items-start gap-3 cursor-pointer text-sm text-amber-200/90">
          <input type="checkbox" checked={crisis} onChange={(e) => setCrisis(e.target.checked)} className="mt-1" />
          <span>{c.crisis}</span>
        </label>

        <p className="text-[10px] text-v-muted font-light leading-relaxed flex gap-2">
          <Phone size={14} className="shrink-0 text-v-cyan/60" />
          {c.crisisNote}
        </p>

        <button
          type="button"
          onClick={submit}
          className="w-full py-4 rounded-2xl bg-v-cyan/20 text-v-cyan border border-v-cyan/30 font-mono text-[10px] uppercase tracking-widest hover:bg-v-cyan/30 flex items-center justify-center gap-2"
        >
          <Send size={16} />
          {c.submit}
        </button>
        <p className="text-[9px] font-mono text-v-muted flex items-center gap-2">
          <LifeBuoy size={12} />
          Multi-turn triage will ask follow-ups after this structured payload is sent.
        </p>
      </div>
    </motion.div>
  );
}
