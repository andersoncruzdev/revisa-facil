import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Plus } from "lucide-react";
import { Button } from "@shared/components/Button";

describe("Testes de verificação do 'Button'", () => {
  it("renderiza o texto e chama a função ao clicar", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();

    render(
      <Button.Root onClick={onClick}>
        <Button.Text>Salvar</Button.Text>
      </Button.Root>,
    );

    await user.click(screen.getByRole("button", { name: "Salvar" }));

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("aplica a cor e o formato arredondado", () => {
    render(
      <Button.Root color="red" rounded aria-label="Excluir">
        <Button.Icon icon={Plus} />
      </Button.Root>,
    );

    expect(screen.getByRole("button", { name: "Excluir" })).toHaveClass(
      "bg-red-600",
      "rounded-full",
    );
  });

  it("renderiza texto com tamanho e ícone oculto", () => {
    const { container } = render(
      <Button.Root>
        <Button.Icon icon={Plus} size="24" />
        <Button.Text size="lg">Adicionar</Button.Text>
      </Button.Root>,
    );

    expect(screen.getByText("Adicionar")).toHaveClass("text-lg");
    expect(container.querySelector("svg")).toHaveAttribute("aria-hidden", "true");
  });
});
