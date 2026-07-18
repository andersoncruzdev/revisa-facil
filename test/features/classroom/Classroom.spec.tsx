import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useClassroom } from "@hooks/useClassroom";
import ClassroomPage from "@features/classroom/Classroom";
import type { Classroom } from "@types-app/study";

vi.mock("@hooks/useClassroom", () => ({
  useClassroom: {
    get: vi.fn(),
    delete: vi.fn(),
    add: vi.fn(),
  },
}));

type GetClassroomQuery = ReturnType<typeof useClassroom.get>;
type DeleteClassroomMutation = ReturnType<typeof useClassroom.delete>;
type AddClassroomMutation = ReturnType<typeof useClassroom.add>;

const classrooms = [
  { id: 1, name: "Matemática", color: "#2563eb" },
  { id: 2, name: "História", color: "#16a34a" },
] satisfies Classroom[];

describe("ClassroomPage", () => {
  beforeEach(() => {
    vi.mocked(useClassroom.get).mockReturnValue({
      data: classrooms,
    } as GetClassroomQuery);
    vi.mocked(useClassroom.delete).mockReturnValue({
      mutate: vi.fn(),
    } as unknown as DeleteClassroomMutation);
    vi.mocked(useClassroom.add).mockReturnValue({
      mutate: vi.fn(),
      isPending: false,
    } as unknown as AddClassroomMutation);
  });

  it("apresenta e lista as matérias cadastradas", () => {
    render(<ClassroomPage />);

    expect(
      screen.getByRole("heading", { level: 1, name: "Matérias" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Organize as matérias do seu ciclo de estudos."))
      .toBeInTheDocument();
    expect(screen.getByText("MATEMÁTICA")).toBeInTheDocument();
    expect(screen.getByText("HISTÓRIA")).toBeInTheDocument();
  });

  it("abre e fecha o modal para adicionar matéria", async () => {
    const user = userEvent.setup();
    render(<ClassroomPage />);

    await user.click(screen.getByRole("button", { name: "Adicionar matéria" }));

    expect(
      screen.getByRole("dialog", { name: "Adicionar matéria" }),
    ).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Cancelar" }));

    expect(
      screen.queryByRole("dialog", { name: "Adicionar matéria" }),
    ).not.toBeInTheDocument();
  });
});
