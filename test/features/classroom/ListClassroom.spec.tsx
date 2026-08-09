import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useClassroom } from "@hooks/useClassroom";
import ListClassroom from "@features/classroom/ListClassroom";
import type { Classroom } from "@types-app/study";

vi.mock("@hooks/useClassroom", () => ({
  useClassroom: {
    get: vi.fn(),
    add: vi.fn(),
    delete: vi.fn(),
    update: vi.fn(),
  },
}));

type GetClassroomQuery = ReturnType<typeof useClassroom.get>;
type DeleteClassroomMutation = ReturnType<typeof useClassroom.delete>;

const classrooms = [
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
] satisfies Classroom[];

const setupClassroomHooks = (data: Classroom[] | undefined = classrooms) => {
  const mutate = vi.fn();
  const update = vi.fn();

  vi.mocked(useClassroom.get).mockReturnValue({
    data,
  } as GetClassroomQuery);
  vi.mocked(useClassroom.delete).mockReturnValue({
    mutate,
  } as unknown as DeleteClassroomMutation);
  vi.mocked(useClassroom.add).mockReturnValue({
    mutate: vi.fn(),
    isPending: false,
  } as unknown as ReturnType<typeof useClassroom.add>);
  vi.mocked(useClassroom.update).mockReturnValue({
    mutate: update,
    isPending: false,
  } as unknown as ReturnType<typeof useClassroom.update>);

  return { mutate, update };
};

describe("Testes de verificação do 'ListClassroom'", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renderiza a lista de matérias cadastradas", () => {
    setupClassroomHooks();

    render(<ListClassroom />);

    expect(screen.getByLabelText("lista de matérias")).toBeInTheDocument();
    const classroomCard = screen.getByLabelText("Divisão da matéria: Matemática");

    expect(classroomCard).toHaveClass(
      "rounded-xl",
      "border-stone-300",
      "bg-white",
    );
    expect(classroomCard).toHaveStyle({
      boxShadow: "inset 6px 0 0 #2563eb",
    });
    expect(screen.getByLabelText("Divisão da matéria: História")).toBeInTheDocument();
    expect(screen.getByText("MATEMÁTICA")).toBeInTheDocument();
    expect(screen.getByText("HISTÓRIA")).toBeInTheDocument();
  });

  it("exibe mensagem quando não há matérias cadastradas", () => {
    setupClassroomHooks([]);

    render(<ListClassroom />);

    expect(screen.getByText("Sem matérias cadastradas")).toBeInTheDocument();
  });

  it("solicita a exclusão da matéria selecionada", async () => {
    const user = userEvent.setup();
    const { mutate } = setupClassroomHooks();

    render(<ListClassroom />);

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
    expect(mutate).toHaveBeenCalledWith({ idClassroom: 1 });
  });

  it("cancela a exclusão da matéria", async () => {
    const user = userEvent.setup();
    const { mutate } = setupClassroomHooks();

    render(<ListClassroom />);

    await user.click(
      screen.getByRole("button", { name: "Excluir matéria Matemática" }),
    );
    await user.click(screen.getByRole("button", { name: "Cancelar" }));

    expect(mutate).not.toHaveBeenCalled();
    expect(screen.queryByRole("alertdialog")).not.toBeInTheDocument();
  });

  it("edita a matéria selecionada", async () => {
    const user = userEvent.setup();
    const { update } = setupClassroomHooks();

    render(<ListClassroom />);

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
        idClassroom: 1,
        data: { name: "Álgebra", color: "#2563eb" },
      },
      expect.objectContaining({ onSuccess: expect.any(Function) }),
    );
  });
});
