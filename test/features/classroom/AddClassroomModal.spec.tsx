import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { classroomColors } from "@constants/classroom-colors";
import { useClassroom } from "@hooks/useClassroom";
import { AddClassroomModal } from "@features/classroom/AddClassroomModal";

vi.mock("@hooks/useClassroom", () => ({
  useClassroom: {
    add: vi.fn(),
    update: vi.fn(),
  },
}));

type AddClassroomMutation = ReturnType<typeof useClassroom.add>;

describe("AddClassroomModal", () => {
  it("envia a matéria e fecha após o sucesso", async () => {
    const user = userEvent.setup();
    const mutate = vi.fn();
    const onClose = vi.fn();

    vi.mocked(useClassroom.add).mockReturnValue({
      mutate,
      isPending: false,
    } as unknown as AddClassroomMutation);
    vi.mocked(useClassroom.update).mockReturnValue({
      mutate: vi.fn(),
      isPending: false,
    } as unknown as ReturnType<typeof useClassroom.update>);

    render(<AddClassroomModal open onClose={onClose} />);

    await user.type(
      screen.getByRole("textbox", { name: "Nome da matéria:" }),
      " Matemática ",
    );
    await user.click(screen.getByRole("button", { name: "Selecionar cor rosa" }));
    await user.click(screen.getByRole("button", { name: "Enviar" }));

    expect(mutate).toHaveBeenCalledWith(
      { name: "Matemática", color: classroomColors.rosa },
      expect.objectContaining({ onSuccess: expect.any(Function) }),
    );

    act(() => {
      const options = mutate.mock.calls[0][1] as { onSuccess: () => void };
      options.onSuccess();
    });

    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
