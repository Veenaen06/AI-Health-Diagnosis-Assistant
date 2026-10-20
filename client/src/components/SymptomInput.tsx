// client/src/components/SymptomInput.tsx
import React, { useState } from "react";

export const SymptomInput: React.FC<{
  symptoms: string;
  setSymptoms: (s: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
}> = ({ symptoms, setSymptoms, onSubmit, isLoading }) => {
  const [listening, setListening] = useState(false);
  const [lang, setLang] = useState("en-IN"); // 'kn-IN' for Kannada

  const startRecognition = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Speech recognition not supported in this browser");
      return;
    }
    const rec = new SpeechRecognition();
    rec.lang = lang;
    rec.interimResults = false;
    rec.onresult = (e: any) => {
      const txt = e.results[0][0].transcript;
      setSymptoms((prev) => (prev ? prev + " " : "") + txt);
    };
    rec.onend = () => setListening(false);
    rec.onerror = () => setListening(false);
    rec.start();
    setListening(true);
  };

  return (
    <div className="w-full">
      <div className="rounded-2xl bg-black/65 border border-white/10 backdrop-blur-md p-6 shadow-2xl">
        <div className="flex flex-col md:flex-row items-start gap-6">
          <div className="flex-1">
            <label className="block text-sm font-medium text-slate-200 mb-3">
              Describe Your Symptoms
            </label>

            <textarea
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
              placeholder="e.g., I have a fever and sore throat for 2 days, mild cough, tiredness..."
              className="w-full min-h-[180px] md:min-h-[220px] resize-none rounded-xl px-4 py-4 bg-gradient-to-b from-white/3 to-transparent border border-white/8 text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition"
              disabled={isLoading}
            />

            {/* controls row */}
            <div className="mt-4 flex items-center gap-3">
              {/* select wrapper: ensure z-index so dropdown overlays correctly */}
              <div className="relative z-50">
                <select
                  value={lang}
                  onChange={(e) => setLang(e.target.value)}
                  aria-label="Choose language"
                  className="appearance-none px-3 py-2 rounded-md bg-black/60 text-white border border-white/10 w-40 md:w-44 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                >
                  <option value="en-IN">English (India)</option>
                  <option value="kn-IN">Kannada (India)</option>
                </select>

                {/* caret icon */}
                <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white/80">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              <button
                onClick={startRecognition}
                disabled={listening}
                className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium
                  ${listening ? "bg-rose-600/90 text-white" : "bg-white/6 text-white hover:bg-white/12"}
                  border border-white/8 transition`}
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M12 14a3 3 0 003-3V6a3 3 0 10-6 0v5a3 3 0 003 3z" />
                  <path d="M19 11a1 1 0 10-2 0 5 5 0 01-10 0 1 1 0 10-2 0 7 7 0 006 6.92V21a1 1 0 102 0v-3.08A7 7 0 0019 11z" />
                </svg>
                {listening ? "Listening..." : "Speak"}
              </button>

              <div className="ml-auto flex items-center gap-2">
                <button
                  onClick={() => {
                    setSymptoms("");
                  }}
                  className="px-4 py-2 rounded-md bg-white/6 text-slate-200 hover:bg-white/10 border border-white/8 transition"
                >
                  Clear
                </button>

                <button
                  onClick={onSubmit}
                  disabled={isLoading || !symptoms.trim()}
                  className={`flex items-center gap-2 px-5 py-2 rounded-md text-sm font-semibold text-white transition
                    ${isLoading || !symptoms.trim()
                      ? "bg-gradient-to-r from-slate-600 to-slate-600/80 cursor-not-allowed opacity-70"
                      : "bg-gradient-to-r from-cyan-500 to-emerald-500 hover:opacity-95 shadow-md"}`}
                >
                  {isLoading ? (
                    <>
                      <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25" />
                        <path d="M4 12a8 8 0 018-8" stroke="currentColor" strokeWidth="4" className="opacity-75" />
                      </svg>
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                        <path d="M5 12h14M12 5v14" />
                      </svg>
                      Get AI Analysis
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* right-side quick-disclaimer / tips panel
          <aside className="hidden md:flex md:w-64 flex-col gap-3">
            <div className="rounded-lg bg-white/3 border border-white/7 p-3 text-xs text-slate-300">
              <strong className="block text-sm text-slate-100 mb-1">Quick tips</strong>
              <ul className="list-disc pl-4 space-y-1">
                <li>Include duration (e.g., 3 days)</li>
                <li>Severity (mild/moderate/severe)</li>
                <li>Associated symptoms (fever, cough)</li>
              </ul>
            </div>

            <div className="rounded-lg bg-white/3 border border-white/7 p-3 text-xs text-slate-300">
              <strong className="block text-sm text-slate-100 mb-1">About your input</strong>
              <p className="text-xs">
                Provide your symptoms clearly to receive a detailed health insight
              </p>
            </div>
          </aside>*/}
        </div>
      </div>
    </div>
  );
};

export default SymptomInput;