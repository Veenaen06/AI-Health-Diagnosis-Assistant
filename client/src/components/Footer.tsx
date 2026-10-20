// client/src/components/Footer.tsx
import React from "react";
import { Disclaimer } from "./Disclaimer";

export const Footer: React.FC = () => {
  return (
    <footer className="mt-auto">
      <div className="bg-black/45 backdrop-blur-md border-t border-white/6 py-6">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto mb-4">
            <Disclaimer isFooter={true} />
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-3">
            <p className="text-sm text-slate-300">&copy; {new Date().getFullYear()} AI Health Assistant</p>
            <p className="text-xs text-slate-400">For informational purposes only — not a replacement for professional medical advice.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;