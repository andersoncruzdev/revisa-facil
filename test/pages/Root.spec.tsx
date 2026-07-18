import { QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import RootPage from "@pages/Root";
import { createQueryClient } from "../hooks/react-query-tests";

describe("RootPage", () => {
  it("abre e fecha o modal pelo botão de adicionar matéria", async () => {
    const user = userEvent.setup();

    render(
      <QueryClientProvider client={createQueryClient()}>
        <MemoryRouter>
          <RootPage />
        </MemoryRouter>
      </QueryClientProvider>,
    );

    await user.click(screen.getByRole("button", { name: "Adicionar nova matéria" }));

    expect(
      screen.getByRole("dialog", { name: "Adicionar matéria" }),
    ).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Cancelar" }));

    expect(
      screen.queryByRole("dialog", { name: "Adicionar matéria" }),
    ).not.toBeInTheDocument();
  });
});
