import React from "react";

const HealthIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 7v10m-5-5h10" />
  </svg>
);

export const Header: React.FC = () => (
  <header className="sticky top-0 z-30">
    <div className="backdrop-blur-md bg-black/40 border-b border-white/10 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-3 flex items-center">
        <div className="flex items-center gap-3">
          <HealthIcon className="h-8 w-8 text-cyan-400" />
          <span className="font-extrabold text-lg md:text-2xl bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-emerald-400 tracking-tight">
            AI Health Assistant
          </span>
        </div>
      </div>
    </div>
  </header>
);

export default Header;
