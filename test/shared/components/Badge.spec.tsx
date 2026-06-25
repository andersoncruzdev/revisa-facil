import { render, screen } from "@testing-library/react";
import { Badge } from "@shared/components/Badge";

describe("Testes de verificação do 'Badge'", () => {
  it("renderiza o conteúdo acessível com a cor informada", () => {
    render(<Badge color="#16a34a" content="Novo" ariaLabel="Status novo" />);

    const badge = screen.getByLabelText("Status novo");

    expect(badge).toHaveTextContent("Novo");
    expect(badge).toHaveStyle({ backgroundColor: "#16a34a" });
    expect(badge).toHaveClass(
      "min-h-6",
      "min-w-10",
      "rounded-full",
      "text-white",
    );
  });

  it("renderiza um marcador visual sem conteúdo", () => {
    render(<Badge color="#2563eb" ariaLabel="Cor da matéria Matemática" />);

    const badge = screen.getByLabelText("Cor da matéria Matemática");

    expect(badge).toBeEmptyDOMElement();
    expect(badge).toHaveStyle({ backgroundColor: "#2563eb" });
    expect(badge).toHaveClass("h-4", "w-4", "rounded-full");
  });
});
