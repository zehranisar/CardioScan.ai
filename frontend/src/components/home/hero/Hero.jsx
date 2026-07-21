import HeroContent from "./HeroContent";
import HeroVisual from "./HeroVisual";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-white via-red-50 to-rose-100 pt-32 pb-28">

      {/* Background Blur */}
      <div className="absolute -left-32 top-10 h-72 w-72 rounded-full bg-red-200 blur-[150px] opacity-40"></div>

      <div className="absolute right-0 top-20 h-96 w-96 rounded-full bg-rose-200 blur-[180px] opacity-40"></div>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">

        <div className="grid items-center gap-20 lg:grid-cols-2">

          {/* Left */}
          <HeroContent />

          {/* Right */}
          <HeroVisual />

        </div>

      </div>

    </section>
  );
}