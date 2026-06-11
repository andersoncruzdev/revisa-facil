import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import HeaderComponent from "@shared/components/Header";

function renderHeader() {
  return render(
    <MemoryRouter>
      <HeaderComponent />
    </MemoryRouter>,
  );
}

describe("Testes de verificação do 'HeaderComponente'", () => {
  it("verifica se renderiza corretamente", () => {
    renderHeader();
    expect(screen.getByTestId("icon-bookopen-header")).toBeInTheDocument();
    expect(screen.getByTestId("h1-header")).toBeInTheDocument();
    expect(screen.getByTestId("h2-header")).toBeInTheDocument();
  });

  it.each([
    { name: "Dashboard", href: "/" },
    { name: "Matérias", href: "/classrooms" },
    { name: "Conteúdos", href: "/conteudos" },
    { name: "Revisões", href: "/revisoes" },
    { name: "Histórico", href: "/historico" },
  ])("verifica se a âncora possui o href correto", ({ name, href }) => {
    renderHeader();
    const link = screen.getByRole("link", { name });
    expect(link).toHaveAttribute("href", href);
  });

  it("altera o link ativo ao clicar", async () => {
    const user = userEvent.setup();

    renderHeader();

    const dashboard = screen.getByRole("link", { name: "Dashboard" });
    const materias = screen.getByRole("link", { name: "Matérias" });

    expect(dashboard).toHaveAttribute("aria-current", "page");
    expect(materias).not.toHaveAttribute("aria-current");

    await user.click(materias);

    expect(materias).toHaveAttribute("aria-current", "page");
    expect(dashboard).not.toHaveAttribute("aria-current");
  });
});
