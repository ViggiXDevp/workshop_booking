import { Link } from "react-router-dom";
import { ArrowRight, BarChart2, List, PlusCircle, CheckSquare } from "lucide-react";
import { currentUser, workshops, workshopTypes, myWorkshops } from "../mockData";

const cards = [
  {
    to: "/workshop-types",
    icon: <List size={22} className="text-indigo-600" />,
    bg: "bg-indigo-50",
    title: "Workshop Types",
    desc: `${workshopTypes.length} types available`,
  },
  {
    to: "/propose",
    icon: <PlusCircle size={22} className="text-green-600" />,
    bg: "bg-green-50",
    title: "Propose Workshop",
    desc: "Submit a new proposal",
  },
  {
    to: "/my-workshops",
    icon: <CheckSquare size={22} className="text-amber-600" />,
    bg: "bg-amber-50",
    title: "My Workshops",
    desc: `${myWorkshops.length} workshop(s) on record`,
  },
  {
    to: "/statistics",
    icon: <BarChart2 size={22} className="text-purple-600" />,
    bg: "bg-purple-50",
    title: "Statistics",
    desc: `${workshops.filter((w) => w.status === 1).length} accepted workshops`,
  },
];

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      {/* Hero banner */}
      <div className="bg-gradient-to-br from-indigo-600 via-indigo-700 to-indigo-800 rounded-3xl p-8 sm:p-10 text-white mb-8 fade-up">
        <p className="text-indigo-300 text-xs font-bold uppercase tracking-widest mb-2">FOSSEE · IIT Bombay</p>
        <h1 className="text-3xl sm:text-4xl font-extrabold leading-tight">
          Welcome back,<br />{currentUser.first_name}!
        </h1>
        <p className="mt-3 text-indigo-200 text-sm sm:text-base max-w-md leading-relaxed">
          Manage your workshops, track proposals, and explore what FOSSEE has to offer —
          all in one place.
        </p>
        <div className="flex flex-wrap gap-3 mt-6">
          <Link to="/propose"
            className="inline-flex items-center gap-2 bg-white text-indigo-700 font-bold text-sm px-5 py-2.5 rounded-xl hover:bg-indigo-50 transition-colors">
            <PlusCircle size={15} /> Propose Workshop
          </Link>
          <Link to="/workshop-types"
            className="inline-flex items-center gap-2 border border-white/30 text-white font-semibold text-sm px-5 py-2.5 rounded-xl hover:bg-white/10 transition-colors">
            Browse Types <ArrowRight size={14} />
          </Link>
        </div>
      </div>

      {/* Quick access cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {cards.map((c, i) => (
          <Link
            key={c.to} to={c.to}
            className="card p-5 flex items-center gap-4 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 fade-up group"
            style={{ animationDelay: `${i * 70}ms` }}
          >
            <div className={`w-11 h-11 rounded-xl ${c.bg} flex items-center justify-center flex-shrink-0`}>
              {c.icon}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-slate-900 text-sm">{c.title}</p>
              <p className="text-xs text-slate-500 mt-0.5">{c.desc}</p>
            </div>
            <ArrowRight size={16} className="text-slate-300 group-hover:text-slate-600 transition-colors flex-shrink-0" />
          </Link>
        ))}
      </div>

      {/* Recent workshops */}
      {myWorkshops.length > 0 && (
        <div className="mt-8">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base font-bold text-slate-800">Recent Workshops</h2>
            <Link to="/my-workshops" className="text-xs text-indigo-600 hover:text-indigo-800 font-medium">
              View all →
            </Link>
          </div>
          <div className="card overflow-hidden">
            {myWorkshops.slice(0, 3).map((w) => (
              <div key={w.id} className="flex items-center justify-between px-5 py-3.5 border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors">
                <div>
                  <p className="text-sm font-semibold text-slate-800">{w.workshop_type.name}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{w.date}</p>
                </div>
                {w.status === 1
                  ? <span className="badge-success">Accepted</span>
                  : <span className="badge-warning">Pending</span>}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
