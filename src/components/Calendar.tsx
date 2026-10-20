import { useState } from "react";
import { IconBack, IconChevronRight } from "@/components/icons";
import { IconButton } from "@/components/ui";
import { cn } from "@/lib/cn";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const startOfDay = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
const sameDay = (a: Date, b: Date) =>
  a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();

interface CalendarProps {
  selected: Date | null;
  onSelect: (date: Date) => void;
}

/** Month calendar for picking a session day. Days before today cannot be chosen. */
export function Calendar({ selected, onSelect }: CalendarProps) {
  const today = startOfDay(new Date());
  const [view, setView] = useState(() => new Date(today.getFullYear(), today.getMonth(), 1));

  const year = view.getFullYear();
  const month = view.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (Date | null)[] = [
    ...Array<null>(view.getDay()).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => new Date(year, month, i + 1)),
  ];

  const canGoBack = year > today.getFullYear() || (year === today.getFullYear() && month > today.getMonth());
  const shift = (by: number) => setView(new Date(year, month + by, 1));

  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <IconButton label="Previous month" disabled={!canGoBack} onClick={() => shift(-1)}>
          <IconBack className="text-xl" />
        </IconButton>
        <p aria-live="polite" className="text-[15px] font-bold">
          {view.toLocaleDateString("en-GB", { month: "long", year: "numeric" })}
        </p>
        <IconButton label="Next month" onClick={() => shift(1)}>
          <IconChevronRight className="text-xl" />
        </IconButton>
      </div>

      <div className="grid grid-cols-7 gap-y-1 text-center">
        {WEEKDAYS.map((day) => (
          <span key={day} className="py-1 text-[11px] font-bold text-ink-muted">
            {day}
          </span>
        ))}
        {cells.map((date, i) => {
          if (!date) return <span key={`blank-${i}`} />;
          const past = date < today;
          const isToday = sameDay(date, today);
          const isSelected = selected !== null && sameDay(date, selected);
          return (
            <button
              key={date.getTime()}
              type="button"
              disabled={past}
              aria-pressed={isSelected}
              aria-label={date.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
              onClick={() => onSelect(date)}
              className={cn(
                "mx-auto grid size-10 place-items-center rounded-full text-sm transition-colors",
                isSelected
                  ? "bg-primary font-bold text-white"
                  : isToday
                    ? "border border-primary font-bold text-primary-ink hover:bg-raised"
                    : past
                      ? "cursor-not-allowed text-ink-muted/40"
                      : "text-ink hover:bg-raised",
              )}
            >
              {date.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
}