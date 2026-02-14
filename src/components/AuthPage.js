import { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AuthPage = () => {
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login, signup } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const redirectTo = useMemo(
    () => location.state?.from?.pathname || "/",
    [location.state]
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Please enter email and password.");
      return;
    }

    const payload = { email, password };
    if (mode === "login") {
      login(payload);
    } else {
      signup(payload);
    }

    navigate(redirectTo, { replace: true });
  };

  return (
    <section className="mx-auto max-w-md px-4 py-10">
      <div className="rounded-3xl border border-orange-100 bg-white p-6 shadow-sm md:p-8">
        <h1 className="text-2xl font-bold text-slate-900">
          {mode === "login" ? "Login" : "Create Account"}
        </h1>
        <p className="mt-1 text-sm text-slate-600">
          Use any email and password to continue.
        </p>

        <div className="mt-4 grid grid-cols-2 rounded-full bg-orange-50 p-1 text-sm">
          <button
            type="button"
            onClick={() => setMode("login")}
            className={`rounded-full px-3 py-2 font-semibold ${
              mode === "login" ? "bg-orange-500 text-white" : "text-orange-700"
            }`}
          >
            Login
          </button>
          <button
            type="button"
            onClick={() => setMode("signup")}
            className={`rounded-full px-3 py-2 font-semibold ${
              mode === "signup" ? "bg-orange-500 text-white" : "text-orange-700"
            }`}
          >
            Sign Up
          </button>
        </div>

        <form className="mt-5 space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-orange-400"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-orange-400"
          />
          {error && <p className="text-xs text-red-600">{error}</p>}
          <button
            type="submit"
            className="w-full rounded-xl bg-orange-500 px-4 py-3 text-sm font-semibold text-white hover:bg-orange-600"
          >
            {mode === "login" ? "Login" : "Sign Up"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default AuthPage;
