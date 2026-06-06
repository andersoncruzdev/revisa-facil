import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import CardContent from "@shared/design-system/CardContent";
import type { Content, Classroom } from "@types-app/study";

const materia = {
  id: 1,
  name: "História",
  color: "#16a34a",
} satisfies Classroom;

const conteudo = {
  id: 1,
  idMateria: 1,
  content: "Revolução Francesa",
  studied: "01/06/2026",
  nextRevision: "08/06/2026",
} satisfies Content;

describe("Testes de verificação do 'CardContent'", () => {
  it("renderiza os dados do conteúdo", () => {
    render(<CardContent materia={materia} conteudo={conteudo} />);

    expect(
      screen.getByLabelText("Card do conteúdo Revolução Francesa"),
    ).toBeInTheDocument();
    expect(screen.getByText("Revolução Francesa")).toBeInTheDocument();
    expect(
      screen.getByText("História -- Estudado em 01/06/2026"),
    ).toBeInTheDocument();
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("renderiza e executa ações opcionais", async () => {
    const user = userEvent.setup();
    const edit = vi.fn();
    const remove = vi.fn();

    render(
      <CardContent
        materia={materia}
        conteudo={conteudo}
        actions={{ edit, delete: remove }}
      />,
    );

    await user.click(
      screen.getByRole("button", { name: "Editar conteúdo Revolução Francesa" }),
    );
    await user.click(
      screen.getByRole("button", { name: "Excluir conteúdo Revolução Francesa" }),
    );

    expect(edit).toHaveBeenCalledTimes(1);
    expect(remove).toHaveBeenCalledTimes(1);
  });
});
