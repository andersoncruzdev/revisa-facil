"use client";

import { useClassroom } from "@hooks/useClassroom";
import { Button } from "@shared/components/Button";

import { Trash } from "lucide-react";

export default function ListClassroom() {
  const getClassroom = useClassroom.get();
  const deleteClassroom = useClassroom.delete();

  const deleteWithId = (id: number) => {
    deleteClassroom.mutate({ idClassroom: id });
  };

  if (getClassroom.data?.length) {
    return (
      <section aria-label="lista de matérias" className="mt-6">
        <div className="flex flex-col gap-4">
          {getClassroom.data.map((classroom) => (
            <div
              aria-label={`Divisão da matéria: ${classroom.name}`}
              key={classroom.id}
              className="flex items-center justify-between gap-4 rounded-xl border border-stone-300 bg-white py-6 pl-8 pr-6 sm:py-7 sm:pl-9 sm:pr-7"
              style={{ boxShadow: `inset 6px 0 0 ${classroom.color}` }}
            >
              <div className="flex gap-2 items-center">
                <p className="  font-semibold leading-tight text-blue-950">
                  {classroom.name.toUpperCase()}
                </p>
              </div>
              <Button.Root
                aria-label={`Excluir matéria ${classroom.name}`}
                color="red"
                rounded
                onClick={() => deleteWithId(classroom.id)}
              >
                <Button.Icon icon={Trash} />
              </Button.Root>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section aria-label="lista de matérias" className="mt-6">
      <p className="text-zinc-600 font-bold">Sem matérias cadastradas</p>
    </section>
  );
}
