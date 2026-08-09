import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { subjectColorOptions, subjectColors } from "../../../src/constants/subject-colors";
import { Colors } from "@shared/components/Colors";

describe("Testes de verificação do 'Colors'", () => {
  it("renderiza as opções de cores da matéria", () => {
    render(
      <Colors
        selectedColor={subjectColors.azul}
        onSelectColor={vi.fn()}
      />,
    );

    expect(screen.getByLabelText("Cores da matéria")).toHaveClass("flex", "gap-2");

    subjectColorOptions.forEach((color) => {
      const colorButton = screen.getByRole("button", {
        name: `Selecionar cor ${color.name}`,
      });

      expect(colorButton).toHaveAttribute("type", "button");
      expect(colorButton).toHaveStyle({ backgroundColor: color.value });
    });
  });

  it("destaca a cor selecionada", () => {
    render(
      <Colors
        selectedColor={subjectColors.roxo}
        onSelectColor={vi.fn()}
      />,
    );

    expect(screen.getByRole("button", { name: "Selecionar cor roxo" })).toHaveClass(
      "ring-2",
      "ring-blue-700",
      "ring-offset-2",
    );
    expect(screen.getByRole("button", { name: "Selecionar cor roxo" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    expect(screen.getByRole("button", { name: "Selecionar cor azul" })).toHaveAttribute(
      "aria-pressed",
      "false",
    );
  });

  it("chama a função de seleção ao clicar em uma cor", async () => {
    const user = userEvent.setup();
    const onSelectColor = vi.fn();

    render(
      <Colors
        selectedColor={subjectColors.azul}
        onSelectColor={onSelectColor}
      />,
    );

    await user.click(screen.getByRole("button", { name: "Selecionar cor rosa" }));

    expect(onSelectColor).toHaveBeenCalledTimes(1);
    expect(onSelectColor).toHaveBeenCalledWith(subjectColors.rosa);
  });
});
