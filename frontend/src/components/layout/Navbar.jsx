import { useEffect, useState } from "react";

import Logo from "./Logo";
import NavLinks from "./NavLinks";
import NavButton from "./NavButton";
import MobileMenu from "./MobileMenu";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
  className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
    scrolled
      ? "bg-white/90 border-b border-slate-200 shadow-lg backdrop-blur-xl"
      : "bg-white/70 backdrop-blur-md"
  }`}
>
  <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">
        <Logo />

        <NavLinks />

        <NavButton />

        <MobileMenu />

      </div>
    </header>
  );
}