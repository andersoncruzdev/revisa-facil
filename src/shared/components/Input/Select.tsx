import { ComponentProps } from "react";

interface SelectedProps extends Readonly<ComponentProps<"select">> {
  readonly items?: Array<{ name: string; id: number }>;
  readonly label: string;
  readonly id: string;
  readonly name: string;
}

export function Selected({ items, label, id, name, ...props }: SelectedProps) {
  return (
    <div className="flex flex-col gap-2  w-full">
      <label htmlFor={id} className="text-blue-900 font-semibold">
        {label}
      </label>
      <div aria-label="divisão do input com ícon" className="flex  w-full">
        <select
          id={id}
          name={name}
          className="text-black  w-full p-2 border-2 border-white rounded outline-none transition-all duration-200 focus:border-2 focus:border-blue-500 focus:ring-0"
          {...props}
        >
          {items ? (
            items.map((option) => (
              <option key={option.id + option.name} value={option.id}>
                {option.name.toUpperCase()}
              </option>
            ))
          ) : (
            <option>Sem opções</option>
          )}
        </select>
      </div>
    </div>
  );
}
