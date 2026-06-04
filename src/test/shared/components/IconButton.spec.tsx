import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Pencil } from "lucide-react";
import { iconButtonClasses } from "@shared/components/css/buttonClasses";
import IconButton from "@shared/components/IconButton";

describe("Testes de verificação do 'IconButton'", () => {
  it("renderiza com a classe da variante informada", () => {
    render(
      <IconButton ariaLabel="Editar matéria" variant="danger">
        <Pencil aria-hidden="true" />
      </IconButton>,
    );

    expect(screen.getByRole("button", { name: "Editar matéria" })).toHaveClass(
      iconButtonClasses.danger,
    );
  });

  it("chama a função ao clicar", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();

    render(
      <IconButton ariaLabel="Editar matéria" onClick={onClick}>
        <Pencil aria-hidden="true" />
      </IconButton>,
    );

    await user.click(screen.getByRole("button", { name: "Editar matéria" }));

    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
