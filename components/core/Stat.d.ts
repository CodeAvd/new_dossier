import * as React from "react";

/**
 * Evidence-first metric display: large serif value with an italic unit accent
 * and a mono uppercase label. Use for proof points — recall, sharpe, latency, counts.
 */
export interface StatProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The number / headline value, e.g. "98.2" */
  value: React.ReactNode;
  /** Italic accent unit, e.g. "%" or "ms" */
  unit?: React.ReactNode;
  /** Mono uppercase caption under the value */
  label?: React.ReactNode;
  /** Optional secondary line */
  sub?: React.ReactNode;
  /** @default "md" */
  size?: "sm" | "md" | "lg";
}

export function Stat(props: StatProps): JSX.Element;
