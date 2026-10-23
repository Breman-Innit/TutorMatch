import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { IconCalendar, IconCheck, IconGlobe, IconPin, IconStar } from "@/components/icons";
import { Button, Card, getInitials } from "@/components/ui";
import { facultyStyle } from "@/lib/facultyStyle";
import { ROUTES } from "@/routes";
import type { Tutor } from "@/types";

/** A tutor counts as "top rated" with a high average backed by a meaningful number of reviews. */
export const isTopRated = (t: Tutor) => t.rating >= 4.8 && t.reviewCount >= 20;

/** Portrait from public/images/tutors/<id>.jpg, with a tinted initials block when there is no photo yet. */
export function Portrait({ tutor }: { tutor: Tutor }) {
  const [failed, setFailed] = useState(false);
  const tone = facultyStyle(tutor.faculty);

  if (failed) {
    return (
      <div className={`grid size-full place-items-center font-display text-7xl font-bold ${tone.chip}`}>
        {getInitials(tutor.name)}
      </div>
    );
  }
  return (
    <img
      src={tutor.photoUrl ?? `/images/tutors/${tutor.id}.jpg`}
      alt={`Portrait of ${tutor.name}`}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
      className="size-full object-cover object-[50%_25%] transition-transform duration-700 ease-out group-hover:scale-105"
    />
  );
}

/** Summary card for a tutor. The whole card opens the profile; "Book session" goes straight to booking. */
export function TutorCard({ tutor }: { tutor: Tutor }) {
  const navigate = useNavigate();
  const isStaff = tutor.role === "Staff Tutor";
  const tone = facultyStyle(tutor.faculty);

  return (
    <Card className="group relative flex h-full flex-col overflow-hidden transition duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg">
      <div className="relative aspect-[3/2] overflow-hidden bg-raised">
        <Portrait tutor={tutor} />
        <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-primary-deep/70 to-transparent" />

        {isTopRated(tutor) && (
          <span className="absolute top-3 left-3 inline-flex items-center gap-1 rounded-full bg-star px-2.5 py-1 text-[11px] font-bold text-[#3a2600]">
            <IconStar className="text-xs" fill="currentColor" strokeWidth={1.5} />
            Top rated
          </span>
        )}
        {tutor.isVerified && (
          <span
            role="img"
            aria-label="Verified tutor"
            className="absolute top-3 right-3 grid size-7 place-items-center rounded-full border-2 border-white bg-success-ink text-xs text-white"
          >
            <IconCheck />
          </span>
        )}

        <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-primary-deep/80 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur-sm">
          <IconStar className="text-sm text-star" fill="currentColor" strokeWidth={1.5} />
          {tutor.rating.toFixed(1)}
          <span className="font-medium text-white/70">({tutor.reviewCount})</span>
        </span>
        <span className="absolute right-3 bottom-3 rounded-full bg-white px-3 py-1 text-sm font-bold text-primary">
          ₵{tutor.studentRate}
          <span className="text-xs font-medium text-ink-soft">/hr</span>
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div>
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <h3 className="text-base font-bold">
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
          <p className="mt-1 flex items-center gap-1.5 text-xs text-ink-soft">
            <span aria-hidden="true" className={`size-2 shrink-0 rounded-full ${tone.dot}`} />
            <span className="truncate">{tutor.faculty}</span>
          </p>
        </div>

        <div className="flex items-center justify-between gap-3 border-t border-line pt-3">
          <ul className="flex flex-wrap gap-1.5">
            {tutor.subjects.slice(0, 3).map((subject) => (
              <li key={subject} className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${tone.chip}`}>
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
          className="relative z-10 mt-auto"
          icon={<IconCalendar className="text-base" />}
          onClick={() => navigate(ROUTES.book(tutor.id))}
        >
          Book session
        </Button>
      </div>
    </Card>
  );
}