import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Modal } from "@shared/components/Modal";

describe("Modal", () => {
  it("renderiza o título, o conteúdo e as ações fixas", () => {
    render(
      <Modal
        title="Nova matéria"
        content={
          <form>
            <input aria-label="Nome" />
          </form>
        }
        open
        onClose={vi.fn()}
      />,
    );

    expect(screen.getByRole("dialog", { name: "Nova matéria" })).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: "Nome" })).toBeInTheDocument();
    const submitButton = screen.getByRole("button", { name: "Enviar" });
    const contentForm = screen.getByRole("textbox", { name: "Nome" }).closest("form");

    expect(submitButton).toHaveAttribute(
      "type",
      "submit",
    );
    expect(submitButton).toHaveAttribute("form", contentForm?.id);
    expect(screen.getByRole("button", { name: "Cancelar" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Fechar modal" })).toBeInTheDocument();
  });

  it("submete o formulário recebido", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn((event) => event.preventDefault());

    render(
      <Modal
        title="Nova matéria"
        content={
          <form onSubmit={onSubmit}>
            <input aria-label="Nome" name="name" />
          </form>
        }
        open
        onClose={vi.fn()}
      />,
    );

    await user.type(screen.getByRole("textbox", { name: "Nome" }), "Química");
    await user.click(screen.getByRole("button", { name: "Enviar" }));

    expect(onSubmit).toHaveBeenCalledTimes(1);
  });

  it.each(["Cancelar", "Fechar modal"])("fecha pelo botão %s", async (name) => {
    const user = userEvent.setup();
    const onClose = vi.fn();

    render(
      <Modal
        title="Nova matéria"
        content={<form><p>Conteúdo</p></form>}
        open
        onClose={onClose}
      />,
    );

    await user.click(screen.getByRole("button", { name }));

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("fecha ao pressionar Escape", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();

    render(
      <Modal
        title="Nova matéria"
        content={<form><p>Conteúdo</p></form>}
        open
        onClose={onClose}
      />,
    );

    await user.keyboard("{Escape}");

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("desabilita o envio enquanto está submetendo", () => {
    render(
      <Modal
        title="Nova matéria"
        content={<form />}
        open
        onClose={vi.fn()}
        isSubmitting
      />,
    );

    expect(screen.getByRole("button", { name: "Enviando..." })).toBeDisabled();
  });
});
