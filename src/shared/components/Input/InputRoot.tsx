import { ReactNode } from "react";

interface InputRootProps {
  readonly children: ReactNode;
}

export function InputRoot({ children }: InputRootProps) {
  return (
    <div className="flex flex-col gap-4 w-full">
      {children}
    </div>
  );
}
