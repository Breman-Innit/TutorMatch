import { useState } from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/cn";

interface StarRatingProps {
  rating: number;
  size?: number;
  className?: string;
}

/** Read-only stars. Like the Android app, the rating is floored (4.7 shows 4 filled stars). */
export function StarRating({ rating, size = 14, className }: StarRatingProps) {
  const filled = Math.floor(rating);
  return (
    <span role="img" aria-label={`Rated ${rating.toFixed(1)} out of 5`} className={cn("inline-flex gap-0.5", className)}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          size={size}
          strokeWidth={2}
          className="text-gold"
          fill={i < filled ? "currentColor" : "none"}
          aria-hidden="true"
        />
      ))}
    </span>
  );
}

interface StarRatingInputProps {
  value: number;
  onChange: (value: number) => void;
  size?: number;
  label?: string;
}

/** Clickable 1–5 star picker for the review dialog. */
export function StarRatingInput({ value, onChange, size = 38, label = "Rating" }: StarRatingInputProps) {
  const [hover, setHover] = useState(0);
  const shown = hover || value;
  return (
    <div role="radiogroup" aria-label={label} className="flex justify-center gap-1" onMouseLeave={() => setHover(0)}>
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          role="radio"
          aria-checked={value === n}
          aria-label={`${n} star${n > 1 ? "s" : ""}`}
          onClick={() => onChange(n)}
          onMouseEnter={() => setHover(n)}
          className="rounded-lg p-1 transition active:scale-90"
        >
          <Star
            size={size}
            strokeWidth={1.8}
            className="text-gold transition-transform"
            fill={n <= shown ? "currentColor" : "none"}
            aria-hidden="true"
          />
        </button>
      ))}
    </div>
  );
}
