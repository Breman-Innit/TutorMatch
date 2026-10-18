import type { HTMLAttributes, KeyboardEvent } from "react";
import { cn } from "@/lib/cn";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /** When set, the whole card behaves as a button (keyboard and screen-reader friendly). */
  onClick?: () => void;
}

/** Bordered, shadowless surface — the base container for almost every block in the app. */
export function Card({ onClick, className, children, ...rest }: CardProps) {
  const interactive = typeof onClick === "function";

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.target !== e.currentTarget) return; // ignore keys pressed on nested controls
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onClick?.();
    }
  };

  return (
    <div
      {...(interactive ? { role: "button", tabIndex: 0, onClick, onKeyDown } : {})}
      className={cn(
        "rounded-card border border-line bg-card",
        interactive &&
          "cursor-pointer transition duration-150 hover:border-primary/40 active:scale-[0.985]",
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
