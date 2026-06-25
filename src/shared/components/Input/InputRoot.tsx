import { ReactNode } from "react";

interface InputRootProps {
  readonly children: ReactNode;
}

export function InputRoot({ children }: InputRootProps) {
  return (
    <div className="flex flex-row  w-full">
      {children}
    </div>
  );
}
