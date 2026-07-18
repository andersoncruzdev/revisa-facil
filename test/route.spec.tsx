import { render, screen } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { routes } from "../src/route";

describe("rotas principais", () => {
  it.each([
    { path: "/", title: "Hoje" },
    { path: "/content", title: "Conteúdos" },
    { path: "/notes", title: "Anotações" },
    { path: "/intervalos", title: "Intervalos" },
  ])("renderiza a página de $title", async ({ path, title }) => {
    const router = createMemoryRouter(routes, { initialEntries: [path] });

    render(<RouterProvider router={router} />);

    expect(
      await screen.findByRole("heading", { level: 1, name: title }),
    ).toBeInTheDocument();
  });
});
