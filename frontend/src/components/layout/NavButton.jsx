export default function NavButton() {
  return (
    <div className="hidden lg:flex items-center gap-4">

      <button className="font-medium text-slate-700 transition hover:text-red-600">
        Login
      </button>

      <button className="rounded-xl bg-red-600 px-6 py-3 font-semibold text-white shadow-lg shadow-red-200 transition hover:-translate-y-0.5 hover:bg-red-700">
        Get Started
      </button>

    </div>
  );
}