import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

interface ChipProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  selected?: boolean;
}

/** Selectable filter pill (e.g. "Student Tutors", faculty filters). */
export function Chip({ selected = false, className, children, type = "button", ...rest }: ChipProps) {
  return (
    <button
      type={type}
      aria-pressed={selected}
      className={cn(
        "shrink-0 rounded-full px-4 py-2 text-xs transition duration-150 whitespace-nowrap",
        selected
          ? "bg-grad-primary font-bold text-white"
          : "border border-line bg-raised font-medium text-ink-soft hover:border-primary/40",
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
