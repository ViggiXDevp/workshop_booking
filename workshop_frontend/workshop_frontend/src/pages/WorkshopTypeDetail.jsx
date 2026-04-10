import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Clock, FileText, Info, PlusCircle } from "lucide-react";
import { workshopTypes, currentUser } from "../mockData";

export default function WorkshopTypeDetail() {
  const { id } = useParams();
  const wt = workshopTypes.find((w) => w.id === Number(id));

  if (!wt)
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center text-slate-500">
        <p className="text-lg font-semibold">Workshop type not found.</p>
        <Link to="/workshop-types" className="btn-secondary mt-4">
          ← Back to list
        </Link>
      </div>
    );

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
      <Link to="/workshop-types" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-900 mb-5 transition-colors">
        <ArrowLeft size={14} /> Back to Workshop Types
      </Link>

      <div className="card overflow-hidden fade-up">
        {/* Header strip */}
        <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 px-6 py-5">
          <span className="text-indigo-200 text-xs font-bold uppercase tracking-wide">Workshop Type</span>
          <h1 className="text-2xl font-extrabold text-white mt-1">{wt.name}</h1>
        </div>

        {/* Fields */}
        <div className="divide-y divide-slate-100">
          <DetailRow icon={<Clock size={15} />} label="Duration">
            <span className="badge-info">{wt.duration} day{wt.duration !== 1 ? "s" : ""}</span>
          </DetailRow>

          <DetailRow icon={<Info size={15} />} label="Description">
            <p className="text-sm text-slate-600 leading-relaxed">{wt.description}</p>
          </DetailRow>

          <DetailRow icon={<FileText size={15} />} label="Terms &amp; Conditions">
            <p className="text-sm text-slate-600 leading-relaxed">{wt.terms_and_conditions}</p>
          </DetailRow>
        </div>

        {/* Actions */}
        <div className="px-6 py-4 bg-slate-50 flex flex-wrap gap-3">
          {!currentUser.is_instructor && (
            <Link to="/propose" className="btn-success">
              <PlusCircle size={15} /> Propose This Workshop
            </Link>
          )}
          {currentUser.is_instructor && (
            <Link to={`/workshop-types/${wt.id}/edit`} className="btn-primary">
              Edit Workshop Type
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

function DetailRow({ icon, label, children }) {
  return (
    <div className="px-6 py-4 flex gap-4">
      <div className="flex items-start gap-2 text-slate-400 pt-0.5 min-w-[140px]">
        {icon}
        <span className="text-xs font-bold uppercase tracking-wide text-slate-400">{label}</span>
      </div>
      <div className="flex-1">{children}</div>
    </div>
  );
}
