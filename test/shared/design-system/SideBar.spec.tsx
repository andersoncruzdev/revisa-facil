import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CalendarCheck, NotebookText } from "lucide-react";
import { MemoryRouter } from "react-router-dom";
import SideBar from "@shared/design-system/SideBar";
import { SideBarProvider } from "@shared/providers/SideBarProvider";

const options = [
  { name: "Hoje", href: "/", icon: CalendarCheck },
  { name: "Anotações", href: "#/notes", icon: NotebookText },
];

function renderSideBar(action = vi.fn()) {
  return render(
    <MemoryRouter>
      <SideBarProvider>
        <SideBar options={options} action={action} />
      </SideBarProvider>
    </MemoryRouter>,
  );
}

describe("SideBar", () => {
  it("inicia com Hoje focado", () => {
    renderSideBar();

    expect(screen.getByRole("link", { name: "Hoje" })).toHaveAttribute(
      "aria-current",
      "page",
    );
    expect(screen.getByRole("link", { name: "Anotações" })).not.toHaveAttribute(
      "aria-current",
    );
  });

  it("move o foco para a opção selecionada", async () => {
    const user = userEvent.setup();
    renderSideBar();

    const hoje = screen.getByRole("link", { name: "Hoje" });
    const anotacoes = screen.getByRole("link", { name: "Anotações" });

    await user.click(anotacoes);

    expect(anotacoes).toHaveAttribute("aria-current", "page");
    expect(hoje).not.toHaveAttribute("aria-current");
  });

  it("recolhe e expande a navegação", async () => {
    const user = userEvent.setup();
    renderSideBar();

    const toggle = screen.getByRole("button", { name: "Recolher menu" });
    expect(toggle).toHaveAttribute("aria-expanded", "true");
    expect(toggle).toHaveClass("bg-slate-200", "rounded-full");

    await user.click(toggle);

    expect(screen.getByRole("button", { name: "Expandir menu" })).toHaveAttribute(
      "aria-expanded",
      "false",
    );
  });

  it("executa a ação pelo botão principal", async () => {
    const user = userEvent.setup();
    const action = vi.fn();
    renderSideBar(action);

    const addButton = screen.getByRole("button", {
      name: "Adicionar nova matéria",
    });

    expect(addButton).toHaveClass(
      "max-md:hidden",
      "bg-blue-100",
      "text-blue-900",
    );

    await user.click(addButton);

    expect(action).toHaveBeenCalledTimes(1);
  });
});
