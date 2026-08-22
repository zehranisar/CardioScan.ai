import { Activity, ScanText, MessagesSquare, Layers } from "lucide-react";

export default function Features() {
  return (
    <section id="features" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-xl">
          <span className="text-xs font-semibold uppercase tracking-wide text-[var(--color-coral)]">
            What's inside
          </span>
          <h2 className="mt-3 font-[var(--font-display)] text-3xl text-[var(--color-ink)] md:text-4xl">
            Four ways CardioScan.ai reads your heart health
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 lg:grid-cols-3 lg:grid-rows-2">
          {/* Featured, larger card */}
          <div className="group relative overflow-hidden rounded-3xl bg-[var(--color-abyss)] p-9 text-white lg:col-span-2 lg:row-span-2">
            <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-[var(--color-coral)]/20 blur-[90px]" />
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-[var(--color-coral-bright)]">
              <Activity className="h-5 w-5" />
            </span>
            <span className="mt-6 block font-[var(--font-mono)] text-[11px] uppercase tracking-wider text-white/50">
              Prediction
            </span>
            <h3 className="mt-3 font-[var(--font-display)] text-2xl md:text-3xl">
              Risk classification, not a guess
            </h3>
            <p className="mt-3 max-w-md text-[15px] leading-relaxed text-white/60">
              A model trained on clinical cardiovascular records weighs your age,
              blood pressure, cholesterol, and more to estimate risk as a clear
              percentage — not a vague label.
            </p>

            <div className="mt-8 flex items-end gap-2">
              <span className="font-[var(--font-mono)] text-5xl font-semibold text-[var(--color-coral-bright)]">
                18%
              </span>
              <span className="mb-1.5 text-sm text-white/50">example output — low estimated risk</span>
            </div>
          </div>

          <FeatureCard
            icon={<Layers className="h-5 w-5" />}
            tag="Explainability"
            title="See what drove the result"
            description="Every prediction comes with a breakdown of which factors mattered most, so the number is never a black box."
          />
          <FeatureCard
            icon={<ScanText className="h-5 w-5" />}
            tag="Document reading"
            title="Upload a lab report"
            description="Photograph a blood test or ECG printout — CardioScan.ai reads the values and fills the assessment for you."
          />
          <FeatureCard
            icon={<MessagesSquare className="h-5 w-5" />}
            tag="Assistant"
            title="Ask about your result"
            description="A focused assistant answers questions about your score and heart health — nothing outside that lane."
            className="lg:col-start-3"
          />
        </div>
      </div>
    </section>
  );
}

function FeatureCard({
  icon,
  tag,
  title,
  description,
  className = "",
}: {
  icon: React.ReactNode;
  tag: string;
  title: string;
  description: string;
  className?: string;
}) {
  return (
    <div
      className={`group rounded-3xl border border-white/60 bg-white/95 p-7 shadow-[0_4px_20px_-8px_rgba(15,76,76,0.12)] backdrop-blur-sm transition-all hover:border-[var(--color-coral)]/40 hover:shadow-[0_12px_36px_-12px_rgba(15,76,76,0.22)] ${className}`}
    >
      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--color-teal-soft)] text-[var(--color-teal-deep)] transition-colors group-hover:bg-[var(--color-coral-soft)] group-hover:text-[var(--color-coral)]">
        {icon}
      </span>
      <span className="mt-5 block font-[var(--font-mono)] text-[11px] uppercase tracking-wider text-[var(--color-sage)]">
        {tag}
      </span>
      <h3 className="mt-2 font-[var(--font-display)] text-xl text-[var(--color-ink)]">{title}</h3>
      <p className="mt-2 text-[15px] leading-relaxed text-[var(--color-sage)]">{description}</p>
    </div>
  );
}
