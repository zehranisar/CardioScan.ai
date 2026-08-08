import { Link } from "react-router-dom";
import { HeartPulse } from "lucide-react";
import { SITE } from "@/config/site";

export default function Footer() {
  return (
    <footer className="border-t border-panel-line bg-obsidian py-12">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-6 text-center sm:flex-row sm:justify-between sm:text-left">
        <Link to="/" className="flex items-center gap-2">
          <HeartPulse size={16} className="text-pulse" />
          <span className="font-display text-sm text-bone">Cardyx</span>
        </Link>

        <p className="text-xs text-ash">
          © {new Date().getFullYear()} {SITE.company}. Screening aid only —
          not a medical diagnosis.
        </p>
      </div>
    </footer>
  );
}

