import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Required: icon-only buttons need an accessible name. */
  label: string;
  children: ReactNode;
  /** `plain` has no background (back arrows); `filled` sits on a raised circle. */
  variant?: "plain" | "filled";
}

export function IconButton({ label, children, variant = "plain", className, type = "button", ...rest }: IconButtonProps) {
  return (
    <button
      type={type}
      aria-label={label}
      title={label}
      className={cn(
        "inline-flex size-10 shrink-0 items-center justify-center rounded-full text-ink transition",
        "hover:bg-primary/10 active:scale-95 disabled:opacity-50",
        variant === "filled" && "bg-raised",
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
