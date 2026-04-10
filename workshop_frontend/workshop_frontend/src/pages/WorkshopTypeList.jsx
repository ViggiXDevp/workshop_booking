import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Search, Clock, ArrowRight, Plus } from "lucide-react";
import { workshopTypes } from "../mockData";
import { currentUser } from "../mockData";

export default function WorkshopTypeList() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const PER_PAGE = 6;

  const filtered = useMemo(
    () =>
      workshopTypes.filter((w) =>
        w.name.toLowerCase().includes(query.toLowerCase())
      ),
    [query]
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-5 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-bold">Workshop Types</h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Browse all available FOSSEE workshop programmes
          </p>
        </div>
        {currentUser.is_instructor && (
          <Link to="/add-workshop-type" className="btn-primary">
            <Plus size={16} /> Add Workshop Type
          </Link>
        )}
      </div>

      {/* Search */}
      <div className="relative max-w-sm mb-6">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
        <input
          type="search"
          value={query}
          onChange={(e) => { setQuery(e.target.value); setPage(1); }}
          placeholder="Search workshop types…"
          aria-label="Filter workshop types"
          className="input pl-9"
        />
      </div>

      {/* Grid */}
      {paginated.length === 0 ? (
        <div className="text-center py-20 text-slate-400">
          <Search size={40} className="mx-auto mb-3 opacity-40" />
          <p className="font-medium">No workshops match your search.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {paginated.map((w, i) => (
            <div
              key={w.id}
              className="card p-5 flex flex-col gap-3 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 fade-up"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <div>
                <span className="text-xs font-bold uppercase tracking-wide text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">
                  FOSSEE
                </span>
                <h3 className="text-base font-bold mt-2 text-slate-900">{w.name}</h3>
                <p className="text-sm text-slate-500 mt-1 line-clamp-2">{w.description}</p>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-auto">
                <Clock size={13} />
                {w.duration} day{w.duration !== 1 ? "s" : ""}
              </div>
              <Link
                to={`/workshop-types/${w.id}`}
                className="btn-secondary w-full justify-center mt-1"
              >
                View Details <ArrowRight size={14} />
              </Link>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-8">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="btn-secondary px-3 py-1.5 text-xs disabled:opacity-40 disabled:cursor-not-allowed"
          >
            ← Previous
          </button>
          <span className="flex items-center px-3 text-sm text-slate-500">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="btn-secondary px-3 py-1.5 text-xs disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
}
