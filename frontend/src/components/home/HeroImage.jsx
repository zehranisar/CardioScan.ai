import { HeartPulse, Activity, BrainCircuit } from "lucide-react";

export default function HeroImage() {
  return (
    <div className="relative flex items-center justify-center">

      <div className="flex h-72 w-72 items-center justify-center rounded-full bg-red-50">

        <div className="flex h-52 w-52 items-center justify-center rounded-full bg-red-600 text-white shadow-2xl">

          <HeartPulse size={90} />

        </div>

      </div>

      <div className="absolute left-0 top-10 rounded-xl bg-white p-4 shadow-lg">

        <Activity className="text-red-600" />

        <p className="mt-2 text-xs">
          Live ECG
        </p>

      </div>

      <div className="absolute bottom-6 right-0 rounded-xl bg-white p-4 shadow-lg">

        <BrainCircuit className="text-blue-600" />

        <p className="mt-2 text-xs">
          AI Analysis
        </p>

      </div>

    </div>
  );
}