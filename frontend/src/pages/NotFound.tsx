import { Link } from "react-router-dom";
import { HeartPulse, ArrowLeft } from "lucide-react";
import PulseLine from "../components/PulseLine";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[var(--color-mist)] px-6 pt-16 text-center">
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--color-teal-soft)] text-[var(--color-teal-deep)]">
        <HeartPulse className="h-7 w-7" />
      </span>

      <h1 className="mt-6 font-[var(--font-display)] text-6xl text-[var(--color-ink)]">404</h1>
      <p className="mt-2 max-w-sm text-[var(--color-sage)]">
        This page flatlined — the address you're looking for doesn't exist.
      </p>

      <div className="mt-6 w-full max-w-xs">
        <PulseLine className="h-10 w-full" animate={false} />
      </div>

      <Link
        to="/"
        className="mt-8 inline-flex items-center gap-2 rounded-full bg-[var(--color-coral)] px-6 py-3 text-sm font-semibold text-white transition-transform hover:scale-[1.03]"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to home
      </Link>
    </main>
  );
}
