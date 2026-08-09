"use client";

import { useClassroom } from "@hooks/useClassroom";
import { Button } from "@shared/components/Button";

import { Pencil, Trash } from "lucide-react";
import { useState } from "react";
import type { Classroom } from "@types-app/study";
import { AddClassroomModal } from "./AddClassroomModal";
import { ConfirmDialog } from "@shared/components/ConfirmDialog";

export default function ListClassroom() {
  const [classroomToEdit, setClassroomToEdit] = useState<Classroom>();
  const [classroomToDelete, setClassroomToDelete] = useState<Classroom>();
  const getClassroom = useClassroom.get();
  const deleteClassroom = useClassroom.delete();

  const confirmDelete = () => {
    if (!classroomToDelete) return;

    deleteClassroom.mutate({ idClassroom: classroomToDelete.id });
    setClassroomToDelete(undefined);
  };

  if (getClassroom.data?.length) {
    return (
      <section aria-label="lista de matérias" className="mt-6">
        <div className="flex flex-col gap-4">
          {getClassroom.data.map((classroom) => (
            <div
              aria-label={`Divisão da matéria: ${classroom.name}`}
              key={`${classroom.id}${classroom.color}${classroom.name}`}
              className="flex items-center justify-between gap-4 rounded-xl border border-stone-300 bg-white py-6 pl-8 pr-6 sm:py-7 sm:pl-9 sm:pr-7"
              style={{ boxShadow: `inset 6px 0 0 ${classroom.color}` }}
            >
              <div className="flex gap-2 items-center">
                <p className="  font-semibold leading-tight text-blue-950">
                  {classroom.name.toUpperCase()}
                </p>
              </div>
              <div className="flex shrink-0 gap-2">
                <Button.Root
                  type="button"
                  aria-label={`Editar matéria ${classroom.name}`}
                  color="slate"
                  rounded
                  onClick={() => setClassroomToEdit(classroom)}
                >
                  <Button.Icon icon={Pencil} />
                </Button.Root>
                <Button.Root
                  type="button"
                  aria-label={`Excluir matéria ${classroom.name}`}
                  color="red"
                  rounded
                  onClick={() => setClassroomToDelete(classroom)}
                >
                  <Button.Icon icon={Trash} />
                </Button.Root>
              </div>
            </div>
          ))}
        </div>
        {classroomToEdit && (
          <AddClassroomModal
            open
            classroom={classroomToEdit}
            onClose={() => setClassroomToEdit(undefined)}
          />
        )}
        {classroomToDelete && (
          <ConfirmDialog
            open
            title="Excluir matéria?"
            description={`Todos os conteúdos vinculados a ${classroomToDelete.name} também serão excluídos.`}
            onCancel={() => setClassroomToDelete(undefined)}
            onConfirm={confirmDelete}
          />
        )}
      </section>
    );
  }

  return (
    <section aria-label="lista de matérias" className="mt-6">
      <p className="text-zinc-600 font-bold">Sem matérias cadastradas</p>
    </section>
  );
}
