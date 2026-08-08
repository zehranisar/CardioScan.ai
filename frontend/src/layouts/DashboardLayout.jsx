import { Outlet, Link } from "react-router-dom";
import { HeartPulse, ArrowLeft } from "lucide-react";

export default function DashboardLayout() {
  return (
    <div className="min-h-screen bg-obsidian">
      <header className="border-b border-panel-line">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <Link to="/" className="flex items-center gap-2">
            <HeartPulse size={18} className="text-pulse" />
            <span className="font-display text-lg text-bone">Cardyx</span>
          </Link>

          <Link
            to="/"
            className="flex items-center gap-1.5 text-sm text-ash transition hover:text-bone"
          >
            <ArrowLeft size={14} />
            Back to home
          </Link>
        </div>
      </header>

      <Outlet />
    </div>
  );
}
