# AI Health Assistant (Simplified)

This version provides a single-page AI Health Assistant. Users can enter symptoms, optionally use voice input and choose English or Kannada, then view the generated result.

## Removed

- Login, signup, and logout UI and routes
- History UI and history endpoints
- Local diagnosis-history saving
- Server-side diagnosis-history saving
- PDF/report export UI and dependencies are no longer used by the app

## Requirements

- Node.js 20 or newer
- A Gemini API key

## Setup the backend

1. Open a terminal in `server`.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy `.env.example` to `.env`.
   - Windows PowerShell: `Copy-Item .env.example .env`
   - macOS/Linux: `cp .env.example .env`
4. Put your own Gemini API key in `server/.env`:
   ```env
   GEMINI_API_KEY=your_real_gemini_api_key
   PORT=4000
   ```
5. Start the backend:
   ```bash
   npm run dev
   ```

## Setup the frontend

1. Open a second terminal in `client`.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the frontend:
   ```bash
   npm run dev
   ```
4. Open the local URL printed by Vite, usually `http://localhost:5173`.

The frontend calls the backend at `http://localhost:4000`. If you change the backend port or deploy the app, update `API_BASE` in `client/src/services/geminiService.ts`.

## Privacy and medical disclaimer

This version does not save diagnosis history in browser storage or in a database. Requests still send the symptoms entered by the user to the configured backend and Gemini API to generate a response. Do not use the app as a substitute for professional medical care; AI-generated health information can be inaccurate.

Never commit your real `.env` file or API key to source control.
