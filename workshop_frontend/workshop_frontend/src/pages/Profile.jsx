import { useState } from "react";
import { User, Mail, Phone, Building, BookOpen, MapPin, Pencil, Save, X } from "lucide-react";
import { currentUser, departmentChoices, titleChoices, stateChoices, myWorkshops } from "../mockData";

function ProfileField({ icon, label, value }) {
  return (
    <div className="flex items-start gap-3 py-3 border-b border-slate-100 last:border-0">
      <span className="text-slate-400 mt-0.5 flex-shrink-0">{icon}</span>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-bold text-slate-400 uppercase tracking-wide">{label}</p>
        <p className="text-sm text-slate-800 mt-0.5 break-words">{value || "—"}</p>
      </div>
    </div>
  );
}

export default function Profile() {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ ...currentUser.profile, ...currentUser });
  const [saved, setSaved] = useState(false);

  const dept = departmentChoices.find((d) => d.value === currentUser.profile.department);
  const state = stateChoices.find((s) => s.code === currentUser.profile.state);

  function handleSave(e) {
    e.preventDefault();
    setSaved(true);
    setEditing(false);
    setTimeout(() => setSaved(false), 2500);
  }

  function set(k) { return (e) => setForm((p) => ({ ...p, [k]: e.target.value })); }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">

      {saved && (
        <div className="mb-4 bg-green-50 border border-green-200 text-green-700 text-sm rounded-xl px-4 py-2.5 flex items-center gap-2 fade-up">
          <Save size={14} /> Profile updated successfully.
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-5 border-b border-slate-200">
        <h1 className="text-2xl font-bold">My Profile</h1>
        {!editing && (
          <button onClick={() => setEditing(true)} className="btn-secondary">
            <Pencil size={14} /> Edit Profile
          </button>
        )}
      </div>

      {!editing ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Profile card */}
          <div className="lg:col-span-1">
            <div className="card overflow-hidden fade-up">
              <div className="bg-gradient-to-br from-indigo-600 to-indigo-700 px-5 py-6 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center text-white text-2xl font-extrabold mb-3">
                  {currentUser.first_name[0]}
                </div>
                <p className="text-white font-bold text-base">{currentUser.full_name}</p>
                <p className="text-indigo-200 text-xs mt-1 capitalize">{currentUser.profile.position}</p>
              </div>
              <div className="px-5 py-4">
                <ProfileField icon={<Mail size={14} />} label="Email" value={currentUser.email} />
                <ProfileField icon={<Phone size={14} />} label="Phone" value={currentUser.profile.phone_number} />
                <ProfileField icon={<MapPin size={14} />} label="Location" value={currentUser.profile.location} />
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            <div className="card p-5 fade-up">
              <h2 className="text-sm font-bold text-slate-700 mb-3">Academic Details</h2>
              <ProfileField icon={<Building size={14} />} label="Institute" value={currentUser.profile.institute} />
              <ProfileField icon={<BookOpen size={14} />} label="Department" value={dept?.label} />
              <ProfileField icon={<User size={14} />} label="State" value={state?.name} />
            </div>

            {/* Workshop history */}
            <div className="card overflow-hidden fade-up">
              <div className="px-5 py-4 border-b border-slate-100">
                <h2 className="text-sm font-bold text-slate-700">Workshop History</h2>
              </div>
              {myWorkshops.length === 0 ? (
                <p className="text-sm text-slate-400 text-center py-8">No workshops yet.</p>
              ) : (
                <div className="divide-y divide-slate-100">
                  {myWorkshops.map((w) => (
                    <div key={w.id} className="flex items-center justify-between px-5 py-3">
                      <div>
                        <p className="text-sm font-semibold text-slate-800">{w.workshop_type.name}</p>
                        <p className="text-xs text-slate-400 mt-0.5">{w.date}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        {w.instructor
                          ? <span className="text-xs text-slate-500">{w.instructor.full_name}</span>
                          : null}
                        {w.status === 1
                          ? <span className="badge-success">Accepted</span>
                          : <span className="badge-warning">Pending</span>}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        // Edit form
        <div className="card p-6 fade-up">
          <form onSubmit={handleSave} className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="label" htmlFor="p-first">First Name</label>
                <input id="p-first" className="input" value={form.first_name} onChange={set("first_name")} />
              </div>
              <div>
                <label className="label" htmlFor="p-last">Last Name</label>
                <input id="p-last" className="input" value={form.last_name} onChange={set("last_name")} />
              </div>
            </div>
            <div>
              <label className="label" htmlFor="p-phone">Phone Number</label>
              <input id="p-phone" className="input" value={form.phone_number} onChange={set("phone_number")} />
            </div>
            <div>
              <label className="label" htmlFor="p-institute">Institute</label>
              <input id="p-institute" className="input" value={form.institute} onChange={set("institute")} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="label" htmlFor="p-dept">Department</label>
                <select id="p-dept" className="input" value={form.department} onChange={set("department")}>
                  {departmentChoices.map((d) => <option key={d.value} value={d.value}>{d.label}</option>)}
                </select>
              </div>
              <div>
                <label className="label" htmlFor="p-loc">City / Location</label>
                <input id="p-loc" className="input" value={form.location} onChange={set("location")} />
              </div>
            </div>
            <div>
              <label className="label" htmlFor="p-state">State</label>
              <select id="p-state" className="input" value={form.state} onChange={set("state")}>
                {stateChoices.map((s) => <option key={s.code} value={s.code}>{s.name}</option>)}
              </select>
            </div>
            <div className="flex gap-3 pt-2 border-t border-slate-100">
              <button type="submit" className="btn-primary"><Save size={14} /> Save Changes</button>
              <button type="button" onClick={() => setEditing(false)} className="btn-secondary"><X size={14} /> Cancel</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
