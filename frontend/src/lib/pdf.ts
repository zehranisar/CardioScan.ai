import { jsPDF } from "jspdf";
import type { AssessmentPayload, AssessmentResult } from "./api";

const LABELS: Record<string, Record<string, string>> = {
  sex: { male: "Male", female: "Female" },
  cp: {
    typical: "Typical angina",
    atypical: "Atypical angina",
    non_anginal: "Non-anginal pain",
    asymptomatic: "Asymptomatic",
  },
  fbs: { "1": "Yes (>120 mg/dL)", "0": "No" },
  restecg: {
    normal: "Normal",
    st_t_abnormality: "ST-T wave abnormality",
    lv_hypertrophy: "Left ventricular hypertrophy",
  },
  exang: { "1": "Yes", "0": "No" },
  slope: { upsloping: "Upsloping", flat: "Flat", downsloping: "Downsloping" },
  thal: {
    normal: "Normal",
    fixed_defect: "Fixed defect",
    reversible_defect: "Reversible defect",
  },
};

function humanize(field: keyof AssessmentPayload, value: string): string {
  return LABELS[field]?.[value] ?? value;
}

const INPUT_ROWS: { key: keyof AssessmentPayload; label: string; unit?: string }[] = [
  { key: "age", label: "Age" },
  { key: "sex", label: "Sex" },
  { key: "trestbps", label: "Resting blood pressure", unit: "mm Hg" },
  { key: "chol", label: "Cholesterol", unit: "mg/dL" },
  { key: "fbs", label: "Fasting blood sugar > 120 mg/dL" },
  { key: "cp", label: "Chest pain type" },
  { key: "thalach", label: "Max heart rate achieved" },
  { key: "exang", label: "Exercise-induced angina" },
  { key: "restecg", label: "Resting ECG" },
  { key: "oldpeak", label: "ST depression (oldpeak)" },
  { key: "slope", label: "ST segment slope" },
  { key: "ca", label: "Major vessels (fluoroscopy)" },
  { key: "thal", label: "Thalassemia" },
];

export function downloadReportPDF(result: AssessmentResult, inputs: AssessmentPayload) {
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 48;
  let y = 56;

  // Header
  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.setTextColor(15, 76, 76); // teal-deep
  doc.text("CardioScan.ai", margin, y);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.setTextColor(90, 90, 90);
  doc.text("Heart Disease Risk Assessment Report", margin, y + 18);

  doc.setFontSize(9);
  doc.text(
    new Date().toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" }),
    pageWidth - margin,
    y,
    { align: "right" }
  );

  y += 40;
  doc.setDrawColor(220, 220, 220);
  doc.line(margin, y, pageWidth - margin, y);
  y += 32;

  // Risk score
  const riskColor: Record<string, [number, number, number]> = {
    Low: [23, 99, 95],
    Moderate: [217, 164, 65],
    High: [232, 102, 79],
  };
  const [r, g, b] = riskColor[result.risk_label] ?? [90, 90, 90];

  doc.setFont("helvetica", "bold");
  doc.setFontSize(36);
  doc.setTextColor(r, g, b);
  doc.text(`${Math.round(result.risk_probability * 100)}%`, margin, y);

  doc.setFontSize(13);
  doc.text(`${result.risk_label} estimated risk`, margin + 110, y - 10);

  y += 20;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(120, 120, 120);
  doc.text(
    "This is a statistical estimate from a machine learning model — not a medical diagnosis.",
    margin + 110,
    y
  );

  y += 44;

  // Top factors
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.setTextColor(18, 33, 31);
  doc.text("What drove this result", margin, y);
  y += 20;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  result.top_factors.forEach((f) => {
    const arrow = f.direction === "increases" ? "↑" : "↓";
    const dirColor: [number, number, number] =
      f.direction === "increases" ? [232, 102, 79] : [23, 99, 95];
    doc.setTextColor(18, 33, 31);
    doc.text(f.label, margin, y);
    doc.setTextColor(...dirColor);
    doc.text(`${arrow} ${f.direction === "increases" ? "increases" : "decreases"} risk`, pageWidth - margin, y, {
      align: "right",
    });
    y += 18;
  });

  y += 20;

  // Input summary
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.setTextColor(18, 33, 31);
  doc.text("Assessment inputs", margin, y);
  y += 20;

  doc.setFontSize(10);
  INPUT_ROWS.forEach((row, i) => {
    if (y > 760) {
      doc.addPage();
      y = 56;
    }
    const value = inputs[row.key];
    const displayValue = humanize(row.key, value) + (row.unit ? ` ${row.unit}` : "");

    doc.setFont("helvetica", "normal");
    doc.setTextColor(90, 90, 90);
    doc.text(row.label, margin, y);
    doc.setTextColor(18, 33, 31);
    doc.text(displayValue, pageWidth - margin, y, { align: "right" });

    if (i < INPUT_ROWS.length - 1) {
      doc.setDrawColor(240, 240, 240);
      doc.line(margin, y + 6, pageWidth - margin, y + 6);
    }
    y += 20;
  });

  y += 20;

  // Disclaimer
  if (y > 720) {
    doc.addPage();
    y = 56;
  }
  doc.setFillColor(251, 241, 222); // amber-soft
  doc.roundedRect(margin, y, pageWidth - margin * 2, 60, 6, 6, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(138, 90, 18);
  doc.text("Not a medical diagnosis", margin + 14, y + 20);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  const disclaimer = doc.splitTextToSize(
    "This report is generated by a statistical model trained on a public research dataset and is intended for informational purposes only. Please share this with a qualified doctor and do not use it to make medical decisions on its own.",
    pageWidth - margin * 2 - 28
  );
  doc.text(disclaimer, margin + 14, y + 34);

  doc.save(`cardioscan-report-${new Date().toISOString().slice(0, 10)}.pdf`);
}
