import { Check } from "lucide-react";
import type { Content, Classroom } from "@types-app/study";
import Badge from "../components/Badge";
import { Card } from "../components/Card/index";
import { Button } from "@shared/components/Button";
import { actionsDate } from "@utils/transform-date";

type ClassContentStudyMateria = Classroom & {
  readonly title?: string;
};

type ClassContentStudyConteudo = Content & {
  readonly name?: string;
  readonly tipoRevisao?: string;
};

interface ClassContentStudyProps {
  readonly materia: ClassContentStudyMateria;
  readonly conteudo: ClassContentStudyConteudo;
  readonly concluir: () => void;
}

export default function ClassContentStudy({
  materia,
  conteudo,
  concluir,
}: ClassContentStudyProps) {
  const materiaName = materia.title ?? materia.name;
  const conteudoName = conteudo.name ?? conteudo.content;
  const revisionDiffInDays = actionsDate.diffInDays(
    new Date(),
    conteudo.nextRevision,
  );
  const daysLate =
    revisionDiffInDays !== null && revisionDiffInDays < 0
      ? Math.abs(revisionDiffInDays)
      : 0;
  const nextRevisionDate =
    actionsDate.string(conteudo.nextRevision)?.toLocaleDateString("pt-BR") ??
    conteudo.nextRevision;

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
      name={`revisão do conteúdo ${conteudoName}`}
      ariaLabel={`Card de revisão do conteúdo ${conteudoName}`}
    >
      <div className="flex min-w-0 items-center gap-3">
        <Card.Header>
          <Badge
            color={materia.color}
            ariaLabel={`Cor da matéria ${materiaName}`}
          />
        </Card.Header>
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <Card.Title>{conteudoName}</Card.Title>
            {conteudo.tipoRevisao && (
              <Card.Header>
                <Badge color="#475569" content={conteudo.tipoRevisao} />
              </Card.Header>
            )}
          </div>
          <Card.Details>
            {materiaName} -- Próxima revisão em {nextRevisionDate}
          </Card.Details>
          <Card.Footer color={daysLate > 0 ? "red" : "blue"}>
            {status}
          </Card.Footer>
        </div>
      </div>
      <Button.Root
        aria-label={`Concluir revisão de ${conteudoName}`}
        color="blue"
        onClick={concluir}
        rounded
      >
        <Button.Icon icon={Check} size="24" />
      </Button.Root>
    </Card.Root>
  );
}
