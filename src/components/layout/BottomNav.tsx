import { NavLink } from "react-router";
import { cn } from "@/lib/cn";
import { NAV_ITEMS, type NavItem } from "./navItems";

/** Unread counts per tab, e.g. { chats: 2, notifications: 5 }. */
export type NavBadges = Partial<Record<NavItem["key"], number>>;

/** Mobile tab bar. Hidden from the md breakpoint up, where the sidebar takes over. */
export function BottomNav({ badges = {} }: { badges?: NavBadges }) {
  return (
    <nav
      aria-label="Main"
      className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-surface/95 pb-[env(safe-area-inset-bottom)] backdrop-blur md:hidden"
    >
      <ul className="mx-auto flex h-16 max-w-md items-stretch justify-around px-2">
        {NAV_ITEMS.map(({ key, label, to, icon: Icon }) => {
          const count = badges[key] ?? 0;
          return (
            <li key={key} className="flex-1">
              <NavLink
                to={to}
                end={to === "/"}
                aria-label={count > 0 ? `${label}, ${count} unread` : undefined}
                className={({ isActive }) =>
                  cn(
                    "flex h-full flex-col items-center justify-center gap-0.5 text-[11px] transition-colors",
                    isActive ? "font-bold text-primary-ink" : "font-medium text-ink-muted hover:text-ink",
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    <span className="relative">
                      <span
                        className={cn(
                          "flex size-9 items-center justify-center rounded-xl transition-colors",
                          isActive && "bg-primary/15",
                        )}
                      >
                        <Icon size={22} strokeWidth={isActive ? 2.4 : 2} />
                      </span>
                      {count > 0 && (
                        <span
                          aria-hidden="true"
                          className="absolute -top-0.5 -right-1 flex h-4 min-w-4 items-center justify-center rounded-full border-2 border-surface bg-grad-accent px-1 text-[9px] font-bold text-white"
                        >
                          {count > 9 ? "9+" : count}
                        </span>
                      )}
                    </span>
                    {label}
                  </>
                )}
              </NavLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}