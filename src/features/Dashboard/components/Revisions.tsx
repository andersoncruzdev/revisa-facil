import Info from "@shared/components/Info";
import { ReactNode } from "react";

interface RevisionsProps {
  readonly items: [{
    name: string,
    icon: ReactNode,
    quantity: number
  }];
}

export default function Revisions({ items }: RevisionsProps) {
  return (
    <ul
      aria-label="Resumo de revisões"
      className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
    >
      {items.map((item) => (
        <li key={item.name}>
          <Info name={item.name} icon={item.icon} quantity={item.quantity} />
        </li>
      ))}
    </ul>
  );
}
