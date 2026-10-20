import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Remove legacy data from the previous history/login version.
try {
  localStorage.removeItem("diagnosisHistory");
  localStorage.removeItem("user");
  localStorage.removeItem("token");
} catch {
  // Ignore storage access errors; the assistant itself does not use local storage.
}

const rootEl = document.getElementById("root");
if (!rootEl) throw new Error("Root element not found");

createRoot(rootEl).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
