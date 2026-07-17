import { SITE } from "@/config/site";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 py-8">

      <div className="mx-auto max-w-7xl px-6 text-center">

        <p className="text-sm text-slate-500">
          © 2026 {SITE.company}. All rights reserved.
        </p>

      </div>

    </footer>
  );
}