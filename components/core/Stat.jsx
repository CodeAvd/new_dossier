import React from "react";

const STYLE_ID = "av-stat-styles";
if (typeof document !== "undefined" && !document.getElementById(STYLE_ID)) {
  const el = document.createElement("style");
  el.id = STYLE_ID;
  el.textContent = `
  .av-stat { display: flex; flex-direction: column; gap: 0.25rem; }
  .av-stat__value {
    font-family: var(--font-serif-display);
    font-weight: var(--fw-medium);
    line-height: 1;
    letter-spacing: -0.02em;
    color: var(--text-strong);
    display: flex; align-items: baseline; gap: 0.12em;
  }
  .av-stat--sm .av-stat__value { font-size: 2rem; }
  .av-stat--md .av-stat__value { font-size: 2.75rem; }
  .av-stat--lg .av-stat__value { font-size: 3.75rem; }
  .av-stat__unit { font-style: italic; font-weight: var(--fw-regular); color: var(--accent); font-size: 0.55em; }
  .av-stat__label {
    font-family: var(--font-mono);
    font-size: var(--fs-2xs);
    letter-spacing: var(--ls-label);
    text-transform: uppercase;
    color: var(--text-muted);
  }
  .av-stat__sub { font-family: var(--font-sans); font-size: var(--fs-sm); color: var(--text-faint); }
  `;
  document.head.appendChild(el);
}

/**
 * Evidence-first metric: big serif number, italic unit accent, mono label.
 */
export function Stat({ value, unit, label, sub, size = "md", className = "", ...props }) {
  const cls = ["av-stat", `av-stat--${size}`, className].filter(Boolean).join(" ");
  return (
    <div className={cls} {...props}>
      <div className="av-stat__value">
        <span>{value}</span>
        {unit ? <span className="av-stat__unit">{unit}</span> : null}
      </div>
      {label ? <div className="av-stat__label">{label}</div> : null}
      {sub ? <div className="av-stat__sub">{sub}</div> : null}
    </div>
  );
}
