import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CalendarDays, Info, Send, X, CheckCircle } from "lucide-react";
import { workshopTypes } from "../mockData";

function TncModal({ workshop, onClose }) {
  if (!workshop) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 fade-up">
        <div className="flex items-start justify-between mb-4">
          <h2 className="text-base font-bold text-slate-900">Terms &amp; Conditions</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-700 transition-colors" aria-label="Close">
            <X size={18} />
          </button>
        </div>
        <p className="text-sm text-slate-600 leading-relaxed">{workshop.terms_and_conditions}</p>
        <button onClick={onClose} className="btn-primary w-full justify-center mt-5">
          <CheckCircle size={15} /> I understand
        </button>
      </div>
    </div>
  );
}

// Calculate min date (today + 3 days, skip weekends)
function getMinDate() {
  const d = new Date();
  d.setDate(d.getDate() + 3);
  while (d.getDay() === 0 || d.getDay() === 6) d.setDate(d.getDate() + 1);
  return d.toISOString().split("T")[0];
}

function getMaxDate() {
  const d = new Date();
  d.setFullYear(d.getFullYear() + 1);
  return d.toISOString().split("T")[0];
}

export default function ProposeWorkshop() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ workshop_type: "", date: "", tnc_accepted: false });
  const [errors, setErrors] = useState({});
  const [showTnc, setShowTnc] = useState(false);
  const [success, setSuccess] = useState(false);

  const selectedType = workshopTypes.find((w) => w.id === Number(form.workshop_type));

  function validate() {
    const e = {};
    if (!form.workshop_type) e.workshop_type = "Please select a workshop type.";
    if (!form.date) e.date = "Please select a date.";
    else {
      const d = new Date(form.date);
      const day = d.getDay();
      if (day === 0 || day === 6) e.date = "Weekends are not allowed.";
    }
    if (!form.tnc_accepted) e.tnc_accepted = "You must accept the terms and conditions.";
    return e;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setSuccess(true);
    setTimeout(() => navigate("/my-workshops"), 1800);
  }

  if (success)
    return (
      <div className="max-w-sm mx-auto px-4 py-20 text-center fade-up">
        <CheckCircle size={48} className="mx-auto text-green-500 mb-4" />
        <h2 className="text-xl font-bold text-slate-900">Workshop Proposed!</h2>
        <p className="text-sm text-slate-500 mt-1">Redirecting to your workshops…</p>
      </div>
    );

  return (
    <div className="max-w-lg mx-auto px-4 sm:px-6 py-8">
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-green-600 mb-3">
          <CalendarDays size={22} className="text-white" />
        </div>
        <h1 className="text-2xl font-extrabold">Propose a Workshop</h1>
        <p className="text-sm text-slate-500 mt-1">Submit your preferred date and workshop type</p>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-xl px-4 py-3 flex gap-2 text-sm text-blue-700 mb-5">
        <Info size={15} className="flex-shrink-0 mt-0.5" />
        Before proposing, review workshop details in{" "}
        <a href="/workshop-types" className="font-semibold underline">Workshop Types</a>.
      </div>

      <div className="card p-6 fade-up">
        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">

          {/* Workshop Type */}
          <div>
            <label className="label" htmlFor="workshop_type">
              Workshop Type <span className="text-red-500">*</span>
            </label>
            <select
              id="workshop_type" name="workshop_type"
              value={form.workshop_type}
              onChange={(e) => { setForm((p) => ({ ...p, workshop_type: e.target.value })); setErrors((p) => ({ ...p, workshop_type: "" })); }}
              className={`input ${errors.workshop_type ? "border-red-400" : ""}`}
            >
              <option value="">— Select a workshop type —</option>
              {workshopTypes.map((w) => (
                <option key={w.id} value={w.id}>
                  {w.name} ({w.duration} day{w.duration !== 1 ? "s" : ""})
                </option>
              ))}
            </select>
            {errors.workshop_type && <p className="text-xs text-red-600 mt-1">{errors.workshop_type}</p>}
          </div>

          {/* Selected type info */}
          {selectedType && (
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm text-slate-600 fade-up">
              <p className="font-semibold text-slate-800 mb-1">{selectedType.name}</p>
              <p className="line-clamp-2">{selectedType.description}</p>
            </div>
          )}

          {/* Date */}
          <div>
            <label className="label" htmlFor="date">
              Preferred Date <span className="text-red-500">*</span>
            </label>
            <input
              id="date" name="date" type="date"
              min={getMinDate()} max={getMaxDate()}
              value={form.date}
              onChange={(e) => { setForm((p) => ({ ...p, date: e.target.value })); setErrors((p) => ({ ...p, date: "" })); }}
              className={`input ${errors.date ? "border-red-400" : ""}`}
            />
            <p className="text-xs text-slate-400 mt-1">Weekdays only, minimum 3 days from today.</p>
            {errors.date && <p className="text-xs text-red-600 mt-1">{errors.date}</p>}
          </div>

          {/* T&C */}
          <div>
            <div className="flex items-start gap-2.5">
              <input
                id="tnc_accepted" name="tnc_accepted" type="checkbox"
                checked={form.tnc_accepted}
                onChange={(e) => { setForm((p) => ({ ...p, tnc_accepted: e.target.checked })); setErrors((p) => ({ ...p, tnc_accepted: "" })); }}
                className="mt-0.5 w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
              />
              <label htmlFor="tnc_accepted" className="text-sm text-slate-600">
                I accept the{" "}
                <button
                  type="button"
                  onClick={() => { if (!form.workshop_type) { setErrors((p) => ({ ...p, workshop_type: "Select a workshop type first." })); return; } setShowTnc(true); }}
                  className="text-indigo-600 font-semibold underline hover:text-indigo-800"
                >
                  terms and conditions
                </button>
              </label>
            </div>
            {errors.tnc_accepted && <p className="text-xs text-red-600 mt-1">{errors.tnc_accepted}</p>}
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-3 pt-2 border-t border-slate-100">
            <button type="submit" className="btn-success">
              <Send size={15} /> Submit Proposal
            </button>
            <a href="/workshop-types" className="btn-secondary">Cancel</a>
          </div>
        </form>
      </div>

      {showTnc && <TncModal workshop={selectedType} onClose={() => setShowTnc(false)} />}
    </div>
  );
}
