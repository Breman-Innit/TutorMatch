import { IconBell, IconCalendar, IconChat, IconHome, IconUser, type IconComponent } from "@/components/icons";
import { ROUTES } from "@/routes";

export interface NavItem {
  key: "home" | "bookings" | "notifications" | "chats" | "profile";
  label: string;
  to: string;
  icon: IconComponent;
}

/** The five main tabs, in the same order as the Android bottom navigation. */
export const NAV_ITEMS: NavItem[] = [
  { key: "home", label: "Home", to: ROUTES.home, icon: IconHome },
  { key: "bookings", label: "Bookings", to: ROUTES.bookings, icon: IconCalendar },
  { key: "notifications", label: "Alerts", to: ROUTES.notifications, icon: IconBell },
  { key: "chats", label: "Chats", to: ROUTES.chats, icon: IconChat },
  { key: "profile", label: "Profile", to: ROUTES.profile, icon: IconUser },
];