import { useEffect, useRef, useState, type TouchEvent } from "react";
import { Link } from "react-router";
import { IconBack, IconChevronRight, IconPause, IconPlay } from "@/components/icons";
import { FACULTIES } from "@/data/faculties";
import { TUTORS } from "@/data/tutors";
import { EASE, gsap, prefersReducedMotion, useGSAP } from "@/lib/motion";
import { ROUTES } from "@/routes";

interface Slide {
  src: string;
  label: string;
  alt: string;
}

/** Photos live in public/images. Swap the files to change what visitors see. */
const SLIDES: Slide[] = [
  { src: "/images/tutoring-1.jpg", label: "One-to-one sessions", alt: "A tutor explaining a problem to a student at a desk" },
  { src: "/images/tutoring-2.jpg", label: "Study groups", alt: "Students studying together around laptops and books" },
  { src: "/images/tutoring-3.jpg", label: "Online tutoring", alt: "A student learning on a laptop during a video call" },
  { src: "/images/tutoring-4.jpg", label: "Life on campus", alt: "University students relaxing together on campus" },
  { src: "/images/tutoring-5.jpg", label: "Clear explanations", alt: "A tutor explaining ideas at a whiteboard" },
  { src: "/images/tutoring-6.jpg", label: "Focused study", alt: "A student studying alone in a library" },
];

const SLIDE_SECONDS = 6;
const SWIPE_DISTANCE = 40;
const pad = (n: number) => String(n).padStart(2, "0");

const roundButton =
  "grid size-10 place-items-center rounded-full border border-white/35 text-lg text-white transition-colors hover:bg-white hover:text-primary";

/** Full-width photo hero: masked headline reveal, wipe transitions between photos, slow parallax on scroll. */
export function HomeHero({ onBrowse }: { onBrowse: () => void }) {
  const root = useRef<HTMLElement>(null);
  const slides = useRef<(HTMLDivElement | null)[]>([]);
  const bar = useRef<HTMLSpanElement>(null);
  const timer = useRef<gsap.core.Tween | null>(null);
  const wipe = useRef<gsap.core.Timeline | null>(null);
  const previous = useRef(0);
  const startX = useRef<number | null>(null);

  const [index, setIndex] = useState(0);
  const [userPaused, setUserPaused] = useState(false);
  const [holding, setHolding] = useState(false);
  const [reduceMotion] = useState(prefersReducedMotion);

  const go = (i: number) => setIndex((i + SLIDES.length) % SLIDES.length);

  // Entrance sequence and scroll parallax. Runs once; GSAP cleans up when the page unmounts.
  useGSAP(
    () => {
      if (reduceMotion) return;
      gsap
        .timeline({ defaults: { ease: EASE.expo } })
        .from(".hero-media", { clipPath: "inset(0% 0% 100% 0%)", duration: 1.5 }, 0)
        .from(".hero-slide-0 img", { scale: 1.25, duration: 2.2 }, 0)
        .from(".hero-line", { yPercent: 115, duration: 1.2, stagger: 0.13 }, 0.4)
        .from(".hero-fade", { autoAlpha: 0, y: 20, duration: 1, stagger: 0.1 }, 0.9);

      gsap.to(".hero-parallax", {
        yPercent: 10,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
      });
    },
    { scope: root },
  );

  // Wipe to the new photo whenever the slide changes.
  useGSAP(
    () => {
      const from = previous.current;
      previous.current = index;
      const next = slides.current[index];
      const old = slides.current[from];
      if (!next || from === index) return;

      wipe.current?.kill();
      gsap.set(
        slides.current.filter((s) => s && s !== next && s !== old),
        { autoAlpha: 0 },
      );

      if (reduceMotion || !old) {
        gsap.set(slides.current, { autoAlpha: 0 });
        gsap.set(next, { autoAlpha: 1, clearProps: "clipPath" });
        return;
      }

      gsap.set(next, { autoAlpha: 1, zIndex: 2, clipPath: "inset(0% 0% 0% 100%)" });
      gsap.set(old, { zIndex: 1 });
      wipe.current = gsap
        .timeline()
        .to(next, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.2, ease: EASE.inOut }, 0)
        .fromTo(next.querySelector("img"), { scale: 1.3 }, { scale: 1, duration: 2.4, ease: EASE.out }, 0)
        .set(old, { autoAlpha: 0, zIndex: 0 })
        .set(next, { zIndex: 1 });
    },
    { dependencies: [index], scope: root },
  );

  // Autoplay: a progress tween that advances the slide when it finishes.
  useEffect(() => {
    if (reduceMotion || !bar.current) return;
    const tween = gsap.fromTo(
      bar.current,
      { scaleX: 0 },
      { scaleX: 1, duration: SLIDE_SECONDS, ease: "none", onComplete: () => setIndex((i) => (i + 1) % SLIDES.length) },
    );
    timer.current = tween;
    return () => {
      tween.kill();
    };
  }, [index, reduceMotion]);

  useEffect(() => {
    timer.current?.paused(userPaused || holding);
  }, [userPaused, holding, index]);

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
      ref={root}
      aria-roledescription="carousel"
      aria-label="Campus tutoring highlights"
      onMouseEnter={() => setHolding(true)}
      onMouseLeave={() => setHolding(false)}
      onFocusCapture={() => setHolding(true)}
      onBlurCapture={() => setHolding(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      className="relative isolate h-svh max-h-[64rem] min-h-[36rem] overflow-hidden bg-primary-deep text-white"
    >
      <div className="hero-media absolute inset-0">
        <div className="hero-parallax absolute inset-x-0 -inset-y-[8%]">
          {SLIDES.map((slide, i) => (
            <div
              key={slide.src}
              ref={(el) => {
                slides.current[i] = el;
              }}
              className={`hero-slide-${i} absolute inset-0`}
              style={i === 0 ? undefined : { opacity: 0, visibility: "hidden" }}
              aria-hidden={i !== index}
            >
              <img src={slide.src} alt={slide.alt} decoding="async" className="size-full object-cover" />
            </div>
          ))}
        </div>
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(90deg, rgba(10,36,74,0.92) 0%, rgba(10,36,74,0.68) 45%, rgba(10,36,74,0.18) 100%), linear-gradient(0deg, rgba(10,36,74,0.7) 0%, rgba(10,36,74,0) 38%)",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto flex h-full w-full max-w-6xl flex-col px-5 pt-24 pb-7 sm:px-8 md:pt-28 md:pb-9">
        <p className="hero-fade text-xs font-semibold tracking-[0.18em] text-white/80 uppercase">
          {TUTORS.length} verified tutors · {FACULTIES.length} faculties
        </p>

        <div className="flex flex-1 flex-col justify-center">
          <h1 className="font-serif text-[clamp(3rem,8.5vw,7rem)] leading-[0.92] font-normal tracking-tight">
            <span className="block overflow-hidden pb-[0.1em]">
              <span className="hero-line block">Learn from</span>
            </span>
            <span className="block overflow-hidden pb-[0.1em]">
              <span className="hero-line block">someone who</span>
            </span>
            <span className="block overflow-hidden pb-[0.1em]">
              <span className="hero-line block">
                has <em className="italic">been there.</em>
              </span>
            </span>
          </h1>

          <p className="hero-fade mt-6 max-w-md text-base leading-relaxed text-white/85 md:text-lg">
            Verified staff and student tutors from your own faculty. Book in minutes, pay with MoMo, and walk into your
            next exam ready.
          </p>

          <div className="hero-fade mt-8 flex flex-wrap items-center gap-x-7 gap-y-4">
            <button
              type="button"
              onClick={onBrowse}
              className="h-13 rounded-full bg-white px-8 text-base font-semibold text-primary transition hover:bg-raised active:scale-[0.98]"
            >
              Find a tutor
            </button>
            <Link
              to={ROUTES.becomeTutor}
              className="inline-flex items-center gap-1.5 text-[15px] font-semibold underline-offset-4 hover:underline"
            >
              Become a tutor
              <IconChevronRight className="text-lg" />
            </Link>
          </div>
        </div>

        <div className="hero-fade flex items-end justify-between gap-4">
          <div>
            <p aria-live={userPaused || holding ? "polite" : "off"} className="text-sm font-semibold">
              <span className="tabular-nums">{pad(index + 1)}</span>
              <span className="text-white/60"> / {pad(SLIDES.length)}</span>
              <span className="ml-3 hidden text-white/85 sm:inline">{SLIDES[index].label}</span>
            </p>
            <div role="tablist" aria-label="Choose photo" className="mt-2 flex items-center">
              {SLIDES.map((s, i) => (
                <button
                  key={s.src}
                  type="button"
                  role="tab"
                  aria-selected={i === index}
                  aria-label={`Photo ${i + 1}: ${s.label}`}
                  onClick={() => go(i)}
                  className="group flex h-6 items-center pr-1.5"
                >
                  <span className={`block h-0.5 transition-all duration-300 ${i === index ? "w-10 bg-white" : "w-5 bg-white/40 group-hover:bg-white/70"}`} />
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            {!reduceMotion && (
              <button type="button" aria-label={userPaused ? "Play slideshow" : "Pause slideshow"} onClick={() => setUserPaused((p) => !p)} className={roundButton}>
                {userPaused ? <IconPlay /> : <IconPause />}
              </button>
            )}
            <button type="button" aria-label="Previous photo" onClick={() => go(index - 1)} className={roundButton}>
              <IconBack />
            </button>
            <button type="button" aria-label="Next photo" onClick={() => go(index + 1)} className={roundButton}>
              <IconChevronRight />
            </button>
          </div>
        </div>
      </div>

      {!reduceMotion && (
        <div aria-hidden="true" className="absolute inset-x-0 bottom-0 z-10 h-[3px] bg-white/20">
          <span ref={bar} className="absolute inset-0 origin-left bg-white" style={{ transform: "scaleX(0)" }} />
        </div>
      )}
    </section>
  );
}