import DashboardCard from "./DashboardCard";
import FloatingBadge from "./FloatingBadge";

export default function HeroVisual() {
  return (
    <div className="relative flex items-center justify-center lg:mt-12">

      {/* Floating Badge */}
      <FloatingBadge />

      {/* Dashboard */}
      <DashboardCard />

    </div>
  );
}