/**
 * The page's signature element: a continuously scrolling ECG waveform.
 * Two identical copies sit side by side and the wrapper animates by
 * exactly one copy's width, so the loop is seamless.
 */
export default function ECGLine({ className = "" }) {
  const cyclePath =
    "M0,60 L60,60 L72,45 L84,60 L108,60 L120,10 L132,110 L144,60 L168,60 L180,35 L192,60 " +
    "L252,60 L264,45 L276,60 L300,60 L312,10 L324,110 L336,60 L360,60 L372,35 L384,60 L400,60";

  const Pulse = (
    <svg
      viewBox="0 0 400 120"
      preserveAspectRatio="none"
      className="h-full w-1/2 shrink-0"
    >
      <path
        d={cyclePath}
        fill="none"
        stroke="var(--color-pulse)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="drop-shadow-[0_0_8px_rgba(232,17,45,0.65)]"
      />
    </svg>
  );

  return (
    <div className={`overflow-hidden ${className}`} aria-hidden="true">
      <div className="flex h-full w-[200%] animate-ecg-scroll">
        {Pulse}
        {Pulse}
      </div>
    </div>
  );
}

