import type { ChangeEvent } from "react";
import { IconCheck, type IconComponent } from "@/components/icons";
import { cn } from "@/lib/cn";
import { IconTile } from "./IconTile";

interface ChoiceCardProps {
  /** Radios with the same name form one group (arrow keys move between them). */
  name: string;
  checked: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  title: string;
  description?: string;
  icon?: IconComponent;
}

/** A large selectable option card built on a real radio input, so keyboard and screen readers just work. */
export function ChoiceCard({ name, checked, onChange, title, description, icon }: ChoiceCardProps) {
  return (
    <label
      className={cn(
        "flex cursor-pointer items-center gap-3 rounded-[14px] border-[1.5px] p-3.5 transition-colors",
        "has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-focus",
        checked ? "border-primary bg-raised" : "border-line-strong bg-surface hover:border-ink-muted",
      )}
    >
      <input type="radio" name={name} checked={checked} onChange={onChange} className="sr-only" />
      {icon && <IconTile icon={icon} size={36} />}
      <span className="min-w-0 flex-1">
        <span className="block text-[15px] font-semibold">{title}</span>
        {description && <span className="block text-[13px] text-ink-soft">{description}</span>}
      </span>
      <span
        aria-hidden="true"
        className={cn(
          "grid size-5 shrink-0 place-items-center rounded-full border-2 text-[11px] text-white",
          checked ? "border-primary bg-primary" : "border-line-strong",
        )}
      >
        {checked && <IconCheck />}
      </span>
    </label>
  );
}