/**
 * Shared tone → class maps. Tailwind only generates classes it can see as complete strings,
 * so every combination is spelled out here instead of being built with template literals.
 */
export type Tone = "primary" | "accent" | "gold" | "success" | "warning" | "danger";

/** Soft tinted background + text-safe colour (badges, icon tiles). */
export const softTone: Record<Tone, string> = {
  primary: "bg-primary/12 text-primary-ink",
  accent: "bg-accent/12 text-accent-ink",
  gold: "bg-gold/18 text-gold-ink",
  success: "bg-success/12 text-success-ink",
  warning: "bg-warning/14 text-warning-ink",
  danger: "bg-danger/12 text-danger-ink",
};

/** Solid gradient fills (white icon/text on top; gold uses dark ink). */
export const filledTone: Record<Tone, string> = {
  primary: "bg-grad-primary text-white",
  accent: "bg-grad-accent text-white",
  gold: "bg-grad-gold text-[#2b1a00]",
  success: "bg-grad-success text-white",
  warning: "bg-grad-gold text-[#2b1a00]",
  danger: "bg-grad-danger text-white",
};

export const outlineTone: Record<Tone, string> = {
  primary: "border-primary/40 text-primary-ink hover:bg-primary/10",
  accent: "border-accent/40 text-accent-ink hover:bg-accent/10",
  gold: "border-gold/50 text-gold-ink hover:bg-gold/10",
  success: "border-success/40 text-success-ink hover:bg-success/10",
  warning: "border-warning/40 text-warning-ink hover:bg-warning/10",
  danger: "border-danger/40 text-danger-ink hover:bg-danger/10",
};

export const ghostTone: Record<Tone, string> = {
  primary: "text-primary-ink hover:bg-primary/10",
  accent: "text-accent-ink hover:bg-accent/10",
  gold: "text-gold-ink hover:bg-gold/10",
  success: "text-success-ink hover:bg-success/10",
  warning: "text-warning-ink hover:bg-warning/10",
  danger: "text-danger-ink hover:bg-danger/10",
};
