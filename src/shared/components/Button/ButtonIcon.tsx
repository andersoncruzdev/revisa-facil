import type { ElementType } from "react";

type BtnSize = "15" | "20" | "24";

interface ButtonIconProps {
  readonly icon: ElementType;
  readonly size?: BtnSize;
}

export default function ButtonIcon({
  icon: Icon,
  size = "20",
}: ButtonIconProps) {
  return <Icon aria-hidden={true} size={size} />;
}
