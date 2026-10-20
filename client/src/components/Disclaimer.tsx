// client/src/components/Disclaimer.tsx
import React from "react";

export const Disclaimer: React.FC = () => {
  return (
    <div className="bg-black/40 dark:bg-black/50 p-4 rounded-lg border border-white/5 text-sm text-slate-300">
      <strong className="block text-slate-100 mb-1">Important Medical Disclaimer</strong>
      <div>
        This tool provides general health insights based on symptoms and is <strong>not</strong> medical advice.
        Always consult a qualified healthcare provider for a definitive diagnosis and treatment.
      </div>
    </div>
  );
};

export default Disclaimer;