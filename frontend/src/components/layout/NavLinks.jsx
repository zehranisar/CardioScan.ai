import { Link } from "react-router-dom";

const links = [
  { label: "How it works", href: "/#how-it-works" },
  { label: "Dashboard", href: "/dashboard" },
];

export default function NavLinks() {
  return (
    <nav className="hidden items-center gap-8 lg:flex">
      {links.map((link) => (
        <Link
          key={link.label}
          to={link.href}
          className="relative text-sm font-medium text-ash transition hover:text-bone"
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}

