import React from "react";

const STYLE_ID = "av-themetoggle-styles";
if (typeof document !== "undefined" && !document.getElementById(STYLE_ID)) {
  const el = document.createElement("style");
  el.id = STYLE_ID;
  el.textContent = `
  .av-theme {
    --_h: 34px;
    position: relative; display: inline-flex; align-items: center;
    width: 62px; height: var(--_h); padding: 3px;
    border-radius: var(--radius-pill);
    background: var(--bg-sunken);
    border: 1px solid var(--border-line);
    cursor: pointer;
    transition: background var(--dur-base) var(--ease-out);
    -webkit-tap-highlight-color: transparent;
  }
  .av-theme__knob {
    position: absolute; top: 3px; left: 3px;
    width: calc(var(--_h) - 8px); height: calc(var(--_h) - 8px);
    border-radius: 999px;
    background: var(--accent);
    box-shadow: var(--shadow-sm);
    display: grid; place-items: center;
    color: var(--text-on-accent);
    transition: transform var(--dur-slow) var(--ease-spring), background var(--dur-base) var(--ease-out);
  }
  .av-theme[data-on="true"] .av-theme__knob { transform: translateX(28px); }
  .av-theme__ico { position: absolute; display: inline-flex; transition: opacity var(--dur-base) var(--ease-out); }
  .av-theme__sun  { left: 9px;  color: var(--honey-deep); }
  .av-theme__moon { right: 9px; color: var(--text-faint); }
  .av-theme[data-on="true"] .av-theme__sun  { opacity: 0.35; }
  .av-theme[data-on="false"] .av-theme__moon { opacity: 0.35; }
  `;
  document.head.appendChild(el);
}

const Sun = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
    <circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
  </svg>
);
const Moon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
  </svg>
);

/**
 * Playful sun/moon switch. Uncontrolled by default — toggles
 * [data-theme] on <html> and persists to localStorage.
 */
export function ThemeToggle({ checked, onChange, className = "", ...props }) {
  const isControlled = checked !== undefined;
  const [on, setOn] = React.useState(() => {
    if (isControlled) return checked;
    if (typeof document === "undefined") return false;
    return document.documentElement.getAttribute("data-theme") === "dark";
  });

  React.useEffect(() => { if (isControlled) setOn(checked); }, [checked, isControlled]);

  const toggle = () => {
    const next = !on;
    if (!isControlled) {
      setOn(next);
      const t = next ? "dark" : "light";
      document.documentElement.setAttribute("data-theme", t);
      try { localStorage.setItem("av-theme", t); } catch (e) {}
      window.dispatchEvent(new CustomEvent("theme-change", { detail: { theme: t } }));
    }
    onChange && onChange(next);
  };

  return (
    <button
      type="button"
      className={["av-theme", className].filter(Boolean).join(" ")}
      data-on={String(on)}
      role="switch"
      aria-checked={on}
      aria-label="toggle dark mode"
      onClick={toggle}
      {...props}
    >
      <span className="av-theme__ico av-theme__sun"><Sun /></span>
      <span className="av-theme__ico av-theme__moon"><Moon /></span>
      <span className="av-theme__knob">{on ? <Moon /> : <Sun />}</span>
    </button>
  );
}
