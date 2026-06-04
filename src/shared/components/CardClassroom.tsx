import { Pencil, Trash2 } from "lucide-react";
import type { Classroom } from "@types-app/study";
import Badge from "./Badge";

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
        <button
          type="button"
          onClick={actions.edit}
          aria-label={`Editar matéria ${materia.title}`}
          className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-600 hover:bg-slate-100 hover:text-slate-950"
        >
          <Pencil aria-hidden="true" className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={actions.delete}
          aria-label={`Excluir matéria ${materia.title}`}
          className="flex h-9 w-9 items-center justify-center rounded-lg text-red-600 hover:bg-red-50"
        >
          <Trash2 aria-hidden="true" className="h-4 w-4" />
        </button>
      </div>
    </section>
  );
}
