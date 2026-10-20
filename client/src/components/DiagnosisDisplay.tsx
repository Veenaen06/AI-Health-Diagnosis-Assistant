// client/src/components/DiagnosisDisplay.tsx
import React from "react";
import type { Diagnosis, PossibleCondition } from "../types";
import { Disclaimer } from "./Disclaimer";

interface DiagnosisDisplayProps {
  diagnosis: Diagnosis;
}

// Map severity to tailwind classes + small icon
// Modern severity colors (NO brown/tan shades)
const getSeverityStyles = (severity: PossibleCondition['severity']) => {
  switch (severity) {
    case "Low":
      return {
        bg: "bg-emerald-900/20",
        text: "text-emerald-300",
        border: "border-emerald-600",
        badge: "bg-emerald-600/40"
      };

    case "Medium":
      return {
        bg: "bg-yellow-900/20",
        text: "text-yellow-300",
        border: "border-yellow-600",
        badge: "bg-yellow-600/40"
      };

    case "High":
      return {
        bg: "bg-orange-900/20",
        text: "text-orange-300",
        border: "border-orange-600",
        badge: "bg-orange-600/40"
      };

    case "Critical":
      return {
        bg: "bg-red-900/20",
        text: "text-red-300",
        border: "border-red-600",
        badge: "bg-red-600/40"
      };

    default:
      return {
        bg: "bg-slate-900/20",
        text: "text-slate-300",
        border: "border-slate-700",
        badge: "bg-slate-700/40"
      };
  }
};

const InfoCard: React.FC<{
  title: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
}> = ({ title, children, icon }) => (
  <div className="bg-white/6 dark:bg-black/40 p-5 rounded-2xl shadow-md border border-white/5 backdrop-blur-sm">
    <div className="flex items-center mb-4">
      <div className="mr-4 text-cyan-400 bg-cyan-900/10 p-2 rounded-lg">{icon}</div>
      <h3 className="text-lg font-bold text-slate-100 dark:text-white">{title}</h3>
    </div>
    <div className="text-slate-200 space-y-3">{children}</div>
  </div>
);

export const DiagnosisDisplay: React.FC<DiagnosisDisplayProps> = ({ diagnosis }) => {
  // safe defaults
  const possibleConditions = diagnosis?.possibleConditions || [];
  const recommendations = diagnosis?.recommendations || [];
  const whenToSeeDoctor = diagnosis?.whenToSeeDoctor || "No specific red flags provided.";

  return (
    <div className="space-y-6">
      <Disclaimer />

      <InfoCard
        title="Potential Conditions"
        icon={
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-cyan-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
          </svg>
        }
      >
        <div className="space-y-3">
          {possibleConditions.length === 0 && (
            <div className="text-slate-300">No conditions were returned by the model.</div>
          )}

          {possibleConditions.map((item, idx) => {
            const styles = getSeverityStyles(item.severity);
            return (
              <div key={idx} className={`p-6 rounded-2xl border ${styles.border} ${styles.bg} shadow-lg backdrop-blur-sm`}>
                <div className="flex justify-between items-start">
                  <h4 className="font-semibold text-xl text-white">{item.condition}</h4>
                  <span className={`px-3 py-1 text-sm font-medium rounded-full flex items-center ${styles.text} ${styles.bg}`}>
                    <span>{item.severity || "Unknown"}</span>
                  </span>
                </div>
                <p className="mt-3 text-slate-200 text-base leading-relaxed whitespace-pre-wrap">{item.description}</p>
              </div>
            );
          })}
        </div>
      </InfoCard>

      <InfoCard
  title="General Recommendations"
  icon={
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
  }
>
  <ul className="list-none space-y-3 text-base">
    {recommendations.map((rec, index) => (
      <li
        key={index}
        className="flex items-start p-3 rounded-xl bg-slate-900/20 border border-slate-700 shadow-md backdrop-blur-sm"
      >
        <svg
          className="w-5 h-5 mr-3 text-emerald-400 flex-shrink-0 mt-1"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clipRule="evenodd"
          />
        </svg>
        <span className="text-slate-200 leading-relaxed">{rec}</span>
      </li>
    ))}
  </ul>
</InfoCard>

      <InfoCard
  title="When to See a Doctor"
  icon={
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  }
>
  <div className="flex items-start p-4 rounded-xl bg-red-900/20 border border-red-700 shadow-md backdrop-blur-sm">
    <svg
      className="w-6 h-6 mr-3 text-red-400 flex-shrink-0 mt-1"
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path
        fillRule="evenodd"
        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
        clipRule="evenodd"
      />
    </svg>
    <p className="text-slate-200 text-base leading-relaxed">{whenToSeeDoctor}</p>
  </div>
</InfoCard>
    </div>
  );
};

export default DiagnosisDisplay;