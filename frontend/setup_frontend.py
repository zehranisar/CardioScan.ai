"""
Run this once from the frontend/ directory: python setup_frontend.py
It writes/overwrites the files needed to connect the Dashboard to the backend API.
"""
import os

BASE = os.path.dirname(os.path.abspath(__file__))

def write(relative_path, content):
    full_path = os.path.join(BASE, relative_path)
    os.makedirs(os.path.dirname(full_path), exist_ok=True)
    with open(full_path, "w", encoding="utf-8", newline="\n") as f:
        f.write(content.lstrip("\n"))
    print(f"wrote {relative_path}")

write('src/lib/api.js', r"""
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://127.0.0.1:5000/api",
  headers: { "Content-Type": "application/json" },
});

export default api;

""")

write('src/features/prediction/predictionApi.js', r"""
import api from "@/lib/api";

/**
 * Sends patient data to the backend and returns the prediction result.
 * Expects data shaped like: { age, sex, cp, trestbps, chol, thalach, exang, oldpeak, ca }
 */
export async function getPrediction(formData) {
  const response = await api.post("/predict", formData);
  return response.data;
}

""")

write('src/features/prediction/PredictionResult.jsx', r"""
export default function PredictionResult({ result }) {
  if (!result) return null;

  const isHighRisk = result.risk === "high";
  const probabilityPercent = Math.round(result.probability * 100);

  return (
    <div
      className={`mt-6 rounded-lg border p-5 ${
        isHighRisk
          ? "border-destructive/30 bg-destructive/10"
          : "border-primary/30 bg-primary/10"
      }`}
    >
      <div className="flex items-center justify-between">
        <span
          className={`rounded-full px-3 py-1 text-sm font-medium ${
            isHighRisk
              ? "bg-destructive/20 text-destructive"
              : "bg-primary/20 text-primary"
          }`}
        >
          {isHighRisk ? "Higher Risk" : "Lower Risk"}
        </span>
        <span className="text-sm text-muted-foreground">
          Model confidence: {probabilityPercent}%
        </span>
      </div>

      <p className="mt-3 text-sm text-foreground">{result.message}</p>

      <p className="mt-4 text-xs text-muted-foreground">
        This is an ML model estimate, not a medical diagnosis. Please consult
        a healthcare professional for an accurate assessment.
      </p>
    </div>
  );
}

""")

write('src/features/prediction/PredictionForm.jsx', r"""
import { useState } from "react";
import { Button } from "@/components/ui/button";
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
    <div className="mx-auto max-w-2xl rounded-lg border border-border bg-card p-6">
      <h2 className="text-lg font-semibold text-foreground">
        Heart Disease Risk Prediction
      </h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Enter the patient's clinical data below to get a risk estimate.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {FIELDS.map((field) => (
          <div key={field.name} className="flex flex-col gap-1.5">
            <label htmlFor={field.name} className="text-sm font-medium text-foreground">
              {field.label}
            </label>

            {field.type === "select" ? (
              <select
                id={field.name}
                required
                value={formData[field.name]}
                onChange={(e) => handleChange(field.name, e.target.value)}
                className="h-9 rounded-md border border-input bg-background px-3 text-sm text-foreground"
              >
                <option value="" disabled>
                  Select...
                </option>
                {field.options.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            ) : (
              <input
                id={field.name}
                type="number"
                step={field.step || "1"}
                required
                placeholder={field.placeholder}
                value={formData[field.name]}
                onChange={(e) => handleChange(field.name, e.target.value)}
                className="h-9 rounded-md border border-input bg-background px-3 text-sm text-foreground"
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
        <p className="mt-4 rounded-md bg-destructive/10 p-3 text-sm text-destructive">
          {error}
        </p>
      )}

      <PredictionResult result={result} />
    </div>
  );
}

""")

write('src/pages/Dashboard.jsx', r"""
import PredictionForm from "@/features/prediction/PredictionForm";

export default function Dashboard() {
  return (
    <div className="p-6">
      <PredictionForm />
    </div>
  );
}
""")

write('.env', r"""
VITE_API_URL=http://127.0.0.1:5000/api

""")

print("\nDone. Files written. Make sure backend is running, then: npm run dev")
