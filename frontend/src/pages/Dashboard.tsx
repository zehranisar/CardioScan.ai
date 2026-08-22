import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";
import { AlertCircle, ArrowRight, HeartPulse, Loader2, PlusCircle } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { getAssessments } from "../lib/assessments";
import type { SavedAssessment } from "../lib/assessments";

const RISK_DOT: Record<SavedAssessment["risk_label"], string> = {
  Low: "bg-[var(--color-teal)]",
  Moderate: "bg-[var(--color-amber)]",
  High: "bg-[var(--color-coral)]",
};

export default function Dashboard() {
  const { user, loading: authLoading } = useAuth();
  const [items, setItems] = useState<SavedAssessment[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;
    getAssessments(user.id)
      .then(setItems)
      .catch(() => setError("Couldn't load your assessment history."));
  }, [user]);

  if (!authLoading && !user) {
    return <Navigate to="/signin" state={{ from: "/dashboard" }} replace />;
  }

  const chartData = (items ?? [])
    .slice()
    .reverse()
    .map((a) => ({
      date: new Date(a.created_at).toLocaleDateString(undefined, { month: "short", day: "numeric" }),
      risk: Math.round(a.risk_probability * 100),
    }));

  return (
    <main className="min-h-screen bg-[var(--color-mist)] px-6 pb-20 pt-28">
      <div className="mx-auto max-w-3xl">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wide text-[var(--color-coral)]">
              Your history
            </span>
            <h1 className="mt-1 font-[var(--font-display)] text-3xl text-[var(--color-ink)]">
              Dashboard
            </h1>
          </div>
          <Link
            to="/assess"
            className="hidden items-center gap-2 rounded-full bg-[var(--color-coral)] px-5 py-2.5 text-sm font-semibold text-white transition-transform hover:scale-[1.03] sm:inline-flex"
          >
            <PlusCircle className="h-4 w-4" />
            New assessment
          </Link>
        </div>

        {!items && !error && (
          <div className="mt-10 flex items-center justify-center gap-2 text-sm text-[var(--color-sage)]">
            <Loader2 className="h-4 w-4 animate-spin" />
            Loading your history...
          </div>
        )}

        {error && (
          <div className="mt-6 flex items-start gap-2 rounded-xl border border-[var(--color-coral)]/30 bg-[var(--color-coral-soft)] px-4 py-3 text-sm text-[var(--color-coral)]">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
            {error}
          </div>
        )}

        {items && items.length === 0 && (
          <div className="mt-10 rounded-3xl border border-white/60 bg-white/95 p-10 text-center shadow-[0_20px_60px_-20px_rgba(15,76,76,0.2)]">
            <HeartPulse className="mx-auto h-8 w-8 text-[var(--color-teal-deep)]" />
            <h2 className="mt-4 font-[var(--font-display)] text-lg text-[var(--color-ink)]">
              No assessments yet
            </h2>
            <p className="mt-2 text-sm text-[var(--color-sage)]">
              Take your first assessment to start tracking your heart health over time.
            </p>
            <Link
              to="/assess"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-[var(--color-coral)] px-6 py-3 text-sm font-semibold text-white transition-transform hover:scale-[1.03]"
            >
              Start assessment
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        )}

        {items && items.length > 0 && (
          <>
            {items.length > 1 && (
              <div className="mt-8 rounded-3xl border border-white/60 bg-white/95 p-6 shadow-[0_4px_20px_-8px_rgba(15,76,76,0.12)]">
                <h2 className="text-sm font-semibold text-[var(--color-ink)]">Risk over time</h2>
                <div className="mt-4 h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                      <XAxis dataKey="date" tick={{ fontSize: 11, fill: "var(--color-sage)" }} axisLine={false} tickLine={false} />
                      <YAxis
                        domain={[0, 100]}
                        tick={{ fontSize: 11, fill: "var(--color-sage)" }}
                        axisLine={false}
                        tickLine={false}
                        width={32}
                      />
                      <Tooltip
                        formatter={(value) => [`${value}%`, "Risk"]}
                        contentStyle={{ borderRadius: 12, border: "1px solid var(--color-teal-soft)", fontSize: 13 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="risk"
                        stroke="var(--color-coral)"
                        strokeWidth={2.5}
                        dot={{ r: 4, fill: "var(--color-coral)" }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}

            <div className="mt-6 space-y-3">
              {items.map((a) => (
                <div
                  key={a.id}
                  className="flex items-center justify-between rounded-2xl border border-white/60 bg-white/95 px-5 py-4 shadow-[0_4px_20px_-8px_rgba(15,76,76,0.1)]"
                >
                  <div className="flex items-center gap-3">
                    <span className={`h-2.5 w-2.5 rounded-full ${RISK_DOT[a.risk_label]}`} />
                    <div>
                      <p className="text-sm font-semibold text-[var(--color-ink)]">
                        {Math.round(a.risk_probability * 100)}% — {a.risk_label} risk
                      </p>
                      <p className="text-xs text-[var(--color-sage)]">
                        {new Date(a.created_at).toLocaleDateString(undefined, {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        <Link
          to="/assess"
          className="mt-8 flex items-center justify-center gap-2 rounded-full bg-[var(--color-coral)] px-5 py-3 text-sm font-semibold text-white transition-transform hover:scale-[1.03] sm:hidden"
        >
          <PlusCircle className="h-4 w-4" />
          New assessment
        </Link>
      </div>
    </main>
  );
}
