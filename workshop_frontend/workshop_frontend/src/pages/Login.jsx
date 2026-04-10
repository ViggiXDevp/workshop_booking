import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, LogIn, AlertCircle } from "lucide-react";

export default function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [showPw, setShowPw] = useState(false);
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const navigate = useNavigate();

  function validate() {
    const e = {};
    if (!form.username.trim()) e.username = "Username is required.";
    if (!form.password)        e.password = "Password is required.";
    return e;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    // In real app: POST to Django /login/
    // Demo: accept "demo" / "password"
    if (form.username === "demo" && form.password === "password") {
      navigate("/my-workshops");
    } else {
      setServerError("Invalid username or password. (Use demo / password)");
    }
  }

  function field(name) {
    return {
      value: form[name],
      onChange: (e) => {
        setForm((p) => ({ ...p, [name]: e.target.value }));
        setErrors((p) => ({ ...p, [name]: "" }));
        setServerError("");
      },
    };
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-slate-50">
      <div className="w-full max-w-sm fade-up">
        {/* Brand */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-indigo-600 mb-3">
            <LogIn size={22} className="text-white" />
          </div>
          <h1 className="text-2xl font-extrabold">Welcome back</h1>
          <p className="text-sm text-slate-500 mt-1">Sign in to your FOSSEE account</p>
        </div>

        <div className="card p-6">
          {serverError && (
            <div className="flex items-start gap-2 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-3 py-2.5 mb-4">
              <AlertCircle size={15} className="mt-0.5 flex-shrink-0" />
              {serverError}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            {/* Username */}
            <div className="mb-4">
              <label className="label" htmlFor="username">Username</label>
              <input
                id="username" name="username" type="text"
                autoComplete="username" placeholder="Enter your username"
                className={`input ${errors.username ? "border-red-400 focus:ring-red-400" : ""}`}
                aria-invalid={!!errors.username}
                aria-describedby={errors.username ? "err-username" : undefined}
                {...field("username")}
              />
              {errors.username && (
                <p id="err-username" className="text-xs text-red-600 mt-1" role="alert">
                  {errors.username}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="mb-5">
              <label className="label" htmlFor="password">Password</label>
              <div className="relative">
                <input
                  id="password" name="password"
                  type={showPw ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  className={`input pr-10 ${errors.password ? "border-red-400 focus:ring-red-400" : ""}`}
                  aria-invalid={!!errors.password}
                  aria-describedby={errors.password ? "err-password" : undefined}
                  {...field("password")}
                />
                <button
                  type="button"
                  onClick={() => setShowPw((p) => !p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                  aria-label={showPw ? "Hide password" : "Show password"}
                >
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.password && (
                <p id="err-password" className="text-xs text-red-600 mt-1" role="alert">
                  {errors.password}
                </p>
              )}
            </div>

            <button type="submit" className="btn-primary w-full justify-center py-2.5">
              <LogIn size={16} /> Sign in
            </button>
          </form>

          <div className="mt-4 pt-4 border-t border-slate-100 flex flex-col gap-2">
            <Link to="/register" className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">
              New here? Create an account →
            </Link>
            <Link to="/forgot-password" className="text-sm text-slate-500 hover:text-slate-700">
              Forgot your password?
            </Link>
          </div>
        </div>

        <p className="text-center text-xs text-slate-400 mt-4">
          Demo credentials: <span className="font-mono">demo</span> / <span className="font-mono">password</span>
        </p>
      </div>
    </div>
  );
}
