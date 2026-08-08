import { Link } from "react-router-dom";
import { ArrowRight, Heart } from "lucide-react";
import ECGLine from "./ECGLine";

export default function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-panel-line bg-obsidian pt-40 pb-16">
      {/* faint ambient ECG texture behind the headline */}
      <ECGLine className="pointer-events-none absolute inset-x-0 top-[38%] h-32 -translate-y-1/2 opacity-[0.07]" />

      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <div className="mx-auto mb-8 inline-flex items-center gap-2 rounded-full border border-panel-line bg-panel px-4 py-1.5 font-mono text-xs uppercase tracking-[0.2em] text-ash">
          <Heart size={13} className="animate-heartbeat text-pulse" fill="currentColor" />
          AI-assisted cardiovascular screening
        </div>

        <h1 className="text-balance font-display text-5xl font-medium leading-[1.05] text-bone sm:text-6xl lg:text-7xl">
          Know your heart.
          <br />
          <span className="text-pulse">Before it has to tell you.</span>
        </h1>

        <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-ash">
          Enter your vitals and get an instant, model-backed estimate of your
          heart disease risk — the same nine clinical markers cardiologists
          look at first.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            to="/dashboard"
            className="group inline-flex items-center gap-2 bg-pulse px-7 py-3.5 font-medium text-bone transition hover:bg-pulse-dim"
          >
            Check your risk
            <ArrowRight size={16} className="transition group-hover:translate-x-1" />
          </Link>
          <a
            href="#how-it-works"
            className="inline-flex items-center gap-2 border border-panel-line px-7 py-3.5 font-medium text-bone transition hover:border-ash"
          >
            See how it works
          </a>
        </div>
      </div>

      {/* prominent ECG strip beneath the fold — the page's signature element */}
      <div className="relative mt-20 h-24 sm:h-28">
        <ECGLine className="absolute inset-0" />
        <div className="absolute inset-x-0 bottom-0 h-full bg-gradient-to-t from-obsidian via-transparent to-transparent" />
      </div>
    </section>
  );
}

