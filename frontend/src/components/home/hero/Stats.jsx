const stats = [
  {
    value: "96%",
    label: "Prediction Accuracy",
  },
  {
    value: "50K+",
    label: "Predictions Made",
  },
  {
    value: "24/7",
    label: "AI Support",
  },
];

export default function Stats() {
  return (
    <div className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-3">

      {stats.map((item) => (
        <div
          key={item.label}
          className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-xl"
        >
          <h3 className="text-3xl font-bold text-red-600">
            {item.value}
          </h3>

          <p className="mt-2 text-sm text-slate-500">
            {item.label}
          </p>
        </div>
      ))}

    </div>
  );
}