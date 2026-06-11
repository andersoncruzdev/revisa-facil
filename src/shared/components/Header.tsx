import { BookOpen } from "lucide-react";
import { useHeader } from "@hooks/useHeader";

type NavigationBtn = {
  name: string;
  href: string;
};

const navigationBtns: NavigationBtn[] = [
  { name: "Dashboard", href: "/" },
  { name: "Matérias", href: "/classrooms" },
  { name: "Conteúdos", href: "/conteudos" },
  { name: "Revisões", href: "/revisoes" },
  { name: "Histórico", href: "/historico" },
];

export default function HeaderComponent() {
  const { active, setActive } = useHeader(navigationBtns[0].href);

  return (
    <header className="sticky top-0 z-40 border-b bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-3 md:h-16 md:flex-row md:items-center md:justify-between md:py-0">
        <section
          className="flex items-center gap-3"
          aria-label="Identidade visual"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-700 text-white">
            <BookOpen
              data-testid="icon-bookopen-header"
              className="h-6 w-6"
              aria-hidden="true"
              strokeWidth={2.2}
            />
          </div>

          <div className="flex flex-col" aria-label="Título principal">
            <h1
              data-testid="h1-header"
              className="text-lg font-bold leading-none text-slate-900"
            >
              RevisaFácil
            </h1>
            <h2
              data-testid="h2-header"
              className="text-sm leading-tight text-slate-500"
            >
              Revisões espaçadas
            </h2>
          </div>
        </section>

        <nav
          className="flex items-center gap-2 overflow-x-auto"
          aria-label="Navegação principal"
        >
          {navigationBtns.map((btn) => (
            <a
              key={btn.href}
              href={btn.href}
              onClick={() => setActive(btn.href)}
              aria-current={active === btn.href ? "page" : undefined}
              className={`rounded-xl px-4 py-2 text-sm font-medium transition-colors ${
                active === btn.href
                  ? "bg-slate-100 text-slate-950"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-950"
              }`}
            >
              {btn.name}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
