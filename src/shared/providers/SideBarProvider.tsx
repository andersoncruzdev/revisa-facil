import { type ReactNode, useMemo, useState } from "react";
import { SideBarContext } from "@hooks/sideBarContext";

interface SideBarProviderProps {
  readonly children: ReactNode;
  readonly defaultActiveHref?: string;
}

export function SideBarProvider({
  children,
  defaultActiveHref = "/",
}: SideBarProviderProps) {
  const [activeHref, setActiveHref] = useState(defaultActiveHref);
  const [expanded, setExpanded] = useState(true);

  const value = useMemo(
    () => ({
      activeHref,
      expanded,
      setActiveHref,
      toggleExpanded: () => setExpanded((current) => !current),
    }),
    [activeHref, expanded],
  );

  return (
    <SideBarContext.Provider value={value}>{children}</SideBarContext.Provider>
  );
}
