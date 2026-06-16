import React from "react";

const STYLE_ID = "av-card-styles";
if (typeof document !== "undefined" && !document.getElementById(STYLE_ID)) {
  const el = document.createElement("style");
  el.id = STYLE_ID;
  el.textContent = `
  .av-card {
    position: relative;
    background: var(--surface-card);
    border: 1px solid var(--border-soft);
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-sm);
    transition: transform var(--dur-base) var(--ease-spring),
                box-shadow var(--dur-base) var(--ease-out),
                border-color var(--dur-base) var(--ease-out);
  }
  .av-card--flat   { box-shadow: none; }
  .av-card--raised { box-shadow: var(--shadow-lg); }
  .av-card--sunken { background: var(--bg-subtle); box-shadow: var(--shadow-inset); border-color: var(--border-soft); }
  .av-card--dashed { box-shadow: none; background: var(--sand-100); border: 2px dashed var(--border-strong); }
  .av-card--holo   { background: var(--holo-surface); border-color: color-mix(in srgb, var(--spark) 24%, transparent); box-shadow: var(--shadow-lg); color: var(--holo-text); }
  .av-card--pad-sm { padding: var(--space-4); }
  .av-card--pad-md { padding: var(--space-5); }
  .av-card--pad-lg { padding: var(--space-6); }
  .av-card--pad-none { padding: 0; }
  .av-card--interactive { cursor: pointer; }
  .av-card--interactive:hover { transform: translateY(-4px); box-shadow: var(--shadow-lg); border-color: var(--border-line); }
  .av-card--interactive:active { transform: translateY(-1px); }
  `;
  document.head.appendChild(el);
}

/**
 * Soft warm surface container. Generous rounding, warm-tinted shadow.
 */
export function Card({
  children,
  elevation = "default",
  padding = "md",
  interactive = false,
  as = "div",
  className = "",
  ...props
}) {
  const Tag = as;
  const elevClass = elevation === "default" ? "" : `av-card--${elevation}`;
  const cls = [
    "av-card",
    elevClass,
    `av-card--pad-${padding}`,
    interactive ? "av-card--interactive" : "",
    className,
  ].filter(Boolean).join(" ");
  return (
    <Tag className={cls} {...props}>
      {children}
    </Tag>
  );
}
