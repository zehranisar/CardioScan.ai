import { HeartPulse } from "lucide-react";

export default function AnalyzingOverlay() {
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-[var(--color-mist)]/95 backdrop-blur-sm">
      <div className="w-full max-w-sm px-6 text-center">
        <span className="relative mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[var(--color-teal-soft)] text-[var(--color-teal-deep)]">
          <HeartPulse className="h-7 w-7 animate-pulse" />
          <span className="absolute inset-0 animate-ping rounded-full bg-[var(--color-teal)]/30" />
        </span>

        <p className="mt-5 font-[var(--font-display)] text-lg text-[var(--color-ink)]">
          Analyzing your assessment...
        </p>
        <p className="mt-1 text-sm text-[var(--color-sage)]">
          Running the model and calculating your risk factors
        </p>

        <div className="mt-8 rounded-3xl border border-white/60 bg-white/80 p-7 text-left shadow-[0_20px_60px_-20px_rgba(15,76,76,0.15)]">
          <div className="mx-auto h-24 w-24 animate-pulse rounded-full bg-[var(--color-teal-soft)]" />
          <div className="mx-auto mt-4 h-3 w-24 animate-pulse rounded-full bg-[var(--color-teal-soft)]" />
          <div className="mt-6 space-y-2.5">
            {[100, 85, 70, 55].map((w, i) => (
              <div
                key={i}
                className="h-2 animate-pulse rounded-full bg-[var(--color-teal-soft)]"
                style={{ width: `${w}%`, animationDelay: `${i * 0.1}s` }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
