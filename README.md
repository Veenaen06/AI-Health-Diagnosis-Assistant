# AI Health Diagnosis Assistant

An AI-powered health information web application that accepts symptoms and returns structured, general health guidance using Google's Gemini API. The application includes a React frontend and a Node.js/Express backend.

> **Medical disclaimer:** This project is for educational and informational purposes only. It does not provide a medical diagnosis and is not a substitute for a qualified healthcare professional. For urgent or severe symptoms, seek medical help.

## Live Demo
        https://ai-health-diagnosis-assistant-ihuf.vercel.app


## Features

- Enter symptoms and receive AI-generated health information.
- Structured response with possible conditions, severity, recommendations, and guidance on when to seek medical care.
- English and Kannada response support based on the submitted text.
- Voice-input support through browser speech-recognition capabilities, where supported.
- Responsive React user interface.

## Tech Stack

### Frontend
- React
- TypeScript
- Vite
- React Router
- Tailwind CSS and custom CSS

### Backend
- Node.js
- Google Gemini API (`@google/genai`)
- dotenv

## Project Structure

```text
Check/
├── .gitignore
├── package-lock.json
├── client/
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   ├── tsconfig.json
│   ├── vite.config.ts
│   └── src/
│       ├── App.tsx
│       ├── main.tsx
│       ├── index.css
│       ├── types.ts
│       ├── components/
│       │   ├── DiagnosisDisplay.tsx
│       │   ├── Disclaimer.tsx
│       │   ├── Footer.tsx
│       │   ├── Header.tsx
│       │   ├── Home.tsx
│       │   ├── LoadingSpinner.tsx
│       │   └── SymptomInput.tsx
│       └── services/
│           └── geminiService.ts
└── server/
    ├── .env.example
    ├── index.js
    ├── package.json
    └── package-lock.json
```

## Prerequisites

Install the following before running the project locally:

- Node.js (LTS version recommended)
- npm (included with Node.js)
- A Gemini API key from Google AI Studio

## Installation

Clone the repository and enter the project directory:

```bash
git clone https://github.com/Veenaen06/AI-Health-Diagnosis-Assistant.git
cd AI-Health-Diagnosis-Assistant
```
Install frontend dependencies:

```bash
cd client
npm install
```

Install backend dependencies in a separate terminal:

```bash
cd server
npm install
```

## Environment Variables

Create a `server/.env` file locally.

```env
GEMINI_API_KEY=your_gemini_api_key
PORT=4000
```

- `GEMINI_API_KEY` is required for AI-generated responses.
- `PORT` is optional locally; the server defaults to port `4000`.


For local development, make sure the API base URL in `client/src/services/geminiService.ts` points to `http://localhost:4000`. 

## Run Locally

Start the backend in one terminal:

```bash
cd server
npm run dev
```

The backend should run at:

```text
http://localhost:4000
```

Start the frontend in another terminal:

```bash
cd client
npm run dev
```

Vite will print a local development URL, usually:

```text
http://localhost:5173
```

Open the URL shown by Vite in your browser.

## Build the Frontend

From the `client` directory:

```bash
npm run build
```

## Deployment

### Frontend — Vercel

The frontend is deployed on Vercel:

https://ai-health-diagnosis-assistant-ihuf.vercel.app

The Vercel project uses the `client` directory as its root, with `npm run build` as the build command and `dist` as the output directory.

### Backend — Render

The backend is deployed on Render:

https://ai-health-diagnosis-assistant-backend.onrender.com

The Render service uses the `server` directory. Configure the required environment variables in Render's Environment settings.

## Security Notes

- Keep `server/.env` out of GitHub. Add `.env` to `.gitignore`.
- Keep the Gemini API key on the backend only.
- Do not enter sensitive personal or medical information into a demonstration project unless you understand how it is handled.

## Feature Enhancements (Future Scope)
- Multilingual Voice Interaction: Improve speech recognition and spoken responses for all languages.
- Nearby Healthcare Facilities: Improve location-based discovery of hospitals, clinics, and pharmacies.
- Medical Report Analysis: Allow users to upload medical reports for general explanations of their contents.
- Health Dashboard: Present saved health queries and wellness information in a clear dashboard.