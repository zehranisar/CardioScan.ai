import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getPrediction } from "./predictionApi";
import PredictionResult from "./PredictionResult";

const FIELDS = [
  { name: "age", label: "Age", type: "number", placeholder: "e.g. 54" },
  {
    name: "sex",
    label: "Sex",
    type: "select",
    options: [
      { value: 0, label: "Female" },
      { value: 1, label: "Male" },
    ],
  },
  {
    name: "cp",
    label: "Chest Pain Type",
    type: "select",
    options: [
      { value: 0, label: "Typical angina" },
      { value: 1, label: "Atypical angina" },
      { value: 2, label: "Non-anginal pain" },
      { value: 3, label: "Asymptomatic" },
    ],
  },
  { name: "trestbps", label: "Resting Blood Pressure (mm Hg)", type: "number", placeholder: "e.g. 130" },
  { name: "chol", label: "Serum Cholesterol (mg/dl)", type: "number", placeholder: "e.g. 245" },
  { name: "thalach", label: "Max Heart Rate Achieved", type: "number", placeholder: "e.g. 150" },
  {
    name: "exang",
    label: "Exercise Induced Angina",
    type: "select",
    options: [
      { value: 0, label: "No" },
      { value: 1, label: "Yes" },
    ],
  },
  { name: "oldpeak", label: "ST Depression (Oldpeak)", type: "number", step: "0.1", placeholder: "e.g. 1.2" },
  {
    name: "ca",
    label: "Major Vessels Colored (0-4)",
    type: "select",
    options: [0, 1, 2, 3, 4].map((v) => ({ value: v, label: String(v) })),
  },
];

const EMPTY_FORM = FIELDS.reduce((acc, f) => ({ ...acc, [f.name]: "" }), {});

export default function PredictionForm() {
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  function handleChange(name, value) {
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setResult(null);
    setLoading(true);

    try {
      const payload = Object.fromEntries(
        Object.entries(formData).map(([key, value]) => [key, Number(value)])
      );
      const data = await getPrediction(payload);
      setResult(data);
    } catch (err) {
      setError(
        err.response?.data?.error ||
          "Something went wrong reaching the prediction service. Is the backend running?"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-2xl border border-panel-line bg-panel p-8">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-pulse">
        Risk assessment
      </p>
      <h2 className="mt-2 font-display text-2xl font-medium text-bone">
        Heart Disease Risk Prediction
      </h2>
      <p className="mt-2 text-sm text-ash">
        Enter the patient's clinical data below to get a risk estimate.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {FIELDS.map((field) => (
          <div key={field.name} className="flex flex-col gap-1.5">
            <label htmlFor={field.name} className="text-sm font-medium text-ash">
              {field.label}
            </label>

            {field.type === "select" ? (
              <select
                id={field.name}
                required
                value={formData[field.name]}
                onChange={(e) => handleChange(field.name, e.target.value)}
                className="h-11 border border-panel-line bg-transparent px-3.5 text-sm text-bone outline-none transition-colors focus:border-pulse"
              >
                <option value="" disabled className="bg-panel">
                  Select...
                </option>
                {field.options.map((opt) => (
                  <option key={opt.value} value={opt.value} className="bg-panel text-bone">
                    {opt.label}
                  </option>
                ))}
              </select>
            ) : (
              <Input
                id={field.name}
                type="number"
                step={field.step || "1"}
                required
                placeholder={field.placeholder}
                value={formData[field.name]}
                onChange={(e) => handleChange(field.name, e.target.value)}
              />
            )}
          </div>
        ))}

        <div className="sm:col-span-2">
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Predicting..." : "Get Prediction"}
          </Button>
        </div>
      </form>

      {error && (
        <p className="mt-4 border border-pulse/30 bg-pulse/10 p-3 text-sm text-pulse">
          {error}
        </p>
      )}

      <PredictionResult result={result} />
    </div>
  );
}
