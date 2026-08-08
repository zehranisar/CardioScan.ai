import { useEffect, useState } from "react";

import Logo from "./Logo";
import NavLinks from "./NavLinks";
import NavButton from "./NavButton";
import MobileMenu from "./MobileMenu";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
        scrolled
          ? "border-panel-line bg-obsidian/90 backdrop-blur-xl"
          : "border-transparent bg-obsidian/40 backdrop-blur-md"
      }`}
    >
      <div className="relative mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">
        <Logo />
        <NavLinks />
        <NavButton />
        <MobileMenu />
      </div>
    </header>
  );
}

