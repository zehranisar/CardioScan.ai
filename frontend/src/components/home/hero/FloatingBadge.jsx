import { Sparkles } from "lucide-react";

export default function FloatingBadge() {
  return (
    <div className="absolute -top-6 -right-6 hidden rounded-2xl border border-red-100 bg-white px-5 py-4 shadow-xl lg:flex items-center gap-3">

      <div className="rounded-xl bg-red-100 p-2">

        <Sparkles
          className="text-red-600"
          size={18}
        />

      </div>

      <div>

        <p className="text-xs text-slate-500">
          AI Status
        </p>

        <p className="font-semibold text-slate-900">
          Monitoring
        </p>

      </div>

    </div>
  );
}