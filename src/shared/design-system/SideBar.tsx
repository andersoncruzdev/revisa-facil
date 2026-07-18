import type { ComponentProps, ElementType } from "react";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { useSideBar } from "@hooks/useSideBar";

interface SideBarProps extends Readonly<ComponentProps<"aside">> {
  readonly options: Array<{
    name: string;
    href: string;
    icon: ElementType;
  }>;
  readonly action: () => void;
}

export default function SideBar({ options, action, className = "", ...props }: SideBarProps) {
  const { activeHref, expanded, setActiveHref, toggleExpanded } = useSideBar();

  return (
    <aside
      data-expanded={expanded}
      className={`peer fixed inset-x-0 bottom-0 z-40 flex min-h-20 items-center bg-blue-950 px-2 py-2 text-blue-50 shadow-[0_-4px_8px_rgba(15,23,42,0.18)] transition-[width] duration-300 motion-reduce:transition-none md:inset-y-0 md:left-0 md:right-auto md:min-h-0 md:flex-col md:items-stretch md:justify-between md:py-5 md:shadow-none ${
        expanded ? "md:w-64" : "md:w-20"
      } ${className}`}
      {...props}
    >
      <div className="hidden items-center justify-between gap-3 px-3 md:flex">
        <div className={`min-w-0 ${expanded ? "block" : "hidden"}`}>
          <p className="truncate text-lg font-semibold text-white">RevisaFácil</p>
          <p className="truncate text-xs text-blue-200">Ciclo de estudos</p>
        </div>

        <button
          type="button"
          aria-label={expanded ? "Recolher menu" : "Expandir menu"}
          aria-expanded={expanded}
          onClick={toggleExpanded}
          className="ml-auto grid h-10 w-10 shrink-0 place-items-center rounded-lg text-blue-100 transition-colors hover:bg-blue-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-200 motion-reduce:transition-none"
        >
          {expanded ? (
            <ChevronLeft className="h-5 w-5" aria-hidden="true" />
          ) : (
            <ChevronRight className="h-5 w-5" aria-hidden="true" />
          )}
        </button>
      </div>

      <nav
        aria-label="Navegação principal"
        className="flex min-w-0 flex-1 items-stretch gap-1 overflow-x-auto md:my-6 md:flex-col md:overflow-visible"
      >
        {options.map((option) => (
          <Link
            key={option.name}
            to={option.href}
            aria-current={activeHref === option.href ? "page" : undefined}
            aria-label={option.name}
            title={!expanded ? option.name : undefined}
            onClick={() => setActiveHref(option.href)}
            className={`flex min-w-16 flex-1 flex-col items-center justify-center gap-1 rounded-lg px-2 py-2 text-[0.6875rem] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-200 motion-reduce:transition-none md:min-w-0 md:flex-none md:flex-row md:justify-start md:gap-3 md:px-3 md:py-3 md:text-sm ${
              activeHref === option.href
                ? "bg-blue-100 text-blue-950"
                : "text-blue-100 hover:bg-blue-900 hover:text-white"
            }`}
          >
            <option.icon className="h-5 w-5 shrink-0" aria-hidden="true" />
            <span className={expanded ? "md:block" : "md:hidden"}>
              {option.name}
            </span>
          </Link>
        ))}
      </nav>

      <button
        type="button"
        aria-label="Adicionar nova matéria"
        onClick={action}
        className="ml-1 flex min-w-16 flex-col items-center justify-center gap-1 rounded-lg bg-blue-700 px-2 py-2 text-[0.6875rem] font-semibold text-white transition-colors hover:bg-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-200 motion-reduce:transition-none md:ml-0 md:min-w-0 md:flex-row md:gap-2 md:px-3 md:py-3 md:text-sm"
      >
        <Plus className="h-5 w-5 shrink-0" aria-hidden="true" />
        <span className={expanded ? "md:block" : "md:hidden"}>Nova matéria</span>
      </button>
    </aside>
  );
}
