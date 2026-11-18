import type { IconComponent } from "@/components/icons";
import { cn } from "@/lib/cn";
import { filledTone, softTone, type Tone } from "./tones";

interface IconTileProps {
  icon: IconComponent;
  tone?: Tone;
  /** Solid gradient with a white icon instead of a soft tint. */
  filled?: boolean;
  /** Tile size in px. The icon scales with it. */
  size?: number;
  round?: boolean;
  className?: string;
}

/** Icon on a rounded tinted square — used for list rows, settings and stat blocks. */
export function IconTile({ icon: Icon, tone = "primary", filled, size = 36, round, className }: IconTileProps) {
  return (
    <span
      aria-hidden="true"
      style={{ width: size, height: size }}
      className={cn(
        "inline-flex shrink-0 items-center justify-center",
        round ? "rounded-full" : "rounded-tile",
        filled ? filledTone[tone] : softTone[tone],
        className,
      )}
    >
      <Icon size={Math.round(size * 0.5)} strokeWidth={2.2} />
    </span>
  );
}
