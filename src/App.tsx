import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { ROUTES } from "@/routes";
import Placeholder from "@/pages/Placeholder";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import Home from "@/pages/Home";
import Landing from "@/pages/Landing";
import TutorProfile from "@/pages/TutorProfile";
import TutorReviews from "@/pages/TutorReviews";
import Booking from "@/pages/Booking";
import Bookings from "@/pages/Bookings";
import { AppShell } from "@/components/layout/AppShell";
import ComponentGallery from "@/pages/ComponentGallery";
import { AuthProvider } from "@/auth/AuthProvider";
import { BookingsProvider } from "@/bookings/BookingsProvider";
import { ThemeProvider } from "@/theme/ThemeProvider";
import { ToastProvider } from "@/components/ui";


/**
 * Route table. Each placeholder is replaced by a real page in later milestones.
 * The app shell (sidebar / bottom nav) arrives in milestone 4.
 */
export default function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
<AuthProvider>
<BookingsProvider>
        <BrowserRouter>
          <Routes>
            <Route path={ROUTES.landing} element={<Landing />} />
            <Route path={ROUTES.login} element={<Login />} />
            <Route path={ROUTES.signup} element={<Signup />} />

            <Route element={<AppShell />}>
              <Route path={ROUTES.home} element={<Home />} />
            <Route path={ROUTES.tutor()} element={<TutorProfile />} />
            <Route path={ROUTES.tutorReviews()} element={<TutorReviews />} />
            <Route path={ROUTES.book()} element={<Booking />} />

            <Route path={ROUTES.bookings} element={<Bookings />} />
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
            </Route>

            <Route path={ROUTES.gallery} element={<ComponentGallery />} />
            <Route path="*" element={<Navigate to={ROUTES.home} replace />} />
          </Routes>
      
        </BrowserRouter>
      </BookingsProvider>
</AuthProvider>
</ToastProvider>
    </ThemeProvider>
  );
}
