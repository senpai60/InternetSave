import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import PageTransition from "../transitions/PageTransition";

const MainLayout = () => {
  return (
    <main className="w-full min-h-screen bg-zinc-950 text-zinc-50 overflow-x-hidden">
      <Navbar />
      <PageTransition>
        <Outlet />
      </PageTransition>
    </main>
  );
};

export default MainLayout;
