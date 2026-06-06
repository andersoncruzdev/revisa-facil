import { Outlet } from "react-router-dom";
import HeaderComponent from "@shared/components/Header";

function App() {
  return (
    <>
      <HeaderComponent />
      <main className="mx-auto max-w-6xl px-4 py-8">
        <Outlet />
      </main>
    </>
  );
}

export default App;
