import { Menu, X } from "lucide-react";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const links = [
    { name: "Home", path: "/" },
    { name: "Saved", path: "/saved" },
    { name: "Dashboard", path: "/dashboard" },
    { name: "Settings", path: "/settings" },
    { name: "Profile", path: "/profile" },
    { name: "Logout", path: "/logout" },
  ];

  const [open, setOpen] = useState(false);

  const handleNavigate = (path) => {
    navigate(path);
    setOpen(false);
  };

  return (
    <nav className="w-full px-10 py-4 flex items-center justify-between fixed z-999">
      <div
        className="logo flex items-center gap-2 cursor-pointer"
        onClick={() => handleNavigate("/")}
      >
        <div className="logo-img w-6 h-6">
          <img src="/logo-white.png" alt="" />
        </div>
        <h4>Linkora</h4>
      </div>
      <div
        onClick={() => setOpen((prev) => !prev)}
        className="menu cursor-pointer w-7 h-7 flex items-center justify-center p-1 hover:bg-white hover:text-black transition-all duration-200 rounded-lg"
      >
        {open ? <X /> : <Menu />}
      </div>
      <div
        className={`context-menu fixed z-9999 w-46 top-16 right-10 bg-zinc-100 border border-zinc-200 shadow-xl rounded-xl p-2 transition-all duration-300 transform origin-top-right ${
          open
            ? "scale-100 opacity-100 flex flex-col gap-1 items-start justify-center"
            : "scale-95 opacity-0 pointer-events-none hidden"
        }`}
      >
        {links.map((link, i) => {
          const isActive = location.pathname === link.path;
          return (
            <div
              key={i}
              onClick={() => handleNavigate(link.path)}
              className={`group w-full px-4 py-2.5 rounded-lg transition-all duration-300 cursor-pointer flex items-center ${
                isActive ? "bg-black" : "hover:bg-zinc-200"
              }`}
            >
              <h3
                className={`text-sm font-medium transition-colors duration-300 ${
                  link.name === "Logout"
                    ? "text-red-600 group-hover:text-red-500"
                    : isActive
                      ? "text-white"
                      : "text-zinc-900 group-hover:text-black"
                }`}
              >
                {link.name}
              </h3>
            </div>
          );
        })}
      </div>
    </nav>
  );
};

export default Navbar;
