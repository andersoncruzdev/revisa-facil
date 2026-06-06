import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import CardClassroom from "@shared/design-system/CardClassroom";
import type { Classroom } from "@types-app/study";

type CardClassroomFixture = Classroom & {
  readonly amountContent: number;
};

const materia = {
  id: 1,
  name: "Matemática",
  color: "#2563eb",
  amountContent: 3,
} satisfies CardClassroomFixture;

describe("Testes de verificação do 'CardClassroom'", () => {
  it("renderiza os dados da matéria", () => {
    render(
      <CardClassroom
        materia={materia}
        actions={{ edit: vi.fn(), delete: vi.fn() }}
      />,
    );

    expect(
      screen.getByLabelText("Card da matéria Matemática"),
    ).toBeInTheDocument();
    expect(screen.getByText("Matemática")).toBeInTheDocument();
    expect(screen.getByText("3 conteúdos")).toBeInTheDocument();
    expect(screen.getByLabelText("Cor da matéria Matemática")).toHaveStyle({
      backgroundColor: "#2563eb",
    });
  });

  it("executa as ações de editar e excluir", async () => {
    const user = userEvent.setup();
    const edit = vi.fn();
    const remove = vi.fn();

    render(<CardClassroom materia={materia} actions={{ edit, delete: remove }} />);

    await user.click(screen.getByRole("button", { name: "Editar matéria Matemática" }));
    await user.click(screen.getByRole("button", { name: "Excluir matéria Matemática" }));

    expect(edit).toHaveBeenCalledTimes(1);
    expect(remove).toHaveBeenCalledTimes(1);
  });
});
