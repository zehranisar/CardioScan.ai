import { Link } from "react-router-dom";
import { ArrowRight, Activity } from "lucide-react";
import RiskGauge from "./RiskGauge";

export default function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-hairline bg-ink pt-36 pb-20">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-16 px-6 lg:grid-cols-2">
        <div>
          <div className="inline-flex items-center gap-2 border border-hairline bg-surface px-4 py-1.5 font-mono text-xs uppercase tracking-[0.15em] text-slate">
            <Activity size={13} className="text-ember" />
            AI-assisted cardiovascular screening
          </div>

          <h1 className="mt-6 font-display text-4xl font-semibold leading-[1.1] text-ivory sm:text-5xl lg:text-6xl">
            Know your heart.
            <br />
            <span className="text-ember">Before it has to tell you.</span>
          </h1>

          <p className="mt-6 max-w-lg text-lg leading-relaxed text-slate">
            Enter your vitals and get an instant, model-backed estimate of
            your heart disease risk — the same nine clinical markers
            cardiologists look at first.
          </p>

          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <Link
              to="/dashboard"
              className="group inline-flex items-center justify-center gap-2 bg-ember px-7 py-3.5 font-medium text-ink transition hover:bg-ember-dim"
            >
              Check your risk
              <ArrowRight size={16} className="transition group-hover:translate-x-1" />
            </Link>
            
              href="#how-it-works"
              className="inline-flex items-center justify-center gap-2 border border-hairline px-7 py-3.5 font-medium text-ivory transition hover:border-slate"
            >
              See how it works
            </a>
          </div>
        </div>

        <div className="mx-auto w-full max-w-sm">
          <RiskGauge />
        </div>
      </div>
    </section>
  );
}
