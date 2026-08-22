import { HeartPulse, ShieldCheck } from "lucide-react";

export default function AssistantPreview() {
  return (
    <section id="assistant" className="px-6 py-24">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-14 lg:grid-cols-2">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wide text-[var(--color-coral)]">
            The assistant
          </span>
          <h2 className="mt-3 font-[var(--font-display)] text-3xl text-[var(--color-ink)] md:text-4xl">
            An assistant that stays in its lane
          </h2>
          <p className="mt-4 max-w-md text-[15px] leading-relaxed text-[var(--color-sage)]">
            It knows your result and answers questions about heart health, risk
            factors, and lifestyle — and declines anything outside that, so you
            always get a focused, trustworthy answer instead of a generic one.
          </p>
          <div className="mt-6 flex items-center gap-2 text-sm text-[var(--color-teal-deep)]">
            <ShieldCheck className="h-4 w-4 text-[var(--color-coral)]" />
            Always recommends a doctor for medical decisions
          </div>
        </div>

        <div className="rounded-3xl border border-white/60 bg-white/95 p-5 shadow-[0_20px_60px_-20px_rgba(15,76,76,0.2)] backdrop-blur-sm">
          <div className="flex items-center gap-2 border-b border-[var(--color-teal-soft)] pb-4">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--color-teal-soft)] text-[var(--color-teal-deep)]">
              <HeartPulse className="h-4 w-4" />
            </span>
            <span className="text-sm font-semibold text-[var(--color-ink)]">
              CardioScan Assistant
            </span>
          </div>

          <div className="mt-4 flex flex-col gap-3">
            <div className="ml-auto max-w-[80%] rounded-2xl rounded-tr-sm bg-[var(--color-teal-soft)] px-4 py-2.5 text-sm text-[var(--color-teal-deep)]">
              Why is my cholesterol flagged as a top factor?
            </div>
            <div className="mr-auto max-w-[85%] rounded-2xl rounded-tl-sm bg-[var(--color-mist)] px-4 py-2.5 text-sm text-[var(--color-ink)]">
              Your total cholesterol of 245 mg/dL is above the 200 mg/dL
              threshold the model weighs heavily. Combined with your age, it
              contributed about 28% to your risk score.
            </div>
            <div className="ml-auto max-w-[80%] rounded-2xl rounded-tr-sm bg-[var(--color-teal-soft)] px-4 py-2.5 text-sm text-[var(--color-teal-deep)]">
              Can you help me write a cover letter instead?
            </div>
            <div className="mr-auto max-w-[85%] rounded-2xl rounded-tl-sm bg-[var(--color-coral-soft)] px-4 py-2.5 text-sm text-[var(--color-ink)]">
              I'm scoped to heart health questions only — happy to help you
              understand your result or general cardiovascular risk instead.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
