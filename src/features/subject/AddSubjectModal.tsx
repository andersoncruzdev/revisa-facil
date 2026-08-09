import type { FormEvent } from "react";
import { subjectColors } from "@constants/subject-colors";
import { useSubject } from "@hooks/useSubject";
import { useColor } from "@hooks/useColor";
import { Colors } from "@shared/components/Colors";
import { Input } from "@shared/components/Input";
import { Modal } from "@shared/components/Modal";
import type { Subject } from "@types-app/study";

interface AddSubjectModalProps {
  readonly open: boolean;
  readonly onClose: () => void;
  readonly subject?: Subject;
}

export function AddSubjectModal({
  open,
  onClose,
  subject,
}: AddSubjectModalProps) {
  const addSubject = useSubject.add();
  const updateSubject = useSubject.update();
  const { selectedColor, setSelectedColor } = useColor(subject?.color);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    const name = (formData.get("name") as string)?.toString().trim();

    if (!name) return;

    const mutationOptions = {
      onSuccess: () => {
        form.reset();
        setSelectedColor(subjectColors.azul);
        onClose();
      },
    };

    if (subject) {
      updateSubject.mutate(
        {
          subjectId: subject.id,
          data: { name, color: selectedColor },
        },
        mutationOptions,
      );
      return;
    }

    addSubject.mutate(
      { name, color: selectedColor },
      {
        ...mutationOptions,
      },
    );
  };

  const content = (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <Input.Root>
        <Input.TextField
          placeholder="Insira o nome da nova matéria"
          id="subject-name-modal"
          label="Nome da matéria:"
          name="name"
          defaultValue={subject?.name}
          required
          autoFocus
          className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-slate-950 outline-none transition-colors placeholder:text-slate-500 focus:border-blue-700 focus:ring-2 focus:ring-blue-100 motion-reduce:transition-none"
        />
      </Input.Root>
      <Colors selectedColor={selectedColor} onSelectColor={setSelectedColor} />
    </form>
  );

  return (
    <Modal
      title={subject ? "Editar matéria" : "Adicionar matéria"}
      content={content}
      open={open}
      onClose={onClose}
      isSubmitting={addSubject.isPending || updateSubject.isPending}
      submitLabel={subject ? "Salvar alterações" : "Enviar"}
    />
  );
}
