import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { subjectColors } from "@constants/subject-colors";
import { useSubject } from "@hooks/useSubject";
import { AddSubjectModal } from "@features/subject/AddSubjectModal";

vi.mock("@hooks/useSubject", () => ({
  useSubject: {
    add: vi.fn(),
    update: vi.fn(),
  },
}));

type AddSubjectMutation = ReturnType<typeof useSubject.add>;

describe("AddSubjectModal", () => {
  it("envia a matéria e fecha após o sucesso", async () => {
    const user = userEvent.setup();
    const mutate = vi.fn();
    const onClose = vi.fn();

    vi.mocked(useSubject.add).mockReturnValue({
      mutate,
      isPending: false,
    } as unknown as AddSubjectMutation);
    vi.mocked(useSubject.update).mockReturnValue({
      mutate: vi.fn(),
      isPending: false,
    } as unknown as ReturnType<typeof useSubject.update>);

    render(<AddSubjectModal open onClose={onClose} />);

    await user.type(
      screen.getByRole("textbox", { name: "Nome da matéria:" }),
      " Matemática ",
    );
    await user.click(screen.getByRole("button", { name: "Selecionar cor rosa" }));
    await user.click(screen.getByRole("button", { name: "Enviar" }));

    expect(mutate).toHaveBeenCalledWith(
      { name: "Matemática", color: subjectColors.rosa },
      expect.objectContaining({ onSuccess: expect.any(Function) }),
    );

    act(() => {
      const options = mutate.mock.calls[0][1] as { onSuccess: () => void };
      options.onSuccess();
    });

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("exibe o erro ao falhar ao adicionar uma matéria", () => {
    vi.mocked(useSubject.add).mockReturnValue({
      mutate: vi.fn(),
      isPending: false,
      error: new Error("Não foi possível adicionar a matéria"),
    } as unknown as AddSubjectMutation);
    vi.mocked(useSubject.update).mockReturnValue({
      mutate: vi.fn(),
      isPending: false,
      error: null,
    } as unknown as ReturnType<typeof useSubject.update>);

    render(<AddSubjectModal open onClose={vi.fn()} />);

    expect(screen.getByRole("alert")).toHaveTextContent(
      "Não foi possível adicionar a matéria",
    );
  });
});
