import { render, screen } from "@testing-library/react";
import { useClassroom } from "@hooks/useClassroom";
import ClassroomPage from "@features/classroom/Classroom";
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
  { id: 1, name: "Matemática", color: "#2563eb" },
  { id: 2, name: "História", color: "#16a34a" },
] satisfies Classroom[];

describe("ClassroomPage", () => {
  it("apresenta e lista as matérias cadastradas", () => {
    vi.mocked(useClassroom.get).mockReturnValue({
      data: classrooms,
    } as GetClassroomQuery);
    vi.mocked(useClassroom.delete).mockReturnValue({
      mutate: vi.fn(),
    } as unknown as DeleteClassroomMutation);

    render(<ClassroomPage />);

    expect(
      screen.getByRole("heading", { level: 1, name: "Matérias" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Organize as matérias do seu ciclo de estudos."))
      .toBeInTheDocument();
    expect(screen.getByText("Matemática")).toBeInTheDocument();
    expect(screen.getByText("História")).toBeInTheDocument();
  });
});
