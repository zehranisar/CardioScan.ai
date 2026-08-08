export default function PredictionResult({ result }) {
  if (!result) return null;

  const isHighRisk = result.risk === "high";
  const probabilityPercent = Math.round(result.probability * 100);

  const boxClass =
    "mt-8 border p-6 " +
    (isHighRisk ? "border-pulse/40 bg-pulse/10" : "border-panel-line bg-obsidian");

  const badgeClass =
    "px-3 py-1 font-mono text-xs uppercase tracking-wider " +
    (isHighRisk ? "bg-pulse text-bone" : "border border-panel-line text-bone");

  return (
    <div className={boxClass}>
      <div className="flex items-center justify-between">
        <span className={badgeClass}>
          {isHighRisk ? "Higher risk" : "Lower risk"}
        </span>
        <span className="font-mono text-xs text-ash">
          Confidence: {probabilityPercent}%
        </span>
      </div>

      <p className="mt-4 text-sm leading-relaxed text-bone">{result.message}</p>

      <p className="mt-4 text-xs text-ash">
        This is an ML model estimate, not a medical diagnosis. Please consult
        a healthcare professional for an accurate assessment.
      </p>
    </div>
  );
}
