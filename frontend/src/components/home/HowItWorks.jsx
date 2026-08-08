const steps = [
  {
    number: "01",
    title: "Enter your vitals",
    description:
      "Age, blood pressure, cholesterol, and the other core clinical markers used in a standard cardiology intake.",
  },
  {
    number: "02",
    title: "The model reads your data",
    description:
      "A logistic regression model trained on clinical heart-disease records scores your inputs against known risk patterns.",
  },
  {
    number: "03",
    title: "Get your result",
    description:
      "See your risk level, the model's confidence, and a plain-language explanation — in under a second.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="border-b border-panel-line bg-obsidian py-24">
      <div className="mx-auto max-w-6xl px-6">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-pulse">
          How it works
        </p>
        <h2 className="mt-3 max-w-md text-balance font-display text-3xl font-medium text-bone sm:text-4xl">
          Three steps between you and a clear answer.
        </h2>

        <div className="mt-14 grid grid-cols-1 gap-10 sm:grid-cols-3 sm:gap-0">
          {steps.map((step, i) => (
            <div
              key={step.number}
              className={i > 0 ? "sm:border-l sm:border-panel-line sm:pl-8" : ""}
            >
              <span className="font-mono text-sm text-pulse">{step.number}</span>
              <h3 className="mt-4 font-display text-xl text-bone">{step.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ash">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

