import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, UserPlus, AlertCircle } from "lucide-react";
import { departmentChoices, titleChoices, stateChoices } from "../mockData";

function PasswordStrength({ password }) {
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (!password) return null;
  const labels = ["", "Weak", "Fair", "Good", "Strong"];
  const colors = ["", "bg-red-400", "bg-amber-400", "bg-blue-500", "bg-green-500"];
  const textColors = ["", "text-red-600", "text-amber-600", "text-blue-600", "text-green-600"];

  return (
    <div className="mt-1.5">
      <div className="flex gap-1">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
              i <= score ? colors[score] : "bg-slate-200"
            }`}
          />
        ))}
      </div>
      <p className={`text-xs font-semibold mt-1 ${textColors[score]}`}>
        {labels[score]}
      </p>
    </div>
  );
}

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "", username: "", first_name: "", last_name: "",
    email: "", phone_number: "", institute: "",
    department: "", position: "coordinator",
    location: "", state: "IN-MH",
    password1: "", password2: "",
  });
  const [showPw, setShowPw] = useState({ p1: false, p2: false });
  const [errors, setErrors] = useState({});

  function set(name) {
    return (e) => {
      setForm((p) => ({ ...p, [name]: e.target.value }));
      setErrors((p) => ({ ...p, [name]: "" }));
    };
  }

  function validate() {
    const e = {};
    if (!form.username.trim()) e.username = "Required.";
    if (!form.first_name.trim()) e.first_name = "Required.";
    if (!form.last_name.trim()) e.last_name = "Required.";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = "Valid email required.";
    if (!form.phone_number || form.phone_number.length !== 10) e.phone_number = "10-digit number required.";
    if (!form.institute.trim()) e.institute = "Required.";
    if (!form.department) e.department = "Required.";
    if (!form.password1 || form.password1.length < 8) e.password1 = "Minimum 8 characters.";
    if (form.password1 !== form.password2) e.password2 = "Passwords do not match.";
    return e;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    // In real app: POST to Django /register/
    navigate("/my-workshops");
  }

  function Field({ label, name, type = "text", required, children, hint }) {
    return (
      <div>
        <label className="label" htmlFor={name}>
          {label}{required && <span className="text-red-500 ml-0.5">*</span>}
        </label>
        {children || (
          <input
            id={name} name={name} type={type}
            value={form[name]}
            onChange={set(name)}
            className={`input ${errors[name] ? "border-red-400 focus:ring-red-400" : ""}`}
            aria-invalid={!!errors[name]}
          />
        )}
        {hint && <p className="text-xs text-slate-400 mt-1">{hint}</p>}
        {errors[name] && <p className="text-xs text-red-600 mt-1" role="alert">{errors[name]}</p>}
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto px-4 sm:px-6 py-8">
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-indigo-600 mb-3">
          <UserPlus size={22} className="text-white" />
        </div>
        <h1 className="text-2xl font-extrabold">Coordinator Registration</h1>
        <p className="text-sm text-slate-500 mt-1">Create your FOSSEE account to propose workshops</p>
      </div>

      <div className="card p-6 fade-up">
        {Object.keys(errors).length > 0 && (
          <div className="flex items-start gap-2 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-3 py-2.5 mb-4">
            <AlertCircle size={15} className="mt-0.5 flex-shrink-0" />
            Please fix the errors below before submitting.
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">

          {/* Title + Username */}
          <div className="grid grid-cols-3 gap-3">
            <Field label="Title" name="title">
              <select id="title" name="title" value={form.title} onChange={set("title")} className="input">
                <option value="">—</option>
                {titleChoices.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
              </select>
            </Field>
            <div className="col-span-2">
              <Field label="Username" name="username" required hint="Letters, digits and @/./+/-/_ only." />
            </div>
          </div>

          {/* First + Last name */}
          <div className="grid grid-cols-2 gap-3">
            <Field label="First Name" name="first_name" required />
            <Field label="Last Name" name="last_name" required />
          </div>

          {/* Email */}
          <Field label="Email Address" name="email" type="email" required />

          {/* Phone */}
          <Field label="Phone Number" name="phone_number" required hint="10 digits, no spaces." />

          {/* Institute */}
          <Field label="Institute / College" name="institute" required />

          {/* Department */}
          <Field label="Department" name="department" required>
            <select id="department" name="department" value={form.department} onChange={set("department")}
              className={`input ${errors.department ? "border-red-400" : ""}`}>
              <option value="">Select department</option>
              {departmentChoices.map((d) => <option key={d.value} value={d.value}>{d.label}</option>)}
            </select>
          </Field>

          {/* Location + State */}
          <div className="grid grid-cols-2 gap-3">
            <Field label="City / Location" name="location" />
            <Field label="State" name="state">
              <select id="state" name="state" value={form.state} onChange={set("state")} className="input">
                {stateChoices.map((s) => <option key={s.code} value={s.code}>{s.name}</option>)}
              </select>
            </Field>
          </div>

          {/* Password */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="label" htmlFor="password1">Password <span className="text-red-500">*</span></label>
              <div className="relative">
                <input id="password1" name="password1" type={showPw.p1 ? "text" : "password"}
                  value={form.password1} onChange={set("password1")}
                  className={`input pr-9 ${errors.password1 ? "border-red-400" : ""}`} />
                <button type="button" onClick={() => setShowPw((p) => ({ ...p, p1: !p.p1 }))}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                  aria-label="Toggle password visibility">
                  {showPw.p1 ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
              <PasswordStrength password={form.password1} />
              {errors.password1 && <p className="text-xs text-red-600 mt-1">{errors.password1}</p>}
            </div>
            <div>
              <label className="label" htmlFor="password2">Confirm <span className="text-red-500">*</span></label>
              <div className="relative">
                <input id="password2" name="password2" type={showPw.p2 ? "text" : "password"}
                  value={form.password2} onChange={set("password2")}
                  className={`input pr-9 ${errors.password2 ? "border-red-400" : ""}`} />
                <button type="button" onClick={() => setShowPw((p) => ({ ...p, p2: !p.p2 }))}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                  aria-label="Toggle password visibility">
                  {showPw.p2 ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
              {errors.password2 && <p className="text-xs text-red-600 mt-1">{errors.password2}</p>}
            </div>
          </div>

          {/* Submit */}
          <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-slate-100 mt-1">
            <button type="submit" className="btn-primary">
              <UserPlus size={15} /> Create Account
            </button>
            <Link to="/login" className="btn-secondary">Already registered? Sign in</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
