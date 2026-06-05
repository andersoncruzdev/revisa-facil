import { Pencil, Trash2 } from "lucide-react";
import type { Content, Classroom } from "@types-app/study";
import { formatDateBR } from "@utils/transformDate";
import Badge from "../components/Badge";
import { Card } from "../components/Card/index";
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
    <Card.Root name={`conteúdo ${conteudo.name}`}>
      <div className="flex min-w-0 items-center gap-3">
        <Card.Header>
          <Badge
            color={materia.color}
            ariaLabel={`Cor da matéria ${materia.title}`}
          />
        </Card.Header>
        <div className="min-w-0">
          <Card.Title>{conteudo.name}</Card.Title>
          <Card.Details>
            {materia.title} -- Estudado em {formatDateBR(conteudo.studied)}
          </Card.Details>
        </div>
      </div>
      {hasActions && (
        <Card.Actions ariaLabel={`Ações do conteúdo ${conteudo.name}`}>
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
        </Card.Actions>
      )}
    </Card.Root>
  );
}
