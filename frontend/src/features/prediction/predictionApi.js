import api from "@/lib/api";

/**
 * Sends patient data to the backend and returns the prediction result.
 * Expects data shaped like: { age, sex, cp, trestbps, chol, thalach, exang, oldpeak, ca }
 */
export async function getPrediction(formData) {
  const response = await api.post("/predict", formData);
  return response.data;
}

