import type { FormEvent } from "react";
import { classroomColors } from "@constants/classroom-colors";
import { useClassroom } from "@hooks/useClassroom";
import { useColor } from "@hooks/useColor";
import { Colors } from "@shared/components/Colors";
import { Input } from "@shared/components/Input";
import { Modal } from "@shared/components/Modal";

interface AddClassroomModalProps {
  readonly open: boolean;
  readonly onClose: () => void;
}

export function AddClassroomModal({ open, onClose }: AddClassroomModalProps) {
  const addClassroom = useClassroom.add();
  const { selectedColor, setSelectedColor } = useColor();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = formData.get("name")?.toString().trim();

    if (!name) return;

    addClassroom.mutate(
      { name, color: selectedColor },
      {
        onSuccess: () => {
          form.reset();
          setSelectedColor(classroomColors.azul);
          onClose();
        },
      },
    );
  };

  const content = (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <Input.Root>
        <Input.TextField
          placeholder="Insira o nome da nova matéria"
          id="classroom-name-modal"
          label="Nome da matéria:"
          name="name"
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
      title="Adicionar matéria"
      content={content}
      open={open}
      onClose={onClose}
      isSubmitting={addClassroom.isPending}
    />
  );
}
 