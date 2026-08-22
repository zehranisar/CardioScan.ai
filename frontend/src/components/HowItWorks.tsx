import PulseLine from "./PulseLine";

const STEPS = [
  {
    n: "01",
    title: "Enter or upload",
    description:
      "Fill in vitals manually, or upload a photo of a recent blood test or ECG report and let the reader extract the values.",
  },
  {
    n: "02",
    title: "Model assesses risk",
    description:
      "Your data is weighed against patterns learned from clinical cardiovascular records to produce a risk percentage.",
  },
  {
    n: "03",
    title: "Understand the why",
    description:
      "A breakdown shows exactly which factors pushed your score up or down — cholesterol, blood pressure, age, and more.",
  },
  {
    n: "04",
    title: "Ask, then act",
    description:
      "Chat with the assistant about your result, get plain-language context, and take a summary to your doctor.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-[var(--color-abyss)] px-6 py-24 text-white">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-xl">
          <span className="text-xs font-semibold uppercase tracking-wide text-[var(--color-coral)]">
            The process
          </span>
          <h2 className="mt-3 font-[var(--font-display)] text-3xl md:text-4xl">
            From vitals to a clear answer
          </h2>
        </div>

        <PulseLine
          className="mt-10 h-10 w-full opacity-40"
          color="#ffffff"
          animate={false}
        />

        <div className="mt-10 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step) => (
            <div key={step.n}>
              <span className="font-[var(--font-mono)] text-sm text-[var(--color-coral)]">
                {step.n}
              </span>
              <h3 className="mt-3 font-[var(--font-display)] text-xl">{step.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-white/85">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
