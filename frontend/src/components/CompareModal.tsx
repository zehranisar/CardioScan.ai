import { X, TrendingDown, TrendingUp, Minus } from "lucide-react";
import type { SavedAssessment } from "../lib/assessments";

type CompareModalProps = {
  open: boolean;
  onClose: () => void;
  a: SavedAssessment;
  b: SavedAssessment;
};

const RISK_TEXT: Record<SavedAssessment["risk_label"], string> = {
  Low: "text-[var(--color-teal-deep)]",
  Moderate: "text-[#8A5A12]",
  High: "text-[var(--color-coral)]",
};

const RISK_BG: Record<SavedAssessment["risk_label"], string> = {
  Low: "bg-[var(--color-teal-soft)]",
  Moderate: "bg-[var(--color-amber-soft)]",
  High: "bg-[var(--color-coral-soft)]",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function Column({ item, otherPct }: { item: SavedAssessment; otherPct: number }) {
  const pct = Math.round(item.risk_probability * 100);
  const diff = pct - otherPct;

  return (
    <div className="flex-1">
      <p className="text-center text-xs font-medium text-[var(--color-sage)]">
        {formatDate(item.created_at)}
      </p>
      <div className="mt-2 text-center">
        <span className="font-[var(--font-mono)] text-4xl font-semibold text-[var(--color-ink)]">
          {pct}%
        </span>
      </div>
      <div className="mt-2 flex justify-center">
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${RISK_BG[item.risk_label]} ${RISK_TEXT[item.risk_label]}`}
        >
          {item.risk_label} risk
        </span>
      </div>

      {diff !== 0 && (
        <div className="mt-2 flex items-center justify-center gap-1 text-xs font-medium text-[var(--color-sage)]">
          {diff > 0 ? (
            <TrendingUp className="h-3.5 w-3.5 text-[var(--color-coral)]" />
          ) : (
            <TrendingDown className="h-3.5 w-3.5 text-[var(--color-teal)]" />
          )}
          {diff > 0 ? "+" : ""}
          {diff} pts vs other
        </div>
      )}
      {diff === 0 && (
        <div className="mt-2 flex items-center justify-center gap-1 text-xs font-medium text-[var(--color-sage)]">
          <Minus className="h-3.5 w-3.5" />
          Same
        </div>
      )}

      <div className="mt-5 space-y-2.5">
        {item.top_factors.map((f) => (
          <div key={f.feature} className="rounded-xl bg-[var(--color-mist)] px-3 py-2">
            <p className="text-xs font-medium text-[var(--color-ink)]">{f.label}</p>
            <p
              className={`text-[11px] font-semibold ${
                f.direction === "increases" ? "text-[var(--color-coral)]" : "text-[var(--color-teal)]"
              }`}
            >
              {f.direction === "increases" ? "↑ increases risk" : "↓ decreases risk"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function CompareModal({ open, onClose, a, b }: CompareModalProps) {
  if (!open) return null;

  const pctA = Math.round(a.risk_probability * 100);
  const pctB = Math.round(b.risk_probability * 100);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[var(--color-abyss)]/60 px-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-white/60 bg-white p-6 shadow-[0_30px_80px_-20px_rgba(15,76,76,0.4)] sm:p-8"
      >
        <div className="flex items-center justify-between">
          <h2 className="font-[var(--font-display)] text-xl text-[var(--color-ink)]">
            Comparing two assessments
          </h2>
          <button
            onClick={onClose}
            className="rounded-full p-1.5 text-[var(--color-sage)] transition-colors hover:bg-[var(--color-teal-soft)] hover:text-[var(--color-teal-deep)]"
            aria-label="Close comparison"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-6 flex gap-4 divide-x divide-[var(--color-teal-soft)] sm:gap-6">
          <Column item={a} otherPct={pctB} />
          <div className="pl-4 sm:pl-6">
            <Column item={b} otherPct={pctA} />
          </div>
        </div>
      </div>
    </div>
  );
}
