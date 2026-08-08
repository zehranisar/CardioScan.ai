const stats = [
  { value: "82%", label: "Model accuracy on held-out test data" },
  { value: "9", label: "Clinical markers analyzed per check" },
  { value: "<1s", label: "Time to result" },
];

export default function TrustBand() {
  return (
    <section className="border-b border-panel-line bg-panel py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-3">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center sm:text-left">
              <p className="font-mono text-5xl font-medium text-pulse sm:text-6xl">
                {stat.value}
              </p>
              <p className="mt-2 text-sm text-ash">{stat.label}</p>
            </div>
          ))}
        </div>

        <p className="mt-14 max-w-2xl text-sm leading-relaxed text-ash">
          Cardyx is a screening aid built on a machine learning model, not a
          diagnostic device. Always consult a healthcare professional about
          your cardiovascular health.
        </p>
      </div>
    </section>
  );
}

