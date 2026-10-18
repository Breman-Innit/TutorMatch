import { Bell, CalendarDays, House, MessageCircle, User, type LucideIcon } from "lucide-react";
import { ROUTES } from "@/routes";

export interface NavItem {
  key: "home" | "bookings" | "notifications" | "chats" | "profile";
  label: string;
  to: string;
  icon: LucideIcon;
}

/** The five main tabs, in the same order as the Android bottom navigation. */
export const NAV_ITEMS: NavItem[] = [
  { key: "home", label: "Home", to: ROUTES.home, icon: House },
  { key: "bookings", label: "Bookings", to: ROUTES.bookings, icon: CalendarDays },
  { key: "notifications", label: "Alerts", to: ROUTES.notifications, icon: Bell },
  { key: "chats", label: "Chats", to: ROUTES.chats, icon: MessageCircle },
  { key: "profile", label: "Profile", to: ROUTES.profile, icon: User },
];