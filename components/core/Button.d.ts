import * as React from "react";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "outline";
export type ButtonSize = "sm" | "md" | "lg";

/**
 * Primary action button — soft warm pill with a springy hover lift.
 * Use for any clickable action; switch `variant` by emphasis and `as="a"` for links.
 */
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual emphasis. @default "primary" */
  variant?: ButtonVariant;
  /** @default "md" */
  size?: ButtonSize;
  /** Icon node rendered before the label */
  iconLeft?: React.ReactNode;
  /** Icon node rendered after the label */
  iconRight?: React.ReactNode;
  /** Render as a different element, e.g. "a". @default "button" */
  as?: keyof JSX.IntrinsicElements;
  children?: React.ReactNode;
}

export function Button(props: ButtonProps): JSX.Element;
