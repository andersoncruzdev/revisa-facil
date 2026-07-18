import { Title } from "@shared/components/Title";
import ListClassroom from "@features/classroom/ListClassroom";

export default function ClassroomPage() {
  return (
    <section className="flex flex-col gap-2" aria-labelledby="classroom-page-title">
      <div id="classroom-page-title">
        <Title
          title="Matérias"
          subTitle="Organize as matérias do seu ciclo de estudos."
          typeTitle="h1"
        />
      </div>
      <ListClassroom />
    </section>
  );
}
