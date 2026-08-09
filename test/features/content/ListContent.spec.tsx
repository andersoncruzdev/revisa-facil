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

const setupHooks = (
  data: Content[] | undefined = contents,
  classroomData: Classroom[] | undefined = classrooms,
) => {
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
    data: classroomData,
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

  it("oferece cadastrar o primeiro conteúdo no estado vazio", async () => {
    const user = userEvent.setup();
    const onAddContent = vi.fn();
    setupHooks([]);

    render(<ListContent onAddContent={onAddContent} />);

    expect(
      screen.getByText("Você ainda não possui conteúdos."),
    ).toBeInTheDocument();

    await user.click(
      screen.getByRole("button", { name: "Adicionar primeiro conteúdo" }),
    );

    expect(onAddContent).toHaveBeenCalledTimes(1);
  });

  it("oferece cadastrar uma matéria antes do primeiro conteúdo", async () => {
    const user = userEvent.setup();
    const onAddClassroom = vi.fn();
    setupHooks([], []);

    render(<ListContent onAddClassroom={onAddClassroom} />);

    expect(
      screen.getByText(
        "Você precisa cadastrar uma matéria antes de adicionar conteúdos.",
      ),
    ).toBeInTheDocument();

    await user.click(
      screen.getByRole("button", { name: "Adicionar primeira matéria" }),
    );

    expect(onAddClassroom).toHaveBeenCalledTimes(1);
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

    expect(mutate).not.toHaveBeenCalled();
    expect(
      screen.getByRole("alertdialog", { name: "Excluir conteúdo?" }),
    ).toHaveTextContent("Esta ação não pode ser desfeita.");

    await user.click(screen.getByRole("button", { name: "Confirmar exclusão" }));

    expect(mutate).toHaveBeenCalledWith({ idContent: 1 });
  });

  it("cancela a exclusão do conteúdo", async () => {
    const user = userEvent.setup();
    const { mutate } = setupHooks();

    render(<ListContent />);

    await user.click(
      screen.getByRole("button", {
        name: "Excluir conteúdo Brasil Colônia",
      }),
    );
    await user.click(screen.getByRole("button", { name: "Cancelar" }));

    expect(mutate).not.toHaveBeenCalled();
    expect(screen.queryByRole("alertdialog")).not.toBeInTheDocument();
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
