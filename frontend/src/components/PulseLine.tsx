interface PulseLineProps {
  className?: string;
  color?: string;
  animate?: boolean;
}

/**
 * Signature element: a hand-drawn ECG waveform.
 * Used in the hero (animated draw-on), as section dividers (static),
 * and as a loading/chat indicator elsewhere in the app.
 */
export default function PulseLine({
  className = "",
  color = "var(--color-coral)",
  animate = true,
}: PulseLineProps) {
  return (
    <svg
      viewBox="0 0 1400 120"
      fill="none"
      className={className}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d="M0,60 L140,60 L175,60 L195,20 L215,100 L235,10 L255,60 L290,60
           L460,60 L495,60 L515,20 L535,100 L555,10 L575,60 L610,60
           L780,60 L815,60 L835,20 L855,100 L875,10 L895,60 L930,60
           L1100,60 L1135,60 L1155,20 L1175,100 L1195,10 L1215,60 L1250,60
           L1400,60"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={animate ? "pulse-line-draw" : ""}
      />
    </svg>
  );
}
