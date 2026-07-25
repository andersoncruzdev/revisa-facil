import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AddContentModal from "@features/content/AddContent";
import { useClassroom } from "@hooks/useClassroom";
import { useContent } from "@hooks/useContent";

vi.mock("@hooks/useClassroom", () => ({
  useClassroom: {
    get: vi.fn(),
  },
}));

vi.mock("@hooks/useContent", () => ({
  useContent: {
    add: vi.fn(),
  },
}));

describe("AddContentModal", () => {
  it("envia o id da matéria selecionada", async () => {
    const user = userEvent.setup();
    const mutate = vi.fn();
    const onClose = vi.fn();
    vi.setSystemTime(new Date(2026, 6, 25));

    vi.mocked(useClassroom.get).mockReturnValue({
      data: [
        { id: 1, name: "Português", color: "#000" },
        { id: 2, name: "Matemática", color: "#fff" },
      ],
    } as ReturnType<typeof useClassroom.get>);
    vi.mocked(useContent.add).mockReturnValue({
      mutate,
      isPending: false,
    } as ReturnType<typeof useContent.add>);

    render(<AddContentModal open onClose={onClose} />);

    await user.type(
      screen.getByRole("textbox", { name: "Nome do conteúdo:" }),
      "Equações",
    );
    await user.selectOptions(
      screen.getByRole("combobox", { name: "Nome da matéria:" }),
      "2",
    );
    await user.click(screen.getByRole("button", { name: "Enviar" }));

    expect(mutate).toHaveBeenCalledWith(
      {
        idClassroom: 2,
        data: {
          content: "Equações",
          studied: "25/07/2026",
          nextRevision: "31/07/2026",
        },
      },
      expect.objectContaining({ onSuccess: expect.any(Function) }),
    );
  });
});
