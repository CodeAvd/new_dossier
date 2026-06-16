import React from "react";

const STYLE_ID = "av-tag-styles";
if (typeof document !== "undefined" && !document.getElementById(STYLE_ID)) {
  const el = document.createElement("style");
  el.id = STYLE_ID;
  el.textContent = `
  .av-tag {
    display: inline-flex; align-items: center; gap: 0.4em;
    font-family: var(--font-mono);
    font-size: var(--fs-xs);
    font-weight: var(--fw-medium);
    letter-spacing: 0.01em;
    padding: 0.28em 0.72em;
    border-radius: var(--radius-pill);
    border: 1px solid transparent;
    line-height: 1.3;
    white-space: nowrap;
  }
  .av-tag__dot { width: 0.5em; height: 0.5em; border-radius: 999px; background: currentColor; flex: none; opacity: 0.9; }

  .av-tag--accent  { background: var(--accent-soft); color: var(--accent-press); border-color: var(--border-soft); }
  .av-tag--neutral { background: var(--bg-sunken);   color: var(--text-muted);  border-color: var(--border-soft); }
  .av-tag--outline { background: transparent;        color: var(--text-body);   border-color: var(--border-line); }
  .av-tag--spark   { background: var(--spark-soft);  color: var(--spark-text);  border-color: color-mix(in srgb, var(--spark) 40%, transparent); }
  .av-tag--blush   { background: color-mix(in srgb, var(--blush) 32%, transparent); color: var(--blush-deep); }
  .av-tag--honey   { background: color-mix(in srgb, var(--honey) 34%, transparent); color: var(--honey-deep); }
  .av-tag--sage    { background: color-mix(in srgb, var(--sage) 34%, transparent);  color: var(--sage-deep); }
  .av-tag--sky     { background: color-mix(in srgb, var(--sky) 34%, transparent);   color: var(--sky-deep); }
  .av-tag--mauve   { background: color-mix(in srgb, var(--mauve) 34%, transparent); color: var(--mauve-deep); }

  .av-tag--success { background: var(--success-soft); color: var(--sage-deep); }
  .av-tag--warning { background: var(--warning-soft); color: var(--honey-deep); }
  .av-tag--danger  { background: var(--danger-soft);  color: var(--danger); }
  .av-tag--info    { background: var(--info-soft);    color: var(--sky-deep); }
  `;
  document.head.appendChild(el);
}

/**
 * Small mono chip — tech stack, evidence metrics, categories, statuses.
 */
export function Tag({ children, tone = "accent", dot = false, className = "", ...props }) {
  const cls = ["av-tag", `av-tag--${tone}`, className].filter(Boolean).join(" ");
  return (
    <span className={cls} {...props}>
      {dot ? <span className="av-tag__dot" /> : null}
      {children}
    </span>
  );
}
