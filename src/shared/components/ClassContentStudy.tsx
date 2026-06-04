import { Check } from "lucide-react";
import type { ContentRevision, Classroom, StudyDate } from "@types-app/study";
import { formatDateBR } from "@utils/transformDate";
import Badge from "./Badge";

interface ClassContentStudyProps {
  readonly materia: Classroom;
  readonly conteudo: ContentRevision;
  readonly concluir: () => void;
}

function toDate(date: StudyDate) {
  if (date instanceof Date) {
    return date;
  }

  const [year, month, day] = date.slice(0, 10).split("-").map(Number);

  if (year && month && day) {
    return new Date(year, month - 1, day);
  }

  return new Date(date);
}

function startOfDay(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function getDaysLate(nextReview: StudyDate) {
  const today = startOfDay(new Date());
  const reviewDate = startOfDay(toDate(nextReview));
  const diffInMs = today.getTime() - reviewDate.getTime();
  const diffInDays = Math.floor(diffInMs / 86_400_000);

  return Math.max(diffInDays, 0);
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
    <section
      aria-label={`Card de revisão do conteúdo ${conteudo.name}`}
      className="flex items-center justify-between gap-4 rounded-lg border border-slate-200 bg-white p-4 shadow-sm"
    >
      <div className="flex min-w-0 items-center gap-3">
        <Badge
          color={materia.color}
          ariaLabel={`Cor da matéria ${materia.title}`}
        />
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <p className="font-semibold text-slate-950">{conteudo.name}</p>
            <Badge color="#475569" content={conteudo.tipoRevisao} />
          </div>
          <p className="text-sm text-slate-600">
            {materia.title} -- Próxima revisão em{" "}
            {formatDateBR(conteudo.nextRevision)}
          </p>
          <p
            className={
              daysLate > 0
                ? "text-sm font-medium text-red-600"
                : "text-sm font-medium text-blue-700"
            }
          >
            {status}
          </p>
        </div>
      </div>
      <button
        type="button"
        onClick={concluir}
        aria-label={`Concluir revisão de ${conteudo.name}`}
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-700 text-white hover:bg-blue-800"
      >
        <Check aria-hidden="true" className="h-5 w-5" />
      </button>
    </section>
  );
}
