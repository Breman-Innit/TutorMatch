import Link from "next/link";
import { cn } from "@/lib/utils";

export function Chip({
  href,
  active = false,
  children,
  className,
}: {
  href: string;
  active?: boolean;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      aria-current={active ? "true" : undefined}
      className={cn(
        "inline-flex h-9 items-center rounded-full border px-3.5 text-sm transition-colors",
        active
          ? "border-primary bg-primary text-primary-foreground"
          : "bg-background hover:bg-muted",
        className,
      )}
    >
      {children}
    </Link>
  );
}
