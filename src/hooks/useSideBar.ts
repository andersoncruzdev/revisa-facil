import { useContext } from "react";
import { SideBarContext } from "./sideBarContext";

export function useSideBar() {
  const context = useContext(SideBarContext);

  if (!context) {
    throw new Error("useSideBar deve ser usado dentro de SideBarProvider");
  }

  return context;
}
