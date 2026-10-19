import { Link, NavLink, useNavigate } from "react-router";
import { IconCap } from "@/components/icons";
import { Button } from "@/components/ui";
import { BRAND } from "@/config/brand";
import { cn } from "@/lib/cn";
import { ROUTES } from "@/routes";
import type { NavBadges } from "./BottomNav";
import { NAV_ITEMS } from "./navItems";

/** Desktop navigation. Hidden below the md breakpoint, where the bottom bar takes over. */
export function Sidebar({ badges = {} }: { badges?: NavBadges }) {
  const navigate = useNavigate();

  return (
    <aside className="fixed inset-y-0 left-0 z-20 hidden w-64 flex-col border-r border-line bg-wash px-4 py-6 md:flex">
      <Link to={ROUTES.home} className="mb-8 flex items-center gap-2.5 rounded-lg px-2">
        <span className="grid size-9 place-items-center rounded-tile bg-primary text-xl text-white">
          <IconCap />
        </span>
        <span className="text-[17px] font-bold tracking-tight text-primary">{BRAND.name}</span>
      </Link>

      <nav aria-label="Main">
        <ul className="flex flex-col gap-1">
          {NAV_ITEMS.map(({ key, label, to, icon: Icon }) => {
            const count = badges[key] ?? 0;
            return (
              <li key={key}>
                <NavLink
                  to={to}
                  end={to === "/"}
                  aria-label={count > 0 ? `${label}, ${count} unread` : undefined}
                  className={({ isActive }) =>
                    cn(
                      "flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-[15px] transition-colors",
                      isActive
                        ? "bg-raised font-bold text-primary-ink"
                        : "font-medium text-ink-soft hover:bg-raised/60 hover:text-ink",
                    )
                  }
                >
                  <Icon size={22} />
                  <span className="flex-1">{label}</span>
                  {count > 0 && (
                    <span
                      aria-hidden="true"
                      className="flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1.5 text-[11px] font-bold text-white"
                    >
                      {count > 9 ? "9+" : count}
                    </span>
                  )}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="mt-auto">
        <Button variant="outline" size="sm" fullWidth onClick={() => navigate(ROUTES.login)}>
          Sign out
        </Button>
      </div>
    </aside>
  );
}