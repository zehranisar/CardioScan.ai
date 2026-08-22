import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { HeartPulse, Loader2, AlertCircle, Eye, EyeOff } from "lucide-react";
import { supabase } from "../lib/supabase";

export default function SignIn() {
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = (location.state as { from?: string })?.from ?? "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    navigate(redirectTo, { replace: true });
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[var(--color-mist)] px-6 pb-16 pt-28">
      <div className="w-full max-w-sm">
        <div className="text-center">
          <Link to="/" className="inline-flex items-center gap-2 font-[var(--font-display)] text-lg font-medium text-[var(--color-teal-deep)]">
            <HeartPulse className="h-5 w-5 text-[var(--color-coral)]" strokeWidth={2.25} />
            CardioScan<span className="text-[var(--color-coral)]">.ai</span>
          </Link>
          <h1 className="mt-6 font-[var(--font-display)] text-2xl text-[var(--color-ink)]">
            Welcome back
          </h1>
          <p className="mt-1.5 text-sm text-[var(--color-sage)]">
            Sign in to see your assessment history
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-8 rounded-3xl border border-white/60 bg-white/95 p-7 shadow-[0_20px_60px_-20px_rgba(15,76,76,0.2)]"
        >
          {error && (
            <div className="mb-5 flex items-start gap-2 rounded-xl border border-[var(--color-coral)]/30 bg-[var(--color-coral-soft)] px-4 py-3 text-sm text-[var(--color-coral)]">
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
              {error}
            </div>
          )}

          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-medium text-[var(--color-ink)]">Email</span>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="rounded-xl border border-[var(--color-teal-soft)] bg-white px-4 py-2.5 text-sm text-[var(--color-ink)] outline-none transition-colors focus:border-[var(--color-coral)]"
            />
          </label>

          <label className="mt-4 flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-[var(--color-ink)]">Password</span>
              <Link
                to="/forgot-password"
                className="text-xs font-semibold text-[var(--color-teal-deep)] hover:text-[var(--color-coral)]"
              >
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-xl border border-[var(--color-teal-soft)] bg-white px-4 py-2.5 pr-11 text-sm text-[var(--color-ink)] outline-none transition-colors focus:border-[var(--color-coral)]"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-sage)] hover:text-[var(--color-ink)]"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </label>

          <button
            type="submit"
            disabled={loading}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-[var(--color-coral)] px-6 py-3 text-sm font-semibold text-white transition-transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60"
          >
            {loading && <Loader2 className="h-4 w-4 animate-spin" />}
            Sign in
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-[var(--color-sage)]">
          Don't have an account?{" "}
          <Link to="/signup" className="font-semibold text-[var(--color-teal-deep)] hover:text-[var(--color-coral)]">
            Sign up
          </Link>
        </p>
      </div>
    </main>
  );
}