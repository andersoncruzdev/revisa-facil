import { ElementType } from "react";

export interface InputIconProps {
  readonly icon: ElementType;
}

export function InputIcon({ icon: Icon }: InputIconProps) {
  return <Icon aria-hidden={true} size="20" color="gray" />;
}
