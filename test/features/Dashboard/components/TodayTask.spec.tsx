import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TodayTask from "@features/Dashboard/components/TodayTask";
import type { Classroom, ContentRevision } from "@types-app/study";

const materia = {
  id: "geografia",
  title: "Geografia",
  color: "#ea580c",
  amountContent: 2,
} satisfies Classroom;

const conteudo = {
  id: "geo-climas",
  name: "Climas do Brasil",
  studied: "2026-06-03",
  revised: null,
  nextRevision: "2026-06-04",
  tipoRevisao: "D+1",
} satisfies ContentRevision;

describe("Testes de verificação do 'TodayTask'", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2026, 5, 4));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("renderiza a seção e as revisões de hoje", () => {
    render(
      <TodayTask
        items={[{ materia, conteudo }]}
        onCompleteRevision={vi.fn()}
      />,
    );

    expect(
      screen.getByRole("heading", { level: 2, name: "Para revisar hoje" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Climas do Brasil")).toBeInTheDocument();
    expect(screen.getByText("Geografia -- Próxima revisão em 04/06/2026"))
      .toBeInTheDocument();
    expect(screen.getByText("Revisão para hoje")).toBeInTheDocument();
  });

  it("chama a função de conclusão com o item clicado", async () => {
    const onCompleteRevision = vi.fn();

    render(
      <TodayTask
        items={[{ materia, conteudo }]}
        onCompleteRevision={onCompleteRevision}
      />,
    );

    vi.useRealTimers();
    const user = userEvent.setup();

    await user.click(
      screen.getByRole("button", {
        name: "Concluir revisão de Climas do Brasil",
      }),
    );

    expect(onCompleteRevision).toHaveBeenCalledTimes(1);
    expect(onCompleteRevision).toHaveBeenCalledWith({ materia, conteudo });
  });

  it("renderiza mensagem quando não há revisões para hoje", () => {
    render(<TodayTask items={[]} onCompleteRevision={vi.fn()} />);

    expect(screen.getByText("Nenhuma revisão para hoje.")).toBeInTheDocument();
    expect(screen.queryByRole("listitem")).not.toBeInTheDocument();
  });
});
