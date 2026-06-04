import { Pencil, Trash2 } from "lucide-react";
import type { Content, Classroom } from "@types-app/study";
import { formatDateBR } from "@utils/transformDate";
import Badge from "./Badge";

interface CardContentProps {
  readonly materia: Classroom;
  readonly conteudo: Content;
  readonly actions?: {
    edit?: () => void;
    delete?: () => void;
  };
}

export default function CardContent({
  materia,
  conteudo,
  actions,
}: CardContentProps) {
  const hasActions = Boolean(actions?.edit || actions?.delete);

  return (
    <section
      aria-label={`Card do conteúdo ${conteudo.name}`}
      className="flex items-center justify-between gap-4 rounded-lg border border-slate-200 bg-white p-4 shadow-sm"
    >
      <div className="flex min-w-0 items-center gap-3">
        <Badge
          color={materia.color}
          ariaLabel={`Cor da matéria ${materia.title}`}
        />
        <div>
          <p className="font-semibold text-slate-950">{conteudo.name}</p>
          <p className="text-sm text-slate-600">
            {materia.title} -- Estudado em {formatDateBR(conteudo.studied)}
          </p>
        </div>
      </div>
      {hasActions && (
        <div
          aria-label={`Ações do conteúdo ${conteudo.name}`}
          className="flex items-center gap-2"
        >
          {actions?.edit && (
            <button
              type="button"
              onClick={actions.edit}
              aria-label={`Editar conteúdo ${conteudo.name}`}
              className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-600 hover:bg-slate-100 hover:text-slate-950"
            >
              <Pencil aria-hidden="true" className="h-4 w-4" />
            </button>
          )}
          {actions?.delete && (
            <button
              type="button"
              onClick={actions.delete}
              aria-label={`Excluir conteúdo ${conteudo.name}`}
              className="flex h-9 w-9 items-center justify-center rounded-lg text-red-600 hover:bg-red-50"
            >
              <Trash2 aria-hidden="true" className="h-4 w-4" />
            </button>
          )}
        </div>
      )}
    </section>
  );
}
