import React from "react";

const STYLE_ID = "av-input-styles";
if (typeof document !== "undefined" && !document.getElementById(STYLE_ID)) {
  const el = document.createElement("style");
  el.id = STYLE_ID;
  el.textContent = `
  .av-field { display: flex; flex-direction: column; gap: 0.45rem; font-family: var(--font-sans); }
  .av-field__label {
    font-family: var(--font-mono); font-size: var(--fs-2xs);
    letter-spacing: var(--ls-label); text-transform: uppercase; color: var(--text-muted);
  }
  .av-field__wrap {
    display: flex; align-items: center; gap: 0.6rem;
    background: var(--surface-card);
    border: 1.5px solid var(--border-line);
    border-radius: var(--radius-md);
    padding: 0 0.9rem; height: 46px;
    transition: border-color var(--dur-fast) var(--ease-out), box-shadow var(--dur-base) var(--ease-out);
  }
  .av-field__wrap:focus-within { border-color: var(--accent); box-shadow: 0 0 0 4px var(--accent-ring); }
  .av-field__icon { color: var(--text-faint); display: inline-flex; flex: none; }
  .av-field__input {
    flex: 1; border: 0; background: transparent; outline: none;
    font-family: var(--font-sans); font-size: var(--fs-base); color: var(--text-strong);
    min-width: 0;
  }
  .av-field__input::placeholder { color: var(--text-faint); }
  .av-field--textarea .av-field__wrap { height: auto; padding: 0.7rem 0.9rem; align-items: flex-start; }
  .av-field--textarea .av-field__input { resize: vertical; min-height: 90px; line-height: var(--lh-body); }
  .av-field__hint { font-size: var(--fs-sm); color: var(--text-faint); }
  .av-field--error .av-field__wrap { border-color: var(--danger); }
  .av-field--error .av-field__wrap:focus-within { box-shadow: 0 0 0 4px var(--danger-soft); }
  .av-field--error .av-field__hint { color: var(--danger); }
  `;
  document.head.appendChild(el);
}

/**
 * Warm text field — mono label, soft rounded well, accent focus glow.
 */
export function Input({
  label, hint, error = false, iconLeft, multiline = false,
  id, className = "", ...props
}) {
  const fieldId = id || (label ? `f-${String(label).replace(/\s+/g, "-").toLowerCase()}` : undefined);
  const cls = [
    "av-field",
    multiline ? "av-field--textarea" : "",
    error ? "av-field--error" : "",
    className,
  ].filter(Boolean).join(" ");
  const Control = multiline ? "textarea" : "input";
  return (
    <div className={cls}>
      {label ? <label className="av-field__label" htmlFor={fieldId}>{label}</label> : null}
      <div className="av-field__wrap">
        {iconLeft && !multiline ? <span className="av-field__icon">{iconLeft}</span> : null}
        <Control id={fieldId} className="av-field__input" {...props} />
      </div>
      {hint ? <span className="av-field__hint">{hint}</span> : null}
    </div>
  );
}
