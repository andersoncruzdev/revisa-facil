import { useClassroom } from "@hooks/useClassroom";
import { useContent } from "@hooks/useContent";
import { Input } from "@shared/components/Input";
import { Modal } from "@shared/components/Modal";
import { actionsDate } from "@utils/transform-date";
import { FormEvent } from "react";

interface AddContentModalProps {
  readonly open: boolean;
  readonly onClose: () => void;
}

export default function AddContentModal({
  open,
  onClose,
}: AddContentModalProps) {
  const addContent = useContent.add();
  const getClassroom = useClassroom.get();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    const classroomId = Number(formData.get("classroom"));
    const content = (formData.get("content") as string).trim();

    if (!classroomId || !content) return;

    const today = new Date();

    addContent.mutate(
      {
        idClassroom: classroomId,
        data: {
          content,
          studied: actionsDate.format(today),
          nextRevision: actionsDate.addDays(today, 6),
        },
      },
      {
        onSuccess: () => {
          form.reset();
          onClose();
        },
      },
    );
  };

  const classroomUncolor = getClassroom.data?.map(
    ({ color, ...resto }) => resto,
  );

  const content = (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <Input.Root>
        <Input.TextField
          placeholder="Insira o nome do conteúdo"
          id="content-name-content"
          label="Nome do conteúdo:"
          name="content"
          required
          autoFocus
          className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-slate-950 outline-none transition-colors placeholder:text-slate-500 focus:border-blue-700 focus:ring-2 focus:ring-blue-100 motion-reduce:transition-none"
        />
        <Input.Selected
          id="classroom-name-classroom"
          label="Nome da matéria:"
          name="classroom"
          items={classroomUncolor}
          required
          autoFocus
          className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-slate-950 outline-none transition-colors placeholder:text-slate-500 focus:border-blue-700 focus:ring-2 focus:ring-blue-100 motion-reduce:transition-none"
        />
      </Input.Root>
    </form>
  );
  return (
    <Modal
      title="Adicionar conteúdo"
      content={content}
      open={open}
      onClose={onClose}
      isSubmitting={addContent.isPending}
    />
  );
}
