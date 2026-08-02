import {
  Brain,
  HeartPulse,
  ShieldCheck,
  MessageCircleMore,
} from "lucide-react";

const features = [
  {
    icon: <Brain className="h-8 w-8 text-red-600" />,
    title: "AI Prediction",
    description:
      "Advanced machine learning models analyze heart disease risk with high accuracy.",
  },
  {
    icon: <HeartPulse className="h-8 w-8 text-red-600" />,
    title: "Real-Time Monitoring",
    description:
      "Track important cardiovascular indicators and receive instant insights.",
  },
  {
    icon: <ShieldCheck className="h-8 w-8 text-red-600" />,
    title: "Explainable AI",
    description:
      "Understand why the prediction was made instead of receiving only a score.",
  },
  {
    icon: <MessageCircleMore className="h-8 w-8 text-red-600" />,
    title: "AI Health Assistant",
    description:
      "Get personalized medical guidance powered by Gemini AI in real time.",
  },
];

export default function Features() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">

        <div className="mx-auto max-w-3xl text-center">

          <span className="rounded-full bg-red-100 px-4 py-2 text-sm font-semibold text-red-600">
            FEATURES
          </span>

          <h2 className="mt-6 text-4xl font-bold text-slate-900">
            Everything You Need For
            <span className="text-red-600"> Smart Heart Care</span>
          </h2>

          <p className="mt-5 text-lg leading-8 text-slate-600">
            Cardyx combines artificial intelligence, medical
            prediction and personalized assistance into one modern platform.
          </p>

        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-4">

          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl"
            >

              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50">
                {feature.icon}
              </div>

              <h3 className="text-xl font-semibold text-slate-900">
                {feature.title}
              </h3>

              <p className="mt-4 leading-7 text-slate-600">
                {feature.description}
              </p>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}