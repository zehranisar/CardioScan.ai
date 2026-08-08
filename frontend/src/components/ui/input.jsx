import { cn } from "@/lib/utils"

function Input({ className, type = "text", ...props }) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "h-11 w-full border border-panel-line bg-transparent px-3.5 text-sm text-bone placeholder:text-ash/60 outline-none transition-colors focus:border-pulse disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  );
}

export { Input }
