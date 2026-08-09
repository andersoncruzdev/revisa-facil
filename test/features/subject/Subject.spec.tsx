import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useSubject } from "@hooks/useSubject";
import SubjectPage from "@features/subject/Subject";
import type { Subject } from "@types-app/study";

vi.mock("@hooks/useSubject", () => ({
  useSubject: {
    get: vi.fn(),
    delete: vi.fn(),
    add: vi.fn(),
    update: vi.fn(),
  },
}));

type GetSubjectQuery = ReturnType<typeof useSubject.get>;
type DeleteSubjectMutation = ReturnType<typeof useSubject.delete>;
type AddSubjectMutation = ReturnType<typeof useSubject.add>;

const subjects = [
  { id: 1, name: "Matemática", color: "#2563eb" },
  { id: 2, name: "História", color: "#16a34a" },
] satisfies Subject[];

describe("SubjectPage", () => {
  beforeEach(() => {
    vi.mocked(useSubject.get).mockReturnValue({
      data: subjects,
    } as GetSubjectQuery);
    vi.mocked(useSubject.delete).mockReturnValue({
      mutate: vi.fn(),
    } as unknown as DeleteSubjectMutation);
    vi.mocked(useSubject.add).mockReturnValue({
      mutate: vi.fn(),
      isPending: false,
    } as unknown as AddSubjectMutation);
    vi.mocked(useSubject.update).mockReturnValue({
      mutate: vi.fn(),
      isPending: false,
    } as unknown as ReturnType<typeof useSubject.update>);
  });

  it("apresenta e lista as matérias cadastradas", () => {
    render(<SubjectPage />);

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
    render(<SubjectPage />);

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
