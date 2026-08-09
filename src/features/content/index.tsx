import { Button } from "@shared/components/Button";
import { Title } from "@shared/components/Title";
import { useState } from "react";
import { Plus } from "lucide-react";
import AddContentModal from "./AddContent";
import ListContent from "./ListContent";
import { AddClassroomModal } from "@features/classroom/AddClassroomModal";
import { useClassroom } from "@hooks/useClassroom";

export default function ContentPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isClassroomModalOpen, setIsClassroomModalOpen] = useState(false);
  const classrooms = useClassroom.get();
  const hasClassrooms = Boolean(classrooms.data?.length);

  return (
    <section aria-labelledby="content-title">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <Title
          subTitle="Gerencie seus conteúdos"
          title="Conteúdos"
          typeTitle="h1"
        />
        <Button.Root
          type="button"
          onClick={() =>
            hasClassrooms
              ? setIsModalOpen(true)
              : setIsClassroomModalOpen(true)
          }
          className="w-full shrink-0 sm:w-auto"
        >
          <Button.Icon icon={Plus} />
          <Button.Text>
            {hasClassrooms ? "Adicionar conteúdo" : "Adicionar matéria"}
          </Button.Text>
        </Button.Root>
        {isModalOpen && (
          <AddContentModal open onClose={() => setIsModalOpen(false)} />
        )}
      </div>
      <ListContent
        onAddContent={() => setIsModalOpen(true)}
        onAddClassroom={() => setIsClassroomModalOpen(true)}
      />
      {isClassroomModalOpen && (
        <AddClassroomModal
          open
          onClose={() => setIsClassroomModalOpen(false)}
        />
      )}
    </section>
  );
}
