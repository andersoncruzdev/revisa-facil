import { useState } from "react";
import { Plus } from "lucide-react";
import { Title } from "@shared/components/Title";
import { Button } from "@shared/components/Button";
import ListSubject from "@features/subject/ListSubject";
import { AddSubjectModal } from "@features/subject/AddSubjectModal";

export default function SubjectPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="flex flex-col gap-2" aria-label="Gerenciamento de matérias">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <Title
          title="Matérias"
          subTitle="Organize as matérias do seu ciclo de estudos."
          typeTitle="h1"
        />
        <Button.Root
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="w-full shrink-0 sm:w-auto"
        >
          <Button.Icon icon={Plus} />
          <Button.Text>Adicionar matéria</Button.Text>
        </Button.Root>
      </div>
      <ListSubject onAddSubject={() => setIsModalOpen(true)} />
      {isModalOpen && (
        <AddSubjectModal
          open
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </section>
  );
}
