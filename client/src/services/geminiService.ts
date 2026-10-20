// Client-side service that sends symptom requests to the Express backend.

type AnyObj = Record<string, any>;

function tryParseJsonMaybe(text: string): AnyObj | string {
  if (!text) return "";
  const trimmed = text.trim();

  try {
    return JSON.parse(trimmed);
  } catch {
    const match = trimmed.match(/\{[\s\S]*"possibleConditions"[\s\S]*\}/);
    if (match) {
      try {
        return JSON.parse(match[0]);
      } catch {
        return { rawText: trimmed };
      }
    }
    return { rawText: trimmed };
  }
}

const API_BASE = "https://ai-health-diagnosis-assistant-backend.onrender.com";

export async function getDiagnosis(symptoms: string): Promise<any> {
  const res = await fetch(`${API_BASE}/api/diagnosis`, {
    method: "POST",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ symptoms }),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    let message = `Server responded with status ${res.status}`;

    if (text) {
      try {
        const parsed = JSON.parse(text);
        message = parsed?.error || parsed?.message || text;
      } catch {
        message = text;
      }
    }

    throw new Error(message);
  }

  const text = await res.text().catch(() => "");
  const parsed = tryParseJsonMaybe(text);

  if (typeof parsed === "object" && parsed !== null && parsed.diagnosis) {
    return parsed.diagnosis;
  }
  if (typeof parsed === "object" && parsed !== null && parsed.possibleConditions) {
    return parsed;
  }
  return parsed;
}

export default { getDiagnosis };
