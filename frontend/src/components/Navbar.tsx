import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, HeartPulse, LogOut, ChevronDown, LayoutDashboard } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import ConfirmDialog from "./ConfirmDialog";

const NAV_LINKS = [
  { label: "How it works", href: "/#how-it-works" },
  { label: "Features", href: "/#features" },
  { label: "Assistant", href: "/#assistant" },
  { label: "About", href: "/#about" },
];

function getInitials(nameOrEmail: string) {
  const parts = nameOrEmail.trim().split(/\s+/);
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
  return nameOrEmail.slice(0, 2).toUpperCase();
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [confirmSignOut, setConfirmSignOut] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  const solid = !isHome || scrolled || open;

  const displayName =
    (user?.user_metadata?.full_name as string | undefined) || user?.email || "";
  const firstName = displayName.split(" ")[0];

  const handleSignOutConfirmed = async () => {
    setConfirmSignOut(false);
    setMenuOpen(false);
    await signOut();
    navigate("/");
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
          solid
            ? "border-[var(--color-teal-soft)] bg-[var(--color-mist)]/90 backdrop-blur-md"
            : "border-white/10 bg-transparent"
        }`}
      >
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link
            to="/"
            className={`flex items-center gap-2 font-[var(--font-display)] text-lg font-medium transition-colors ${
              solid ? "text-[var(--color-teal-deep)]" : "text-white"
            }`}
          >
            <HeartPulse className="h-5 w-5 text-[var(--color-coral)]" strokeWidth={2.25} />
            CardioScan<span className="text-[var(--color-coral)]">.ai</span>
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`text-sm font-semibold transition-colors ${
                  solid
                    ? "text-[var(--color-teal-deep)] hover:text-[var(--color-coral)]"
                    : "text-white hover:text-[var(--color-coral-bright)]"
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="hidden items-center gap-3 md:flex">
            {user ? (
              <div className="relative" ref={menuRef}>
                <button
                  onClick={() => setMenuOpen((v) => !v)}
                  className={`flex items-center gap-2 rounded-full py-1 pl-1 pr-3 transition-colors ${
                    solid ? "hover:bg-[var(--color-teal-soft)]" : "hover:bg-white/10"
                  }`}
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[var(--color-teal)] to-[var(--color-coral)] text-xs font-bold text-white">
                    {getInitials(displayName)}
                  </span>
                  <span className={`text-sm font-semibold ${solid ? "text-[var(--color-teal-deep)]" : "text-white"}`}>
                    {firstName}
                  </span>
                  <ChevronDown
                    className={`h-3.5 w-3.5 transition-transform ${menuOpen ? "rotate-180" : ""} ${
                      solid ? "text-[var(--color-teal-deep)]" : "text-white"
                    }`}
                  />
                </button>

                {menuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-56 overflow-hidden rounded-2xl border border-[var(--color-teal-soft)] bg-white shadow-[0_20px_50px_-15px_rgba(15,76,76,0.3)]">
                    <div className="border-b border-[var(--color-teal-soft)] px-4 py-3">
                      <p className="truncate text-sm font-semibold text-[var(--color-ink)]">{displayName}</p>
                      {user.email && (
                        <p className="truncate text-xs text-[var(--color-sage)]">{user.email}</p>
                      )}
                    </div>
                    <Link
                      to="/dashboard"
                      onClick={() => setMenuOpen(false)}
                      className="flex w-full items-center gap-2 px-4 py-3 text-sm font-medium text-[var(--color-ink)] transition-colors hover:bg-[var(--color-teal-soft)]"
                    >
                      <LayoutDashboard className="h-4 w-4" />
                      Dashboard
                    </Link>
                    <button
                      onClick={() => setConfirmSignOut(true)}
                      className="flex w-full items-center gap-2 border-t border-[var(--color-teal-soft)] px-4 py-3 text-sm font-medium text-[var(--color-coral)] transition-colors hover:bg-[var(--color-coral-soft)]"
                    >
                      <LogOut className="h-4 w-4" />
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/signin"
                className={`text-sm font-medium transition-opacity hover:opacity-70 ${
                  solid ? "text-[var(--color-teal-deep)]" : "text-white"
                }`}
              >
                Sign in
              </Link>
            )}
            <Link
              to="/assess"
              className="rounded-full bg-[var(--color-coral)] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-transform hover:scale-[1.03] active:scale-[0.98]"
            >
              Start assessment
            </Link>
          </div>

          <button
            className="md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? (
              <X className="h-6 w-6 text-[var(--color-teal-deep)]" />
            ) : (
              <Menu className={`h-6 w-6 ${solid ? "text-[var(--color-teal-deep)]" : "text-white"}`} />
            )}
          </button>
        </nav>

        {open && (
          <div className="border-t border-[var(--color-teal-soft)] bg-[var(--color-mist)] px-6 py-4 md:hidden">
            <div className="flex flex-col gap-4">
              {user && (
                <div className="flex items-center gap-3 border-b border-[var(--color-teal-soft)] pb-4">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[var(--color-teal)] to-[var(--color-coral)] text-xs font-bold text-white">
                    {getInitials(displayName)}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-[var(--color-ink)]">{displayName}</p>
                    {user.email && <p className="truncate text-xs text-[var(--color-sage)]">{user.email}</p>}
                  </div>
                </div>
              )}

              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="text-sm font-medium text-[var(--color-ink)]"
                >
                  {link.label}
                </a>
              ))}

              <Link
                to="/assess"
                onClick={() => setOpen(false)}
                className="mt-2 rounded-full bg-[var(--color-coral)] px-5 py-2.5 text-center text-sm font-semibold text-white"
              >
                Start assessment
              </Link>

              {user ? (
                <button
                  onClick={() => {
                    setOpen(false);
                    setConfirmSignOut(true);
                  }}
                  className="flex items-center justify-center gap-1.5 text-sm font-semibold text-[var(--color-coral)]"
                >
                  <LogOut className="h-4 w-4" />
                  Sign out
                </button>
              ) : (
                <Link
                  to="/signin"
                  onClick={() => setOpen(false)}
                  className="text-center text-sm font-medium text-[var(--color-teal-deep)]"
                >
                  Sign in
                </Link>
              )}
            </div>
          </div>
        )}
      </header>

      <ConfirmDialog
        open={confirmSignOut}
        title="Sign out of CardioScan.ai?"
        description="You'll need to sign in again to view your assessment history."
        confirmLabel="Sign out"
        cancelLabel="Stay signed in"
        destructive
        onConfirm={handleSignOutConfirmed}
        onCancel={() => setConfirmSignOut(false)}
      />
    </>
  );
}
