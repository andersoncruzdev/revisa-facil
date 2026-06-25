import { ComponentProps, ReactNode } from "react";

interface TextFieldProps extends Readonly<ComponentProps<"input">> {
  readonly placeholder: string;
  readonly label: string;
  readonly id: string;
  readonly name: string;
  readonly type?: string;
  readonly children?: ReactNode;
}

export function TextField({
  placeholder,
  label,
  id,
  name,
  type = "text",
  children = undefined,
  ...props
}: TextFieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-blue-900 font-semibold">
        {label}
      </label>
      <div aria-label="divisão do input com ícon" className="flex">
        <input
          type={type}
          id={id}
          name={name}
          placeholder={placeholder}
          className="text-black"
          {...props}
        />
        {children}
      </div>
    </div>
  );
}
