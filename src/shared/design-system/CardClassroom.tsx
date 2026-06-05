import { Pencil, Trash2 } from "lucide-react";
import type { Classroom } from "@types-app/study";
import Badge from "../components/Badge";
import { Card } from "../components/Card/index";
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
    <Card.Root
      name={`matéria ${materia.title}`}
      ariaLabel={`Card da matéria ${materia.title}`}
    >
      <div className="flex min-w-0 items-center gap-3">
        <Card.Header>
          <Badge
            color={materia.color}
            ariaLabel={`Cor da matéria ${materia.title}`}
          />
        </Card.Header>
        <div className="min-w-0">
          <Card.Title>{materia.title}</Card.Title>
          <Card.Details>
            {materia.amountContent} {contentLabel}
          </Card.Details>
        </div>
      </div>
      <Card.Actions ariaLabel={`Ações da matéria ${materia.title}`}>
        <Button.Root
          aria-label={`Editar matéria ${materia.title}`}
          color="slate"
          onClick={actions.edit}
        >
          <Button.Icon icon={Pencil} size="15" />
        </Button.Root>
        <Button.Root
          aria-label={`Excluir matéria ${materia.title}`}
          color="red"
          onClick={actions.delete}
        >
          <Button.Icon icon={Trash2} size="15" />
        </Button.Root>
      </Card.Actions>
    </Card.Root>
  );
}
