import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, User, LogOut, Lock, BarChart2, List, PlusCircle, CheckSquare } from "lucide-react";
import { currentUser } from "../mockData";

const navLinks = [
  { to: "/", label: "Home", icon: null },
  { to: "/statistics", label: "Statistics", icon: <BarChart2 size={15} /> },
  { to: "/workshop-types", label: "Workshop Types", icon: <List size={15} /> },
  { to: "/propose", label: "Propose Workshop", icon: <PlusCircle size={15} />, coordinatorOnly: true },
  { to: "/my-workshops", label: "My Workshops", icon: <CheckSquare size={15} /> },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [dropOpen, setDropOpen] = useState(false);
  const { pathname } = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-14">

        {/* Brand */}
        <Link to="/" className="flex items-center gap-2 text-white font-extrabold text-base tracking-tight">
          <span className="w-2 h-2 rounded-full bg-orange-400 inline-block" />
          FOSSEE Workshops
        </Link>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks
            .filter((l) => !l.coordinatorOnly || !currentUser.is_instructor)
            .map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  pathname === l.to
                    ? "bg-white/15 text-white"
                    : "text-slate-300 hover:bg-white/10 hover:text-white"
                }`}
              >
                {l.icon}
                {l.label}
              </Link>
            ))}
        </div>

        {/* User menu */}
        <div className="hidden lg:flex items-center">
          <div className="relative">
            <button
              onClick={() => setDropOpen((p) => !p)}
              className="flex items-center gap-2 text-slate-300 hover:text-white px-3 py-1.5 rounded-md text-sm font-medium transition-colors"
              aria-expanded={dropOpen}
              aria-haspopup="true"
            >
              <span className="w-7 h-7 rounded-full bg-indigo-500 flex items-center justify-center text-white text-xs font-bold">
                {currentUser.first_name[0]}
              </span>
              {currentUser.full_name}
              <ChevronDown size={14} className={`transition-transform ${dropOpen ? "rotate-180" : ""}`} />
            </button>
            {dropOpen && (
              <div className="absolute right-0 mt-1 w-48 bg-white rounded-xl border border-slate-200 shadow-xl py-1 z-50">
                <Link to="/profile" className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50" onClick={() => setDropOpen(false)}>
                  <User size={14} /> Profile
                </Link>
                <Link to="/change-password" className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50" onClick={() => setDropOpen(false)}>
                  <Lock size={14} /> Change Password
                </Link>
                <div className="my-1 border-t border-slate-100" />
                <Link to="/logout" className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50" onClick={() => setDropOpen(false)}>
                  <LogOut size={14} /> Logout
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden text-slate-300 hover:text-white p-1.5 rounded-md"
          onClick={() => setOpen((p) => !p)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="lg:hidden bg-slate-800 border-t border-slate-700 px-4 py-3 flex flex-col gap-1">
          {navLinks
            .filter((l) => !l.coordinatorOnly || !currentUser.is_instructor)
            .map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  pathname === l.to
                    ? "bg-white/15 text-white"
                    : "text-slate-300 hover:bg-white/10 hover:text-white"
                }`}
              >
                {l.icon}
                {l.label}
              </Link>
            ))}
          <div className="mt-2 pt-2 border-t border-slate-700 flex flex-col gap-1">
            <Link to="/profile" onClick={() => setOpen(false)} className="flex items-center gap-2 px-3 py-2.5 text-slate-300 hover:text-white text-sm">
              <User size={14} /> Profile
            </Link>
            <Link to="/logout" onClick={() => setOpen(false)} className="flex items-center gap-2 px-3 py-2.5 text-red-400 text-sm">
              <LogOut size={14} /> Logout
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
