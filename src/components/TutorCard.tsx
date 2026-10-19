import { Link, useNavigate } from "react-router";
import { IconCalendar, IconGlobe, IconPin } from "@/components/icons";
import { Avatar, Button, Card, StarRating } from "@/components/ui";
import { ROUTES } from "@/routes";
import type { Tutor } from "@/types";

/** Summary card for a tutor. The whole card opens the profile; "Book session" goes straight to booking. */
export function TutorCard({ tutor }: { tutor: Tutor }) {
  const navigate = useNavigate();
  const isStaff = tutor.role === "Staff Tutor";

  return (
    <Card className="relative flex h-full flex-col gap-3 p-4 transition-colors hover:border-primary/40">
      <div className="flex items-start gap-3">
        <Avatar name={tutor.name} size={56} tone={isStaff ? "accent" : "primary"} verified={tutor.isVerified} />

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <h3 className="text-[15px] font-bold">
              <Link to={ROUTES.tutor(tutor.id)} className="rounded after:absolute after:inset-0 after:content-['']">
                {tutor.name}
              </Link>
            </h3>
            <span
              className={
                isStaff
                  ? "rounded-lg bg-primary px-2 py-0.5 text-[11px] font-bold text-white"
                  : "rounded-lg bg-raised px-2 py-0.5 text-[11px] font-bold text-primary-ink"
              }
            >
              {isStaff ? "Staff" : "Student"}
            </span>
          </div>
          <p className="truncate text-xs text-ink-soft">{tutor.faculty}</p>
          <div className="mt-1.5 flex items-center gap-1.5">
            <StarRating rating={tutor.rating} size={13} />
            <span className="text-xs font-bold">{tutor.rating.toFixed(1)}</span>
            <span className="text-xs text-ink-muted">({tutor.reviewCount})</span>
          </div>
        </div>

        <p className="shrink-0 text-base font-bold text-primary">
          ₵{tutor.studentRate}
          <span className="text-xs font-medium text-ink-soft">/hr</span>
        </p>
      </div>

      <div className="flex items-center justify-between gap-3 border-t border-line pt-3">
        <ul className="flex flex-wrap gap-1.5">
          {tutor.subjects.slice(0, 3).map((subject) => (
            <li key={subject} className="rounded-full bg-raised px-2.5 py-1 text-[11px] font-semibold text-primary-ink">
              {subject}
            </li>
          ))}
        </ul>
        <span
          className={
            tutor.isCampusTutor
              ? "flex shrink-0 items-center gap-1 text-[11px] font-semibold text-success-ink"
              : "flex shrink-0 items-center gap-1 text-[11px] font-semibold text-ink-soft"
          }
        >
          {tutor.isCampusTutor ? <IconPin /> : <IconGlobe />}
          {tutor.isCampusTutor ? "On campus" : "Online"}
        </span>
      </div>

      <Button
        size="sm"
        fullWidth
        className="relative z-10"
        icon={<IconCalendar className="text-base" />}
        onClick={() => navigate(ROUTES.book(tutor.id))}
      >
        Book session
      </Button>
    </Card>
  );
}