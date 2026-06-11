import { Outlet } from "react-router-dom";
import HeaderComponent from "@shared/components/Header";

export default function RootPage() {
  return (
    <>
      <HeaderComponent />
      <main className="mx-auto max-w-6xl px-4 py-8">
        <Outlet />
      </main>
    </>
  );
}
