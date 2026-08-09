"use client";

import { useSubject } from "@hooks/useSubject";
import { Button } from "@shared/components/Button";

import { Pencil, Plus, Trash } from "lucide-react";
import { useState } from "react";
import type { Subject } from "@types-app/study";
import { AddSubjectModal } from "./AddSubjectModal";
import { ConfirmDialog } from "@shared/components/ConfirmDialog";

interface ListSubjectProps {
  readonly onAddSubject?: () => void;
}

export default function ListSubject({
  onAddSubject,
}: ListSubjectProps) {
  const [subjectToEdit, setSubjectToEdit] = useState<Subject>();
  const [subjectToDelete, setSubjectToDelete] = useState<Subject>();
  const getSubject = useSubject.get();
  const deleteSubject = useSubject.delete();

  const confirmDelete = () => {
    if (!subjectToDelete) return;

    deleteSubject.mutate({ subjectId: subjectToDelete.id });
    setSubjectToDelete(undefined);
  };

  if (getSubject.data?.length) {
    return (
      <section aria-label="lista de matérias" className="mt-6">
        <div className="flex flex-col gap-4">
          {getSubject.data.map((subject) => (
            <div
              aria-label={`Divisão da matéria: ${subject.name}`}
              key={`${subject.id}${subject.color}${subject.name}`}
              className="flex items-center justify-between gap-4 rounded-xl border border-stone-300 bg-white py-6 pl-8 pr-6 sm:py-7 sm:pl-9 sm:pr-7"
              style={{ boxShadow: `inset 6px 0 0 ${subject.color}` }}
            >
              <div className="flex gap-2 items-center">
                <p className="  font-semibold leading-tight text-blue-950">
                  {subject.name.toUpperCase()}
                </p>
              </div>
              <div className="flex shrink-0 gap-2">
                <Button.Root
                  type="button"
                  aria-label={`Editar matéria ${subject.name}`}
                  color="slate"
                  rounded
                  onClick={() => setSubjectToEdit(subject)}
                >
                  <Button.Icon icon={Pencil} />
                </Button.Root>
                <Button.Root
                  type="button"
                  aria-label={`Excluir matéria ${subject.name}`}
                  color="red"
                  rounded
                  onClick={() => setSubjectToDelete(subject)}
                >
                  <Button.Icon icon={Trash} />
                </Button.Root>
              </div>
            </div>
          ))}
        </div>
        {subjectToEdit && (
          <AddSubjectModal
            open
            subject={subjectToEdit}
            onClose={() => setSubjectToEdit(undefined)}
          />
        )}
        {subjectToDelete && (
          <ConfirmDialog
            open
            title="Excluir matéria?"
            description={`Todos os conteúdos vinculados a ${subjectToDelete.name} também serão excluídos.`}
            onCancel={() => setSubjectToDelete(undefined)}
            onConfirm={confirmDelete}
          />
        )}
      </section>
    );
  }

  return (
    <section
      aria-label="lista de matérias"
      className="mt-6 flex flex-col items-start rounded-xl border border-dashed border-slate-300 bg-slate-50 px-5 py-8 sm:px-8"
    >
      <h2 className="text-lg font-semibold text-slate-950">
        Você ainda não possui matérias.
      </h2>
      <p className="mt-1 max-w-lg text-sm leading-6 text-slate-600">
        Cadastre sua primeira matéria para começar a organizar os conteúdos do seu ciclo de estudos.
      </p>
      <Button.Root type="button" onClick={onAddSubject} className="mt-5">
        <Button.Icon icon={Plus} />
        <Button.Text>Adicionar primeira matéria</Button.Text>
      </Button.Root>
    </section>
  );
}
