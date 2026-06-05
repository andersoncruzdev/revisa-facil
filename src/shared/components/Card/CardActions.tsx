import { ReactNode } from "react";

interface CardActionsProps {
  readonly ariaLabel?: string;
  readonly children: ReactNode;
}

export default function CardActions({ ariaLabel, children }: CardActionsProps) {
  return (
    <div aria-label={ariaLabel} className="flex items-center gap-2">
      {children}
    </div>
  );
}
