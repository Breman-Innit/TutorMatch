import { useRef } from "react";
import { Link } from "react-router";
import { EASE, gsap, prefersReducedMotion, useGSAP } from "@/lib/motion";
import { ROUTES } from "@/routes";

/** Closing call to action: a full-bleed photo band inviting strong students to become tutors. */
export function TutorCta() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      gsap.fromTo(
        ".cta-img",
        { yPercent: -7, scale: 1.12 },
        {
          yPercent: 7,
          scale: 1,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true },
        },
      );
      gsap.from(".cta-line", {
        yPercent: 115,
        duration: 1.2,
        ease: EASE.expo,
        stagger: 0.12,
        scrollTrigger: { trigger: root.current, start: "top 70%" },
      });
      gsap.from(".cta-fade", {
        autoAlpha: 0,
        y: 24,
        duration: 1,
        ease: EASE.out,
        stagger: 0.1,
        scrollTrigger: { trigger: root.current, start: "top 62%" },
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} aria-labelledby="cta-heading" className="relative isolate overflow-hidden bg-primary-deep text-white">
      <div aria-hidden="true" className="absolute inset-0">
        <img
          src="/images/tutoring-5.jpg"
          alt=""
          loading="lazy"
          sizes="100vw"
          decoding="async"
          className="cta-img absolute inset-x-0 -top-[10%] h-[120%] w-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(90deg, rgba(10,36,74,0.94) 0%, rgba(10,36,74,0.75) 50%, rgba(10,36,74,0.3) 100%)",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[30rem] max-w-6xl flex-col justify-center px-5 py-20 sm:px-8 md:min-h-[34rem]">
        <p className="cta-fade mb-6 text-xs font-semibold tracking-[0.18em] text-white/80 uppercase">For students with strong grades</p>
        <h2 id="cta-heading" className="font-serif text-[clamp(3rem,8vw,6.5rem)] leading-[0.95] font-normal tracking-tight">
          <span className="block overflow-hidden pb-[0.1em]">
            <span className="cta-line block">Know it well?</span>
          </span>
          <span className="block overflow-hidden pb-[0.1em]">
            <span className="cta-line block">
              <em className="italic">Teach it.</em>
            </span>
          </span>
        </h2>
        <p className="cta-fade mt-6 max-w-md text-base leading-relaxed text-white/85 md:text-lg">
          Apply as a student tutor with your result slip, get verified, and earn from sessions that fit around your own
          timetable.
        </p>
        <div className="cta-fade mt-8">
          <Link
            to={ROUTES.becomeTutor}
            className="inline-flex h-13 items-center rounded-full bg-white px-8 text-base font-semibold text-primary transition hover:bg-raised active:scale-[0.98]"
          >
            Apply to tutor
          </Link>
        </div>
      </div>
    </section>
  );
}
