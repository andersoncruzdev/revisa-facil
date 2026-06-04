import { render, screen } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { routes } from "../route";

describe("Testes de verificação das rotas", () => {
  it("renderiza o Dashboard como rota inicial", () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/"],
    });

    render(<RouterProvider router={router} />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Suas revisões de Hoje",
      }),
    ).toBeInTheDocument();
  });

  it("renderiza o Dashboard ao acessar /dashboard", () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/dashboard"],
    });

    render(<RouterProvider router={router} />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Suas revisões de Hoje",
      }),
    ).toBeInTheDocument();
  });
});
