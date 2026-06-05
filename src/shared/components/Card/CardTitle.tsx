import type { ReactNode } from "react";

interface CardTitleProps {
  readonly children: ReactNode;
}

export default function CardTitle({ children }: CardTitleProps) {
  return <p className="font-semibold text-slate-950">{children}</p>;
}
