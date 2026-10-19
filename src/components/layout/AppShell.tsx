import { Outlet } from "react-router";
import { BottomNav, type NavBadges } from "./BottomNav";
import { Sidebar } from "./Sidebar";

/** Mock unread counts. Replaced by real data when the backend exists. */
const BADGES: NavBadges = { chats: 2, notifications: 5 };

/** Frame for every signed-in page: sidebar on desktop, bottom bar on phones. */
export function AppShell() {
  return (
    <div data-app-shell className="min-h-dvh md:pl-64">
      <Sidebar badges={BADGES} />
      <div className="pb-[calc(4rem+env(safe-area-inset-bottom))] md:pb-0">
        <Outlet />
      </div>
      <BottomNav badges={BADGES} />
    </div>
  );
}