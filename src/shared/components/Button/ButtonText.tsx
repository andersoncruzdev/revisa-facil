import type { ComponentProps, ReactNode } from "react";
interface ButtonTextProps extends Readonly<ComponentProps<"span">> {
  readonly children: ReactNode;
  readonly size?: TextSize;
}
type TextSize = "sm" | "md" | "lg";

export default function ButtonText({
  children,
  size = "sm",
  className = "",
  ...props
}: ButtonTextProps) {
  return (
    <span className={`text-${size} ${className}`} {...props}>
      {children}
    </span>
  );
}
