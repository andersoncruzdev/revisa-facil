import { Pencil, Trash2 } from "lucide-react";
import type { Content, Classroom } from "@types-app/study";
import Badge from "../components/Badge";
import { Card } from "../components/Card/index";
import { Button } from "@shared/components/Button";
import { actionsDate } from "@utils/transform-date";

type CardContentMateria = Classroom & {
  readonly title?: string;
};

type CardContentConteudo = Content & {
  readonly name?: string;
};

interface CardContentProps {
  readonly materia: CardContentMateria;
  readonly conteudo: CardContentConteudo;
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
  const materiaName = materia.title ?? materia.name;
  const conteudoName = conteudo.name ?? conteudo.content;
  const studiedDate =
    actionsDate.string(conteudo.studied)?.toLocaleDateString("pt-BR") ??
    conteudo.studied;
  const hasActions = Boolean(actions?.edit || actions?.delete);

  return (
    <Card.Root name={`conteúdo ${conteudoName}`}>
      <div className="flex min-w-0 items-center gap-3">
        <Card.Header>
          <Badge
            color={materia.color}
            ariaLabel={`Cor da matéria ${materiaName}`}
          />
        </Card.Header>
        <div className="min-w-0">
          <Card.Title>{conteudoName}</Card.Title>
          <Card.Details>
            {materiaName} -- Estudado em {studiedDate}
          </Card.Details>
        </div>
      </div>
      {hasActions && (
        <Card.Actions ariaLabel={`Ações do conteúdo ${conteudoName}`}>
          {actions?.edit && (
            <Button.Root
              aria-label={`Editar conteúdo ${conteudoName}`}
              color="slate"
              onClick={actions.edit}
            >
              <Button.Icon icon={Pencil} size="15" />
            </Button.Root>
          )}
          {actions?.delete && (
            <Button.Root
              aria-label={`Excluir conteúdo ${conteudoName}`}
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
