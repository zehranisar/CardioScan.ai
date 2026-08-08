import { Link } from "react-router-dom";

export default function NavButton() {
  return (
    <div className="hidden items-center gap-5 lg:flex">
      <Link
        to="/login"
        className="text-sm font-medium text-ash transition hover:text-bone"
      >
        Log in
      </Link>

      <Link
        to="/dashboard"
        className="bg-pulse px-5 py-2.5 text-sm font-medium text-bone transition hover:bg-pulse-dim"
      >
        Get started
      </Link>
    </div>
  );
}

