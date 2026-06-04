import type { MouseEventHandler, ReactNode } from "react";
import {
  textButtonClasses,
  type ButtonVariant,
} from "./css/buttonClasses";

type ButtonType = "button" | "submit" | "reset";

interface TextButtonProps {
  readonly ariaLabel?: string;
  readonly children: ReactNode;
  readonly disabled?: boolean;
  readonly onClick?: MouseEventHandler<HTMLButtonElement>;
  readonly type?: ButtonType;
  readonly variant?: ButtonVariant;
}

export default function TextButton({
  ariaLabel,
  children,
  disabled = false,
  onClick,
  type = "button",
  variant = "primary",
}: TextButtonProps) {
  return (
    <button
      type={type}
      aria-label={ariaLabel}
      className={textButtonClasses[variant]}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
