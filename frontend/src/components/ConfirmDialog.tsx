import { useEffect } from "react";
import { AlertTriangle } from "lucide-react";

type ConfirmDialogProps = {
  open: boolean;
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  destructive?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

export default function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  destructive = false,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCancel();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onCancel]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[var(--color-abyss)]/60 px-6 backdrop-blur-sm"
      onClick={onCancel}
    >
      <div
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-sm rounded-3xl border border-white/60 bg-white p-7 text-center shadow-[0_30px_80px_-20px_rgba(15,76,76,0.4)]"
      >
        <span
          className={`mx-auto flex h-11 w-11 items-center justify-center rounded-full ${
            destructive ? "bg-[var(--color-coral-soft)] text-[var(--color-coral)]" : "bg-[var(--color-teal-soft)] text-[var(--color-teal-deep)]"
          }`}
        >
          <AlertTriangle className="h-5 w-5" />
        </span>

        <h2 className="mt-4 font-[var(--font-display)] text-lg text-[var(--color-ink)]">{title}</h2>
        <p className="mt-2 text-sm leading-relaxed text-[var(--color-sage)]">{description}</p>

        <div className="mt-6 flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 rounded-full border border-[var(--color-teal-soft)] px-5 py-2.5 text-sm font-semibold text-[var(--color-teal-deep)] transition-colors hover:bg-[var(--color-teal-soft)]"
          >
            {cancelLabel}
          </button>
          <button
            onClick={onConfirm}
            className={`flex-1 rounded-full px-5 py-2.5 text-sm font-semibold text-white transition-transform hover:scale-[1.02] active:scale-[0.98] ${
              destructive ? "bg-[var(--color-coral)]" : "bg-[var(--color-teal-deep)]"
            }`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
