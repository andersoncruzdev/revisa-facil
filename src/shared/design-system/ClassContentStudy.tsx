import { Check } from "lucide-react";
import type { ContentRevision, Classroom } from "@types-app/study";
import { formatDateBR } from "@utils/transformDate";
import Badge from "../components/Badge";
import { Card } from "../components/Card/index";
import { Button } from "@shared/components/Button";
import { getDaysLate } from "@shared/utils";

interface ClassContentStudyProps {
  readonly materia: Classroom;
  readonly conteudo: ContentRevision;
  readonly concluir: () => void;
}

export default function ClassContentStudy({
  materia,
  conteudo,
  concluir,
}: ClassContentStudyProps) {
  const daysLate = getDaysLate(conteudo.nextRevision);

  const getLabelDay = (): string => {
    if (daysLate > 0) {
      return `${daysLate} ${daysLate === 1 ? "dia" : "dias"} atrasado`;
    } else {
      return "Revisão para hoje";
    }
  };

  const status = getLabelDay();

  return (
    <Card.Root
      name={`revisão do conteúdo ${conteudo.name}`}
      ariaLabel={`Card de revisão do conteúdo ${conteudo.name}`}
    >
      <div className="flex min-w-0 items-center gap-3">
        <Card.Header>
          <Badge
            color={materia.color}
            ariaLabel={`Cor da matéria ${materia.title}`}
          />
        </Card.Header>
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <Card.Title>{conteudo.name}</Card.Title>
            <Card.Header>
              <Badge color="#475569" content={conteudo.tipoRevisao} />
            </Card.Header>
          </div>
          <Card.Details>
            {materia.title} -- Próxima revisão em{" "}
            {formatDateBR(conteudo.nextRevision)}
          </Card.Details>
          <Card.Footer color={daysLate > 0 ? "red" : "blue"}>
            {status}
          </Card.Footer>
        </div>
      </div>
      <Button.Root
        aria-label={`Concluir revisão de ${conteudo.name}`}
        color="blue"
        onClick={concluir}
        rounded
      >
        <Button.Icon icon={Check} size="24" />
      </Button.Root>
    </Card.Root>
  );
}
