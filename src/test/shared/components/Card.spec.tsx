import { render, screen } from "@testing-library/react";
import { CalendarCheck } from "lucide-react";
import Card from "../../../shared/components/Card";

describe("Testes de verificação do 'Card'", () => {
  it("renderiza o nome, a quantidade e o ícone", () => {
    render(
      <Card
        name="Revisões de hoje"
        quantity={4}
        icon={<CalendarCheck data-testid="card-icon" aria-hidden="true" />}
      />,
    );

    expect(screen.getByText("Revisões de hoje")).toBeInTheDocument();
    expect(screen.getByText("4")).toBeInTheDocument();
    expect(screen.getByTestId("card-icon")).toBeInTheDocument();
  });

  it("aplica a estrutura visual do card", () => {
    render(
      <Card
        name="Conteúdos pendentes"
        quantity={7}
        icon={<CalendarCheck aria-hidden="true" />}
      />,
    );

    expect(screen.getByText("Conteúdos pendentes").closest("article")).toHaveClass(
      "rounded-lg",
      "border",
      "bg-white",
      "shadow-sm",
    );
    expect(screen.getByText("7")).toHaveClass("text-3xl", "font-bold");
  });
});
