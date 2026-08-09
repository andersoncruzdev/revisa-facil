import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Book, CalendarCheck, ChartSpline, TableOfContents } from "lucide-react";
import SideBar from "@shared/design-system/SideBar";
import { SideBarProvider } from "@shared/providers/SideBarProvider";
import { AddSubjectModal } from "@features/subject/AddSubjectModal";

export default function RootPage() {
  const [isSubjectModalOpen, setIsSubjectModalOpen] = useState(false);
  const options = [
    {name: "Hoje", href: "/", icon: CalendarCheck},
    {name: "Matérias", href: "/subjects", icon: Book},
    {name: "Conteúdos", href: "/content", icon: TableOfContents},
    {name: "Desempenho", href: "/performance", icon: ChartSpline},
  ]

  return (
    <SideBarProvider>
      <SideBar options={options} action={() => setIsSubjectModalOpen(true)}/>
      <main className="mx-auto max-w-6xl px-4 py-8 pb-28 transition-[padding] duration-300 motion-reduce:transition-none md:pb-8 md:pl-72 peer-data-[expanded=false]:md:pl-28">
        <Outlet />
      </main>
      {isSubjectModalOpen && (
        <AddSubjectModal
          open
          onClose={() => setIsSubjectModalOpen(false)}
        />
      )}
    </SideBarProvider>
  );
}
