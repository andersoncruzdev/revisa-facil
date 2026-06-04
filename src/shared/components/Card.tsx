import type { ReactNode } from "react";

export interface CardProps {
  readonly icon: ReactNode;
  readonly name: string;
  readonly quantity: number;
}

export default function Card({ icon, name, quantity }: CardProps) {
  return (
    <article className="flex h-full flex-col justify-between rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <p className="text-sm font-medium text-slate-600">{name}</p>
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-700 [&>svg]:h-5 [&>svg]:w-5">
          {icon}
        </span>
      </div>
      <p className="mt-4 text-3xl font-bold leading-none text-slate-950">
        {quantity}
      </p>
    </article>
  );
}
