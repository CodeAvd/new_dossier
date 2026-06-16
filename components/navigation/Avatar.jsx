import React from "react";

const STYLE_ID = "av-avatar-styles";
if (typeof document !== "undefined" && !document.getElementById(STYLE_ID)) {
  const el = document.createElement("style");
  el.id = STYLE_ID;
  el.textContent = `
  .av-avatar {
    position: relative; display: inline-grid; place-items: center;
    border-radius: 999px; flex: none;
    background: var(--accent-soft); color: var(--accent-press);
    font-family: var(--font-serif-display); font-style: italic; font-weight: 500;
    overflow: hidden; isolation: isolate;
  }
  .av-avatar--ring { box-shadow: 0 0 0 2px var(--bg-base), 0 0 0 4px var(--accent); }
  .av-avatar img { width: 100%; height: 100%; object-fit: cover; }
  .av-avatar--sm { width: 32px; height: 32px; font-size: 14px; }
  .av-avatar--md { width: 44px; height: 44px; font-size: 18px; }
  .av-avatar--lg { width: 64px; height: 64px; font-size: 26px; }
  .av-avatar--xl { width: 96px; height: 96px; font-size: 40px; }
  .av-avatar__status {
    position: absolute; right: 2px; bottom: 2px; width: 28%; height: 28%;
    min-width: 9px; min-height: 9px; border-radius: 999px;
    background: var(--success); box-shadow: 0 0 0 2px var(--surface-card);
  }
  `;
  document.head.appendChild(el);
}

/**
 * Round avatar — image or serif-italic initials, optional accent ring + status dot.
 */
export function Avatar({ src, alt = "", initials, size = "md", ring = false, status = false, className = "", ...props }) {
  const cls = [
    "av-avatar", `av-avatar--${size}`, ring ? "av-avatar--ring" : "", className,
  ].filter(Boolean).join(" ");
  return (
    <span className={cls} {...props}>
      {src ? <img src={src} alt={alt} /> : <span>{initials}</span>}
      {status ? <span className="av-avatar__status" /> : null}
    </span>
  );
}
