import HeroContent from "./HeroContent";
import HeroVisual from "./HeroVisual";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-white via-red-50 to-rose-100">

      {/* Background Glow */}
      <div className="absolute -left-40 top-0 h-[420px] w-[420px] rounded-full bg-red-200/30 blur-[170px]" />
      <div className="absolute -right-40 bottom-0 h-[500px] w-[500px] rounded-full bg-red-100/40 blur-[180px]" />

      <div className="relative mx-auto max-w-7xl px-6 pt-44 pb-24 sm:px-8 lg:px-10">

        <div className="grid items-center gap-16 lg:grid-cols-2">

          <HeroContent />

          <HeroVisual />

        </div>

      </div>

    </section>
  );
}