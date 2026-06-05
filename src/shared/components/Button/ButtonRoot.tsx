import type { ComponentProps, ReactNode } from "react";

interface ButtonRootProps extends Readonly<ComponentProps<"button">> {
  readonly children: ReactNode;
  readonly color?: ButtonRootClass;
  readonly rounded?: boolean;
}

export default function ButtonRoot({
  children,
  rounded,
  color = "blue",
  ...props
}: ButtonRootProps) {
  return (
    <button
      className={`inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${buttonRootClass[color]} ${
        rounded ? buttonShapeClass.rounded : buttonShapeClass.default
      }`}
      {...props}
    >
      {children}
    </button>
  );
}

const buttonRootClass = {
  blue: "bg-blue-700 text-white hover:bg-blue-800",
  slate: "bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-950",
  red: "bg-red-600 text-white hover:bg-red-700",
};

type ButtonRootClass = keyof typeof buttonRootClass;

const buttonShapeClass = {
  default: "gap-2 rounded-lg px-4 py-2",
  rounded: "h-10 w-10 shrink-0 rounded-full p-0",
};
