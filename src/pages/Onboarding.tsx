import { useRef, useState, type TouchEvent } from "react";
import { useNavigate } from "react-router";
import { Art, type ArtKind } from "@/components/Art";
import { Button } from "@/components/ui";
import { BRAND } from "@/config/brand";
import { cn } from "@/lib/cn";
import { ROUTES } from "@/routes";

interface Slide {
  kind: ArtKind;
  title: string;
  text: string;
}

const SLIDES: Slide[] = [
  {
    kind: "find",
    title: "Find expert tutors",
    text: "Connect with verified staff and student tutors from your faculty, all in one place.",
  },
  {
    kind: "book",
    title: "Book in seconds",
    text: "Schedule sessions instantly and get real-time confirmation notifications.",
  },
  {
    kind: "teach",
    title: "Share your knowledge",
    text: "Upload your result slip to get verified and start earning as a student tutor.",
  },
];

const SWIPE_DISTANCE = 40;

export default function Onboarding() {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const startX = useRef<number | null>(null);

  const slide = SLIDES[page];
  const isLast = page === SLIDES.length - 1;

  const go = (n: number) => setPage(Math.max(0, Math.min(SLIDES.length - 1, n)));
  const finish = () => navigate(ROUTES.login);

  const onTouchStart = (e: TouchEvent) => {
    startX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: TouchEvent) => {
    if (startX.current === null) return;
    const dx = e.changedTouches[0].clientX - startX.current;
    startX.current = null;
    if (dx < -SWIPE_DISTANCE) go(page + 1);
    else if (dx > SWIPE_DISTANCE) go(page - 1);
  };

  return (
    <div className="flex min-h-dvh flex-col bg-canvas pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]">
      <header className="flex items-center justify-between px-5 pt-[18px]">
        <span className="text-[15px] font-bold tracking-tight text-primary">{BRAND.name}</span>
        <button
          type="button"
          onClick={finish}
          className="rounded-lg p-2 text-sm font-semibold text-ink-soft transition-colors hover:text-primary"
        >
          Skip
        </button>
      </header>

      <main
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        className="flex flex-1 touch-pan-y items-center justify-center overflow-hidden"
      >
        <section
          key={page}
          aria-live="polite"
          className="w-full max-w-[360px] animate-fade-in px-7 pt-3 text-center lg:max-w-[420px]"
        >
          <Art kind={slide.kind} className="mx-auto mb-2 max-w-[260px] lg:max-w-[320px]" />
          <h1 className="mt-2 mb-2.5 text-[22px] font-bold">{slide.title}</h1>
          <p className="text-[15px] leading-[1.55] text-ink-soft">{slide.text}</p>
        </section>
      </main>

      <footer className="flex flex-col items-center gap-[22px] px-6 pb-7">
        <div className="flex gap-2" role="tablist" aria-label="Onboarding slides">
          {SLIDES.map((s, i) => (
            <button
              key={s.title}
              type="button"
              role="tab"
              aria-selected={i === page}
              aria-label={`Slide ${i + 1} of ${SLIDES.length}`}
              onClick={() => go(i)}
              className={cn(
                "h-2 rounded-full transition-all duration-200",
                i === page ? "w-[22px] bg-primary" : "w-2 bg-line-strong hover:bg-ink-muted",
              )}
            />
          ))}
        </div>
        <Button fullWidth className="max-w-80" onClick={() => (isLast ? finish() : go(page + 1))}>
          {isLast ? "Get started" : "Next"}
        </Button>
      </footer>
    </div>
  );
}