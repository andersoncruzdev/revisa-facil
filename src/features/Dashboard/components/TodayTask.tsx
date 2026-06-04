import ClassContentStudy from "@shared/components/ClassContentStudy";
import Title from "@shared/components/Title";
import type { Classroom, ContentRevision } from "@types-app/study";

interface TodayTaskItem {
  readonly materia: Classroom;
  readonly conteudo: ContentRevision;
}

interface TodayTaskProps {
  readonly items: readonly TodayTaskItem[];
  readonly onCompleteRevision: (item: TodayTaskItem) => void;
}

export default function TodayTask({
  items,
  onCompleteRevision,
}: TodayTaskProps) {
  return (
    <section aria-label="Revisões de hoje" className="flex flex-col gap-4">
      <Title
        typeTitle="h2"
        title="Para revisar hoje"
        subTitle="Marque como concluída ao terminar"
      />

      {items.length > 0 ? (
        <ul className="flex flex-col gap-3">
          {items.map((item) => (
            <li key={`${item.materia.id}-${item.conteudo.id}`}>
              <ClassContentStudy
                materia={item.materia}
                conteudo={item.conteudo}
                concluir={() => onCompleteRevision(item)}
              />
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-slate-600">Nenhuma revisão para hoje.</p>
      )}
    </section>
  );
}
