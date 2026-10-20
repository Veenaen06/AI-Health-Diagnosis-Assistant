import React, { useState, useEffect } from 'react';

const messages = [
  "Consulting medical knowledge...",
  "Evaluating symptom patterns...",
  "Analyzing possible conditions...",
  "Preparing potential insights...",
  "Finalizing your report..."
];

export const LoadingSpinner: React.FC = () => {
  const [message, setMessage] = useState(messages[0]);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      i = (i + 1) % messages.length;
      setMessage(messages[i]);
    },2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center text-center my-12">
      <div className="h-16 w-16 relative">
        <div className="absolute inset-0 border-4 border-slate-200 dark:border-slate-700 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-t-cyan-500 rounded-full animate-spin"></div>
      </div>

      <p className="mt-4 text-lg font-semibold text-slate-700 dark:text-slate-200">
        Analyzing Your Symptoms...
      </p>

      <p className="text-sm text-slate-500 dark:text-slate-400 h-6 mt-1 transition-all">
        {message}
      </p>
    </div>
  );
};
