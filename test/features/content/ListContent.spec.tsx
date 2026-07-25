import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ListContent from "@features/content/ListContent";
import { useClassroom } from "@hooks/useClassroom";
import { useContent } from "@hooks/useContent";
import type { Classroom, Content } from "@types-app/study";

vi.mock("@hooks/useClassroom", () => ({
  useClassroom: {
    get: vi.fn(),
  },
}));

vi.mock("@hooks/useContent", () => ({
  useContent: {
    get: vi.fn(),
    delete: vi.fn(),
  },
}));

const classrooms = [
  { id: 1, name: "Matemática", color: "#2563eb" },
  { id: 2, name: "História", color: "#16a34a" },
] satisfies Classroom[];

const contents = [
  {
    id: 1,
    idClassroom: 2,
    content: "Brasil Colônia",
    studied: "25/07/2026",
    nextRevision: "31/07/2026",
  },
] satisfies Content[];

const setupHooks = (data: Content[] | undefined = contents) => {
  const mutate = vi.fn();

  vi.mocked(useContent.get).mockReturnValue({
    data,
  } as ReturnType<typeof useContent.get>);
  vi.mocked(useContent.delete).mockReturnValue({
    mutate,
  } as unknown as ReturnType<typeof useContent.delete>);
  vi.mocked(useClassroom.get).mockReturnValue({
    data: classrooms,
  } as ReturnType<typeof useClassroom.get>);

  return { mutate };
};

describe("ListContent", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renderiza o conteúdo com a cor da matéria na sombra", () => {
    setupHooks();

    render(<ListContent />);

    const contentItem = screen.getByLabelText(
      "Divisão do conteúdo: Brasil Colônia",
    );

    expect(contentItem).toHaveStyle({
      boxShadow: "inset 6px 0 0 #16a34a",
    });
    expect(screen.getByText("BRASIL COLÔNIA")).toBeInTheDocument();
    expect(screen.getByText("História")).toBeInTheDocument();
  });

  it("exibe mensagem quando não há conteúdos cadastrados", () => {
    setupHooks([]);

    render(<ListContent />);

    expect(screen.getByText("Sem conteúdos cadastrados")).toBeInTheDocument();
  });

  it("solicita a exclusão do conteúdo selecionado", async () => {
    const user = userEvent.setup();
    const { mutate } = setupHooks();

    render(<ListContent />);

    await user.click(
      screen.getByRole("button", {
        name: "Excluir conteúdo Brasil Colônia",
      }),
    );

    expect(mutate).toHaveBeenCalledWith({ idContent: 1 });
  });
});
