import React, { useState } from "react";
import { SymptomInput } from "./SymptomInput";
import DiagnosisDisplay from "./DiagnosisDisplay";
import { LoadingSpinner } from "./LoadingSpinner";
import { getDiagnosis } from "../services/geminiService";
import type { Diagnosis } from "../types";

export const Home: React.FC = () => {
  const [symptoms, setSymptoms] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [diagnosis, setDiagnosis] = useState<Diagnosis | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGetDiagnosis = async () => {
    setError(null);
    setDiagnosis(null);

    if (!symptoms.trim()) {
      setError("Please describe your symptoms before requesting analysis.");
      return;
    }

    setIsLoading(true);
    try {
      const result = await getDiagnosis(symptoms);
      const diagData: Diagnosis = (
        result && (result.diagnosis || result)
      ) as unknown as Diagnosis;
      setDiagnosis(diagData);
      setSymptoms("");
    } catch (err: unknown) {
      console.error("Diagnosis error:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Failed to get AI analysis. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex-1 bg-gradient-to-b from-[#050505] via-[#0d0d0d] to-[#1a1a1a] py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <section className="w-full">
          <div className="flex flex-col bg-black/60 text-white backdrop-blur-lg border border-white/10 rounded-3xl shadow-2xl p-6 md:p-8">
            <div className="mb-5">
              <h1 className="text-2xl md:text-3xl font-extrabold text-white">AI Health Assistant</h1>
              <p className="mt-2 text-slate-300">Describe your symptoms to receive general AI-generated health information.</p>
            </div>

            <div className="mb-5">
              <SymptomInput
                symptoms={symptoms}
                setSymptoms={setSymptoms}
                onSubmit={handleGetDiagnosis}
                isLoading={isLoading}
              />
            </div>

            {error && (
              <div role="alert" className="mb-4 text-sm text-red-400 bg-red-900/20 p-3 rounded-lg border border-red-800/20">
                {error}
              </div>
            )}

            {isLoading && (
              <div className="mb-4">
                <LoadingSpinner />
              </div>
            )}

            {diagnosis ? (
              <div className="mt-4">
                <DiagnosisDisplay diagnosis={diagnosis} />
              </div>
            ) : !isLoading ? (
              <div className="mt-6 text-center text-slate-300">
                <p className="mb-2">Your result will appear here.</p>
                <p className="text-xs">For more useful general information, include the duration and severity of your symptoms.</p>
              </div>
            ) : null}

            <div className="mt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              <p className="text-sm text-slate-300">
                <strong className="text-slate-100">Important:</strong> This tool provides general information, not a medical diagnosis. Consult a qualified medical professional for medical advice. Seek urgent care for severe or rapidly worsening symptoms.
              </p>
              <button
                type="button"
                onClick={() => {
                  setDiagnosis(null);
                  setError(null);
                  setSymptoms("");
                }}
                className="self-start px-4 py-2 rounded-md bg-white/10 hover:bg-white/15 text-sm"
              >
                Reset
              </button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Home;
