import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { softTone, type Tone } from "./tones";

interface BadgeProps {
  tone?: Tone;
  icon?: ReactNode;
  className?: string;
  children: ReactNode;
}

/** Small static label, e.g. "Student", "Staff", "Pending". */
export function Badge({ tone = "primary", icon, className, children }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-lg px-2 py-0.5 text-[11px] leading-5 font-bold",
        softTone[tone],
        className,
      )}
    >
      {icon}
      {children}
    </span>
  );
}
