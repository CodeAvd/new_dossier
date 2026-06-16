import * as React from "react";

/**
 * Soft warm surface container — generous rounding, warm-tinted shadow.
 * Compose project cards, panels, and wells from this.
 */
export interface CardProps extends React.HTMLAttributes<HTMLElement> {
  /** Shadow / surface treatment. @default "default" */
  elevation?: "flat" | "default" | "raised" | "sunken" | "dashed" | "holo";
  /** Inner padding. @default "md" */
  padding?: "none" | "sm" | "md" | "lg";
  /** Adds pointer + hover lift. @default false */
  interactive?: boolean;
  /** Render element. @default "div" */
  as?: keyof JSX.IntrinsicElements;
  children?: React.ReactNode;
}

export function Card(props: CardProps): JSX.Element;
