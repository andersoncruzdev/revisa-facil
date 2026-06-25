"use client";

import { Title } from "@shared/components/Title";
import { Input } from "@shared/components/Input";
import { Button } from "@shared/components/Button";
import { Colors } from "@shared/components/Colors";

import { useClassroom } from "@hooks/useClassroom";
import { useColor } from "@hooks/useColor";
import { classroomColors } from "@constants/classroom-colors";

import type { FormEvent } from "react";

export default function CreateClassroom() {
  const addClassroom = useClassroom.add();
  const { selectedColor, setSelectedColor } = useColor();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = (formData.get("name") as string).trim();

    if (!name) {
      return;
    }

    addClassroom.mutate(
      {
        name,
        color: selectedColor,
      },
      {
        onSuccess: () => {
          form.reset();
          setSelectedColor(classroomColors.azul);
        },
      },
    );

    console.log(name, selectedColor);
  };

  return (
    <section className="mt-6">
      <Title
        title="Criar nova matéria"
        subTitle="Adicione uma nova matéria ao seu cronograma"
        typeTitle="h2"
      />
      <form
        onSubmit={handleSubmit}
        className="flex gap-4 justify-between items-end border-b-neutral-400 border-2 p-2"
      >
        <Input.Root>
          <Input.TextField
            placeholder="Insira o nome da nova matéria"
            id="classroom-name"
            label="Nome da matéria:"
            name="name"
            required
          />
        </Input.Root>
        <Colors
          selectedColor={selectedColor}
          onSelectColor={setSelectedColor}
        />
        <Button.Root type="submit" disabled={addClassroom.isPending}>
          <Button.Text>
            {addClassroom.isPending ? "Adicionando..." : "Adicionar"}
          </Button.Text>
        </Button.Root>
      </form>
    </section>
  );
}
