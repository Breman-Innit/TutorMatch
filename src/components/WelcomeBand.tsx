import { useAuth } from "@/auth/AuthProvider";
import { IconClose, IconSearch } from "@/components/icons";
import { FACULTIES } from "@/data/faculties";
import { cn } from "@/lib/cn";
import { shortFaculty } from "@/lib/faculty";

const RISE = "animate-[rise_700ms_cubic-bezier(0.2,0.8,0.2,1)_both]";

function greeting(now = new Date()) {
  const hour = now.getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  if (hour < 21) return "Good evening";
  return "Good night";
}

interface WelcomeBandProps {
  query: string;
  onQueryChange: (value: string) => void;
}

/** Personal header for the tutors page: greeting, a big search bar, and one-tap chips for the student's own courses. */
export function WelcomeBand({ query, onQueryChange }: WelcomeBandProps) {
  const { user } = useAuth();
  const firstName = user?.name.split(" ")[0];

  const faculty = FACULTIES.find((f) => f.id === user?.facultyId);
  const program = faculty?.programs.find((p) => p.id === user?.programId);
  const courses = program?.courses ?? [];

  return (
    <section aria-labelledby="welcome-heading" className="relative isolate overflow-hidden bg-primary-deep text-white">
      <span aria-hidden="true" className="pointer-events-none absolute -top-32 -right-24 -z-10 size-[28rem] rounded-full bg-primary-soft/35 blur-3xl" />
      <span aria-hidden="true" className="pointer-events-none absolute -bottom-40 left-1/4 -z-10 size-[22rem] rounded-full bg-white/8 blur-3xl" />

      <div className="mx-auto w-full max-w-5xl px-5 py-10 sm:px-8 md:py-14">
        {faculty && user && (
          <p className={cn("text-xs font-semibold tracking-[0.18em] text-white/75 uppercase", RISE)}>
            {shortFaculty(faculty.name)} · Year {user.yearOfStudy}
          </p>
        )}

        <h1
          id="welcome-heading"
          className={cn("mt-3 font-serif text-[clamp(2.8rem,7vw,5rem)] leading-[0.98] font-normal tracking-tight", RISE)}
          style={{ animationDelay: "80ms" }}
        >
          {greeting()}
          {firstName && (
            <>
              , <em className="italic">{firstName}.</em>
            </>
          )}
        </h1>
        <p className={cn("mt-3 max-w-md text-base text-white/80 md:text-lg", RISE)} style={{ animationDelay: "160ms" }}>
          Find a tutor for your next course.
        </p>

        <div className={cn("relative mt-8 max-w-2xl", RISE)} style={{ animationDelay: "240ms" }}>
          <IconSearch className="pointer-events-none absolute top-1/2 left-5 -translate-y-1/2 text-xl text-ink-muted" />
          <input
            id="tutor-search"
            type="search"
            aria-label="Search tutors"
            placeholder="Search by name, course or faculty"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            className="h-14 w-full rounded-full bg-white pr-14 pl-13 text-base text-ink outline-none placeholder:text-ink-muted focus:ring-4 focus:ring-white/30 [&::-webkit-search-cancel-button]:hidden"
          />
          {query && (
            <button
              type="button"
              aria-label="Clear search"
              onClick={() => onQueryChange("")}
              className="absolute top-1/2 right-3 grid size-9 -translate-y-1/2 place-items-center rounded-full text-lg text-ink-muted hover:bg-raised hover:text-ink"
            >
              <IconClose />
            </button>
          )}
        </div>

        {courses.length > 0 && (
          <div className={cn("mt-6", RISE)} style={{ animationDelay: "320ms" }}>
            <p className="mb-2.5 text-sm text-white/75">Your courses{program ? ` · ${program.name}` : ""}</p>
            <div role="group" aria-label="Your courses" className="flex flex-wrap gap-2">
              {courses.map((course) => {
                const active = query.trim().toLowerCase() === course.toLowerCase();
                return (
                  <button
                    key={course}
                    type="button"
                    aria-pressed={active}
                    onClick={() => onQueryChange(active ? "" : course)}
                    className={cn(
                      "rounded-full border px-4 py-2 text-sm font-semibold transition-colors",
                      active ? "border-white bg-white text-primary" : "border-white/35 text-white hover:bg-white/12",
                    )}
                  >
                    {course}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}