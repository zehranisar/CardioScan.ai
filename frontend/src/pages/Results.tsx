import { useEffect, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { AlertTriangle, HeartPulse, MessagesSquare, RotateCcw, LayoutDashboard, Loader2 } from "lucide-react";
import type { AssessmentPayload, AssessmentResult } from "../lib/api";
import { useAuth } from "../context/AuthContext";
import { saveAssessment } from "../lib/assessments";
import ChatPanel from "../components/ChatPanel";

const RISK_STYLES: Record<
  AssessmentResult["risk_label"],
  { ring: string; text: string; bg: string; label: string }
> = {
  Low: {
    ring: "var(--color-teal)",
    text: "text-[var(--color-teal-deep)]",
    bg: "bg-[var(--color-teal-soft)]",
    label: "Low estimated risk",
  },
  Moderate: {
    ring: "var(--color-amber)",
    text: "text-[#8A5A12]",
    bg: "bg-[var(--color-amber-soft)]",
    label: "Moderate estimated risk",
  },
  High: {
    ring: "var(--color-coral)",
    text: "text-[var(--color-coral)]",
    bg: "bg-[var(--color-coral-soft)]",
    label: "High estimated risk",
  },
};

export default function Results() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const result = location.state?.result as AssessmentResult | undefined;
  const inputs = location.state?.inputs as AssessmentPayload | undefined;

  const [saveState, setSaveState] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [chatOpen, setChatOpen] = useState(false);

  useEffect(() => {
    if (!user || !result || !inputs || saveState !== "idle") return;

    setSaveState("saving");
    saveAssessment(user.id, inputs, result)
      .then(() => setSaveState("saved"))
      .catch(() => setSaveState("error"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, result, inputs]);

  if (!result) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[var(--color-mist)] px-6 pt-24">
        <div className="max-w-sm rounded-3xl border border-white/60 bg-white/95 p-9 text-center shadow-[0_20px_60px_-20px_rgba(15,76,76,0.2)]">
          <AlertTriangle className="mx-auto h-8 w-8 text-[var(--color-amber)]" />
          <h1 className="mt-4 font-[var(--font-display)] text-xl text-[var(--color-ink)]">
            No assessment found
          </h1>
          <p className="mt-2 text-sm text-[var(--color-sage)]">
            Start a new assessment to see your results here.
          </p>
          <button
            onClick={() => navigate("/assess")}
            className="mt-6 rounded-full bg-[var(--color-coral)] px-6 py-3 text-sm font-semibold text-white transition-transform hover:scale-[1.03]"
          >
            Start assessment
          </button>
        </div>
      </main>
    );
  }

  const style = RISK_STYLES[result.risk_label];
  const pct = Math.round(result.risk_probability * 100);
  const dashOffset = 267 - (267 * pct) / 100;

  return (
    <main className="min-h-screen bg-[var(--color-mist)] px-6 pb-20 pt-28">
      <div className="mx-auto max-w-2xl">
        <div className="text-center">
          <span className="text-xs font-semibold uppercase tracking-wide text-[var(--color-coral)]">
            Your result
          </span>
          <h1 className="mt-2 font-[var(--font-display)] text-3xl text-[var(--color-ink)]">
            Here's what we found
          </h1>
        </div>

        {/* Gauge card */}
        <div className="mt-8 rounded-3xl border border-white/60 bg-white/95 p-8 text-center shadow-[0_20px_60px_-20px_rgba(15,76,76,0.2)] sm:p-10">
          <svg viewBox="0 0 200 110" className="mx-auto w-56">
            <path
              d="M15,100 A85,85 0 0,1 185,100"
              fill="none"
              stroke="var(--color-teal-soft)"
              strokeWidth="16"
              strokeLinecap="round"
            />
            <path
              d="M15,100 A85,85 0 0,1 185,100"
              fill="none"
              stroke={style.ring}
              strokeWidth="16"
              strokeLinecap="round"
              strokeDasharray="267"
              strokeDashoffset={dashOffset}
              style={{ transition: "stroke-dashoffset 1s ease-out" }}
            />
          </svg>
          <div className="-mt-12">
            <span className="font-[var(--font-mono)] text-5xl font-semibold text-[var(--color-ink)]">
              {pct}%
            </span>
          </div>
          <span
            className={`mt-3 inline-block rounded-full px-4 py-1.5 text-sm font-semibold ${style.bg} ${style.text}`}
          >
            {style.label}
          </span>

          <p className="mx-auto mt-5 max-w-sm text-sm leading-relaxed text-[var(--color-sage)]">
            This is a statistical estimate from a model trained on clinical
            cardiovascular data — not a diagnosis. Please discuss this result
            with a doctor.
          </p>
        </div>

        {/* Top factors */}
        <div className="mt-6 rounded-3xl border border-white/60 bg-white/95 p-7 shadow-[0_4px_20px_-8px_rgba(15,76,76,0.12)] sm:p-8">
          <h2 className="font-[var(--font-display)] text-xl text-[var(--color-ink)]">
            What drove this result
          </h2>
          <div className="mt-5 space-y-4">
            {result.top_factors.map((f) => (
              <div key={f.feature}>
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-[var(--color-ink)]">{f.label}</span>
                  <span
                    className={`text-xs font-semibold ${
                      f.direction === "increases" ? "text-[var(--color-coral)]" : "text-[var(--color-teal)]"
                    }`}
                  >
                    {f.direction === "increases" ? "↑ increases risk" : "↓ decreases risk"}
                  </span>
                </div>
                <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-[var(--color-teal-soft)]">
                  <div
                    className={`h-full rounded-full ${
                      f.direction === "increases" ? "bg-[var(--color-coral)]" : "bg-[var(--color-teal)]"
                    }`}
                    style={{ width: `${Math.min(100, f.impact * 400)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Link
            to="/assess"
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-[var(--color-teal-soft)] bg-white px-6 py-3 text-sm font-semibold text-[var(--color-teal-deep)] transition-colors hover:bg-[var(--color-teal-soft)]"
          >
            <RotateCcw className="h-4 w-4" />
            Retake assessment
          </Link>
          <button
            onClick={() => setChatOpen(true)}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-[var(--color-abyss)] px-6 py-3 text-sm font-semibold text-white transition-transform hover:scale-[1.02]"
          >
            <MessagesSquare className="h-4 w-4" />
            Ask the assistant
          </button>
        </div>

        {user && (
          <div className="mt-4 text-center">
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--color-teal-deep)] hover:text-[var(--color-coral)]"
            >
              <LayoutDashboard className="h-3.5 w-3.5" />
              View dashboard
            </Link>
          </div>
        )}

        {user && (
          <p className="mt-4 text-center text-xs text-[var(--color-sage)]">
            {saveState === "saving" && (
              <span className="inline-flex items-center gap-1.5">
                <Loader2 className="h-3 w-3 animate-spin" /> Saving to your history...
              </span>
            )}
            {saveState === "saved" && "Saved to your assessment history."}
            {saveState === "error" && "Couldn't save this to your history — you can still view it now."}
          </p>
        )}

        <div className="mt-8 flex items-center justify-center gap-1.5 text-xs text-[var(--color-sage)]">
          <HeartPulse className="h-3.5 w-3.5" />
          CardioScan.ai — informational estimate only, not a medical diagnosis
        </div>
      </div>

      <ChatPanel
        open={chatOpen}
        onClose={() => setChatOpen(false)}
        context={{
          risk_probability: result.risk_probability,
          risk_label: result.risk_label,
          top_factors: result.top_factors,
        }}
      />
    </main>
  );
}
