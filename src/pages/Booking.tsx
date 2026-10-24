import { useRef, useState } from "react";
import { Link } from "react-router";
import { Art } from "@/components/Art";
import { IconCalendar, IconClock, IconPin } from "@/components/icons";
import { Portrait } from "@/components/TutorCard";
import { Avatar } from "@/components/ui";
import { useBookings } from "@/bookings/BookingsProvider";
import { TUTORS } from "@/data/tutors";
import { formatBookingDate } from "@/lib/dates";
import { facultyStyle } from "@/lib/facultyStyle";
import { useReveal } from "@/lib/reveal";
import { cn } from "@/lib/cn";
import { ROUTES } from "@/routes";
import type { Booking, BookingStatus } from "@/types";

type Tab = "upcoming" | "past";

const STATUS: Record<BookingStatus, { label: string; className: string }> = {
  pending: { label: "Awaiting confirmation", className: "bg-star/20 text-warning-ink" },
  confirmed: { label: "Confirmed", className: "bg-success/12 text-success-ink" },
  completed: { label: "Completed", className: "bg-raised text-primary-ink" },
  cancelled: { label: "Cancelled", className: "bg-danger/12 text-danger-ink" },
};

function BookingCard({ booking }: { booking: Booking }) {
  const tutor = TUTORS.find((t) => t.id === booking.tutorId);
  const tone = tutor ? facultyStyle(tutor.faculty) : null;
  const status = STATUS[booking.status];

  return (
    <article className="flex gap-4 rounded-card border border-line bg-card p-4 sm:gap-5 sm:p-5">
      <div className="size-16 shrink-0 overflow-hidden rounded-2xl sm:size-20">
        {tutor ? <Portrait tutor={tutor} /> : <Avatar name={booking.tutorName} size={80} className="size-full" />}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-start justify-between gap-x-3 gap-y-1">
          <h3 className="text-base font-bold">
            {tutor ? (
              <Link to={ROUTES.tutor(tutor.id)} className="rounded underline-offset-4 hover:underline">
                {booking.tutorName}
              </Link>
            ) : (
              booking.tutorName
            )}
          </h3>
          <span className={cn("rounded-full px-2.5 py-1 text-[11px] font-bold", status.className)}>{status.label}</span>
        </div>

        <span className={cn("mt-1.5 inline-block rounded-full px-2.5 py-1 text-[11px] font-semibold", tone?.chip ?? "bg-raised text-primary-ink")}>
          {booking.subject}
        </span>

        <ul className="mt-3 flex flex-col gap-1.5 text-sm text-ink-soft">
          <li className="flex items-center gap-2">
            <IconCalendar className="shrink-0 text-base text-primary-ink" />
            {formatBookingDate(booking.date)}
          </li>
          <li className="flex items-center gap-2">
            <IconClock className="shrink-0 text-base text-primary-ink" />
            {booking.time}
          </li>
          <li className="flex items-center gap-2">
            <IconPin className="shrink-0 text-base text-primary-ink" />
            {booking.location}
          </li>
        </ul>

        <p className="mt-3 text-sm text-ink-soft">
          Paid <span className="font-bold text-ink">₵{booking.price}</span> · {booking.paymentMethod}
        </p>
      </div>
    </article>
  );
}

export default function Bookings() {
  const { bookings } = useBookings();
  const [tab, setTab] = useState<Tab>("upcoming");
  const page = useRef<HTMLElement>(null);

  const upcoming = bookings
    .filter((b) => b.status === "pending" || b.status === "confirmed")
    .sort((a, b) => a.date.localeCompare(b.date));
  const past = bookings
    .filter((b) => b.status === "completed" || b.status === "cancelled")
    .sort((a, b) => b.date.localeCompare(a.date));
  const shown = tab === "upcoming" ? upcoming : past;

  useReveal(page, [tab, bookings.length]);

  const tabClass = (active: boolean) =>
    cn(
      "relative px-1 pb-3 text-[15px] font-semibold transition-colors",
      active ? "text-primary after:absolute after:inset-x-0 after:bottom-[-1px] after:h-0.5 after:bg-primary" : "text-ink-soft hover:text-ink",
    );

  return (
    <main ref={page} className="mx-auto w-full max-w-3xl px-5 py-8 sm:px-8 md:py-12">
      <header className="mb-8">
        <p className="text-xs font-semibold tracking-[0.18em] text-ink-soft uppercase">Your sessions</p>
        <h1 className="mt-2 font-serif text-5xl leading-[0.95] font-normal tracking-tight sm:text-6xl">My bookings</h1>
      </header>

      <div role="tablist" aria-label="Booking status" className="mb-6 flex gap-7 border-b border-line">
        <button type="button" role="tab" aria-selected={tab === "upcoming"} onClick={() => setTab("upcoming")} className={tabClass(tab === "upcoming")}>
          Upcoming <span className="ml-1 text-ink-muted">{upcoming.length}</span>
        </button>
        <button type="button" role="tab" aria-selected={tab === "past"} onClick={() => setTab("past")} className={tabClass(tab === "past")}>
          Past <span className="ml-1 text-ink-muted">{past.length}</span>
        </button>
      </div>

      {shown.length === 0 ? (
        <div className="flex flex-col items-center py-10 text-center">
          <Art kind="book" className="max-w-[16rem]" />
          <h2 className="mt-2 font-serif text-3xl">{tab === "upcoming" ? "No upcoming sessions" : "Nothing here yet"}</h2>
          <p className="mt-2 max-w-sm text-ink-soft">
            {tab === "upcoming" ? "Book a tutor and your session will appear here." : "Completed and cancelled sessions will be listed here."}
          </p>
          <Link
            to={ROUTES.home}
            className="mt-6 inline-flex h-13 items-center rounded-full bg-primary px-8 text-base font-semibold text-white transition hover:bg-primary-soft active:scale-[0.98]"
          >
            Find a tutor
          </Link>
        </div>
      ) : (
        <ul className="flex flex-col gap-4">
          {shown.map((b) => (
            <li key={b.id} data-reveal>
              <BookingCard booking={b} />
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}