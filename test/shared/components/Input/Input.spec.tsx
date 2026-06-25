import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Search } from "lucide-react";
import { Input } from "@shared/components/Input";

describe("Testes de verificação do 'Input'", () => {
  it("renderiza o campo associado ao label com os atributos informados", () => {
    render(
      <Input.TextField
        placeholder="Digite o conteúdo"
        id="content-name"
        label="Nome do conteúdo"
        name="contentName"
        type="email"
        autoComplete="off"
        required
      />,
    );

    const input = screen.getByRole("textbox", { name: "Nome do conteúdo" });

    expect(input).toHaveAttribute("id", "content-name");
    expect(input).toHaveAttribute("name", "contentName");
    expect(input).toHaveAttribute("type", "email");
    expect(input).toHaveAttribute("placeholder", "Digite o conteúdo");
    expect(input).toHaveAttribute("autocomplete", "off");
    expect(input).toBeRequired();
  });

  it("repassa eventos do input durante a digitação", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(
      <Input.TextField
        placeholder="Digite a matéria"
        id="classroom-name"
        label="Nome da matéria"
        name="classroomName"
        onChange={onChange}
      />,
    );

    await user.type(
      screen.getByRole("textbox", { name: "Nome da matéria" }),
      "Bio",
    );

    expect(screen.getByRole("textbox", { name: "Nome da matéria" })).toHaveValue(
      "Bio",
    );
    expect(onChange).toHaveBeenCalledTimes(3);
  });

  it("renderiza o root e o ícone decorativo", () => {
    const { container } = render(
      <Input.Root>
        <Input.TextField
          placeholder="Buscar"
          id="search"
          label="Buscar conteúdo"
          name="search"
        >
          <Input.Icon icon={Search} />
        </Input.TextField>
      </Input.Root>,
    );

    const inputGroup = screen.getByLabelText("divisão do input com ícon");

    expect(inputGroup).toHaveClass("flex");
    expect(inputGroup.parentElement).toHaveClass("flex", "flex-col", "gap-2");
    expect(inputGroup.parentElement?.parentElement).toHaveClass("flex", "flex-row");
    expect(container.querySelector("svg")).toHaveAttribute("aria-hidden", "true");
    expect(container.querySelector("svg")).toHaveAttribute("width", "20");
    expect(container.querySelector("svg")).toHaveAttribute("stroke", "gray");
  });
});
