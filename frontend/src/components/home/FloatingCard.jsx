import GlassCard from "@/components/common/GlassCard";

export default function FloatingCard({
  icon,
  title,
  value,
  color = "text-red-600",
}) {
  return (
    <GlassCard className="flex items-center gap-4 p-4">

      <div className={color}>
        {icon}
      </div>

      <div>

        <p className="text-sm text-slate-500">
          {title}
        </p>

        <h4 className="text-xl font-bold text-slate-900">
          {value}
        </h4>

      </div>

    </GlassCard>
  );
}