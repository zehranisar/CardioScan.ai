import { Navigate, Outlet, useLocation } from "react-router-dom";
import { Loader2, HeartPulse } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute() {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-3 bg-[var(--color-mist)]">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-teal-soft)] text-[var(--color-teal-deep)]">
          <HeartPulse className="h-6 w-6" />
        </span>
        <Loader2 className="h-5 w-5 animate-spin text-[var(--color-teal-deep)]" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/signin" state={{ from: location.pathname }} replace />;
  }

  return <Outlet />;
}
