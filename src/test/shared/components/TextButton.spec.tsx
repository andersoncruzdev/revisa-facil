import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { textButtonClasses } from "@shared/components/css/buttonClasses";
import TextButton from "@shared/components/TextButton";

describe("Testes de verificação do 'TextButton'", () => {
  it("renderiza com a classe da variante informada", () => {
    render(<TextButton variant="secondary">Salvar</TextButton>);

    expect(screen.getByRole("button", { name: "Salvar" })).toHaveClass(
      textButtonClasses.secondary,
    );
  });

  it("chama a função ao clicar", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();

    render(<TextButton onClick={onClick}>Salvar</TextButton>);

    await user.click(screen.getByRole("button", { name: "Salvar" }));

    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
