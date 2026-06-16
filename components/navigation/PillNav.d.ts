import * as React from "react";

export interface PillNavItem {
  id: string;
  label: React.ReactNode;
}

/**
 * Segmented pill navigation with a springy sliding indicator.
 * Use for section nav, view switchers, or filter toggles.
 */
export interface PillNavProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  /** Items as strings or {id,label} objects */
  items: (string | PillNavItem)[];
  /** Controlled active id */
  value?: string;
  /** Uncontrolled initial id */
  defaultValue?: string;
  /** Fires with the selected id */
  onChange?: (id: string) => void;
}

export function PillNav(props: PillNavProps): JSX.Element;
