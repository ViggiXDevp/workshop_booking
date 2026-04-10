import Navbar from "./Navbar";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-14 pb-14">
        {children}
      </main>
      <footer className="fixed bottom-0 left-0 right-0 bg-slate-900 text-slate-400 text-xs text-center py-2.5 z-40">
        Developed by{" "}
        <a href="https://fossee.in" target="_blank" rel="noopener" className="text-slate-300 hover:text-white transition-colors">
          FOSSEE Group, IIT Bombay
        </a>
        {" · "}
        <a href="mailto:pythonsupport@fossee.in" className="text-slate-300 hover:text-white transition-colors">
          Contact
        </a>
      </footer>
    </div>
  );
}
