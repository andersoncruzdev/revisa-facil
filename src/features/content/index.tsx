import { Button } from "@shared/components/Button";
import { Title } from "@shared/components/Title";
import { useState } from "react";
import { Plus } from "lucide-react";
import AddContentModal from "./AddContent";
import ListContent from "./ListContent";

export default function ContentPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

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
          onClick={() => setIsModalOpen(true)}
          className="w-full shrink-0 sm:w-auto"
        >
          <Button.Icon icon={Plus} />
          <Button.Text>Adicionar conteúdo</Button.Text>
        </Button.Root>
        {isModalOpen && (
          <AddContentModal open onClose={() => setIsModalOpen(false)} />
        )}
      </div>
      <ListContent />
    </section>
  );
}
