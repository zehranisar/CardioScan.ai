import { Link } from "react-router-dom";
import { HeartPulse } from "lucide-react";

export default function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2.5">
      <div className="flex h-9 w-9 items-center justify-center border border-pulse/40 bg-pulse/10">
        <HeartPulse size={18} className="text-pulse" />
      </div>
      <span className="font-display text-xl font-medium tracking-tight text-bone">
        Cardyx
      </span>
    </Link>
  );
}

