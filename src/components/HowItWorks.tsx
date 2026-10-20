import { useRef } from "react";
import { EASE, gsap, prefersReducedMotion, useGSAP } from "@/lib/motion";

const STEPS = [
  {
    title: "Find your tutor",
    text: "Search by course, faculty or name. Every tutor is verified, either by the university or by their results.",
  },
  {
    title: "Pick a time",
    text: "Choose a day and a slot that suits you, on campus or online. Only future dates can be booked.",
  },
  {
    title: "Pay and learn",
    text: "Pay with MoMo, card or bank transfer. Your tutor confirms, and you get a notification straight away.",
  },
];

/** Editorial "how it works" section: sticky arched photo, masked headline and numbered steps that reveal on scroll. */
export function HowItWorks() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      gsap.from(".hiw-photo", {
        clipPath: "inset(100% 0% 0% 0%)",
        duration: 1.5,
        ease: EASE.expo,
        scrollTrigger: { trigger: ".hiw-photo", start: "top 82%" },
      });
      gsap.fromTo(
        ".hiw-photo img",
        { yPercent: -6 },
        {
          yPercent: 6,
          ease: "none",
          scrollTrigger: { trigger: ".hiw-photo", start: "top bottom", end: "bottom top", scrub: true },
        },
      );
      gsap.from(".hiw-line", {
        yPercent: 115,
        duration: 1.1,
        ease: EASE.expo,
        stagger: 0.12,
        scrollTrigger: { trigger: ".hiw-title", start: "top 85%" },
      });
      gsap.utils.toArray<HTMLElement>(".hiw-step").forEach((step) => {
        const trigger = { trigger: step, start: "top 88%" };
        gsap.from(step.querySelector(".hiw-body"), { autoAlpha: 0, y: 36, duration: 1, ease: EASE.out, scrollTrigger: trigger });
        gsap.from(step.querySelector(".hiw-rule"), { scaleX: 0, transformOrigin: "left center", duration: 1.3, ease: EASE.expo, scrollTrigger: trigger });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} aria-labelledby="hiw-heading" className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 md:py-28">
      <div className="grid gap-x-16 gap-y-12 md:grid-cols-12">
        <div className="hiw-title md:col-span-7 md:col-start-6 md:row-start-1">
          <p className="mb-5 text-xs font-semibold tracking-[0.18em] text-ink-soft uppercase">How it works</p>
          <h2 id="hiw-heading" className="font-serif text-[clamp(2.6rem,6vw,5rem)] leading-[0.98] font-normal tracking-tight">
            <span className="block overflow-hidden pb-[0.1em]">
              <span className="hiw-line block">Three steps to your</span>
            </span>
            <span className="block overflow-hidden pb-[0.1em]">
              <span className="hiw-line block">
                next <em className="italic">good grade.</em>
              </span>
            </span>
          </h2>
        </div>

        <div className="md:col-span-5 md:col-start-1 md:row-span-2 md:row-start-1 md:self-start md:sticky md:top-10">
          <div className="hiw-photo relative mx-auto aspect-[4/5] w-full max-w-[24rem] overflow-hidden rounded-t-[999px] bg-raised md:max-w-none">
            <img
              src="/images/tutoring-2.jpg"
              alt="Students studying together around laptops and books"
              loading="lazy"
              decoding="async"
              className="absolute inset-x-0 top-[-8%] h-[116%] w-full object-cover"
            />
          </div>
        </div>

        <ol className="md:col-span-7 md:col-start-6 md:row-start-2">
          {STEPS.map((step, i) => (
            <li key={step.title} className="hiw-step">
              <span aria-hidden="true" className="hiw-rule block h-px w-full bg-line-strong" />
              <div className="hiw-body flex gap-6 py-8 sm:gap-10 md:py-10">
                <span aria-hidden="true" className="w-[4.5rem] shrink-0 font-serif text-[clamp(3rem,6vw,4.5rem)] leading-none text-primary/25 sm:w-24">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-xl font-bold md:text-2xl">{step.title}</h3>
                  <p className="mt-2 max-w-md leading-relaxed text-ink-soft">{step.text}</p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}