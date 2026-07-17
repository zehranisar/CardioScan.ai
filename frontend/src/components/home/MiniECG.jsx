export default function MiniECG() {
  return (
    <div className="mt-6 h-20 rounded-2xl bg-red-50 p-4">

      <svg
        viewBox="0 0 300 60"
        className="h-full w-full"
        fill="none"
      >
        <path
          d="M0 30 L30 30 L45 18 L55 48 L70 12 L90 30 L120 30 L140 20 L160 45 L175 10 L195 30 L300 30"
          stroke="#DC2626"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

    </div>
  );
}