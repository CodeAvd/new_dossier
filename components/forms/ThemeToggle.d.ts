import * as React from "react";

/**
 * Playful sun/moon dark-mode switch. Uncontrolled by default: it sets
 * [data-theme] on <html> and persists to localStorage. Pass `checked` +
 * `onChange` to control it yourself.
 */
export interface ThemeToggleProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onChange"> {
  /** Controlled on/off (dark = true) */
  checked?: boolean;
  /** Fires with the next state on toggle */
  onChange?: (dark: boolean) => void;
}

export function ThemeToggle(props: ThemeToggleProps): JSX.Element;
