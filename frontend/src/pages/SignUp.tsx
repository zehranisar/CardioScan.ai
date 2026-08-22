import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  HeartPulse,
  Loader2,
  AlertCircle,
  Eye,
  EyeOff,
  Check,
  MailCheck,
} from "lucide-react";
import { supabase } from "../lib/supabase";
import { PASSWORD_REQUIREMENTS, isPasswordValid } from "../lib/validation";

export default function SignUp() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [awaitingOtp, setAwaitingOtp] = useState(false);
  const [otp, setOtp] = useState("");
  const [verifying, setVerifying] = useState(false);
  const [resending, setResending] = useState(false);
  const [resent, setResent] = useState(false);

  const passwordValid = isPasswordValid(password);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordTouched(true);
    if (!passwordValid) return;

    setLoading(true);
    setError(null);

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: name } },
    });

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    if (data.session) {
      navigate("/", { replace: true });
      return;
    }

    setAwaitingOtp(true);
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setVerifying(true);
    setError(null);

    const { error } = await supabase.auth.verifyOtp({
      email,
      token: otp,
      type: "signup",
    });

    setVerifying(false);

    if (error) {
      setError(error.message);
      return;
    }

    navigate("/", { replace: true });
  };

  const handleResend = async () => {
    setResending(true);
    setError(null);
    const { error } = await supabase.auth.resend({ type: "signup", email });
    setResending(false);
    if (error) {
      setError(error.message);
      return;
    }
    setResent(true);
    setTimeout(() => setResent(false), 4000);
  };

  if (awaitingOtp) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[var(--color-mist)] px-6 pb-16 pt-28">
        <div className="w-full max-w-sm">
          <div className="text-center">
            <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-amber-soft)] text-[var(--color-amber)]">
              <MailCheck className="h-6 w-6" />
            </span>
            <h1 className="mt-5 font-[var(--font-display)] text-2xl text-[var(--color-ink)]">
              Verify your email
            </h1>
            <p className="mt-2 text-sm leading-relaxed text-[var(--color-sage)]">
              Enter the 6-digit code we sent to <strong>{email}</strong>
            </p>
          </div>

          <form
            onSubmit={handleVerifyOtp}
            className="mt-8 rounded-3xl border border-white/60 bg-white/95 p-7 shadow-[0_20px_60px_-20px_rgba(15,76,76,0.2)]"
          >
            {error && (
              <div className="mb-5 flex items-start gap-2 rounded-xl border border-[var(--color-coral)]/30 bg-[var(--color-coral-soft)] px-4 py-3 text-sm text-[var(--color-coral)]">
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                {error}
              </div>
            )}

            <label className="flex flex-col gap-1.5">
              <span className="text-sm font-medium text-[var(--color-ink)]">Verification code</span>
              <input
                type="text"
                inputMode="numeric"
                autoFocus
                maxLength={6}
                required
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                placeholder="123456"
                className="rounded-xl border border-[var(--color-teal-soft)] bg-white px-4 py-3 text-center font-[var(--font-mono)] text-xl tracking-[0.4em] text-[var(--color-ink)] outline-none transition-colors focus:border-[var(--color-coral)]"
              />
            </label>

            <button
              type="submit"
              disabled={verifying || otp.length !== 6}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-[var(--color-coral)] px-6 py-3 text-sm font-semibold text-white transition-transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
            >
              {verifying && <Loader2 className="h-4 w-4 animate-spin" />}
              Verify and continue
            </button>

            <button
              type="button"
              onClick={handleResend}
              disabled={resending}
              className="mt-4 w-full text-center text-sm font-semibold text-[var(--color-teal-deep)] hover:text-[var(--color-coral)] disabled:opacity-50"
            >
              {resending ? "Sending..." : resent ? "Code resent ✓" : "Resend code"}
            </button>
          </form>
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
            Create your account
          </h1>
          <p className="mt-1.5 text-sm text-[var(--color-sage)]">
            Track your assessments over time
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
            <span className="text-sm font-medium text-[var(--color-ink)]">Full name</span>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Zehra Nisar"
              className="rounded-xl border border-[var(--color-teal-soft)] bg-white px-4 py-2.5 text-sm text-[var(--color-ink)] outline-none transition-colors focus:border-[var(--color-coral)]"
            />
          </label>

          <label className="mt-4 flex flex-col gap-1.5">
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
            <span className="text-sm font-medium text-[var(--color-ink)]">Password</span>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={() => setPasswordTouched(true)}
                placeholder="Create a password"
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

            <div className="mt-1.5 flex flex-col gap-1">
              {PASSWORD_REQUIREMENTS.map((req) => {
                const met = req.test(password);
                const showState = password.length > 0 || passwordTouched;
                return (
                  <div
                    key={req.id}
                    className={`flex items-center gap-1.5 text-xs transition-colors ${
                      !showState
                        ? "text-[var(--color-sage)]"
                        : met
                        ? "text-[var(--color-teal-deep)]"
                        : "text-[var(--color-coral)]"
                    }`}
                  >
                    {met && showState ? (
                      <Check className="h-3 w-3" />
                    ) : (
                      <span className="h-3 w-3 rounded-full border border-current" />
                    )}
                    {req.label}
                  </div>
                );
              })}
            </div>
          </label>

          <button
            type="submit"
            disabled={loading}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-[var(--color-coral)] px-6 py-3 text-sm font-semibold text-white transition-transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60"
          >
            {loading && <Loader2 className="h-4 w-4 animate-spin" />}
            Create account
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-[var(--color-sage)]">
          Already have an account?{" "}
          <Link to="/signin" className="font-semibold text-[var(--color-teal-deep)] hover:text-[var(--color-coral)]">
            Sign in
          </Link>
        </p>
      </div>
    </main>
  );
}