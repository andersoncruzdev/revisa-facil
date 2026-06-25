"use client";

import { useClassroom } from "@hooks/useClassroom";
import { Badge } from "@shared/components/Badge";
import { Button } from "@shared/components/Button";
import { Title } from "@shared/components/Title";

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
        <Title
          subTitle="Todas as suas matérias cadastradas"
          title="Matérias cadastradas"
          typeTitle="h2"
        />
        <div className="flex flex-col">
          {getClassroom.data.map((classroom) => (
            <div
              aria-label={`Divisão da matéria: ${classroom.name}`}
              key={classroom.id}
              className="flex justify-between shadow-md p-10 gap-4"
            >
              <div className="flex gap-2 items-center">
                <Badge
                  color={classroom.color}
                  ariaLabel={`Cor da matéria ${classroom.name}`}
                />
                <p className="font-bold text-black uppercase">
                  {classroom.name}
                </p>
              </div>
              <Button.Root
                aria-label={`Excluir matéria ${classroom.name}`}
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
