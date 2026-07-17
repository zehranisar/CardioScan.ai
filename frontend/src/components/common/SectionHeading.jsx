export default function SectionHeading({
  badge,
  title,
  highlight,
  description,
  center = false,
}) {
  return (
    <div className={center ? "text-center" : ""}>
      {badge && (
        <span className="inline-flex rounded-full bg-red-100 px-4 py-2 text-sm font-semibold text-red-600">
          {badge}
        </span>
      )}

      <h2 className="mt-6 text-4xl font-bold leading-tight text-slate-900 md:text-5xl">
        {title}

        {highlight && (
          <span className="text-red-600"> {highlight}</span>
        )}
      </h2>

      {description && (
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600">
          {description}
        </p>
      )}
    </div>
  );
}