import * as React from "react";

export type TagTone =
  | "accent" | "neutral" | "outline" | "spark"
  | "blush" | "honey" | "sage" | "sky" | "mauve"
  | "success" | "warning" | "danger" | "info";

/**
 * Mono pill chip for tech-stack labels, evidence metrics, categories and statuses.
 */
export interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Color tone. @default "accent" */
  tone?: TagTone;
  /** Show a leading status dot. @default false */
  dot?: boolean;
  children?: React.ReactNode;
}

export function Tag(props: TagProps): JSX.Element;
