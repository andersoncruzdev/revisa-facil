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
    add: vi.fn(),
    delete: vi.fn(),
    update: vi.fn(),
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
  const update = vi.fn();

  vi.mocked(useContent.get).mockReturnValue({
    data,
  } as ReturnType<typeof useContent.get>);
  vi.mocked(useContent.delete).mockReturnValue({
    mutate,
  } as unknown as ReturnType<typeof useContent.delete>);
  vi.mocked(useContent.add).mockReturnValue({
    mutate: vi.fn(),
    isPending: false,
  } as unknown as ReturnType<typeof useContent.add>);
  vi.mocked(useContent.update).mockReturnValue({
    mutate: update,
    isPending: false,
  } as unknown as ReturnType<typeof useContent.update>);
  vi.mocked(useClassroom.get).mockReturnValue({
    data: classrooms,
  } as ReturnType<typeof useClassroom.get>);

  return { mutate, update };
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
    expect(screen.getByText("HISTÓRIA")).toBeInTheDocument();
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

  it("edita o conteúdo e a matéria vinculada", async () => {
    const user = userEvent.setup();
    const { update } = setupHooks();

    render(<ListContent />);

    await user.click(
      screen.getByRole("button", { name: "Editar conteúdo Brasil Colônia" }),
    );

    const contentInput = screen.getByRole("textbox", {
      name: "Nome do conteúdo:",
    });
    expect(contentInput).toHaveValue("Brasil Colônia");
    expect(screen.getByRole("combobox", { name: "Nome da matéria:" })).toHaveValue("2");

    await user.clear(contentInput);
    await user.type(contentInput, "Brasil Império");
    await user.selectOptions(
      screen.getByRole("combobox", { name: "Nome da matéria:" }),
      "1",
    );
    await user.click(screen.getByRole("button", { name: "Salvar alterações" }));

    expect(update).toHaveBeenCalledWith(
      {
        idContent: 1,
        data: {
          content: "Brasil Império",
          idClassroom: 1,
        },
      },
      expect.objectContaining({ onSuccess: expect.any(Function) }),
    );
  });
});
