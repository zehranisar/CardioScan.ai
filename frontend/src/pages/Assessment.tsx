import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, AlertCircle, Loader2 } from "lucide-react";
import { getPrediction } from "../lib/api";
import type { AssessmentPayload } from "../lib/api";
import ReportUpload from "../components/ReportUpload";
import AnalyzingOverlay from "../components/AnalyzingOverlay";

const EMPTY_FORM: AssessmentPayload = {
  age: "",
  sex: "",
  cp: "",
  trestbps: "",
  chol: "",
  fbs: "",
  restecg: "",
  thalach: "",
  exang: "",
  oldpeak: "",
  slope: "",
  ca: "",
  thal: "",
};

const STEPS = ["Personal & vitals", "Symptoms", "Cardiac tests"];

export default function Assessment() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<AssessmentPayload>(EMPTY_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const update = (field: keyof AssessmentPayload, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleExtracted = (fields: Partial<AssessmentPayload>) => {
    setForm((prev) => ({ ...prev, ...fields }));
  };

  const isStepValid = () => {
    if (step === 0) return form.age && form.sex && form.trestbps && form.chol && form.fbs;
    if (step === 1) return form.cp && form.exang && form.thalach;
    return form.restecg && form.oldpeak && form.slope && form.ca && form.thal;
  };

  const handleNext = () => {
    if (step < STEPS.length - 1) setStep((s) => s + 1);
    else handleSubmit();
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    setError(null);

    try {
      const result = await getPrediction(form);
      navigate("/results", { state: { result, inputs: form } });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[var(--color-mist)] px-6 pb-20 pt-28">
      {submitting && <AnalyzingOverlay />}
      <div className="mx-auto max-w-xl">
        <div className="text-center">
          <span className="text-xs font-semibold uppercase tracking-wide text-[var(--color-coral)]">
            Assessment
          </span>
          <h1 className="mt-2 font-[var(--font-display)] text-3xl text-[var(--color-ink)]">
            {STEPS[step]}
          </h1>
        </div>

        {/* Step indicator */}
        <div className="mt-8 flex items-center gap-2">
          {STEPS.map((label, i) => (
            <div key={label} className="flex flex-1 flex-col gap-2">
              <div
                className={`h-1.5 rounded-full transition-colors ${
                  i <= step ? "bg-[var(--color-coral)]" : "bg-[var(--color-teal-soft)]"
                }`}
              />
              <span
                className={`hidden text-center text-[11px] font-medium sm:block ${
                  i <= step ? "text-[var(--color-teal-deep)]" : "text-[var(--color-sage)]"
                }`}
              >
                {label}
              </span>
            </div>
          ))}
        </div>

        {/* Form card */}
        <div className="mt-8 rounded-3xl border border-white/60 bg-white/95 p-7 shadow-[0_20px_60px_-20px_rgba(15,76,76,0.2)] sm:p-9">
          {step === 0 && <ReportUpload onExtracted={handleExtracted} />}

          {error && (
            <div className="mb-5 flex items-start gap-2 rounded-xl border border-[var(--color-coral)]/30 bg-[var(--color-coral-soft)] px-4 py-3 text-sm text-[var(--color-coral)]">
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
              {error}
            </div>
          )}

          {step === 0 && (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <NumberField
                label="Age"
                value={form.age}
                onChange={(v) => update("age", v)}
                placeholder="e.g. 45"
              />
              <SelectField
                label="Sex"
                value={form.sex}
                onChange={(v) => update("sex", v)}
                options={[
                  { value: "male", label: "Male" },
                  { value: "female", label: "Female" },
                ]}
              />
              <NumberField
                label="Resting blood pressure"
                unit="mm Hg"
                value={form.trestbps}
                onChange={(v) => update("trestbps", v)}
                placeholder="e.g. 130"
              />
              <NumberField
                label="Serum cholesterol"
                unit="mg/dL"
                value={form.chol}
                onChange={(v) => update("chol", v)}
                placeholder="e.g. 210"
              />
              <SelectField
                label="Fasting blood sugar > 120 mg/dL"
                value={form.fbs}
                onChange={(v) => update("fbs", v)}
                options={[
                  { value: "1", label: "Yes" },
                  { value: "0", label: "No" },
                ]}
                full
              />
            </div>
          )}

          {step === 1 && (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <SelectField
                label="Chest pain type"
                value={form.cp}
                onChange={(v) => update("cp", v)}
                options={[
                  { value: "typical", label: "Typical angina" },
                  { value: "atypical", label: "Atypical angina" },
                  { value: "non_anginal", label: "Non-anginal pain" },
                  { value: "asymptomatic", label: "Asymptomatic" },
                ]}
                full
              />
              <NumberField
                label="Max heart rate achieved"
                value={form.thalach}
                onChange={(v) => update("thalach", v)}
                placeholder="e.g. 150"
              />
              <SelectField
                label="Exercise-induced angina"
                value={form.exang}
                onChange={(v) => update("exang", v)}
                options={[
                  { value: "1", label: "Yes" },
                  { value: "0", label: "No" },
                ]}
              />
            </div>
          )}

          {step === 2 && (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <SelectField
                label="Resting ECG results"
                value={form.restecg}
                onChange={(v) => update("restecg", v)}
                options={[
                  { value: "normal", label: "Normal" },
                  { value: "st_t_abnormality", label: "ST-T wave abnormality" },
                  { value: "lv_hypertrophy", label: "Left ventricular hypertrophy" },
                ]}
                full
              />
              <NumberField
                label="ST depression (oldpeak)"
                value={form.oldpeak}
                onChange={(v) => update("oldpeak", v)}
                placeholder="e.g. 1.4"
                step="0.1"
              />
              <SelectField
                label="Slope of peak exercise ST segment"
                value={form.slope}
                onChange={(v) => update("slope", v)}
                options={[
                  { value: "upsloping", label: "Upsloping" },
                  { value: "flat", label: "Flat" },
                  { value: "downsloping", label: "Downsloping" },
                ]}
              />
              <SelectField
                label="Major vessels colored by fluoroscopy"
                value={form.ca}
                onChange={(v) => update("ca", v)}
                options={[
                  { value: "0", label: "0" },
                  { value: "1", label: "1" },
                  { value: "2", label: "2" },
                  { value: "3", label: "3" },
                ]}
              />
              <SelectField
                label="Thalassemia"
                value={form.thal}
                onChange={(v) => update("thal", v)}
                options={[
                  { value: "normal", label: "Normal" },
                  { value: "fixed_defect", label: "Fixed defect" },
                  { value: "reversible_defect", label: "Reversible defect" },
                ]}
                full
              />
            </div>
          )}

          {/* Nav buttons */}
          <div className="mt-9 flex items-center justify-between">
            <button
              onClick={() => setStep((s) => Math.max(0, s - 1))}
              disabled={step === 0}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--color-teal-deep)] transition-opacity disabled:opacity-0"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </button>

            <button
              onClick={handleNext}
              disabled={!isStepValid() || submitting}
              className="inline-flex items-center gap-2 rounded-full bg-[var(--color-coral)] px-7 py-3 text-sm font-semibold text-white transition-transform hover:scale-[1.03] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:scale-100"
            >
              {submitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Assessing...
                </>
              ) : step === STEPS.length - 1 ? (
                "Get my risk assessment"
              ) : (
                <>
                  Next
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-[var(--color-sage)]">
          This tool provides an estimate for informational purposes only and
          does not replace professional medical advice.
        </p>
      </div>
    </main>
  );
}

function NumberField({
  label,
  value,
  onChange,
  placeholder,
  unit,
  step,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  unit?: string;
  step?: string;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-sm font-medium text-[var(--color-ink)]">
        {label} {unit && <span className="text-[var(--color-sage)]">({unit})</span>}
      </span>
      <input
        type="number"
        inputMode="decimal"
        step={step ?? "1"}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-xl border border-[var(--color-teal-soft)] bg-white px-4 py-2.5 text-sm text-[var(--color-ink)] outline-none transition-colors placeholder:text-[var(--color-sage)]/60 focus:border-[var(--color-coral)]"
      />
    </label>
  );
}

function SelectField({
  label,
  value,
  onChange,
  options,
  full,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
  full?: boolean;
}) {
  return (
    <label className={`flex flex-col gap-1.5 ${full ? "sm:col-span-2" : ""}`}>
      <span className="text-sm font-medium text-[var(--color-ink)]">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-xl border border-[var(--color-teal-soft)] bg-white px-4 py-2.5 text-sm text-[var(--color-ink)] outline-none transition-colors focus:border-[var(--color-coral)]"
      >
        <option value="" disabled>
          Select...
        </option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}
