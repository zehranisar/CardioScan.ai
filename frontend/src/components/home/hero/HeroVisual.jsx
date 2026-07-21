import heroImage from "@/assets/images/hero.svg";

export default function HeroVisual() {
  return (
    <div className="flex items-center justify-center lg:justify-end">

      <img
        src={heroImage}
        alt="Healthcare Illustration"
        className="w-full max-w-[650px] object-contain"
      />

    </div>
  );
}