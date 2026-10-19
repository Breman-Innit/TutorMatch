import { cn } from "@/lib/cn";

export type ArtKind = "find" | "book" | "teach";

/**
 * Line-art illustrations: a soft blob, a few floating shapes
 * and a navy-outlined scene. Colours come from the theme tokens in index.css.
 */
export function Art({ kind, className }: { kind: ArtKind; className?: string }) {
  const line = {
    stroke: "var(--ink)",
    strokeWidth: 2.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  return (
    <svg className={cn("block h-auto w-full", className)} viewBox="0 0 320 260" aria-hidden="true">
      <path d="M58 132c-10-52 30-104 92-108 62-4 118 26 122 84 4 58-38 112-104 116-60 4-100-40-110-92z" fill="var(--blob)" />
      <g fill="none" stroke="var(--ink)" strokeWidth="2" strokeLinecap="round">
        <circle cx="58" cy="64" r="7" />
        <rect x="252" y="50" width="14" height="14" rx="3" transform="rotate(20 259 57)" />
        <circle cx="270" cy="200" r="6" />
        <rect x="42" y="176" width="16" height="16" rx="3" transform="rotate(-18 50 184)" />
        <path d="M266 92c22 20 22 60 2 86" />
      </g>

      {kind === "find" && (
        <g {...line}>
          <rect x="98" y="62" width="124" height="134" rx="16" fill="#fff" />
          <path d="M124 164c0-22 16-34 36-34s36 12 36 34z" fill="var(--tint-4)" />
          <circle cx="160" cy="106" r="22" fill="#fff" />
          <path d="M138 102c2-18 16-26 32-22 10 3 14 11 14 22-12-6-30-7-46 0z" fill="var(--primary)" />
          <path d="M124 182h40" fill="none" />
          <circle cx="222" cy="62" r="15" fill="var(--primary)" />
          <path d="M215 62l5 5 9-10" stroke="#fff" strokeWidth="3" fill="none" />
          <path d="M226 190l20 20" stroke="var(--primary)" strokeWidth="6" fill="none" />
          <circle cx="206" cy="170" r="25" fill="#fff" />
          <path d="M194 166a13 13 0 0110-9" fill="none" strokeWidth="2.2" />
        </g>
      )}

      {kind === "book" && (
        <g {...line}>
          <rect x="94" y="72" width="132" height="122" rx="14" fill="#fff" />
          <path d="M94 112V86a14 14 0 0114-14h104a14 14 0 0114 14v26z" fill="var(--primary)" />
          <path d="M128 60v22M192 60v22" fill="none" />
          <g fill="var(--ink)" stroke="none">
            <circle cx="122" cy="136" r="3.5" />
            <circle cx="148" cy="136" r="3.5" />
            <circle cx="174" cy="136" r="3.5" />
            <circle cx="200" cy="136" r="3.5" />
            <circle cx="122" cy="166" r="3.5" />
            <circle cx="148" cy="166" r="3.5" />
            <circle cx="200" cy="166" r="3.5" />
          </g>
          <circle cx="174" cy="166" r="15" fill="var(--primary)" />
          <path d="M166 166l6 6 10-12" stroke="#fff" strokeWidth="3.2" fill="none" />
        </g>
      )}

      {kind === "teach" && (
        <g {...line}>
          <path d="M160 100c-22-14-50-16-72-9v92c22-7 50-5 72 9z" fill="#fff" />
          <path d="M160 100c22-14 50-16 72-9v92c-22-7-50-5-72 9z" fill="var(--tint-4)" />
          <path d="M108 118c12-2 28-1 40 5M108 140c12-2 28-1 40 5M172 123c12-6 28-7 40-5" fill="none" />
          <path d="M160 100v92" fill="none" />
          <circle cx="210" cy="72" r="16" fill="var(--primary)" />
          <path d="M203 72l5 5 9-10" stroke="#fff" strokeWidth="3" fill="none" />
        </g>
      )}
    </svg>
  );
}