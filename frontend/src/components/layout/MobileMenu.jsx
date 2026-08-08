import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

const links = [
  { label: "How it works", href: "/#how-it-works" },
  { label: "Dashboard", href: "/dashboard" },
  { label: "Log in", href: "/login" },
];

export default function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div className="lg:hidden">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Toggle menu"
        aria-expanded={open}
      >
        {open ? (
          <X size={26} className="text-bone" />
        ) : (
          <Menu size={26} className="text-bone" />
        )}
      </button>

      {open && (
        <div className="absolute inset-x-0 top-full border-t border-panel-line bg-obsidian px-6 py-6">
          <nav className="flex flex-col gap-5">
            {links.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                onClick={() => setOpen(false)}
                className="text-base font-medium text-bone"
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/dashboard"
              onClick={() => setOpen(false)}
              className="mt-2 inline-block bg-pulse px-5 py-3 text-center text-sm font-medium text-bone"
            >
              Get started
            </Link>
          </nav>
        </div>
      )}
    </div>
  );
}

