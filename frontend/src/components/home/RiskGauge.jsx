export default function RiskGauge() {
  return (
    <div className="relative flex h-36 w-36 items-center justify-center rounded-full border-8 border-red-100 bg-white shadow-lg">

      <div className="text-center">

        <h2 className="text-4xl font-black text-red-600">
          12%
        </h2>

        <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-slate-500">
          Low Risk
        </p>

      </div>

    </div>
  );
}s