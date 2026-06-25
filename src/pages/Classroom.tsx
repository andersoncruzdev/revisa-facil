import { Title } from "@shared/components/Title";

import CreateClassroom from "@shared/design-system/CreateClassroom";
import ListClassroom from "@shared/design-system/ListClassroom";

export default function ClassroomPage() {
  return (
    <section className="">
      <Title
        title="Matérias"
        subTitle="Acompanhe suas matérias"
        typeTitle="h1"
      />
      <CreateClassroom />
      <ListClassroom />
    </section>
  );
}
