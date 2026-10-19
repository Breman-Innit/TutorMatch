import type { ReactNode } from "react";
import { Link } from "react-router";
import { Art, type ArtKind } from "@/components/Art";
import { IconCap } from "@/components/icons";
import { BRAND } from "@/config/brand";
import { ROUTES } from "@/routes";

interface AuthLayoutProps {
  /** Heading and intro shown in the desktop side panel. */
  sideTitle: string;
  sideText: string;
  art: ArtKind;
  /** Small link shown at the top right on desktop (e.g. "New here? Create an account"). */
  topRight?: ReactNode;
  children: ReactNode;
}

function Brand() {
  return (
    <Link to={ROUTES.welcome} className="flex items-center gap-2.5 rounded-lg">
      <span className="grid size-9 place-items-center rounded-tile bg-primary text-xl text-white">
        <IconCap />
      </span>
      <span className="text-[17px] font-bold tracking-tight text-primary">{BRAND.name}</span>
    </Link>
  );
}

/**
 * Shared frame for sign-in and sign-up. Phones get a sticky header and a single column;
 * from 960px up a tinted side panel with an illustration sits beside the form.
 */
export function AuthLayout({ sideTitle, sideText, art, topRight, children }: AuthLayoutProps) {
  return (
    <div className="grid min-h-dvh grid-cols-1 min-[960px]:grid-cols-[minmax(360px,440px)_1fr]">
      <aside className="sticky top-0 hidden h-dvh flex-col overflow-y-auto border-r border-line bg-wash px-11 py-10 min-[960px]:flex">
        <Brand />
        <h2 className="mt-11 mb-2 text-[26px] leading-tight font-bold">{sideTitle}</h2>
        <p className="max-w-[34ch] text-ink-soft">{sideText}</p>
        <div className="mt-auto pt-6 [@media(max-height:860px)]:hidden">
          <Art kind={art} className="mx-auto max-w-[300px]" />
        </div>
      </aside>

      <div className="flex min-w-0 flex-col">
        <header className="sticky top-[env(safe-area-inset-top,0px)] z-5 border-b border-line bg-white/95 px-5 py-3.5 backdrop-blur min-[960px]:hidden">
          <Brand />
        </header>
        {topRight && (
          <div className="hidden px-12 pt-7 text-right text-[15px] text-ink-soft min-[960px]:block">{topRight}</div>
        )}
        <main className="flex flex-1 justify-center min-[960px]:items-center min-[960px]:px-12 min-[960px]:pb-18">
          <div className="w-full max-w-[520px] animate-fade-in px-5 py-6 min-[960px]:p-0">{children}</div>
        </main>
      </div>
    </div>
  );
}