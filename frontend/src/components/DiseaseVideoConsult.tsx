"use client";

import { useMemo, useState, useCallback, useEffect } from "react";
import { Stethoscope, ExternalLink, Clapperboard } from "lucide-react";
import { t, type UILang } from "@/lib/triageLocale";
import { getStoredUILang } from "@/lib/uiLang";
import { diseaseYoutubeSearchUrl, findCuratedVideoId, parseDiseaseVideoMap } from "@/lib/diseaseYouTube";

export default function DiseaseVideoConsult() {
  const [lang, setLang] = useState<UILang>(() => getStoredUILang());
  const [disease, setDisease] = useState("");
  const [curatedId, setCuratedId] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const map = useMemo(() => parseDiseaseVideoMap(), []);

  useEffect(() => {
    if (!disease.trim()) setCuratedId(null);
  }, [disease]);

  useEffect(() => {
    const onLang = (e: Event) => {
      const ce = e as CustomEvent<{ lang?: UILang }>;
      if (ce.detail?.lang === "en" || ce.detail?.lang === "hi" || ce.detail?.lang === "kn") {
        setLang(ce.detail.lang);
      }
    };
    window.addEventListener("v-ui-lang", onLang);
    return () => window.removeEventListener("v-ui-lang", onLang);
  }, []);

  const d = t(lang);

  const flash = useCallback((msg: string) => {
    setToast(msg);
    window.setTimeout(() => setToast(null), 2200);
  }, []);

  const openConsultationVideos = () => {
    const q = disease.trim();
    if (!q) {
      flash(d.diseaseYoutubeInputRequired);
      return;
    }
    const id = findCuratedVideoId(q, map);
    setCuratedId(id);
    window.open(diseaseYoutubeSearchUrl(q), "_blank", "noopener,noreferrer");
  };

  return (
    <div className="glass rounded-2xl p-6 border border-white/10 border-t-v-cyan/20">
      <div className="flex flex-col sm:flex-row sm:items-start gap-4 mb-4">
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-11 h-11 rounded-xl bg-v-cyan/10 border border-v-cyan/20 flex items-center justify-center">
            <Stethoscope className="text-v-cyan" size={22} />
          </div>
          <div>
            <h4 className="text-sm font-black uppercase italic tracking-tight">{d.diseaseYoutubeTitle}</h4>
            <p className="text-[10px] text-v-muted font-light leading-snug max-w-xl">{d.diseaseYoutubeHint}</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
        <input
          type="text"
          value={disease}
          onChange={(e) => setDisease(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && openConsultationVideos()}
          placeholder={d.diseaseYoutubePlaceholder}
          className="flex-1 min-w-0 bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-v-cyan/40 font-light placeholder:text-v-muted/50"
        />
        <button
          type="button"
          onClick={openConsultationVideos}
          className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-v-red/90 hover:bg-v-red text-white text-xs font-mono uppercase tracking-wider shrink-0"
        >
          <ExternalLink size={16} />
          {d.diseaseYoutubeButton}
        </button>
      </div>

      {toast && <p className="text-[11px] text-amber-200 mt-3 font-mono">{toast}</p>}

      {curatedId && (
        <div className="mt-6 space-y-2">
          <p className="text-[10px] font-mono uppercase tracking-widest text-v-muted flex items-center gap-2">
            <Clapperboard size={14} className="text-v-cyan" />
            {d.diseaseYoutubeCuratedNote}
          </p>
          <div className="aspect-video w-full max-w-3xl rounded-xl overflow-hidden border border-white/10 bg-black">
            <iframe
              title={d.diseaseYoutubeTitle}
              src={`https://www.youtube-nocookie.com/embed/${encodeURIComponent(curatedId)}?rel=0`}
              className="h-full w-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </div>
        </div>
      )}
    </div>
  );
}
