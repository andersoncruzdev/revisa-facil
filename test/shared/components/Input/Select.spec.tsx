import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Input } from "@shared/components/Input";

const subjects = [
  { id: 1, name: "Português" },
  { id: 2, name: "Matemática" },
];

describe("Select", () => {
  it("renderiza o campo associado ao label com as opções informadas", () => {
    render(
      <Input.Selected
        id="subject"
        label="Nome da matéria"
        name="subject"
        items={subjects}
        required
      />,
    );

    const select = screen.getByRole("combobox", { name: "Nome da matéria" });
    const options = screen.getAllByRole("option");

    expect(select).toHaveAttribute("id", "subject");
    expect(select).toHaveAttribute("name", "subject");
    expect(select).toBeRequired();
    expect(options).toHaveLength(2);
    expect(options[0]).toHaveValue("1");
    expect(options[0]).toHaveTextContent("PORTUGUÊS");
    expect(options[1]).toHaveValue("2");
    expect(options[1]).toHaveTextContent("MATEMÁTICA");
  });

  it("repassa o id da opção selecionada no evento de mudança", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(
      <Input.Selected
        id="subject"
        label="Nome da matéria"
        name="subject"
        items={subjects}
        onChange={onChange}
      />,
    );

    const select = screen.getByRole("combobox", { name: "Nome da matéria" });

    await user.selectOptions(select, "2");

    expect(select).toHaveValue("2");
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange.mock.calls[0][0].target.value).toBe("2");
  });

  it("informa quando não há opções", () => {
    render(
      <Input.Selected
        id="subject"
        label="Nome da matéria"
        name="subject"
      />,
    );

    expect(
      screen.getByRole("option", { name: "Sem opções" }),
    ).toBeInTheDocument();
  });
});
