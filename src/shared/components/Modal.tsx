import {
  cloneElement,
  type ComponentProps,
  type ReactElement,
  useEffect,
  useId,
  useRef,
} from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

interface ModalProps {
  readonly title: string;
  readonly content: ReactElement<ComponentProps<"form">, "form">;
  readonly open: boolean;
  readonly onClose: () => void;
  readonly isSubmitting?: boolean;
}

export function Modal({
  title,
  content,
  open,
  onClose,
  isSubmitting = false,
}: ModalProps) {
  const titleId = useId();
  const generatedFormId = useId();
  const formId = content.props.id ?? generatedFormId;
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [onClose, open]);

  if (!open) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/70 p-0 sm:items-center sm:p-6"
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="w-full rounded-t-2xl bg-white text-slate-950 shadow-2xl sm:max-w-lg sm:rounded-xl"
      >
        <header className="flex items-center justify-between gap-4 border-b border-slate-200 px-5 py-4 sm:px-6">
          <h2 id={titleId} className="text-xl font-semibold text-slate-950">
            {title}
          </h2>
          <button
            ref={closeButtonRef}
            type="button"
            aria-label="Fechar modal"
            onClick={onClose}
            className="grid h-10 w-10 shrink-0 place-items-center rounded-lg text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 motion-reduce:transition-none"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </header>

        <div className="max-h-[65vh] overflow-y-auto px-5 py-5 sm:px-6">
          {cloneElement(content, { id: formId })}
        </div>
        <footer className="flex flex-col-reverse gap-3 border-t border-slate-200 px-5 py-4 sm:flex-row sm:justify-end sm:px-6">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg px-4 py-2.5 font-medium text-slate-700 transition-colors hover:bg-slate-100 hover:text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 motion-reduce:transition-none"
          >
            Cancelar
          </button>
          <button
            type="submit"
            form={formId}
            disabled={isSubmitting}
            className="rounded-lg bg-blue-700 px-4 py-2.5 font-semibold text-white transition-colors hover:bg-blue-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-60 motion-reduce:transition-none"
          >
            {isSubmitting ? "Enviando..." : "Enviar"}
          </button>
        </footer>
      </section>
    </div>,
    document.body,
  );
}
