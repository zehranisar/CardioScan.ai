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

// Raw shape returned by the OCR endpoint — numbers stay numbers here,
// booleans stay booleans for fbs/exang; the caller converts to the
// string-based AssessmentPayload shape the form uses.
export type ExtractedFields = Partial<{
  age: number;
  sex: "male" | "female";
  cp: "typical" | "atypical" | "non_anginal" | "asymptomatic";
  trestbps: number;
  chol: number;
  fbs: "1" | "0";
  restecg: "normal" | "st_t_abnormality" | "lv_hypertrophy";
  thalach: number;
  exang: "1" | "0";
  oldpeak: number;
  slope: "upsloping" | "flat" | "downsloping";
  ca: "0" | "1" | "2" | "3";
  thal: "normal" | "fixed_defect" | "reversible_defect";
}>;

export async function extractFromReport(file: File): Promise<ExtractedFields> {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(`${API_URL}/ocr/extract`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new Error(body?.detail ?? `Extraction failed with status ${res.status}`);
  }

  return res.json();
}

export type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

export type ChatContext = {
  risk_probability: number;
  risk_label: string;
  top_factors: Factor[];
};

export async function sendChatMessage(
  message: string,
  history: ChatMessage[],
  context?: ChatContext
): Promise<string> {
  const res = await fetch(`${API_URL}/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message, history, context }),
  });

  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new Error(body?.detail ?? `Request failed with status ${res.status}`);
  }

  const data = await res.json();
  return data.reply;
}
