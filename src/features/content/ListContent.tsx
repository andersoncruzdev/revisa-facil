import { useClassroom } from "@hooks/useClassroom";
import { useContent } from "@hooks/useContent";
import { Button } from "@shared/components/Button";
import { Pencil, Trash } from "lucide-react";
import { useState } from "react";
import type { Content } from "@types-app/study";
import AddContentModal from "./AddContent";
import { ConfirmDialog } from "@shared/components/ConfirmDialog";

const fallbackShadowColor = "#a1a1aa";

export default function ListContent() {
  const [contentToEdit, setContentToEdit] = useState<Content>();
  const [contentToDelete, setContentToDelete] = useState<Content>();
  const getContent = useContent.get();
  const deleteContent = useContent.delete();
  const getClassroom = useClassroom.get();

  const confirmDelete = () => {
    if (!contentToDelete) return;

    deleteContent.mutate({ idContent: contentToDelete.id });
    setContentToDelete(undefined);
  };

  if (getContent.data?.length) {
    return (
      <section aria-label="lista de conteúdos" className="mt-6">
        <div className="flex flex-col gap-4">
          {getContent.data.map((content) => {
            const classroom = getClassroom.data?.find(
              ({ id }) => id === content.idClassroom,
            );
            const shadowColor = classroom?.color ?? fallbackShadowColor;

            return (
              <article
                aria-label={`Divisão do conteúdo: ${content.content}`}
                key={content.id}
                className="flex items-center justify-between gap-4 rounded-xl border border-stone-300 bg-white py-6 pl-8 pr-6 sm:py-7 sm:pl-9 sm:pr-7"
                style={{ boxShadow: `inset 6px 0 0 ${shadowColor}` }}
              >
                <div className="min-w-0">
                  <p className="wrap-break-word font-semibold leading-tight text-blue-950">
                    {content.content.toUpperCase()}
                  </p>
                  {classroom && (
                    <p className="mt-1 text-sm font-medium text-zinc-600">
                      {classroom.name.toUpperCase()}
                    </p>
                  )}
                </div>
                <div className="flex shrink-0 gap-2">
                  <Button.Root
                    type="button"
                    aria-label={`Editar conteúdo ${content.content}`}
                    color="slate"
                    rounded
                    onClick={() => setContentToEdit(content)}
                  >
                    <Button.Icon icon={Pencil} />
                  </Button.Root>
                  <Button.Root
                    type="button"
                    aria-label={`Excluir conteúdo ${content.content}`}
                    color="red"
                    rounded
                    onClick={() => setContentToDelete(content)}
                  >
                    <Button.Icon icon={Trash} />
                  </Button.Root>
                </div>
              </article>
            );
          })}
        </div>
        {contentToEdit && (
          <AddContentModal
            open
            contentToEdit={contentToEdit}
            onClose={() => setContentToEdit(undefined)}
          />
        )}
        {contentToDelete && (
          <ConfirmDialog
            open
            title="Excluir conteúdo?"
            description={`O conteúdo ${contentToDelete.content} será excluído permanentemente. Esta ação não pode ser desfeita.`}
            onCancel={() => setContentToDelete(undefined)}
            onConfirm={confirmDelete}
          />
        )}
      </section>
    );
  }

  return (
    <section aria-label="lista de conteúdos" className="mt-6">
      <p className="font-bold text-zinc-600">Sem conteúdos cadastrados</p>
    </section>
  );
}
