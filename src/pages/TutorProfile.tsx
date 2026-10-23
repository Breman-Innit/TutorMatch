import { useRef, type ReactNode } from "react";
import { Link, useNavigate, useParams } from "react-router";
import {
  IconBack,
  IconBook,
  IconCalendar,
  IconCap,
  IconCheck,
  IconCheckCircle,
  IconClock,
  IconPin,
  IconStar,
  IconUser,
  type IconComponent,
} from "@/components/icons";
import { ReviewCard } from "@/components/ReviewCard";
import { isTopRated, Portrait } from "@/components/TutorCard";
import { Button, Card, IconTile, StarRating } from "@/components/ui";
import { REVIEWS } from "@/data/reviews";
import { TUTORS } from "@/data/tutors";
import { facultyStyle } from "@/lib/facultyStyle";
import { EASE, gsap, prefersReducedMotion, useGSAP } from "@/lib/motion";
import { useReveal } from "@/lib/reveal";
import { ROUTES } from "@/routes";

function Section({ icon, title, children, className }: { icon: IconComponent; title: string; children: ReactNode; className?: string }) {
  return (
    <Card data-reveal className={`p-5 ${className ?? ""}`}>
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
  const page = useRef<HTMLElement>(null);

  // Entrance: the portrait opens like a curtain, the name rises out of its mask, the details follow.
  useGSAP(
    () => {
      if (!tutor || prefersReducedMotion()) return;
      gsap
        .timeline({ defaults: { ease: EASE.expo } })
        .from(".profile-photo", { clipPath: "inset(100% 0% 0% 0%)", duration: 1.3 }, 0)
        .from(".profile-photo img", { scale: 1.2, duration: 1.8 }, 0)
        .from(".profile-line", { yPercent: 115, duration: 1.1 }, 0.25)
        .from(".profile-fade", { autoAlpha: 0, y: 18, duration: 0.9, stagger: 0.08 }, 0.5);
    },
    { scope: page, dependencies: [id] },
  );

  useReveal(page, [id]);

  if (!tutor) {
    return (
      <main className="mx-auto w-full max-w-xl px-5 py-20 text-center">
        <h1 className="font-serif text-4xl">Tutor not found</h1>
        <p className="mt-2 text-ink-soft">This tutor may no longer be available.</p>
        <Link to={ROUTES.home} className="mt-6 inline-block font-semibold text-primary underline-offset-4 hover:underline">
          Back to all tutors
        </Link>
      </main>
    );
  }

  const tone = facultyStyle(tutor.faculty);
  const reviews = REVIEWS.filter((r) => r.tutorId === tutor.id);

  return (
    <main ref={page} className="mx-auto w-full max-w-5xl px-5 py-6 sm:px-8 sm:py-8">
      <Link
        to={ROUTES.home}
        className="mb-6 inline-flex items-center gap-1 rounded-lg py-1 pr-2 text-sm font-semibold text-ink-soft hover:text-primary"
      >
        <IconBack className="text-lg" />
        All tutors
      </Link>

      <section className="grid items-center gap-10 md:grid-cols-[minmax(0,21rem)_1fr] md:gap-14">
        <div className="profile-photo mx-auto aspect-[4/5] w-full max-w-[20rem] overflow-hidden rounded-t-[999px] bg-raised md:mx-0 md:max-w-none">
          <Portrait tutor={tutor} />
        </div>

        <div className="text-center md:text-left">
          <p className="profile-fade text-xs font-semibold tracking-[0.18em] text-ink-soft uppercase">
            {tutor.role} · {tutor.program}
          </p>

          <h1 className="mt-3 font-serif text-[clamp(2.8rem,6.5vw,4.75rem)] leading-[0.98] font-normal tracking-tight">
            <span className="block overflow-hidden pb-[0.1em]">
              <span className="profile-line block">{tutor.name}</span>
            </span>
          </h1>

          <div className="profile-fade mt-5 flex flex-wrap items-center justify-center gap-2 md:justify-start">
            {tutor.isVerified && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-success/12 px-3 py-1 text-xs font-bold text-success-ink">
                <IconCheck className="text-sm" />
                Verified
              </span>
            )}
            {isTopRated(tutor) && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-star/20 px-3 py-1 text-xs font-bold text-warning-ink">
                <IconStar className="text-sm" fill="currentColor" strokeWidth={1.5} />
                Top rated
              </span>
            )}
            <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold ${tone.chip}`}>
              <span aria-hidden="true" className={`size-2 rounded-full ${tone.dot}`} />
              {tutor.faculty}
            </span>
          </div>

          <div className="profile-fade mt-5 flex items-center justify-center gap-2 md:justify-start">
            <StarRating rating={tutor.rating} size={18} />
            <span className="font-bold">{tutor.rating.toFixed(1)}</span>
            <Link to={ROUTES.tutorReviews(tutor.id)} className="text-sm text-ink-soft underline-offset-4 hover:text-primary hover:underline">
              {tutor.reviewCount} reviews
            </Link>
          </div>

          <div className="profile-fade mt-7 flex flex-col items-center gap-5 sm:flex-row md:justify-start">
            <p className="font-serif text-5xl leading-none text-primary">
              ₵{tutor.studentRate}
              <span className="ml-1 font-sans text-sm font-medium text-ink-soft">per hour</span>
            </p>
            <Button className="w-full sm:w-auto" icon={<IconCalendar className="text-lg" />} onClick={() => navigate(ROUTES.book(tutor.id))}>
              Book a session
            </Button>
          </div>
        </div>
      </section>

      <div className="mt-14 grid grid-cols-1 gap-4 md:mt-20 md:grid-cols-2">
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
              <li key={subject} className={`rounded-full px-3.5 py-1.5 text-[13px] font-semibold ${tone.chip}`}>
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

        {reviews.length > 0 && (
          <Section icon={IconStar} title="Recent reviews" className="md:col-span-2">
            <ul className="flex flex-col gap-3">
              {reviews.slice(0, 2).map((r) => (
                <li key={r.id}>
                  <ReviewCard review={r} />
                </li>
              ))}
            </ul>
            <Link
              to={ROUTES.tutorReviews(tutor.id)}
              className="mt-4 inline-block text-sm font-semibold text-primary underline-offset-4 hover:underline"
            >
              See all reviews
            </Link>
          </Section>
        )}
      </div>
    </main>
  );
}