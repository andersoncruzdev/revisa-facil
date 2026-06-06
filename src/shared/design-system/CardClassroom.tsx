import { Pencil, Trash2 } from "lucide-react";
import type { Classroom } from "@types-app/study";
import Badge from "../components/Badge";
import { Card } from "../components/Card/index";
import { Button } from "@shared/components/Button";

type CardClassroomMateria = Classroom & {
  readonly title?: string;
  readonly amountContent?: number;
};

interface CardClassroomProps {
  readonly materia: CardClassroomMateria;
  readonly actions: {
    edit: () => void;
    delete: () => void;
  };
}

export default function CardClassroom({
  materia,
  actions,
}: CardClassroomProps) {
  const materiaName = materia.title ?? materia.name;
  const amountContent = materia.amountContent ?? 0;
  const contentLabel = amountContent === 1 ? "conteúdo" : "conteúdos";

  return (
    <Card.Root
      name={`matéria ${materiaName}`}
      ariaLabel={`Card da matéria ${materiaName}`}
    >
      <div className="flex min-w-0 items-center gap-3">
        <Card.Header>
          <Badge
            color={materia.color}
            ariaLabel={`Cor da matéria ${materiaName}`}
          />
        </Card.Header>
        <div className="min-w-0">
          <Card.Title>{materiaName}</Card.Title>
          <Card.Details>
            {amountContent} {contentLabel}
          </Card.Details>
        </div>
      </div>
      <Card.Actions ariaLabel={`Ações da matéria ${materiaName}`}>
        <Button.Root
          aria-label={`Editar matéria ${materiaName}`}
          color="slate"
          onClick={actions.edit}
        >
          <Button.Icon icon={Pencil} size="15" />
        </Button.Root>
        <Button.Root
          aria-label={`Excluir matéria ${materiaName}`}
          color="red"
          onClick={actions.delete}
        >
          <Button.Icon icon={Trash2} size="15" />
        </Button.Root>
      </Card.Actions>
    </Card.Root>
  );
}
