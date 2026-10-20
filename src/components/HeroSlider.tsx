import { useRef, useState, type TouchEvent } from "react";
import { useNavigate } from "react-router";
import { Art, type ArtKind } from "@/components/Art";
import { IconBack, IconChevronRight, IconPause, IconPlay } from "@/components/icons";
import { cn } from "@/lib/cn";
import { ROUTES } from "@/routes";

interface Slide {
  kind: ArtKind;
  eyebrow: string;
  title: string;
  text: string;
  cta: string;
  action: "browse" | "tutor";
}

const SLIDES: Slide[] = [
  {
    kind: "find",
    eyebrow: "Verified tutors",
    title: "Find the right tutor",
    text: "Staff and student tutors from your own faculty, rated by real students.",
    cta: "Browse tutors",
    action: "browse",
  },
  {
    kind: "book",
    eyebrow: "Easy booking",
    title: "Book a session in seconds",
    text: "Pick a day and time, pay with MoMo and get a confirmation straight away.",
    cta: "Find a tutor",
    action: "browse",
  },
  {
    kind: "teach",
    eyebrow: "Earn on campus",
    title: "Share what you know",
    text: "Strong grades? Apply to become a student tutor and earn while you learn.",
    cta: "Become a tutor",
    action: "tutor",
  },
];

const SLIDE_MS = 6000;
const RISE = "animate-[rise_600ms_cubic-bezier(0.2,0.8,0.2,1)_both]";
const SWIPE_DISTANCE = 40;

const prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const roundButton = "grid size-9 place-items-center rounded-full bg-white/12 text-lg text-white transition-colors hover:bg-white/22";

/** Auto-playing highlights carousel. Pauses on hover, focus and touch, and never auto-plays for reduced-motion users. */
export function HeroSlider({ onBrowse }: { onBrowse: () => void }) {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const [hovering, setHovering] = useState(false);
  const [focused, setFocused] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  const [reduceMotion] = useState(prefersReducedMotion);
  const startX = useRef<number | null>(null);

  const playing = !userPaused && !hovering && !focused && !reduceMotion;
  const go = (i: number) => setIndex((i + SLIDES.length) % SLIDES.length);
  const slide = SLIDES[index];

  const onTouchStart = (e: TouchEvent) => {
    startX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: TouchEvent) => {
    if (startX.current === null) return;
    const dx = e.changedTouches[0].clientX - startX.current;
    startX.current = null;
    if (dx < -SWIPE_DISTANCE) go(index + 1);
    else if (dx > SWIPE_DISTANCE) go(index - 1);
  };

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Highlights"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      onFocusCapture={() => setFocused(true)}
      onBlurCapture={() => setFocused(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      className="relative mb-6 overflow-hidden rounded-[24px] bg-primary text-white"
    >
      <span aria-hidden="true" className="pointer-events-none absolute -top-24 -right-16 size-80 animate-[drift_14s_ease-in-out_infinite] rounded-full bg-primary-soft/45 blur-3xl" />
      <span aria-hidden="true" className="pointer-events-none absolute -bottom-28 -left-20 size-72 animate-[drift_18s_ease-in-out_infinite_reverse] rounded-full bg-white/10 blur-3xl" />

      <div
        key={index}
        aria-live={playing ? "off" : "polite"}
        className="relative grid min-h-[27rem] items-center gap-2 px-6 pt-8 pb-2 sm:px-8 md:min-h-[21rem] md:grid-cols-[1.1fr_0.9fr] md:gap-6 md:px-10 md:pt-6"
      >
        <div className="flex flex-col items-start md:py-6">
          <span className={cn("rounded-full bg-white/12 px-3 py-1 text-xs font-semibold", RISE)}>{slide.eyebrow}</span>
          <h2 className={cn("mt-4 text-[1.9rem] leading-[1.1] font-bold md:text-[2.6rem]", RISE)} style={{ animationDelay: "80ms" }}>
            {slide.title}
          </h2>
          <p className={cn("mt-3 max-w-md text-[15px] leading-relaxed text-white/80 md:text-base", RISE)} style={{ animationDelay: "160ms" }}>
            {slide.text}
          </p>
          <button
            type="button"
            onClick={() => (slide.action === "tutor" ? navigate(ROUTES.becomeTutor) : onBrowse())}
            className={cn("mt-6 h-12 rounded-full bg-white px-7 text-[15px] font-semibold text-primary transition hover:bg-raised active:scale-[0.98]", RISE)}
            style={{ animationDelay: "240ms" }}
          >
            {slide.cta}
          </button>
        </div>

        <div className="animate-[enter-art_700ms_cubic-bezier(0.2,0.8,0.2,1)_both]">
          <div className="animate-[float_6s_ease-in-out_infinite]">
            <Art kind={slide.kind} className="mx-auto max-w-[230px] md:max-w-[340px]" />
          </div>
        </div>
      </div>

      <div className="relative flex items-center justify-between gap-3 px-6 pt-1 pb-5 sm:px-8 md:px-10">
        <div role="tablist" aria-label="Choose slide" className="flex items-center gap-1.5">
          {SLIDES.map((s, i) => {
            const active = i === index;
            return (
              <button
                key={s.title}
                type="button"
                role="tab"
                aria-selected={active}
                aria-label={`Slide ${i + 1}: ${s.title}`}
                onClick={() => go(i)}
                className="flex h-6 items-center"
              >
                <span className="relative block h-1 w-9 overflow-hidden rounded-full bg-white/25 sm:w-12">
                  <span
                    className={cn(
                      "absolute inset-0 origin-left rounded-full bg-white",
                      active && !reduceMotion ? "animate-[progress_6000ms_linear_forwards]" : i < index || active ? "scale-x-100" : "scale-x-0",
                    )}
                    style={active ? { animationPlayState: playing ? "running" : "paused", animationDuration: `${SLIDE_MS}ms` } : undefined}
                    onAnimationEnd={active ? (e) => e.animationName === "progress" && go(index + 1) : undefined}
                  />
                </span>
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          {!reduceMotion && (
            <button type="button" aria-label={userPaused ? "Play slideshow" : "Pause slideshow"} onClick={() => setUserPaused((p) => !p)} className={roundButton}>
              {userPaused ? <IconPlay /> : <IconPause />}
            </button>
          )}
          <button type="button" aria-label="Previous slide" onClick={() => go(index - 1)} className={roundButton}>
            <IconBack />
          </button>
          <button type="button" aria-label="Next slide" onClick={() => go(index + 1)} className={roundButton}>
            <IconChevronRight />
          </button>
        </div>
      </div>
    </section>
  );
}