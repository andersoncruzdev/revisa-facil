import { ReactNode } from "react";

interface CardRootProps {
  readonly name: string;
  readonly children: ReactNode;
  readonly ariaLabel?: string;
}

export default function CardRoot({ name, children, ariaLabel }: CardRootProps) {
  return (
    <section
      aria-label={ariaLabel ?? `Card do ${name}`}
      className="flex items-center justify-between gap-4 rounded-lg border border-slate-200 bg-white p-4 shadow-sm"
    >
      {children}
    </section>
  );
}
