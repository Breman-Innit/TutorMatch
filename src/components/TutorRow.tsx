import { useRef } from "react";
import { IconBack, IconChevronRight } from "@/components/icons";
import { TutorCard } from "@/components/TutorCard";
import type { Tutor } from "@/types";

interface TutorRowProps {
  title: string;
  subtitle: string;
  tutors: Tutor[];
}

const arrowButton =
  "grid size-10 place-items-center rounded-full border-[1.5px] border-line-strong text-lg transition-colors hover:border-primary hover:text-primary";

/** A titled, horizontally scrolling row of tutor cards. Swipe on touch screens, arrow buttons on desktop. */
export function TutorRow({ title, subtitle, tutors }: TutorRowProps) {
  const scroller = useRef<HTMLUListElement>(null);
  const slide = (direction: 1 | -1) => scroller.current?.scrollBy({ left: direction * 340, behavior: "smooth" });
  const headingId = `row-${title.replace(/\W+/g, "-").toLowerCase()}`;

  return (
    <section aria-labelledby={headingId}>
      <div className="mb-4 flex items-end justify-between gap-4">
        <div>
          <h2 id={headingId} className="font-serif text-3xl leading-none font-normal tracking-tight md:text-4xl">
            {title}
          </h2>
          <p className="mt-2 text-sm text-ink-soft">{subtitle}</p>
        </div>
        <div className="hidden shrink-0 gap-2 md:flex">
          <button type="button" aria-label={`Scroll ${title} left`} onClick={() => slide(-1)} className={arrowButton}>
            <IconBack />
          </button>
          <button type="button" aria-label={`Scroll ${title} right`} onClick={() => slide(1)} className={arrowButton}>
            <IconChevronRight />
          </button>
        </div>
      </div>

      <ul
        ref={scroller}
        className="-mx-5 flex snap-x snap-mandatory scroll-pl-5 gap-4 overflow-x-auto px-5 pb-2 sm:-mx-8 sm:scroll-pl-8 sm:px-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {tutors.map((tutor) => (
          <li key={tutor.id} className="w-[min(22.5rem,85vw)] shrink-0 snap-start">
            <TutorCard tutor={tutor} />
          </li>
        ))}
      </ul>
    </section>
  );
}