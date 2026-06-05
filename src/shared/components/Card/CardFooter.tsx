import type { ReactNode } from "react";

interface CardFooterProps {
  readonly children: ReactNode;
  readonly color?: CardFooterColor;
}

type CardFooterColor = keyof typeof cardFooterColorClass;

const cardFooterColorClass = {
  blue: "text-blue-700",
  red: "text-red-600",
};

export default function CardFooter({
  children,
  color = "blue",
}: CardFooterProps) {
  return (
    <p className={`text-sm font-medium ${cardFooterColorClass[color]}`}>
      {children}
    </p>
  );
}
