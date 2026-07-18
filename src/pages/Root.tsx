import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Book, CalendarCheck, NotebookText, Settings, TableOfContents } from "lucide-react";
import SideBar from "@shared/design-system/SideBar";
import { SideBarProvider } from "@shared/providers/SideBarProvider";
import { AddClassroomModal } from "@features/classroom/AddClassroomModal";

export default function RootPage() {
  const [isClassroomModalOpen, setIsClassroomModalOpen] = useState(false);
  const options = [
    {name: "Hoje", href: "/", icon: CalendarCheck},
    {name: "Matérias", href: "/classrooms", icon: Book},
    {name: "Conteúdos", href: "/content", icon: TableOfContents},
    {name: "Anotações", href: "/notes", icon: NotebookText},
    {name: "Intervalos", href: "/intervalos", icon: Settings}
  ]

  return (
    <SideBarProvider>
      <SideBar options={options} action={() => setIsClassroomModalOpen(true)}/>
      <main className="mx-auto max-w-6xl px-4 py-8 pb-28 transition-[padding] duration-300 motion-reduce:transition-none md:pb-8 md:pl-72 peer-data-[expanded=false]:md:pl-28">
        <Outlet />
      </main>
      {isClassroomModalOpen && (
        <AddClassroomModal
          open
          onClose={() => setIsClassroomModalOpen(false)}
        />
      )}
    </SideBarProvider>
  );
}
