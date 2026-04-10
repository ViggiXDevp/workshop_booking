import { useState, useMemo } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import { Filter, Download, Eye, Calendar, Building, User, BarChart2, SlidersHorizontal, X } from "lucide-react";
import { workshops, workshopTypes, stateChoices, getStatsByState, getStatsByType } from "../mockData";

function StatCard({ label, value, sub }) {
  return (
    <div className="card p-4">
      <p className="text-xs font-bold text-slate-400 uppercase tracking-wide">{label}</p>
      <p className="text-2xl font-extrabold text-slate-900 mt-1">{value}</p>
      {sub && <p className="text-xs text-slate-500 mt-0.5">{sub}</p>}
    </div>
  );
}

function MiniChart({ title, data }) {
  return (
    <div className="card p-4">
      <h3 className="text-sm font-bold text-slate-700 mb-3">{title}</h3>
      <ResponsiveContainer width="100%" height={180}>
        <BarChart data={data} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
          <XAxis dataKey="label" tick={{ fontSize: 11 }} />
          <YAxis allowDecimals={false} tick={{ fontSize: 11 }} />
          <Tooltip
            contentStyle={{ borderRadius: 10, border: "1px solid #e2e8f0", fontSize: 12 }}
          />
          <Bar dataKey="count" fill="#4f46e5" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default function Statistics() {
  const [filters, setFilters] = useState({ state: "", workshop_type: "", status: "1" });
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [page, setPage] = useState(1);
  const PER_PAGE = 10;

  const filtered = useMemo(() => {
    return workshops.filter((w) => {
      if (filters.state && w.coordinator.profile.state !== filters.state) return false;
      if (filters.workshop_type && w.workshop_type.id !== Number(filters.workshop_type)) return false;
      if (filters.status !== "" && String(w.status) !== filters.status) return false;
      return true;
    });
  }, [filters]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const stateStats = useMemo(() => {
    const s = getStatsByState(filtered);
    return s.labels.map((l, i) => ({ label: l, count: s.counts[i] }));
  }, [filtered]);

  const typeStats = useMemo(() => {
    const s = getStatsByType(filtered);
    return s.labels.map((l, i) => ({ label: l, count: s.counts[i] }));
  }, [filtered]);

  const accepted = workshops.filter((w) => w.status === 1).length;
  const pending  = workshops.filter((w) => w.status === 0).length;

  function set(k) {
    return (e) => { setFilters((p) => ({ ...p, [k]: e.target.value })); setPage(1); };
  }

  function clearFilters() { setFilters({ state: "", workshop_type: "", status: "1" }); setPage(1); }

  const FilterPanel = () => (
    <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-4">
      <div className="flex items-center justify-between mb-1">
        <span className="font-bold text-slate-800 flex items-center gap-2">
          <Filter size={14} /> Filters
        </span>
        <button type="button" onClick={clearFilters} className="text-xs text-indigo-600 hover:text-indigo-800 font-medium">
          Clear all
        </button>
      </div>
      <div>
        <label className="label" htmlFor="f-state">State</label>
        <select id="f-state" className="input text-sm" value={filters.state} onChange={set("state")}>
          <option value="">All States</option>
          {stateChoices.map((s) => <option key={s.code} value={s.code}>{s.name}</option>)}
        </select>
      </div>
      <div>
        <label className="label" htmlFor="f-type">Workshop</label>
        <select id="f-type" className="input text-sm" value={filters.workshop_type} onChange={set("workshop_type")}>
          <option value="">All Types</option>
          {workshopTypes.map((w) => <option key={w.id} value={w.id}>{w.name}</option>)}
        </select>
      </div>
      <div>
        <label className="label" htmlFor="f-status">Status</label>
        <select id="f-status" className="input text-sm" value={filters.status} onChange={set("status")}>
          <option value="">All</option>
          <option value="1">Accepted</option>
          <option value="0">Pending</option>
        </select>
      </div>
      <button type="button" className="btn-primary justify-center mt-1">
        <Eye size={14} /> Apply
      </button>
      <button type="button" className="btn-secondary justify-center">
        <Download size={14} /> Export CSV
      </button>
    </form>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-5 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-bold">Workshop Statistics</h1>
          <p className="text-sm text-slate-500 mt-0.5">Public overview of all FOSSEE workshops</p>
        </div>
        <button className="btn-secondary lg:hidden" onClick={() => setSidebarOpen(true)}>
          <SlidersHorizontal size={15} /> Filters
        </button>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        <StatCard label="Total" value={workshops.length} sub="all workshops" />
        <StatCard label="Accepted" value={accepted} sub="confirmed" />
        <StatCard label="Pending" value={pending} sub="awaiting instructor" />
        <StatCard label="Filtered" value={filtered.length} sub="current view" />
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <MiniChart title="Workshops by State" data={stateStats} />
        <MiniChart title="Workshops by Type" data={typeStats} />
      </div>

      {/* Layout: sidebar + table */}
      <div className="flex gap-5 items-start">
        {/* Desktop sidebar */}
        <aside className="hidden lg:block w-56 flex-shrink-0 card p-4 sticky top-16">
          <FilterPanel />
        </aside>

        {/* Table */}
        <div className="flex-1 min-w-0">
          <div className="card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm" aria-label="Workshop statistics">
                <thead>
                  <tr className="border-b border-slate-100">
                    {["#", "Coordinator", "Institute", "Instructor", "Workshop", "Date", "Status"].map((h) => (
                      <th key={h} className="text-left px-4 py-3 text-xs font-bold text-slate-400 uppercase tracking-wide bg-slate-50">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {paginated.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="text-center py-12 text-slate-400">
                        <BarChart2 size={32} className="mx-auto mb-2 opacity-30" />
                        No workshops match the selected filters.
                      </td>
                    </tr>
                  ) : paginated.map((w, i) => (
                    <tr key={w.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-4 py-3 text-slate-400 text-xs">
                        {(page - 1) * PER_PAGE + i + 1}
                      </td>
                      <td className="px-4 py-3 font-semibold text-slate-800">
                        {w.coordinator.full_name}
                      </td>
                      <td className="px-4 py-3 text-slate-600 text-xs">
                        <span className="flex items-center gap-1">
                          <Building size={11} /> {w.coordinator.profile.institute}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-slate-600">
                        {w.instructor
                          ? <span className="flex items-center gap-1 text-xs"><User size={11} />{w.instructor.full_name}</span>
                          : <span className="badge-warning text-xs">Unassigned</span>}
                      </td>
                      <td className="px-4 py-3">
                        <span className="badge-info">{w.workshop_type.name}</span>
                      </td>
                      <td className="px-4 py-3 text-xs text-slate-500 whitespace-nowrap">
                        <span className="flex items-center gap-1">
                          <Calendar size={11} /> {w.date}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        {w.status === 1
                          ? <span className="badge-success">Accepted</span>
                          : <span className="badge-warning">Pending</span>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="px-4 py-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-400">
                  Showing {(page - 1) * PER_PAGE + 1}–{Math.min(page * PER_PAGE, filtered.length)} of {filtered.length}
                </span>
                <div className="flex gap-2">
                  <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}
                    className="btn-secondary text-xs px-3 py-1.5 disabled:opacity-40">← Prev</button>
                  <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages}
                    className="btn-secondary text-xs px-3 py-1.5 disabled:opacity-40">Next →</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile filter drawer */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/40" onClick={() => setSidebarOpen(false)} />
          <div className="relative ml-auto w-72 bg-white h-full p-5 overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold">Filters</h2>
              <button onClick={() => setSidebarOpen(false)} aria-label="Close filters">
                <X size={18} />
              </button>
            </div>
            <FilterPanel />
          </div>
        </div>
      )}
    </div>
  );
}
