import { Title } from "@shared/components/Title";
import { Input } from "@shared/components/Input";
import { Button } from "@shared/components/Button";
import { classroomColorOptions } from "@constants/classroom-colors";

export default function CreateClassroom() {
  return (
    <section className="mt-6">
      <Title
        title="Criar nova matéria"
        subTitle="Adicione uma nova matéria ao seu cronograma"
        typeTitle="h2"
      />
      <div className="flex gap-4 justify-between items-end border-b-neutral-400 border-2 p-2">
        <Input.Root>
          <Input.TextField
            placeholder="Insira o nome da nova matéria"
            id="input-matéria"
            label="Nome da máteria:"
            name="matéria"
          >
            {" "}
          </Input.TextField>
        </Input.Root>
        <div aria-label="Cores da matéria" className="flex gap-2">
          {classroomColorOptions.map((color) => (
            <button
              key={color.name}
              type="button"
              aria-label={`Selecionar cor ${color.name}`}
              className="h-6 w-6 rounded-full cursor-pointer"
              style={{ backgroundColor: color.value }}
            />
          ))}
        </div>
        <Button.Root>
          <Button.Text>Adicionar</Button.Text>
        </Button.Root>
      </div>
    </section>
  );
}
