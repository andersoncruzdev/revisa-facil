import { render, screen } from "@testing-library/react";
import { CalendarCheck, Clock } from "lucide-react";
import Revisions from "@features/Dashboard/components/Revisions";
import type { CardProps } from "@shared/components/Card";

describe("Testes de verificação do 'Revisions'", () => {
  it("renderiza a lista de cards recebida por props", () => {
    const items = [
      {
        name: "card1",
        icon: <CalendarCheck data-testid="icon-card1" aria-hidden="true" />,
        quantity: 4,
      },
      {
        name: "card2",
        icon: <Clock data-testid="icon-card2" aria-hidden="true" />,
        quantity: 8,
      },
    ] satisfies CardProps[];

    render(<Revisions items={items} />);

    expect(
      screen.getByRole("list", { name: "Resumo de revisões" }),
    ).toBeInTheDocument();
    expect(screen.getAllByRole("listitem")).toHaveLength(items.length);

    items.forEach((item) => {
      expect(screen.getByText(item.name)).toBeInTheDocument();
      expect(screen.getByText(item.quantity)).toBeInTheDocument();
    });
    expect(screen.getByTestId("icon-card1")).toBeInTheDocument();
    expect(screen.getByTestId("icon-card2")).toBeInTheDocument();
  });
});
