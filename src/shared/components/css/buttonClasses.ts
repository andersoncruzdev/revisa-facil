export type ButtonVariant = "primary" | "secondary" | "danger";

export const buttonBaseClasses =
  "inline-flex items-center justify-center rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

export const textButtonClasses = {
  primary: `${buttonBaseClasses} gap-2 bg-blue-700 px-4 py-2 text-sm text-white hover:bg-blue-800`,
  secondary: `${buttonBaseClasses} gap-2 bg-slate-100 px-4 py-2 text-sm text-slate-700 hover:bg-slate-200 hover:text-slate-950`,
  danger: `${buttonBaseClasses} gap-2 bg-red-600 px-4 py-2 text-sm text-white hover:bg-red-700`,
} satisfies Record<ButtonVariant, string>;

export const iconButtonClasses = {
  primary: `${buttonBaseClasses} h-10 w-10 shrink-0 bg-blue-700 text-white hover:bg-blue-800`,
  secondary: `${buttonBaseClasses} h-9 w-9 text-slate-600 hover:bg-slate-100 hover:text-slate-950`,
  danger: `${buttonBaseClasses} h-9 w-9 text-red-600 hover:bg-red-50`,
} satisfies Record<ButtonVariant, string>;

export function joinClasses(baseClass: string, extraClass?: string) {
  return extraClass ? `${baseClass} ${extraClass}` : baseClass;
}
