import { HeartPulse } from "lucide-react";

export default function Logo() {
  return (
    <div className="flex items-center gap-3">

      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-600 shadow-lg shadow-red-200">

        <HeartPulse
          className="text-white"
          size={24}
        />

      </div>

      <div className="leading-tight">

        <h2 className="text-2xl font-extrabold tracking-tight text-slate-900">
          CardioCare AI
        </h2>

        <p className="text-sm text-slate-500">
          AI Healthcare Platform
        </p>

      </div>

    </div>
  );
}