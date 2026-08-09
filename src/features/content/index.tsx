import { Button } from "@shared/components/Button";
import { Title } from "@shared/components/Title";
import { useState } from "react";
import { Plus } from "lucide-react";
import AddContentModal from "./AddContent";
import ListContent from "./ListContent";
import { AddSubjectModal } from "@features/subject/AddSubjectModal";
import { useSubject } from "@hooks/useSubject";

export default function ContentPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubjectModalOpen, setIsSubjectModalOpen] = useState(false);
  const subjects = useSubject.get();
  const hasSubjects = Boolean(subjects.data?.length);

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
            hasSubjects
              ? setIsModalOpen(true)
              : setIsSubjectModalOpen(true)
          }
          className="w-full shrink-0 sm:w-auto"
        >
          <Button.Icon icon={Plus} />
          <Button.Text>
            {hasSubjects ? "Adicionar conteúdo" : "Adicionar matéria"}
          </Button.Text>
        </Button.Root>
        {isModalOpen && (
          <AddContentModal open onClose={() => setIsModalOpen(false)} />
        )}
      </div>
      <ListContent
        onAddContent={() => setIsModalOpen(true)}
        onAddSubject={() => setIsSubjectModalOpen(true)}
      />
      {isSubjectModalOpen && (
        <AddSubjectModal
          open
          onClose={() => setIsSubjectModalOpen(false)}
        />
      )}
    </section>
  );
}
