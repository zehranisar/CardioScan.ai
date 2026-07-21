import { ArrowRight, PlayCircle } from "lucide-react";
import Stats from "./Stats";

export default function HeroContent() {
  return (
    <div className="max-w-2xl">

      <span className="inline-flex rounded-full bg-red-100 px-4 py-2 text-sm font-semibold text-red-600">
        ❤️ AI Powered Healthcare
      </span>

      <h1 className="mt-6 max-w-[620px] text-5xl font-extrabold leading-[1.1] tracking-tight text-slate-900 sm:text-6xl lg:text-7xl">
        Predict Heart
        <br />
        Disease{" "}
        <span className="text-red-600">
          Before It Happens
        </span>
      </h1>

      <p className="mt-8 max-w-[580px] text-lg leading-9 text-slate-600">
        CardioCare AI combines Machine Learning, Explainable AI and
        Gemini-powered assistance to provide intelligent heart disease
        prediction, personalized health insights and cardiovascular
        risk assessment within seconds.
      </p>

      <div className="mt-10 flex flex-wrap items-center gap-5">

        <button className="flex h-14 items-center justify-center rounded-xl bg-red-600 px-8 font-semibold text-white transition duration-300 hover:bg-red-700">
          Get Started
          <ArrowRight className="ml-2 h-5 w-5" />
        </button>

        <button className="flex h-14 items-center justify-center rounded-xl border border-slate-300 bg-white px-8 font-semibold text-slate-800 transition duration-300 hover:border-red-600 hover:text-red-600">
          <PlayCircle className="mr-2 h-5 w-5" />
          Live Demo
        </button>

      </div>

      <Stats />

    </div>
  );
}