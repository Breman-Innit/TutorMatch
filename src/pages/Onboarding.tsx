import { useState } from "react";
import { useNavigate } from "react-router";
import { CalendarDays, GraduationCap, Search, TrendingUp, type LucideIcon } from "lucide-react";
import { Button, type Tone } from "@/components/ui";
import { BRAND } from "@/config/brand";
import { cn } from "@/lib/cn";
import { ROUTES } from "@/routes";

interface Slide {
  icon: LucideIcon;
  title: string;
  text: string;
  tone: Tone;
  tile: string;
}

const SLIDES: Slide[] = [
  {
    icon: Search,
    title: "Find expert tutors",
    text: "Connect with verified staff and student tutors from your faculty, all in one place.",
    tone: "primary",
    tile: "bg-grad-primary",
  },
  {
    icon: CalendarDays,
    title: "Book in seconds",
    text: "Schedule sessions instantly and get real-time confirmation notifications.",
    tone: "accent",
    tile: "bg-grad-accent",
  },
  {
    icon: TrendingUp,
    title: "Share your knowledge",
    text: "Upload your result slip to get verified and start earning as a student tutor.",
    tone: "success",
    tile: "bg-grad-success",
  },
];

export default function Onboarding() {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const slide = SLIDES[page];
  const isLast = page === SLIDES.length - 1;
  const Icon = slide.icon;

  const finish = () => navigate(ROUTES.login);
  const next = () => (isLast ? finish() : setPage(page + 1));

  return (
    <div className="relative flex min-h-dvh flex-col overflow-hidden">
      <div aria-hidden="true" className="pointer-events-none absolute -top-32 -right-32 size-[26rem] rounded-full bg-glow-primary" />
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-40 -left-32 size-[22rem] rounded-full bg-glow-accent" />

      <header className="relative flex items-center justify-between px-6 pt-[max(1.25rem,env(safe-area-inset-top))] sm:px-10">
        <div className="flex items-center gap-2.5">
          <span className="flex size-9 items-center justify-center rounded-tile bg-grad-primary text-white">
            <GraduationCap size={20} />
          </span>
          <span className="font-display text-lg font-extrabold">{BRAND.name}</span>
        </div>
        <Button variant="ghost" size="sm" onClick={finish}>
          Skip
        </Button>
      </header>

      <main className="relative flex flex-1 flex-col items-center justify-center px-8 py-10">
        <section key={page} aria-live="polite" className="flex max-w-md flex-col items-center text-center animate-fade-in">
          <div className={cn("flex size-30 items-center justify-center rounded-[36px] text-white", slide.tile)}>
            <Icon size={60} strokeWidth={1.8} />
          </div>
          <h1 className="mt-12 text-[1.75rem] leading-9 font-extrabold sm:text-4xl sm:leading-tight">{slide.title}</h1>
          <p className="mt-4 text-[15px] leading-6 text-ink-soft sm:text-base">{slide.text}</p>
        </section>
      </main>

      <footer className="relative mx-auto flex w-full max-w-md flex-col items-center gap-8 px-8 pb-[max(2rem,env(safe-area-inset-bottom))]">
        <div className="flex gap-2">
          {SLIDES.map((s, i) => (
            <button
              key={s.title}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              aria-current={i === page}
              onClick={() => setPage(i)}
              className={cn(
                "h-2 rounded-full transition-all duration-300",
                i === page ? "w-7 bg-primary" : "w-2 bg-ink-muted/50 hover:bg-ink-muted",
              )}
            />
          ))}
        </div>
        <Button tone={slide.tone} fullWidth onClick={next}>
          {isLast ? "Get started" : "Continue"}
        </Button>
      </footer>
    </div>
  );
}