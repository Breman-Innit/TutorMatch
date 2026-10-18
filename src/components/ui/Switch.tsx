import { cn } from "@/lib/cn";

interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  /** Accessible name; required because the switch itself has no visible text. */
  label: string;
  disabled?: boolean;
}

export function Switch({ checked, onChange, label, disabled }: SwitchProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={cn(
        "relative h-7 w-12 shrink-0 rounded-full border transition-colors duration-200 disabled:opacity-50",
        checked ? "border-primary bg-grad-primary" : "border-line bg-raised",
      )}
    >
      <span
        className={cn(
          "absolute top-0.5 left-0.5 size-5.5 rounded-full shadow-sm transition-transform duration-200",
          checked ? "translate-x-5 bg-white" : "translate-x-0 bg-ink-muted",
        )}
      />
    </button>
  );
}
