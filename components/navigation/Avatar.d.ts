import * as React from "react";

/**
 * Round avatar — shows an image, or serif-italic initials as a fallback.
 * Optional accent ring and online status dot.
 */
export interface AvatarProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Image URL; falls back to initials if absent */
  src?: string;
  alt?: string;
  /** Fallback initials, e.g. "ga" */
  initials?: React.ReactNode;
  /** @default "md" */
  size?: "sm" | "md" | "lg" | "xl";
  /** Accent ring around the avatar */
  ring?: boolean;
  /** Show a green status dot */
  status?: boolean;
}

export function Avatar(props: AvatarProps): JSX.Element;
