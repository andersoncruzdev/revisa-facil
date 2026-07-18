import { Outlet } from "react-router-dom";
import { CalendarCheck, NotebookText, Settings, TableOfContents } from "lucide-react";
import SideBar from "@shared/design-system/SideBar";
import { SideBarProvider } from "@shared/providers/SideBarProvider";

export default function RootPage() {
  const options = [
    {name: "Hoje", href: "/", icon: CalendarCheck},
    {name: "Conteúdos", href: "/content", icon: TableOfContents},
    {name: "Anotações", href: "/notes", icon: NotebookText},
    {name: "Intervalos", href: "/intervalos", icon: Settings}
  ]

  const openClassroom = () => {
    console.log("fui clicado");
  }

  return (
    <SideBarProvider>
      <SideBar options={options} action={openClassroom}/>
      <main className="mx-auto max-w-6xl px-4 py-8 pb-28 transition-[padding] duration-300 motion-reduce:transition-none md:pb-8 md:pl-72 peer-data-[expanded=false]:md:pl-28">
        <Outlet />
      </main>
    </SideBarProvider>
  );
}
