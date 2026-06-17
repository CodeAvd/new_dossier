import ReactRuntime from "react";
import { createRoot } from "react-dom/client";
import "./av-utils.jsx";
import "./Header.jsx";
import "./HeroR3F.jsx";
import "./About.jsx";
import "./Projects.jsx";
import "./FunAgent.jsx";
import "./TradingR3F.jsx";
import "./Experience.jsx";
import "./Stack.jsx";
import "./Contact.jsx";
import "./AgentThread.jsx";

const React = ReactRuntime;
window.React = ReactRuntime;

function App() {
  return (
    <React.Fragment>
      <window.Header />
      <main>
        <window.HeroR3F />
        <window.About />
        <window.Projects />
        <window.FunAgent />
        <window.TradingR3F />
        <window.Experience />
        <window.Stack />
        <window.Contact />
      </main>
      <window.AgentThread />
    </React.Fragment>
  );
}

function mount() {
  createRoot(document.getElementById("root")).render(<App />);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", mount, { once: true });
} else {
  mount();
}
