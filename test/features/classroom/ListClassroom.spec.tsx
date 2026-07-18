import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useClassroom } from "@hooks/useClassroom";
import ListClassroom from "@features/classroom/ListClassroom";
import type { Classroom } from "@types-app/study";

vi.mock("@hooks/useClassroom", () => ({
  useClassroom: {
    get: vi.fn(),
    delete: vi.fn(),
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

  vi.mocked(useClassroom.get).mockReturnValue({
    data,
  } as GetClassroomQuery);
  vi.mocked(useClassroom.delete).mockReturnValue({
    mutate,
  } as unknown as DeleteClassroomMutation);

  return { mutate };
};

describe("Testes de verificação do 'ListClassroom'", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renderiza a lista de matérias cadastradas", () => {
    setupClassroomHooks();

    render(<ListClassroom />);

    expect(screen.getByLabelText("lista de matérias")).toBeInTheDocument();
    expect(screen.getByLabelText("Divisão da matéria: Matemática")).toBeInTheDocument();
    expect(screen.getByLabelText("Divisão da matéria: História")).toBeInTheDocument();
    expect(screen.getByText("Matemática")).toBeInTheDocument();
    expect(screen.getByText("História")).toBeInTheDocument();
    expect(screen.getByLabelText("Cor da matéria Matemática")).toHaveStyle({
      backgroundColor: "#2563eb",
    });
    expect(screen.getByLabelText("Cor da matéria História")).toHaveStyle({
      backgroundColor: "#16a34a",
    });
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

    expect(mutate).toHaveBeenCalledTimes(1);
    expect(mutate).toHaveBeenCalledWith({ idClassroom: 1 });
  });
});
