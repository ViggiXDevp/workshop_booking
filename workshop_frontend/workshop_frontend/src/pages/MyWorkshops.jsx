import { useState } from "react";
import { Link } from "react-router-dom";
import { CheckCircle, Clock, Inbox, Calendar, User, ArrowRight } from "lucide-react";
import { workshops, currentUser } from "../mockData";

const myWorkshops = workshops.filter((w) => w.coordinator.id === currentUser.id);
const accepted = myWorkshops.filter((w) => w.status === 1);
const proposed = myWorkshops.filter((w) => w.status === 0);

const TABS = [
  { id: "accepted", label: "Accepted", count: accepted.length, icon: <CheckCircle size={15} /> },
  { id: "proposed", label: "Proposed", count: proposed.length, icon: <Clock size={15} /> },
];

function EmptyState({ tab }) {
  return (
    <div className="text-center py-14 text-slate-400">
      <Inbox size={40} className="mx-auto mb-3 opacity-30" />
      <p className="font-semibold text-slate-500">No {tab} workshops yet.</p>
      {tab === "proposed" && (
        <Link to="/propose" className="btn-primary mt-4 inline-flex">
          Propose a Workshop
        </Link>
      )}
    </div>
  );
}

function WorkshopRow({ w, showInstructor }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors">
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-slate-900 truncate">{w.workshop_type.name}</p>
        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1">
          <span className="flex items-center gap-1 text-xs text-slate-500">
            <Calendar size={12} /> {w.date}
          </span>
          {showInstructor && w.instructor && (
            <span className="flex items-center gap-1 text-xs text-slate-500">
              <User size={12} /> {w.instructor.full_name}
            </span>
          )}
        </div>
      </div>
      <div className="flex items-center gap-3 flex-shrink-0">
        {w.status === 1
          ? <span className="badge-success"><CheckCircle size={11} className="mr-1" />Accepted</span>
          : <span className="badge-warning"><Clock size={11} className="mr-1" />Pending</span>
        }
        <Link
          to={`/workshop/${w.id}`}
          className="text-indigo-600 hover:text-indigo-800 transition-colors"
          aria-label="View workshop details"
        >
          <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}

export default function MyWorkshops() {
  const [tab, setTab] = useState("accepted");

  if (!myWorkshops.length) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="bg-gradient-to-br from-indigo-600 to-indigo-700 rounded-2xl p-8 text-white fade-up">
          <h1 className="text-2xl font-extrabold">Welcome, {currentUser.first_name}! 👋</h1>
          <p className="mt-2 text-indigo-200 text-sm leading-relaxed">
            Your workshop activity will appear here. Ready to get started?
          </p>
          <Link to="/propose" className="inline-flex items-center gap-2 bg-white text-indigo-700 font-bold text-sm px-4 py-2 rounded-lg mt-5 hover:bg-indigo-50 transition-colors">
            Propose a Workshop <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    );
  }

  const list = tab === "accepted" ? accepted : proposed;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-5 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-bold">My Workshops</h1>
          <p className="text-sm text-slate-500 mt-0.5">Track your accepted and proposed workshops</p>
        </div>
        <Link to="/propose" className="btn-primary">+ Propose New</Link>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-slate-200 mb-5" role="tablist">
        {TABS.map((t) => (
          <button
            key={t.id}
            role="tab"
            aria-selected={tab === t.id}
            onClick={() => setTab(t.id)}
            className={`flex items-center gap-2 px-4 py-2.5 text-sm font-semibold border-b-2 transition-colors -mb-px ${
              tab === t.id
                ? "border-indigo-600 text-indigo-600"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            {t.icon}
            {t.label}
            <span className={`text-xs px-1.5 py-0.5 rounded-full font-bold ${
              tab === t.id ? "bg-indigo-100 text-indigo-700" : "bg-slate-100 text-slate-500"
            }`}>
              {t.count}
            </span>
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="card overflow-hidden fade-up" role="tabpanel">
        {list.length === 0
          ? <EmptyState tab={tab} />
          : list.map((w) => (
              <WorkshopRow key={w.id} w={w} showInstructor={tab === "accepted"} />
            ))
        }
      </div>
    </div>
  );
}
