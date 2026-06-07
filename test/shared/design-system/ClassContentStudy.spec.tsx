import { render, screen } from "@testing-library/react";
import ClassContentStudy from "@shared/design-system/ClassContentStudy";
import type { RevisionContent, Classroom } from "@types-app/study";
import userEvent from "@testing-library/user-event";


const materia = {
  id: 1,
  name: "Geografia",
  color: "#ea580c",
} satisfies Classroom;

describe("Testes de verificação do 'ClassContentStudy'", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2026, 5, 4));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("renderiza uma revisão de hoje", async () => {
    const concluir = vi.fn();
    const conteudo = {
      id: 1,
      idClassroom: 1,
      content: "Climas do Brasil",
      studied: "03/06/2026",
      nextRevision: "04/06/2026",
      tipoRevisao: "D+1",
    } satisfies RevisionContent;
    render(
      <ClassContentStudy
        materia={materia}
        conteudo={conteudo}
        concluir={concluir}
      />,
    );

    expect(screen.getByText("Climas do Brasil")).toBeInTheDocument();
    expect(screen.getByText("D+1")).toBeInTheDocument();
    expect(screen.getByText("Revisão para hoje")).toBeInTheDocument();

    const btn = screen.getByRole("button", {
      name: "Concluir revisão de Climas do Brasil",
    });

    vi.useRealTimers();
    const user = userEvent.setup();
    await user.click(btn);

    expect(concluir).toHaveBeenCalledTimes(1);
  });

  it("renderiza uma revisão atrasada", () => {
    const conteudo = {
      id: 1,
      idClassroom: 1,
      content: "Cartografia",
      studied: "20/05/2026",
      nextRevision: "02/06/2026",
      tipoRevisao: "D+14",
    } satisfies RevisionContent;

    render(
      <ClassContentStudy
        materia={materia}
        conteudo={conteudo}
        concluir={vi.fn()}
      />,
    );

    expect(screen.getByText("Cartografia")).toBeInTheDocument();
    expect(screen.getByText("D+14")).toBeInTheDocument();
    expect(screen.getByText("2 dias atrasado")).toBeInTheDocument();
    expect(
      screen.getByText("Geografia -- Próxima revisão em 02/06/2026"),
    ).toBeInTheDocument();
  });
});
