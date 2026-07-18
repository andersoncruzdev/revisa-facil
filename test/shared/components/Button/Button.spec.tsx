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
      "text-white",
      "focus-visible:ring-red-500",
      "rounded-full",
    );
  });

  it("usa azul pastel com contraste na variante principal", () => {
    render(<Button.Root>Salvar</Button.Root>);

    expect(screen.getByRole("button", { name: "Salvar" })).toHaveClass(
      "bg-blue-100",
      "text-blue-900",
      "hover:bg-blue-200",
      "focus-visible:ring-blue-400",
    );
  });

  it("usa tons slate suaves na variante secundária", () => {
    render(<Button.Root color="slate">Cancelar</Button.Root>);

    expect(screen.getByRole("button", { name: "Cancelar" })).toHaveClass(
      "bg-slate-200",
      "text-slate-800",
      "hover:bg-slate-300",
      "focus-visible:ring-slate-400",
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
