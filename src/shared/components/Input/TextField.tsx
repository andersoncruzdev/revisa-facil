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
    <div className="flex flex-col gap-2  w-full">
      <label htmlFor={id} className="text-blue-900 font-semibold">
        {label}
      </label>
      <div aria-label="divisão do input com ícon" className="flex  w-full">
        <input
          type={type}
          id={id}
          name={name}
          placeholder={placeholder}
          className="text-black  w-full p-2 border-2 border-white rounded outline-none transition-all duration-200 focus:border-2 focus:border-blue-500 focus:ring-0"
          {...props}
        />
        {children}
      </div>
    </div>
  );
}
