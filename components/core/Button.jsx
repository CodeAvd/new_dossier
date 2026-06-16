import React from "react";

/* inject component styles once at module load */
const STYLE_ID = "av-button-styles";
if (typeof document !== "undefined" && !document.getElementById(STYLE_ID)) {
  const el = document.createElement("style");
  el.id = STYLE_ID;
  el.textContent = `
  .av-btn {
    --_bg: var(--accent);
    --_fg: var(--text-on-accent);
    font-family: var(--font-sans);
    font-weight: var(--fw-semibold);
    letter-spacing: -0.005em;
    display: inline-flex; align-items: center; justify-content: center;
    gap: 0.5em;
    border: 1px solid transparent;
    border-radius: var(--radius-pill);
    cursor: pointer;
    white-space: nowrap;
    text-decoration: none;
    background: var(--_bg);
    color: var(--_fg);
    transition: transform var(--dur-base) var(--ease-spring),
                background var(--dur-fast) var(--ease-out),
                box-shadow var(--dur-base) var(--ease-out),
                border-color var(--dur-fast) var(--ease-out);
  }
  .av-btn:focus-visible { outline: 2px solid var(--focus-ring); outline-offset: 2px; }
  .av-btn:active { transform: translateY(0) scale(0.97); }
  .av-btn[disabled] { opacity: 0.5; pointer-events: none; }

  /* sizes */
  .av-btn--sm { height: 34px; padding: 0 14px; font-size: var(--fs-sm); }
  .av-btn--md { height: 42px; padding: 0 20px; font-size: var(--fs-base); }
  .av-btn--lg { height: 52px; padding: 0 28px; font-size: var(--fs-md); }

  /* variants */
  .av-btn--primary { background: var(--accent); color: var(--text-on-accent); box-shadow: var(--shadow-sm); }
  .av-btn--primary:hover { background: var(--accent-hover); transform: translateY(-2px); box-shadow: var(--shadow-accent); }

  .av-btn--secondary { background: var(--surface-card); color: var(--text-strong); border-color: var(--border-line); box-shadow: var(--shadow-xs); }
  .av-btn--secondary:hover { background: var(--surface-card-2); transform: translateY(-2px); box-shadow: var(--shadow-sm); }

  .av-btn--ghost { background: transparent; color: var(--text-body); }
  .av-btn--ghost:hover { background: var(--accent-soft); color: var(--accent-press); }

  .av-btn--outline { background: transparent; color: var(--text-strong); border-color: var(--border-strong); }
  .av-btn--outline:hover { border-color: var(--accent); color: var(--accent-press); background: var(--accent-tint); }

  .av-btn__icon { display: inline-flex; flex: none; }
  `;
  document.head.appendChild(el);
}

/**
 * avdeev primary action button. Soft pill, warm terracotta, springy lift on hover.
 */
export function Button({
  children,
  variant = "primary",
  size = "md",
  iconLeft,
  iconRight,
  as = "button",
  className = "",
  ...props
}) {
  const Tag = as;
  const cls = [
    "av-btn",
    `av-btn--${variant}`,
    `av-btn--${size}`,
    className,
  ].filter(Boolean).join(" ");

  return (
    <Tag className={cls} {...props}>
      {iconLeft ? <span className="av-btn__icon">{iconLeft}</span> : null}
      {children}
      {iconRight ? <span className="av-btn__icon">{iconRight}</span> : null}
    </Tag>
  );
}
