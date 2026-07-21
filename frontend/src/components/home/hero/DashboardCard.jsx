import {
  HeartPulse,
  Activity,
  ShieldCheck,
} from "lucide-react";

export default function DashboardCard() {
  return (
    <div className="w-full max-w-lgrounded-3xl border border-slate-200 bg-white p-10 shadow-2xl">

      {/* Header */}
      <div className="flex items-center gap-4">

        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-100">

          <HeartPulse
            className="text-red-600"
            size={28}
          />

        </div>

        <div>

          <h3 className="text-xl font-bold text-slate-900">
            Heart Risk Analysis
          </h3>

          <p className="text-sm text-slate-500">
            AI Generated Report
          </p>

        </div>

      </div>

      {/* Risk */}

      <div className="mt-8">

        <div className="flex justify-between">

          <span className="text-slate-500">
            Overall Risk
          </span>

          <span className="text-3xl font-bold text-red-600">
            12%
          </span>

        </div>

        <div className="mt-4 h-3 rounded-full bg-slate-200">

          <div
            className="h-3 rounded-full bg-red-600"
            style={{ width: "12%" }}
          />

        </div>

      </div>

      {/* Cards */}

      <div className="mt-8 grid grid-cols-2 gap-4">

        <div className="rounded-2xl bg-slate-50 p-5">

          <Activity
            className="mb-3 text-blue-600"
            size={22}
          />

          <p className="text-sm text-slate-500">
            Heart Rate
          </p>

          <h4 className="mt-1 text-xl font-bold">
            72 BPM
          </h4>

        </div>

        <div className="rounded-2xl bg-slate-50 p-5">

          <ShieldCheck
            className="mb-3 text-green-600"
            size={22}
          />

          <p className="text-sm text-slate-500">
            Prediction
          </p>

          <h4 className="mt-1 text-xl font-bold text-green-600">
            Healthy
          </h4>

        </div>

      </div>

      {/* Recommendation */}

      <div className="mt-8 rounded-2xl bg-red-50 p-5">

        <p className="font-semibold text-red-600">
          AI Recommendation
        </p>

        <p className="mt-2 text-sm leading-7 text-slate-600">
          Low cardiovascular risk detected. Continue
          regular exercise and maintain a healthy lifestyle.
        </p>

      </div>

    </div>
  );
}