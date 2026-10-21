import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { IconCap } from "@/components/icons";
import { HomeHero } from "@/components/HomeHero";
import { HowItWorks } from "@/components/HowItWorks";
import { TutorCta } from "@/components/TutorCta";
import { BRAND } from "@/config/brand";
import { cn } from "@/lib/cn";
import { ROUTES } from "@/routes";

const scrollToHowItWorks = () => document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" });

/** Transparent over the hero, solid white once the page scrolls. */
function LandingNav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 pt-[env(safe-area-inset-top)] transition-colors duration-300",
        scrolled ? "border-b border-line bg-white/92 text-primary backdrop-blur" : "text-white",
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <Link to={ROUTES.landing} className="flex items-center gap-2.5 rounded-lg">
          <span
            className={cn(
              "grid size-9 place-items-center rounded-tile text-xl transition-colors duration-300",
              scrolled ? "bg-primary text-white" : "bg-white text-primary",
            )}
          >
            <IconCap />
          </span>
          <span className="text-[17px] font-bold tracking-tight">{BRAND.name}</span>
        </Link>

        <nav aria-label="Primary" className="flex items-center gap-2 sm:gap-5">
          <button
            type="button"
            onClick={scrollToHowItWorks}
            className="hidden rounded-lg px-1 py-2 text-[15px] font-semibold underline-offset-4 hover:underline sm:block"
          >
            How it works
          </button>
          <Link to={ROUTES.login} className="rounded-lg px-2 py-2 text-[15px] font-semibold underline-offset-4 hover:underline">
            Sign in
          </Link>
          <Link
            to={ROUTES.signup}
            className={cn(
              "inline-flex h-10 items-center rounded-full px-5 text-[15px] font-semibold transition active:scale-[0.98]",
              scrolled ? "bg-primary text-white hover:bg-primary-soft" : "bg-white text-primary hover:bg-raised",
            )}
          >
            Get started
          </Link>
        </nav>
      </div>
    </header>
  );
}

const footerLink = "rounded break-words text-white/75 underline-offset-4 transition-colors hover:text-white hover:underline";

function LandingFooter() {
  return (
    <footer className="bg-primary-deep text-white">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 md:py-20">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-6">
            <p className="font-serif text-4xl leading-[1.05] md:text-5xl">
              Better grades, <em className="italic">together.</em>
            </p>
            <p className="mt-4 max-w-sm text-white/70">{BRAND.tagline} for students who want help, and students who want to give it.</p>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-8 text-[15px] md:col-span-6 md:grid-cols-[auto_auto_minmax(0,1fr)]">
            <div>
              <p className="mb-3 text-xs font-semibold tracking-[0.18em] text-white/50 uppercase">Explore</p>
              <ul className="flex flex-col gap-2.5">
                <li>
                  <button type="button" onClick={scrollToHowItWorks} className={footerLink}>
                    How it works
                  </button>
                </li>
                <li>
                  <Link to={ROUTES.signup} className={footerLink}>
                    Become a tutor
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <p className="mb-3 text-xs font-semibold tracking-[0.18em] text-white/50 uppercase">Account</p>
              <ul className="flex flex-col gap-2.5">
                <li>
                  <Link to={ROUTES.login} className={footerLink}>
                    Sign in
                  </Link>
                </li>
                <li>
                  <Link to={ROUTES.signup} className={footerLink}>
                    Create an account
                  </Link>
                </li>
              </ul>
            </div>
            <div className="col-span-2 md:col-span-1">
              <p className="mb-3 text-xs font-semibold tracking-[0.18em] text-white/50 uppercase">Help</p>
              <ul className="flex flex-col gap-2.5">
                <li>
                  <a href={`mailto:${BRAND.supportEmail}`} className={footerLink}>
                    {BRAND.supportEmail}
                  </a>
                </li>
              </ul>
            </div>
          </nav>
        </div>

        <p className="mt-14 border-t border-white/15 pt-6 text-sm text-white/55">
          © {new Date().getFullYear()} {BRAND.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

/** Public front page: the photo hero, how it works, and a call to action, with sign-in and sign-up one click away. */
export default function Landing() {
  const navigate = useNavigate();

  return (
    <>
      <LandingNav />
      <main>
        <HomeHero onBrowse={() => navigate(ROUTES.signup)} />
        <HowItWorks />
        <TutorCta />
      </main>
      <LandingFooter />
    </>
  );
}