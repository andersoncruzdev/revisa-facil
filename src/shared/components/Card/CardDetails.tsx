import type { ReactNode } from "react";

interface CardDetailsProps {
  readonly children: ReactNode;
}

export default function CardDetails({ children }: CardDetailsProps) {
  return <p className="text-sm text-slate-600">{children}</p>;
}
