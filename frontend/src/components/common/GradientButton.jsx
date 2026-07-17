import { Button } from "@/components/ui/button";

export default function GradientButton({
  children,
  className = "",
  ...props
}) {
  return (
    <Button
      {...props}
      className={`rounded-xl bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-lg transition-all duration-300 hover:scale-105 hover:from-red-700 hover:to-rose-700 ${className}`}
    >
      {children}
    </Button>
  );
}