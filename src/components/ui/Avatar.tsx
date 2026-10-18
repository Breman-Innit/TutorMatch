import { Check } from "lucide-react";
import { cn } from "@/lib/cn";

const TITLES = /^(dr|prof|mr|mrs|ms|miss)\.?$/i;

/** "Dr. Sarah Mensah" → "SM", "Kofi Annan" → "KA", "Esi" → "E". Honorifics are skipped. */
export function getInitials(name: string): string {
  const words = name.trim().split(/\s+/).filter((w) => w && !TITLES.test(w));
  if (words.length === 0) return "?";
  const first = words[0][0];
  const last = words.length > 1 ? words[words.length - 1][0] : "";
  return (first + last).toUpperCase();
}

interface AvatarProps {
  name: string;
  /** Diameter in px. */
  size?: number;
  tone?: "primary" | "accent" | "success";
  /** Shows the green "verified" tick at the bottom-right. */
  verified?: boolean;
  className?: string;
}

const gradients = {
  primary: "bg-grad-primary",
  accent: "bg-grad-accent",
  success: "bg-grad-success",
};

export function Avatar({ name, size = 56, tone = "primary", verified, className }: AvatarProps) {
  const badge = Math.max(14, Math.round(size * 0.31));
  return (
    <span className={cn("relative inline-flex shrink-0", className)} style={{ width: size, height: size }}>
      <span
        role="img"
        aria-label={name}
        className={cn(
          "flex size-full items-center justify-center rounded-full font-display font-bold text-white",
          gradients[tone],
        )}
        style={{ fontSize: Math.round(size / 2.6) }}
      >
        {getInitials(name)}
      </span>
      {verified && (
        <span
          aria-label="Verified"
          role="img"
          className="absolute -right-0.5 -bottom-0.5 flex items-center justify-center rounded-full border-2 border-card bg-success-ink text-white"
          style={{ width: badge, height: badge }}
        >
          <Check size={Math.round(badge * 0.6)} strokeWidth={3.5} />
        </span>
      )}
    </span>
  );
}
