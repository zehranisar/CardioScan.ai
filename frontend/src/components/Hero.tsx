import { Link } from "react-router-dom";
import PulseLine from "./PulseLine";
import { ArrowRight, Sparkles } from "lucide-react";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden bg-gradient-to-b from-[var(--color-abyss)] via-[var(--color-abyss-2)] to-[var(--color-abyss)] px-6 pb-24 pt-20 text-white md:pt-28"
    >
      {/* ambient glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 -z-0 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-[var(--color-coral)]/20 blur-[140px]" />
      <div className="pointer-events-none absolute -left-40 bottom-0 -z-0 h-[400px] w-[500px] rounded-full bg-[var(--color-teal)]/25 blur-[130px]" />

      {/* watermark pulse line, oversized behind the headline */}
      <div className="pointer-events-none absolute inset-x-0 top-24 -z-0 opacity-[0.18] md:top-16">
        <PulseLine className="h-40 w-full md:h-56" color="#ffffff" animate={false} />
      </div>

      <div className="relative mx-auto max-w-4xl text-center">
        <span className="fade-up inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wide text-white/80 backdrop-blur-sm">
          <Sparkles className="h-3.5 w-3.5 text-[var(--color-coral-bright)]" />
          AI-assisted, not a diagnosis
        </span>

        <h1
          className="fade-up mt-7 font-[var(--font-display)] text-[2.75rem] font-medium leading-[1.05] tracking-tight text-white md:text-7xl"
          style={{ animationDelay: "0.08s", animationFillMode: "backwards" }}
        >
          Know your heart<br />
          <span className="italic text-[var(--color-coral-bright)]">before it knows</span><br />
          something's wrong.
        </h1>

        <p
          className="fade-up mx-auto mt-7 max-w-lg text-lg leading-relaxed text-white/60"
          style={{ animationDelay: "0.16s", animationFillMode: "backwards" }}
        >
          A two-minute assessment, read by a model trained on clinical
          cardiovascular data — turned into a risk score you can actually
          understand.
        </p>

        <div
          className="fade-up mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
          style={{ animationDelay: "0.24s", animationFillMode: "backwards" }}
        >
          <Link
            to="/assess"
            className="group inline-flex items-center gap-2 rounded-full bg-[var(--color-coral)] px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[var(--color-coral)]/30 transition-transform hover:scale-[1.03] active:scale-[0.98]"
          >
            Start free assessment
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <a
            href="#how-it-works"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
          >
            See how it works
          </a>
        </div>

        <dl
          className="fade-up mx-auto mt-16 grid max-w-2xl grid-cols-3 gap-6 border-t border-white/10 pt-8 text-center"
          style={{ animationDelay: "0.3s", animationFillMode: "backwards" }}
        >
          <div>
            <dt className="font-[var(--font-mono)] text-2xl font-semibold text-white">13</dt>
            <dd className="mt-1 text-xs text-white/50">clinical markers assessed</dd>
          </div>
          <div>
            <dt className="font-[var(--font-mono)] text-2xl font-semibold text-white">~2 min</dt>
            <dd className="mt-1 text-xs text-white/50">to complete assessment</dd>
          </div>
          <div>
            <dt className="font-[var(--font-mono)] text-2xl font-semibold text-white">Explained</dt>
            <dd className="mt-1 text-xs text-white/50">every result, in plain words</dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
