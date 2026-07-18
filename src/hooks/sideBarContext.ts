import { createContext } from "react";

export interface SideBarContextValue {
  readonly activeHref: string;
  readonly expanded: boolean;
  readonly setActiveHref: (href: string) => void;
  readonly toggleExpanded: () => void;
}

export const SideBarContext = createContext<SideBarContextValue | null>(null);
