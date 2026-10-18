import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";
import { filledTone, ghostTone, outlineTone, type Tone } from "./tones";
import { Spinner } from "./Spinner";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style. `solid` is the gradient pill used for primary actions. */
  variant?: "solid" | "outline" | "ghost";
  tone?: Tone;
  size?: "md" | "sm";
  fullWidth?: boolean;
  loading?: boolean;
  /** Icon shown before the label. */
  icon?: ReactNode;
}

export function Button({
  variant = "solid",
  tone = "primary",
  size = "md",
  fullWidth,
  loading,
  icon,
  disabled,
  className,
  children,
  type = "button",
  ...rest
}: ButtonProps) {
  const isDisabled = disabled || loading;
  return (
    <button
      type={type}
      disabled={isDisabled}
      aria-busy={loading || undefined}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full font-bold whitespace-nowrap",
        "transition duration-150 select-none active:scale-[0.98]",
        "disabled:cursor-not-allowed disabled:opacity-50 disabled:active:scale-100",
        size === "md" ? "h-13 px-7 text-[15px]" : "h-10 px-5 text-sm",
        variant === "solid" && [filledTone[tone], "hover:brightness-110 disabled:hover:brightness-100"],
        variant === "outline" && ["border bg-transparent", outlineTone[tone]],
        variant === "ghost" && ghostTone[tone],
        fullWidth && "w-full",
        className,
      )}
      {...rest}
    >
      {loading ? <Spinner size={18} className="[&_svg]:text-current" label="Please wait" /> : icon}
      {children}
    </button>
  );
}
