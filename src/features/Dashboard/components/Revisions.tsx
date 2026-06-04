import type { CardProps } from "@shared/components/Card";
import Card from "@shared/components/Card";

interface RevisionsProps {
  readonly items: readonly CardProps[];
}

export default function Revisions({ items }: RevisionsProps) {
  return (
    <ul
      aria-label="Resumo de revisões"
      className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
    >
      {items.map((item) => (
        <li key={item.name}>
          <Card name={item.name} icon={item.icon} quantity={item.quantity} />
        </li>
      ))}
    </ul>
  );
}
