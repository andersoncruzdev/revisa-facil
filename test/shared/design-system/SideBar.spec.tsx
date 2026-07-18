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

function renderSideBar() {
  return render(
    <MemoryRouter>
      <SideBarProvider>
        <SideBar options={options} action={vi.fn()} />
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

    await user.click(toggle);

    expect(screen.getByRole("button", { name: "Expandir menu" })).toHaveAttribute(
      "aria-expanded",
      "false",
    );
  });
});
