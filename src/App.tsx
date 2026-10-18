import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { ROUTES } from "@/routes";
import Placeholder from "@/pages/Placeholder";
import Onboarding from "@/pages/Onboarding";
import ComponentGallery from "@/pages/ComponentGallery";
import { ThemeProvider } from "@/theme/ThemeProvider";
import { ToastProvider } from "@/components/ui";
import { BottomNav } from "@/components/layout/BottomNav";

/**
 * Route table. Each placeholder is replaced by a real page in later milestones.
 * The app shell (sidebar / bottom nav) arrives in milestone 4.
 */
export default function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <BrowserRouter>
          <Routes>
            <Route path={ROUTES.welcome} element={<Onboarding />} />
            <Route path={ROUTES.login} element={<Placeholder title="Sign in" />} />
            <Route path={ROUTES.signup} element={<Placeholder title="Create account" />} />

            <Route path={ROUTES.home} element={<Placeholder title="Find your tutor" />} />
            <Route path={ROUTES.tutor()} element={<Placeholder title="Tutor profile" />} />
            <Route path={ROUTES.tutorReviews()} element={<Placeholder title="Tutor reviews" />} />
            <Route path={ROUTES.book()} element={<Placeholder title="Book a session" />} />

            <Route path={ROUTES.bookings} element={<Placeholder title="My bookings" />} />
            <Route path={ROUTES.chats} element={<Placeholder title="Messages" />} />
            <Route path={ROUTES.chat()} element={<Placeholder title="Conversation" />} />
            <Route path={ROUTES.notifications} element={<Placeholder title="Notifications" />} />

            <Route path={ROUTES.profile} element={<Placeholder title="Profile" />} />
            <Route path={ROUTES.editProfile} element={<Placeholder title="Edit profile" />} />
            <Route path={ROUTES.notificationSettings} element={<Placeholder title="Notification settings" />} />
            <Route path={ROUTES.help} element={<Placeholder title="Help center" />} />
            <Route path={ROUTES.privacy} element={<Placeholder title="Privacy and security" />} />

            <Route path={ROUTES.becomeTutor} element={<Placeholder title="Become a tutor" />} />
            <Route path={ROUTES.dashboard} element={<Placeholder title="Tutor dashboard" />} />

            <Route path={ROUTES.gallery} element={<ComponentGallery />} />
            <Route path="*" element={<Navigate to={ROUTES.home} replace />} />
          </Routes>
          <BottomNav badges={{ chats: 2, notifications: 5 }} />
        </BrowserRouter>
      </ToastProvider>
    </ThemeProvider>
  );
}
