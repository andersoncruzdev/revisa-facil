import { Pencil, Trash2 } from "lucide-react";
import type { Classroom } from "@types-app/study";
import Badge from "./Badge";
import { Button } from "@shared/components/Button";

interface CardClassroomProps {
  readonly materia: Classroom;
  readonly actions: {
    edit: () => void;
    delete: () => void;
  };
}

export default function CardClassroom({
  materia,
  actions,
}: CardClassroomProps) {
  const contentLabel = materia.amountContent === 1 ? "conteúdo" : "conteúdos";

  return (
    <section
      aria-label={`Card da matéria ${materia.title}`}
      className="flex items-center justify-between gap-4 rounded-lg border border-slate-200 bg-white p-4 shadow-sm"
    >
      <div className="flex min-w-0 items-center gap-3">
        <Badge
          color={materia.color}
          ariaLabel={`Cor da matéria ${materia.title}`}
        />
        <div>
          <p className="font-semibold text-slate-950">{materia.title}</p>
          <p className="text-sm text-slate-600">
            {materia.amountContent} {contentLabel}
          </p>
        </div>
      </div>
      <div
        aria-label={`Ações da matéria ${materia.title}`}
        className="flex items-center gap-2"
      >
        <Button.Root
          aria-label={`Concluir revisão de ${materia.title}`}
          color="slate"
          onClick={actions.edit}
        >
          <Button.Icon icon={Pencil} size="15" />
        </Button.Root>
        <Button.Root
          aria-label={`Concluir revisão de ${materia.title}`}
          color="red"
          onClick={actions.edit}
        >
          <Button.Icon icon={Trash2} size="15" />
        </Button.Root>
      </div>
    </section>
  );
}
