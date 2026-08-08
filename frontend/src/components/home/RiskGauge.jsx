/**
 * A mock risk-score widget, styled like a real product screenshot rather
 * than abstract decoration. The ring animates in on mount.
 */
export default function RiskGauge() {
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const percent = 18;
  const offset = circumference * (1 - percent / 100);

  const vitals = [
    ["Age", "54"],
    ["Blood pressure", "128 mm Hg"],
    ["Cholesterol", "210 mg/dl"],
  ];

  return (
    <div className="border border-hairline bg-surface p-6">
      <div className="flex items-center justify-between">
        <span className="font-mono text-xs uppercase tracking-[0.15em] text-slate">
          Risk score
        </span>
        <span className="h-2 w-2 rounded-full bg-ember" />
      </div>

      <div className="relative mx-auto mt-6 flex h-44 w-44 items-center justify-center">
        <svg viewBox="0 0 160 160" className="h-full w-full -rotate-90">
          <circle
            cx="80"
            cy="80"
            r={radius}
            fill="none"
            stroke="var(--color-hairline)"
            strokeWidth="10"
          />
          <circle
            cx="80"
            cy="80"
            r={radius}
            fill="none"
            stroke="var(--color-ember)"
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={circumference}
            style={{
              "--gauge-circumference": circumference,
              "--gauge-offset": offset,
            }}
            className="animate-gauge-fill"
          />
        </svg>
        <div className="absolute flex flex-col items-center">
          <span className="font-display text-4xl font-semibold text-ivory">
            {percent}%
          </span>
          <span className="mt-1 font-mono text-[11px] uppercase tracking-wider text-slate">
            Low risk
          </span>
        </div>
      </div>

      <div className="mt-6 space-y-2 border-t border-hairline pt-4">
        {vitals.map(([label, value]) => (
          <div key={label} className="flex items-center justify-between text-sm">
            <span className="text-slate">{label}</span>
            <span className="font-mono text-ivory">{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
