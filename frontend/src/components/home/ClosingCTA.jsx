import { Link } from "react-router-dom";
import { ArrowRight, Heart } from "lucide-react";

export default function ClosingCTA() {
  return (
    <section className="bg-obsidian py-28 text-center">
      <Heart
        size={64}
        className="animate-heartbeat mx-auto text-pulse"
        fill="currentColor"
      />
      <h2 className="mx-auto mt-8 max-w-lg text-balance font-display text-3xl font-medium text-bone sm:text-4xl">
        Your heart doesn't wait for a checkup. Why should you?
      </h2>
      <Link
        to="/dashboard"
        className="group mt-10 inline-flex items-center gap-2 bg-pulse px-8 py-4 font-medium text-bone transition hover:bg-pulse-dim"
      >
        Check your risk now
        <ArrowRight size={16} className="transition group-hover:translate-x-1" />
      </Link>
    </section>
  );
}

