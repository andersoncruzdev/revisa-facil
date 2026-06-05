import type { ReactNode } from "react";
interface ButtonTextProps {
  readonly children: ReactNode;
  readonly size?: TextSize;
}
type TextSize = "sm" | "md" | "lg";

export default function ButtonText({ children, size = "sm" }: ButtonTextProps) {
  return <span className={`text-${size}`}>{children}</span>;
}
