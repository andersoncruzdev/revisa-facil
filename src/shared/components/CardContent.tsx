import { Pencil, Trash2 } from "lucide-react";
import type { Content, Classroom } from "@types-app/study";
import { formatDateBR } from "@utils/transformDate";
import Badge from "./Badge";
import { Button } from "@shared/components/Button";

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
            <Button.Root
              aria-label={`Editar conteúdo ${conteudo.name}`}
              color="slate"
              onClick={actions.edit}
            >
              <Button.Icon icon={Pencil} size="15" />
            </Button.Root>
          )}
          {actions?.delete && (
            <Button.Root
              aria-label={`Excluir conteúdo ${conteudo.name}`}
              color="red"
              onClick={actions.delete}
            >
              <Button.Icon icon={Trash2} size="15" />
            </Button.Root>
          )}
        </div>
      )}
    </section>
  );
}
