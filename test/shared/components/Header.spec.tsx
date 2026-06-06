import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import HeaderComponent from "@shared/components/Header";

describe("Testes de verificação do 'HeaderComponente'", () => {
  it("verifica se renderiza corretamente", () => {
    render(<HeaderComponent />);
    expect(screen.getByTestId("icon-bookopen-header")).toBeInTheDocument();
    expect(screen.getByTestId("h1-header")).toBeInTheDocument();
    expect(screen.getByTestId("h2-header")).toBeInTheDocument();
  });

  it.each([
    { name: "Dashboard", href: "#/dashboard" },
    { name: "Matérias", href: "#/materias" },
    { name: "Conteúdos", href: "#/conteudos" },
    { name: "Revisões", href: "#/revisoes" },
    { name: "Histórico", href: "#/historico" },
  ])("verifica se a âncora possui o href correto", ({ name, href }) => {
    render(<HeaderComponent />);
    const link = screen.getByRole("link", { name });
    expect(link).toHaveAttribute("href", href);
  });

  it("altera o link ativo ao clicar", async () => {
    const user = userEvent.setup();

    render(<HeaderComponent />);

    const dashboard = screen.getByRole("link", { name: "Dashboard" });
    const materias = screen.getByRole("link", { name: "Matérias" });

    expect(dashboard).toHaveAttribute("aria-current", "page");
    expect(materias).not.toHaveAttribute("aria-current");

    await user.click(materias);

    expect(materias).toHaveAttribute("aria-current", "page");
    expect(dashboard).not.toHaveAttribute("aria-current");
  });
});
