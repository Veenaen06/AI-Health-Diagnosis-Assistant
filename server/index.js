// server/index.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenAI, Type } from '@google/genai';

dotenv.config();

const PORT = process.env.PORT || 4000;
const { GEMINI_API_KEY } = process.env;

if (!GEMINI_API_KEY) console.warn('Warning: GEMINI_API_KEY not set in .env');

const app = express();
app.use(cors());
app.use(express.json({ limit: '1mb' }));


// Initialize Gemini client (server-side only)
const aiClient = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

/* ---------- Single robust /api/diagnosis handler using Gemini ---------- */
app.post('/api/diagnosis', async (req, res) => {
  const { symptoms } = req.body;
  if (!symptoms || typeof symptoms !== 'string') {
    return res.status(400).json({ error: 'symptoms required' });
  }
  const isKannada=/[\u0C80-\u0CFF]/.test(symptoms);
  const replyLanguageInstruction = isKannada
  ? "Reply ONLY in Kannada language."
  : "Reply ONLY in English language.";

 {/*const systemInstruction = `
You are a detailed AI medical assistant. Provide long, clear, deeply explained medical insights inside the JSON schema only.
Give detailed explanations for each condition including causes, symptoms, risk factors, complications, and recovery details. Provide long and helpful self-care remedies, home care instructions, prevention guidance, and lifestyle suggestions. Give clear doctor guidance and warning signs. Use simple and easy language but provide as much detail as possible.
Do not mention medicine names. Do not break the JSON structure. Do not output text outside the JSON object.`;*/}
const systemInstruction=`You are a detailed AI medical assistant.
${replyLanguageInstruction}

Important rules:
- You are an AI, not a doctor.
- Follow the JSON schema strictly.
- Do NOT include any text outside the JSON object.
- Use simple, clear language.

- Provide Low / Medium / High risk assessment.
- Provide Possible causes, General remedies, When to see a doctor.
- Do NOT mention medicine names.
`;

  const responseSchema = {
    type: Type.OBJECT,
    properties: {
      possibleConditions: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            condition: { type: Type.STRING },
            description: { type: Type.STRING },
            severity: { type: Type.STRING }
          },
          required: ['condition', 'description', 'severity']
        }
      },
      recommendations: { type: Type.ARRAY, items: { type: Type.STRING } },
      whenToSeeDoctor: { type: Type.STRING }
    },
    required: ['possibleConditions', 'recommendations', 'whenToSeeDoctor']
  };

  // safe serializer for fallback logging
  const safeStringify = (obj, maxLen = 200000) => {
    const seen = new WeakSet();
    try {
      const str = JSON.stringify(obj, (k, v) => {
        if (v && typeof v === 'object') {
          if (seen.has(v)) return '[Circular]';
          seen.add(v);
        }
        if (typeof v === 'function') return `[Function: ${v.name || 'anonymous'}]`;
        return v;
      }, 2);
      return str.length > maxLen ? str.slice(0, maxLen) + '... (truncated)' : str;
    } catch (e) {
      return String(obj);
    }
  };

  try {
    const response = await aiClient.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Analyze symptoms and return JSON conforming to schema: ${symptoms}`,
      config: {
        systemInstruction,
        responseMimeType: 'application/json',
        responseSchema,
        temperature: 0.1,
        maxOutputTokens: 3500,
        topP: 0.95
      }
    });

    // Extract text candidate from common SDK shapes
    let jsonText = null;
    try {
      if (typeof response?.text === 'string' && response.text.trim()) jsonText = response.text.trim();
      else if (Array.isArray(response?.candidates) && response.candidates[0]?.content?.text) jsonText = response.candidates[0].content.text;
      else if (Array.isArray(response?.output) && response.output[0]?.content?.[0]?.text) jsonText = response.output[0].content[0].text;
      else if (response?.candidates?.[0]?.content?.parts?.[0]?.text) jsonText = response.candidates[0].content.parts[0].text;
    } catch (ex) {
      console.warn('Error while extracting text candidate:', ex?.message || ex);
    }

    // Try parse JSON, with safe fallbacks
    let diagnosis;
    if (jsonText) {
      try {
        diagnosis = JSON.parse(jsonText.trim());
      } catch (parseErr) {
        const match = jsonText.match(/\{[\s\S]*"possibleConditions"[\s\S]*\}/);
        if (match) {
          try { diagnosis = JSON.parse(match[0]); } catch { diagnosis = { rawText: jsonText }; }
        } else {
          diagnosis = { rawText: jsonText };
        }
      }
    } else {
      diagnosis = { raw: safeStringify(response) };
    }

    if (diagnosis === null || typeof diagnosis !== 'object') diagnosis = { value: diagnosis };

    return res.json({ diagnosis });
  } catch (err) {
    console.error('Error calling Gemini SDK:', err && err.message ? err.message : err);
    let short = 'Server error calling AI';
    try { if (err?.status) short += ` (status ${err.status})`; if (err?.message) short += `: ${err.message}`; } catch {}
    return res.status(500).json({ error: short });
  }
});

/* ---------- Basic root debug route ---------- */
app.get('/', (req, res) => res.send('AI health server is running.'));

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});