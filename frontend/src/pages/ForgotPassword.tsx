import { useState } from "react";
import { Link } from "react-router-dom";
import { HeartPulse, Loader2, AlertCircle, MailCheck } from "lucide-react";
import { supabase } from "../lib/supabase";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    setSent(true);
  };

  if (sent) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[var(--color-mist)] px-6 pb-16 pt-28">
        <div className="max-w-sm rounded-3xl border border-white/60 bg-white/95 p-9 text-center shadow-[0_20px_60px_-20px_rgba(15,76,76,0.2)]">
          <MailCheck className="mx-auto h-8 w-8 text-[var(--color-teal-deep)]" />
          <h1 className="mt-4 font-[var(--font-display)] text-xl text-[var(--color-ink)]">
            Check your inbox
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-[var(--color-sage)]">
            If an account exists for <strong>{email}</strong>, we've sent a
            link to reset your password.
          </p>
          <Link
            to="/signin"
            className="mt-6 inline-block rounded-full bg-[var(--color-coral)] px-6 py-3 text-sm font-semibold text-white transition-transform hover:scale-[1.03]"
          >
            Back to sign in
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[var(--color-mist)] px-6 pb-16 pt-28">
      <div className="w-full max-w-sm">
        <div className="text-center">
          <Link to="/" className="inline-flex items-center gap-2 font-[var(--font-display)] text-lg font-medium text-[var(--color-teal-deep)]">
            <HeartPulse className="h-5 w-5 text-[var(--color-coral)]" strokeWidth={2.25} />
            CardioScan<span className="text-[var(--color-coral)]">.ai</span>
          </Link>
          <h1 className="mt-6 font-[var(--font-display)] text-2xl text-[var(--color-ink)]">
            Reset your password
          </h1>
          <p className="mt-1.5 text-sm text-[var(--color-sage)]">
            We'll email you a link to reset it
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

          <button
            type="submit"
            disabled={loading}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-[var(--color-coral)] px-6 py-3 text-sm font-semibold text-white transition-transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60"
          >
            {loading && <Loader2 className="h-4 w-4 animate-spin" />}
            Send reset link
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-[var(--color-sage)]">
          Remembered it?{" "}
          <Link to="/signin" className="font-semibold text-[var(--color-teal-deep)] hover:text-[var(--color-coral)]">
            Back to sign in
          </Link>
        </p>
      </div>
    </main>
  );
}