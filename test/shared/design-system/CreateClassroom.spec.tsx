import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { classroomColors } from "../../../src/constants/classroom-colors";
import { useClassroom } from "@hooks/useClassroom";
import CreateClassroom from "@shared/design-system/CreateClassroom";

vi.mock("@hooks/useClassroom", () => ({
  useClassroom: {
    add: vi.fn(),
  },
}));

type AddClassroomMutation = ReturnType<typeof useClassroom.add>;

const setupAddClassroom = (isPending = false) => {
  const mutate = vi.fn();

  vi.mocked(useClassroom.add).mockReturnValue({
    mutate,
    isPending,
  } as unknown as AddClassroomMutation);

  return { mutate };
};

describe("Testes de verificação do 'CreateClassroom'", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(console, "log").mockImplementation(() => undefined);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("renderiza o formulário de criação de matéria", () => {
    setupAddClassroom();

    render(<CreateClassroom />);

    expect(
      screen.getByRole("heading", { level: 2, name: "Criar nova matéria" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("textbox", { name: "Nome da matéria:" }),
    ).toBeRequired();
    expect(screen.getByLabelText("Cores da matéria")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Adicionar" })).toHaveAttribute(
      "type",
      "submit",
    );
    expect(screen.getByRole("button", { name: "Selecionar cor azul" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
  });

  it("envia o nome e a cor selecionada ao submeter", async () => {
    const user = userEvent.setup();
    const { mutate } = setupAddClassroom();

    render(<CreateClassroom />);

    await user.type(
      screen.getByRole("textbox", { name: "Nome da matéria:" }),
      " Matemática ",
    );
    await user.click(screen.getByRole("button", { name: "Selecionar cor rosa" }));
    await user.click(screen.getByRole("button", { name: "Adicionar" }));

    expect(mutate).toHaveBeenCalledWith(
      {
        name: "Matemática",
        color: classroomColors.rosa,
      },
      expect.objectContaining({
        onSuccess: expect.any(Function),
      }),
    );
  });

  it("limpa o formulário e volta para a cor padrão após salvar", async () => {
    const user = userEvent.setup();
    const { mutate } = setupAddClassroom();

    render(<CreateClassroom />);

    await user.type(
      screen.getByRole("textbox", { name: "Nome da matéria:" }),
      "Biologia",
    );
    await user.click(screen.getByRole("button", { name: "Selecionar cor roxo" }));
    await user.click(screen.getByRole("button", { name: "Adicionar" }));

    act(() => {
      const options = mutate.mock.calls[0][1] as { onSuccess: () => void };
      options.onSuccess();
    });

    expect(screen.getByRole("textbox", { name: "Nome da matéria:" })).toHaveValue(
      "",
    );
    expect(screen.getByRole("button", { name: "Selecionar cor azul" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    expect(screen.getByRole("button", { name: "Selecionar cor roxo" })).toHaveAttribute(
      "aria-pressed",
      "false",
    );
  });

  it("desabilita o botão enquanto a criação está pendente", () => {
    setupAddClassroom(true);

    render(<CreateClassroom />);

    expect(screen.getByRole("button", { name: "Adicionando..." })).toBeDisabled();
  });
});
