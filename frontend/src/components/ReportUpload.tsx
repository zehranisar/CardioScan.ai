import { useRef, useState } from "react";
import { ScanText, Loader2, AlertCircle, CheckCircle2, Upload } from "lucide-react";
import { extractFromReport } from "../lib/api";
import type { AssessmentPayload, ExtractedFields } from "../lib/api";

type ReportUploadProps = {
  onExtracted: (fields: Partial<AssessmentPayload>, foundCount: number) => void;
};

const FIELD_LABELS: Record<keyof ExtractedFields, string> = {
  age: "Age",
  sex: "Sex",
  cp: "Chest pain type",
  trestbps: "Resting blood pressure",
  chol: "Cholesterol",
  fbs: "Fasting blood sugar",
  restecg: "Resting ECG",
  thalach: "Max heart rate",
  exang: "Exercise-induced angina",
  oldpeak: "ST depression",
  slope: "ST segment slope",
  ca: "Major vessels",
  thal: "Thalassemia",
};

export default function ReportUpload({ onExtracted }: ReportUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  const [foundLabels, setFoundLabels] = useState<string[]>([]);

  const handleFile = async (file: File) => {
    setStatus("loading");
    setError(null);

    try {
      const extracted = await extractFromReport(file);

      // Convert to the string-based shape the form state uses, and only
      // keep fields Gemini actually found (non-null).
      const cleaned: Partial<AssessmentPayload> = {};
      const found: string[] = [];

      (Object.keys(extracted) as (keyof ExtractedFields)[]).forEach((key) => {
        const value = extracted[key];
        if (value === null || value === undefined) return;
        cleaned[key] = String(value) as never;
        found.push(FIELD_LABELS[key] ?? key);
      });

      if (found.length === 0) {
        setStatus("error");
        setError("Couldn't find any recognizable values in that document. You can still fill the form manually.");
        return;
      }

      setFoundLabels(found);
      setStatus("done");
      onExtracted(cleaned, found.length);
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong while reading the document.");
    }
  };

  return (
    <div className="mb-6 rounded-2xl border border-dashed border-[var(--color-teal)]/40 bg-[var(--color-teal-soft)]/40 p-5">
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,application/pdf"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
          e.target.value = "";
        }}
      />

      {status === "idle" && (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="flex w-full items-center gap-3 text-left"
        >
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-[var(--color-teal-deep)]">
            <ScanText className="h-5 w-5" />
          </span>
          <span>
            <span className="block text-sm font-semibold text-[var(--color-ink)]">
              Upload a lab report or ECG printout to auto-fill this form
            </span>
            <span className="block text-xs text-[var(--color-sage)]">JPG, PNG, or PDF — max 8MB</span>
          </span>
          <Upload className="ml-auto h-4 w-4 shrink-0 text-[var(--color-teal-deep)]" />
        </button>
      )}

      {status === "loading" && (
        <div className="flex items-center gap-3">
          <Loader2 className="h-5 w-5 shrink-0 animate-spin text-[var(--color-teal-deep)]" />
          <span className="text-sm font-medium text-[var(--color-teal-deep)]">
            Reading your document...
          </span>
        </div>
      )}

      {status === "done" && (
        <div>
          <div className="flex items-center gap-3">
            <CheckCircle2 className="h-5 w-5 shrink-0 text-[var(--color-teal-deep)]" />
            <span className="text-sm font-semibold text-[var(--color-teal-deep)]">
              Filled {foundLabels.length} field{foundLabels.length === 1 ? "" : "s"} from your document
            </span>
          </div>
          <p className="mt-2 pl-8 text-xs text-[var(--color-sage)]">
            {foundLabels.join(", ")} — review the values below before submitting.
          </p>
          <button
            type="button"
            onClick={() => {
              setStatus("idle");
              inputRef.current?.click();
            }}
            className="mt-2 pl-8 text-xs font-semibold text-[var(--color-teal-deep)] hover:text-[var(--color-coral)]"
          >
            Upload a different document
          </button>
        </div>
      )}

      {status === "error" && (
        <div>
          <div className="flex items-start gap-3">
            <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-[var(--color-coral)]" />
            <span className="text-sm font-medium text-[var(--color-coral)]">{error}</span>
          </div>
          <button
            type="button"
            onClick={() => {
              setStatus("idle");
              setError(null);
            }}
            className="mt-2 pl-8 text-xs font-semibold text-[var(--color-teal-deep)] hover:text-[var(--color-coral)]"
          >
            Try again
          </button>
        </div>
      )}
    </div>
  );
}
