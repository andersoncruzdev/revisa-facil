import type { ReactNode } from "react";

interface CardHeaderProps {
  readonly children: ReactNode;
}

export default function CardHeader({ children }: CardHeaderProps) {
  return <div className="flex shrink-0 items-center gap-2">{children}</div>;
}
