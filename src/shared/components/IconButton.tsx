import type { MouseEventHandler, ReactNode } from "react";
import {
  iconButtonClasses,
  type ButtonVariant,
} from "./css/buttonClasses";

type ButtonType = "button" | "submit" | "reset";

interface IconButtonProps {
  readonly ariaLabel: string;
  readonly children: ReactNode;
  readonly disabled?: boolean;
  readonly onClick?: MouseEventHandler<HTMLButtonElement>;
  readonly type?: ButtonType;
  readonly variant?: ButtonVariant;
}

export default function IconButton({
  ariaLabel,
  children,
  disabled = false,
  onClick,
  type = "button",
  variant = "secondary",
}: IconButtonProps) {
  return (
    <button
      type={type}
      aria-label={ariaLabel}
      className={iconButtonClasses[variant]}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
