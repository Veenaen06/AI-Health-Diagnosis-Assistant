import React from "react";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Home } from "./components/Home";

const App: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen font-sans bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200">
      <Header />
      <Home />
      <Footer />
    </div>
  );
};

export default App;
