import type { FormEvent } from "react";
import { classroomColors } from "@constants/classroom-colors";
import { useClassroom } from "@hooks/useClassroom";
import { useColor } from "@hooks/useColor";
import { Colors } from "@shared/components/Colors";
import { Input } from "@shared/components/Input";
import { Modal } from "@shared/components/Modal";
import type { Classroom } from "@types-app/study";

interface AddClassroomModalProps {
  readonly open: boolean;
  readonly onClose: () => void;
  readonly classroom?: Classroom;
}

export function AddClassroomModal({
  open,
  onClose,
  classroom,
}: AddClassroomModalProps) {
  const addClassroom = useClassroom.add();
  const updateClassroom = useClassroom.update();
  const { selectedColor, setSelectedColor } = useColor(classroom?.color);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    const name = (formData.get("name") as string)?.toString().trim();

    if (!name) return;

    const mutationOptions = {
      onSuccess: () => {
        form.reset();
        setSelectedColor(classroomColors.azul);
        onClose();
      },
    };

    if (classroom) {
      updateClassroom.mutate(
        {
          idClassroom: classroom.id,
          data: { name, color: selectedColor },
        },
        mutationOptions,
      );
      return;
    }

    addClassroom.mutate(
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
          id="classroom-name-modal"
          label="Nome da matéria:"
          name="name"
          defaultValue={classroom?.name}
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
      title={classroom ? "Editar matéria" : "Adicionar matéria"}
      content={content}
      open={open}
      onClose={onClose}
      isSubmitting={addClassroom.isPending || updateClassroom.isPending}
      submitLabel={classroom ? "Salvar alterações" : "Enviar"}
    />
  );
}
