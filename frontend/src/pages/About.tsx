import { Link } from "react-router-dom";
import { HeartPulse, ShieldAlert, ExternalLink, ArrowRight } from "lucide-react";

const TECH_STACK = [
  { category: "Frontend", items: "React, TypeScript, Vite, Tailwind CSS" },
  { category: "Backend", items: "FastAPI (Python)" },
  { category: "Machine Learning", items: "scikit-learn (Random Forest), trained on the UCI Cleveland Heart Disease dataset" },
  { category: "Explainability", items: "Custom perturbation-based factor attribution" },
  { category: "AI Integration", items: "Google Gemini — vision-based report extraction and a scoped health assistant" },
  { category: "Auth & Data", items: "Supabase (authentication + PostgreSQL)" },
];

export default function About() {
  return (
    <main className="min-h-screen bg-[var(--color-mist)]">
      {/* Hero */}
      <section className="bg-gradient-to-b from-[var(--color-abyss)] via-[var(--color-abyss-2)] to-[var(--color-abyss)] px-6 pb-16 pt-28 text-white">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wide text-white/80">
            <HeartPulse className="h-3.5 w-3.5 text-[var(--color-coral-bright)]" />
            About the project
          </span>
          <h1 className="mt-6 font-[var(--font-display)] text-4xl font-medium leading-tight md:text-5xl">
            Making cardiovascular risk{" "}
            <span className="italic text-[var(--color-coral-bright)]">legible</span>, not just visible
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-white/60">
            CardioScan.ai estimates heart disease risk from clinical vitals or
            a lab report, and explains exactly what's driving the number —
            built to make a black-box prediction feel like a conversation
            with something that shows its work.
          </p>
        </div>
      </section>

      {/* Goal */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-[var(--font-display)] text-2xl text-[var(--color-ink)]">The goal</h2>
          <p className="mt-3 leading-relaxed text-[var(--color-sage)]">
            Most risk-prediction tools stop at a percentage. CardioScan.ai
            tries to go one step further on three fronts: explain{" "}
            <em>why</em> a prediction came out the way it did, remove the
            friction of manual data entry by reading it straight from a lab
            report, and give people a focused place to ask follow-up
            questions about their own result — all without pretending to be
            a substitute for a doctor.
          </p>
        </div>
      </section>

      {/* Tech stack */}
      <section className="bg-white/60 px-6 py-16">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-[var(--font-display)] text-2xl text-[var(--color-ink)]">
            How it's built
          </h2>
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {TECH_STACK.map((t) => (
              <div
                key={t.category}
                className="rounded-2xl border border-[var(--color-teal-soft)] bg-white p-5"
              >
                <p className="text-xs font-semibold uppercase tracking-wide text-[var(--color-coral)]">
                  {t.category}
                </p>
                <p className="mt-1.5 text-sm text-[var(--color-ink)]">{t.items}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-3xl rounded-3xl border border-[var(--color-amber)]/30 bg-[var(--color-amber-soft)] p-7">
          <div className="flex items-start gap-3">
            <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0 text-[var(--color-amber)]" />
            <div>
              <h2 className="font-[var(--font-display)] text-lg text-[var(--color-ink)]">
                Not a medical device
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-[var(--color-ink)]/80">
                CardioScan.ai is a portfolio and academic project. Its
                predictions are statistical estimates from a model trained on
                a public research dataset, not a clinical diagnosis. Nothing
                here should be used to make real medical decisions — please
                consult a qualified doctor for anything related to your
                actual health.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 pb-24 text-center">
        <Link
          to="/assess"
          className="inline-flex items-center gap-2 rounded-full bg-[var(--color-coral)] px-7 py-3.5 text-sm font-semibold text-white shadow-md shadow-[var(--color-coral)]/20 transition-transform hover:scale-[1.03]"
        >
          Try the assessment
          <ArrowRight className="h-4 w-4" />
        </Link>
        <div className="mt-6">
          <a
            href="https://github.com/zehranisar/CardioScan.ai"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--color-sage)] hover:text-[var(--color-teal-deep)]"
          >
            <ExternalLink className="h-4 w-4" />
            View source on GitHub
          </a>
        </div>
      </section>
    </main>
  );
}
