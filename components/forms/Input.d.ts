import * as React from "react";

/**
 * Warm text field — mono label, soft rounded well, accent focus glow.
 * Set `multiline` for a textarea. All native input/textarea props pass through.
 */
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement & HTMLTextAreaElement> {
  /** Mono uppercase label above the field */
  label?: React.ReactNode;
  /** Helper / error text below the field */
  hint?: React.ReactNode;
  /** Error styling */
  error?: boolean;
  /** Leading icon node (single-line only) */
  iconLeft?: React.ReactNode;
  /** Render a textarea. @default false */
  multiline?: boolean;
}

export function Input(props: InputProps): JSX.Element;
