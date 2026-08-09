import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useSubject } from "@hooks/useSubject";
import ListSubject from "@features/subject/ListSubject";
import type { Subject } from "@types-app/study";

vi.mock("@hooks/useSubject", () => ({
  useSubject: {
    get: vi.fn(),
    add: vi.fn(),
    delete: vi.fn(),
    update: vi.fn(),
  },
}));

type GetSubjectQuery = ReturnType<typeof useSubject.get>;
type DeleteSubjectMutation = ReturnType<typeof useSubject.delete>;

const subjects = [
  {
    id: 1,
    name: "Matemática",
    color: "#2563eb",
  },
  {
    id: 2,
    name: "História",
    color: "#16a34a",
  },
] satisfies Subject[];

const setupSubjectHooks = (data: Subject[] | undefined = subjects) => {
  const mutate = vi.fn();
  const update = vi.fn();

  vi.mocked(useSubject.get).mockReturnValue({
    data,
  } as GetSubjectQuery);
  vi.mocked(useSubject.delete).mockReturnValue({
    mutate,
  } as unknown as DeleteSubjectMutation);
  vi.mocked(useSubject.add).mockReturnValue({
    mutate: vi.fn(),
    isPending: false,
  } as unknown as ReturnType<typeof useSubject.add>);
  vi.mocked(useSubject.update).mockReturnValue({
    mutate: update,
    isPending: false,
  } as unknown as ReturnType<typeof useSubject.update>);

  return { mutate, update };
};

describe("Testes de verificação do 'ListSubject'", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renderiza a lista de matérias cadastradas", () => {
    setupSubjectHooks();

    render(<ListSubject />);

    expect(screen.getByLabelText("lista de matérias")).toBeInTheDocument();
    const subjectCard = screen.getByLabelText("Divisão da matéria: Matemática");

    expect(subjectCard).toHaveClass(
      "rounded-xl",
      "border-stone-300",
      "bg-white",
    );
    expect(subjectCard).toHaveStyle({
      boxShadow: "inset 6px 0 0 #2563eb",
    });
    expect(screen.getByLabelText("Divisão da matéria: História")).toBeInTheDocument();
    expect(screen.getByText("MATEMÁTICA")).toBeInTheDocument();
    expect(screen.getByText("HISTÓRIA")).toBeInTheDocument();
  });

  it("oferece cadastrar a primeira matéria no estado vazio", async () => {
    const user = userEvent.setup();
    const onAddSubject = vi.fn();
    setupSubjectHooks([]);

    render(<ListSubject onAddSubject={onAddSubject} />);

    expect(
      screen.getByText("Você ainda não possui matérias."),
    ).toBeInTheDocument();

    await user.click(
      screen.getByRole("button", { name: "Adicionar primeira matéria" }),
    );

    expect(onAddSubject).toHaveBeenCalledTimes(1);
  });

  it("solicita a exclusão da matéria selecionada", async () => {
    const user = userEvent.setup();
    const { mutate } = setupSubjectHooks();

    render(<ListSubject />);

    await user.click(
      screen.getByRole("button", { name: "Excluir matéria Matemática" }),
    );

    expect(mutate).not.toHaveBeenCalled();
    expect(
      screen.getByRole("alertdialog", { name: "Excluir matéria?" }),
    ).toHaveTextContent(
      "Todos os conteúdos vinculados a Matemática também serão excluídos.",
    );

    await user.click(screen.getByRole("button", { name: "Confirmar exclusão" }));

    expect(mutate).toHaveBeenCalledTimes(1);
    expect(mutate).toHaveBeenCalledWith({ subjectId: 1 });
  });

  it("cancela a exclusão da matéria", async () => {
    const user = userEvent.setup();
    const { mutate } = setupSubjectHooks();

    render(<ListSubject />);

    await user.click(
      screen.getByRole("button", { name: "Excluir matéria Matemática" }),
    );
    await user.click(screen.getByRole("button", { name: "Cancelar" }));

    expect(mutate).not.toHaveBeenCalled();
    expect(screen.queryByRole("alertdialog")).not.toBeInTheDocument();
  });

  it("exibe o erro ao falhar ao excluir uma matéria", () => {
    setupSubjectHooks();
    vi.mocked(useSubject.delete).mockReturnValue({
      mutate: vi.fn(),
      error: new Error("Não foi possível excluir a matéria"),
    } as unknown as DeleteSubjectMutation);

    render(<ListSubject />);

    expect(screen.getByRole("alert")).toHaveTextContent(
      "Não foi possível excluir a matéria",
    );
  });

  it("edita a matéria selecionada", async () => {
    const user = userEvent.setup();
    const { update } = setupSubjectHooks();

    render(<ListSubject />);

    await user.click(
      screen.getByRole("button", { name: "Editar matéria Matemática" }),
    );

    const nameInput = screen.getByRole("textbox", { name: "Nome da matéria:" });
    expect(nameInput).toHaveValue("Matemática");

    await user.clear(nameInput);
    await user.type(nameInput, "Álgebra");
    await user.click(screen.getByRole("button", { name: "Salvar alterações" }));

    expect(update).toHaveBeenCalledWith(
      {
        subjectId: 1,
        data: { name: "Álgebra", color: "#2563eb" },
      },
      expect.objectContaining({ onSuccess: expect.any(Function) }),
    );
  });
});
