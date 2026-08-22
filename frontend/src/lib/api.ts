const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8000";

export type AssessmentPayload = {
  age: string;
  sex: string;
  cp: string;
  trestbps: string;
  chol: string;
  fbs: string;
  restecg: string;
  thalach: string;
  exang: string;
  oldpeak: string;
  slope: string;
  ca: string;
  thal: string;
};

export type Factor = {
  feature: string;
  label: string;
  impact: number;
  direction: "increases" | "decreases";
};

export type AssessmentResult = {
  risk_probability: number;
  risk_label: "Low" | "Moderate" | "High";
  top_factors: Factor[];
};

export async function getPrediction(form: AssessmentPayload): Promise<AssessmentResult> {
  const res = await fetch(`${API_URL}/predict`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      age: Number(form.age),
      sex: form.sex,
      cp: form.cp,
      trestbps: Number(form.trestbps),
      chol: Number(form.chol),
      fbs: form.fbs,
      restecg: form.restecg,
      thalach: Number(form.thalach),
      exang: form.exang,
      oldpeak: Number(form.oldpeak),
      slope: form.slope,
      ca: form.ca,
      thal: form.thal,
    }),
  });

  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new Error(body?.detail ?? `Request failed with status ${res.status}`);
  }

  return res.json();
}
