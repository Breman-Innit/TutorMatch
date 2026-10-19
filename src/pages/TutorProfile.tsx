import type { ReactNode } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { IconBack, IconBook, IconCalendar, IconCap, IconCheckCircle, IconClock, IconPin, IconUser, type IconComponent } from "@/components/icons";
import { Avatar, Button, Card, IconTile, StarRating } from "@/components/ui";
import { TUTORS } from "@/data/tutors";
import { ROUTES } from "@/routes";

function Section({ icon, title, children, className }: { icon: IconComponent; title: string; children: ReactNode; className?: string }) {
  return (
    <Card className={`p-5 ${className ?? ""}`}>
      <div className="mb-4 flex items-center gap-2.5">
        <IconTile icon={icon} size={32} />
        <h2 className="text-[15px] font-bold">{title}</h2>
      </div>
      {children}
    </Card>
  );
}

export default function TutorProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const tutor = TUTORS.find((t) => t.id === id);

  if (!tutor) {
    return (
      <main className="mx-auto w-full max-w-xl px-5 py-20 text-center">
        <h1 className="text-2xl font-bold">Tutor not found</h1>
        <p className="mt-2 text-ink-soft">This tutor may no longer be available.</p>
        <Link to={ROUTES.home} className="mt-6 inline-block font-semibold text-primary underline-offset-4 hover:underline">
          Back to all tutors
        </Link>
      </main>
    );
  }

  const isStaff = tutor.role === "Staff Tutor";

  return (
    <main className="mx-auto w-full max-w-5xl px-5 py-6 sm:px-8 sm:py-8">
      <Link to={ROUTES.home} className="mb-5 inline-flex items-center gap-1 rounded-lg py-1 pr-2 text-sm font-semibold text-ink-soft hover:text-primary">
        <IconBack className="text-lg" />
        All tutors
      </Link>

      <section className="rounded-card border border-line bg-wash p-6 sm:p-8">
        <div className="flex flex-col items-center gap-5 text-center sm:flex-row sm:text-left">
          <Avatar name={tutor.name} size={104} tone={isStaff ? "accent" : "primary"} verified={tutor.isVerified} />

          <div className="min-w-0 flex-1">
            <h1 className="text-2xl leading-tight font-bold sm:text-3xl">{tutor.name}</h1>
            <p className="mt-1 text-sm text-ink-soft">
              {tutor.role} · {tutor.program}
            </p>
            <div className="mt-2.5 flex items-center justify-center gap-2 sm:justify-start">
              <StarRating rating={tutor.rating} size={16} />
              <span className="text-sm font-bold">{tutor.rating.toFixed(1)}</span>
              <span className="text-sm text-ink-soft">({tutor.reviewCount} reviews)</span>
            </div>
          </div>

          <div className="flex w-full flex-col items-center gap-3 sm:w-auto sm:items-end">
            <p className="text-3xl font-bold text-primary">
              ₵{tutor.studentRate}
              <span className="text-sm font-medium text-ink-soft">/hr</span>
            </p>
            <Button fullWidth className="sm:w-auto" icon={<IconCalendar className="text-lg" />} onClick={() => navigate(ROUTES.book(tutor.id))}>
              Book a session
            </Button>
          </div>
        </div>
      </section>

      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
        <Section icon={IconUser} title="About" className="md:col-span-2">
          <p className="leading-relaxed text-ink-soft">{tutor.bio}</p>
          <ul className="mt-4 flex flex-col gap-2 text-sm">
            <li className="flex items-center gap-2 font-medium text-primary-ink">
              <IconCap className="shrink-0 text-base" />
              {tutor.qualification}
            </li>
            <li className="flex items-center gap-2 text-ink-soft">
              <IconCheckCircle className="shrink-0 text-base text-success-ink" />
              Verified by {tutor.verifiedBy}
            </li>
          </ul>
        </Section>

        <Section icon={IconBook} title="Courses">
          <ul className="flex flex-wrap gap-2">
            {tutor.subjects.map((subject) => (
              <li key={subject} className="rounded-full bg-raised px-3.5 py-1.5 text-[13px] font-semibold text-primary-ink">
                {subject}
              </li>
            ))}
          </ul>
        </Section>

        <Section icon={IconClock} title="Availability">
          <ul className="flex flex-col gap-2.5">
            {tutor.availability.map((slot) => (
              <li key={slot} className="flex items-center gap-2.5 text-sm text-ink-soft">
                <span aria-hidden="true" className="size-2 shrink-0 rounded-full bg-success" />
                {slot}
              </li>
            ))}
          </ul>
          <p className="mt-4 flex items-center gap-2 border-t border-line pt-4 text-sm text-ink-soft">
            <IconPin className="shrink-0 text-base text-primary-ink" />
            {tutor.location}
          </p>
        </Section>
      </div>
    </main>
  );
}