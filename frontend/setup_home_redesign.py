"""
Run this once from the frontend/ directory: python setup_home_redesign.py
Removes the old unused home components and writes the new premium
black/bone/red design (Home page, Hero, nav, footer).
"""
import os

BASE = os.path.dirname(os.path.abspath(__file__))

def write(relative_path, content):
    full_path = os.path.join(BASE, relative_path)
    os.makedirs(os.path.dirname(full_path), exist_ok=True)
    with open(full_path, "w", encoding="utf-8", newline="\n") as f:
        f.write(content.lstrip("\n"))
    print(f"wrote {relative_path}")

def remove(relative_path):
    full_path = os.path.join(BASE, relative_path)
    if os.path.exists(full_path):
        os.remove(full_path)
        print(f"removed {relative_path}")

# --- remove old unused/duplicate home components ---
remove('src/components/home/MiniECG.jsx')
remove('src/components/home/HeroContent.jsx')
remove('src/components/home/hero/HeroContent.jsx')
remove('src/components/home/hero/FloatingBadge.jsx')
remove('src/components/home/hero/HeroVisual.jsx')
remove('src/components/home/hero/DashboardCard.jsx')
remove('src/components/home/hero/Stats.jsx')
remove('src/components/home/hero/Hero.jsx')
remove('src/components/home/CTASection.jsx')
remove('src/components/home/RiskGauge.jsx')
remove('src/components/home/HeroImage.jsx')
remove('src/components/home/FloatingCard.jsx')
remove('src/components/home/DashboardPreview.jsx')
remove('src/components/home/TrustedSection.jsx')
remove('src/components/home/FeaturesSection.jsx')
remove('src/components/home/FAQ.jsx')
remove('src/components/home/Features.jsx')
remove('src/components/home/FeatureCard.jsx')
remove('src/components/home/HeroButtons.jsx')
remove('src/components/home/Testimonials.jsx')
remove('src/components/home/HeroBadge.jsx')
remove('src/components/home/ChatbotPreview.jsx')

# --- write the new design ---
write('index.html', r"""
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Cardyx — Know your heart</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

<link
href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=JetBrains+Mono:wght@400;500;600;700&display=swap"
rel="stylesheet">
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>

""")

write('src/index.css', r"""
@import "tailwindcss";

/*
  Cardyx design tokens.
  Palette: obsidian black + bone white + arterial red, with an oxblood
  shade for depth. Display type is Fraunces (soft ink-trap serif — the
  curves echo a pulse line), body is Inter, and data/labels use
  JetBrains Mono for a clinical "readout" feel.
*/
@theme {
  --color-obsidian: #0b0b0d;
  --color-panel: #16151a;
  --color-panel-line: #26242b;
  --color-bone: #f5f1ec;
  --color-ash: #8c8a90;
  --color-pulse: #e8112d;
  --color-pulse-dim: #b30e22;
  --color-ember: #4a0d15;

  --font-display: "Fraunces", "Georgia", serif;
  --font-sans: "Inter", system-ui, sans-serif;
  --font-mono: "JetBrains Mono", ui-monospace, monospace;
}

:root {
  color-scheme: dark;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  background: var(--color-obsidian);
  color: var(--color-bone);
  font-family: var(--font-sans);
  overflow-x: hidden;
}

h1, h2, h3, h4, h5 {
  font-family: var(--font-display);
}

button {
  cursor: pointer;
  font-family: inherit;
}

img {
  display: block;
  max-width: 100%;
}

::selection {
  background: var(--color-pulse);
  color: var(--color-bone);
}

/* Respect reduced-motion preference for all custom animations */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

/* Signature animations: a scrolling ECG line and a realistic lub-dub heartbeat */
@keyframes ecg-scroll {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}
.animate-ecg-scroll {
  animation: ecg-scroll 5s linear infinite;
}

@keyframes heartbeat {
  0%, 100% { transform: scale(1); }
  14% { transform: scale(1.22); }
  28% { transform: scale(1); }
  42% { transform: scale(1.14); }
  56%, 70% { transform: scale(1); }
}
.animate-heartbeat {
  animation: heartbeat 1.3s ease-in-out infinite;
  transform-origin: center;
}

""")

write('src/pages/Home.jsx', r"""
import Hero from "@/components/home/Hero";
import HowItWorks from "@/components/home/HowItWorks";
import TrustBand from "@/components/home/TrustBand";
import ClosingCTA from "@/components/home/ClosingCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <HowItWorks />
      <TrustBand />
      <ClosingCTA />
    </>
  );
}

""")

write('src/components/home/Hero.jsx', r"""
import { Link } from "react-router-dom";
import { ArrowRight, Heart } from "lucide-react";
import ECGLine from "./ECGLine";

export default function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-panel-line bg-obsidian pt-40 pb-16">
      {/* faint ambient ECG texture behind the headline */}
      <ECGLine className="pointer-events-none absolute inset-x-0 top-[38%] h-32 -translate-y-1/2 opacity-[0.07]" />

      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <div className="mx-auto mb-8 inline-flex items-center gap-2 rounded-full border border-panel-line bg-panel px-4 py-1.5 font-mono text-xs uppercase tracking-[0.2em] text-ash">
          <Heart size={13} className="animate-heartbeat text-pulse" fill="currentColor" />
          AI-assisted cardiovascular screening
        </div>

        <h1 className="text-balance font-display text-5xl font-medium leading-[1.05] text-bone sm:text-6xl lg:text-7xl">
          Know your heart.
          <br />
          <span className="text-pulse">Before it has to tell you.</span>
        </h1>

        <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-ash">
          Enter your vitals and get an instant, model-backed estimate of your
          heart disease risk — the same nine clinical markers cardiologists
          look at first.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            to="/dashboard"
            className="group inline-flex items-center gap-2 bg-pulse px-7 py-3.5 font-medium text-bone transition hover:bg-pulse-dim"
          >
            Check your risk
            <ArrowRight size={16} className="transition group-hover:translate-x-1" />
          </Link>
          <a
            href="#how-it-works"
            className="inline-flex items-center gap-2 border border-panel-line px-7 py-3.5 font-medium text-bone transition hover:border-ash"
          >
            See how it works
          </a>
        </div>
      </div>

      {/* prominent ECG strip beneath the fold — the page's signature element */}
      <div className="relative mt-20 h-24 sm:h-28">
        <ECGLine className="absolute inset-0" />
        <div className="absolute inset-x-0 bottom-0 h-full bg-gradient-to-t from-obsidian via-transparent to-transparent" />
      </div>
    </section>
  );
}

""")

write('src/components/home/ECGLine.jsx', r"""
/**
 * The page's signature element: a continuously scrolling ECG waveform.
 * Two identical copies sit side by side and the wrapper animates by
 * exactly one copy's width, so the loop is seamless.
 */
export default function ECGLine({ className = "" }) {
  const cyclePath =
    "M0,60 L60,60 L72,45 L84,60 L108,60 L120,10 L132,110 L144,60 L168,60 L180,35 L192,60 " +
    "L252,60 L264,45 L276,60 L300,60 L312,10 L324,110 L336,60 L360,60 L372,35 L384,60 L400,60";

  const Pulse = (
    <svg
      viewBox="0 0 400 120"
      preserveAspectRatio="none"
      className="h-full w-1/2 shrink-0"
    >
      <path
        d={cyclePath}
        fill="none"
        stroke="var(--color-pulse)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="drop-shadow-[0_0_8px_rgba(232,17,45,0.65)]"
      />
    </svg>
  );

  return (
    <div className={`overflow-hidden ${className}`} aria-hidden="true">
      <div className="flex h-full w-[200%] animate-ecg-scroll">
        {Pulse}
        {Pulse}
      </div>
    </div>
  );
}

""")

write('src/components/home/HowItWorks.jsx', r"""
const steps = [
  {
    number: "01",
    title: "Enter your vitals",
    description:
      "Age, blood pressure, cholesterol, and the other core clinical markers used in a standard cardiology intake.",
  },
  {
    number: "02",
    title: "The model reads your data",
    description:
      "A logistic regression model trained on clinical heart-disease records scores your inputs against known risk patterns.",
  },
  {
    number: "03",
    title: "Get your result",
    description:
      "See your risk level, the model's confidence, and a plain-language explanation — in under a second.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="border-b border-panel-line bg-obsidian py-24">
      <div className="mx-auto max-w-6xl px-6">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-pulse">
          How it works
        </p>
        <h2 className="mt-3 max-w-md text-balance font-display text-3xl font-medium text-bone sm:text-4xl">
          Three steps between you and a clear answer.
        </h2>

        <div className="mt-14 grid grid-cols-1 gap-10 sm:grid-cols-3 sm:gap-0">
          {steps.map((step, i) => (
            <div
              key={step.number}
              className={i > 0 ? "sm:border-l sm:border-panel-line sm:pl-8" : ""}
            >
              <span className="font-mono text-sm text-pulse">{step.number}</span>
              <h3 className="mt-4 font-display text-xl text-bone">{step.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ash">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

""")

write('src/components/home/TrustBand.jsx', r"""
const stats = [
  { value: "82%", label: "Model accuracy on held-out test data" },
  { value: "9", label: "Clinical markers analyzed per check" },
  { value: "<1s", label: "Time to result" },
];

export default function TrustBand() {
  return (
    <section className="border-b border-panel-line bg-panel py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-3">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center sm:text-left">
              <p className="font-mono text-5xl font-medium text-pulse sm:text-6xl">
                {stat.value}
              </p>
              <p className="mt-2 text-sm text-ash">{stat.label}</p>
            </div>
          ))}
        </div>

        <p className="mt-14 max-w-2xl text-sm leading-relaxed text-ash">
          Cardyx is a screening aid built on a machine learning model, not a
          diagnostic device. Always consult a healthcare professional about
          your cardiovascular health.
        </p>
      </div>
    </section>
  );
}

""")

write('src/components/home/ClosingCTA.jsx', r"""
import { Link } from "react-router-dom";
import { ArrowRight, Heart } from "lucide-react";

export default function ClosingCTA() {
  return (
    <section className="bg-obsidian py-28 text-center">
      <Heart
        size={64}
        className="animate-heartbeat mx-auto text-pulse"
        fill="currentColor"
      />
      <h2 className="mx-auto mt-8 max-w-lg text-balance font-display text-3xl font-medium text-bone sm:text-4xl">
        Your heart doesn't wait for a checkup. Why should you?
      </h2>
      <Link
        to="/dashboard"
        className="group mt-10 inline-flex items-center gap-2 bg-pulse px-8 py-4 font-medium text-bone transition hover:bg-pulse-dim"
      >
        Check your risk now
        <ArrowRight size={16} className="transition group-hover:translate-x-1" />
      </Link>
    </section>
  );
}

""")

write('src/components/layout/Logo.jsx', r"""
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

""")

write('src/components/layout/NavLinks.jsx', r"""
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

""")

write('src/components/layout/NavButton.jsx', r"""
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

""")

write('src/components/layout/MobileMenu.jsx', r"""
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

""")

write('src/components/layout/Navbar.jsx', r"""
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

""")

write('src/components/layout/Footer.jsx', r"""
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

""")

print("\nDone. Run: npm run dev")
