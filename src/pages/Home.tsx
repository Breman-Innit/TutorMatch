import { useMemo, useRef, useState } from "react";
import { useAuth } from "@/auth/AuthProvider";
import { TutorCard } from "@/components/TutorCard";
import { TutorRow } from "@/components/TutorRow";
import { WelcomeBand } from "@/components/WelcomeBand";
import { Chip } from "@/components/ui";
import { FACULTIES } from "@/data/faculties";
import { TUTORS } from "@/data/tutors";
import { shortFaculty } from "@/lib/faculty";
import { useReveal } from "@/lib/reveal";

const TYPES = ["All", "Student Tutors", "Staff Tutors"] as const;
type TypeFilter = (typeof TYPES)[number];

/** The first page a signed-in student sees: a personal welcome, then every tutor with filters. */
export default function Home() {
  const [query, setQuery] = useState("");
  const [type, setType] = useState<TypeFilter>("All");
  const [faculty, setFaculty] = useState("All");

  const { user } = useAuth();
  const ownFaculty = FACULTIES.find((f) => f.id === user?.facultyId);
  const recommended = ownFaculty ? TUTORS.filter((t) => t.faculty === ownFaculty.name).slice(0, 6) : [];
  const topRated = [...TUTORS].sort((a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount).slice(0, 4);

  const tutors = useMemo(() => {
    const q = query.trim().toLowerCase();
    return TUTORS.filter((t) => {
      const matchesSearch =
        !q || [t.name, t.faculty, t.program, ...t.subjects].some((field) => field.toLowerCase().includes(q));
      const matchesType =
        type === "All" || (type === "Student Tutors" ? t.role === "Student Tutor" : t.role === "Staff Tutor");
      const matchesFaculty = faculty === "All" || t.faculty === faculty;
      return matchesSearch && matchesType && matchesFaculty;
    });
  }, [query, type, faculty]);

  const browsing = !query.trim() && type === "All" && faculty === "All";
  const page = useRef<HTMLElement>(null);
  useReveal(page, [tutors.map((t) => t.id).join(","), browsing]);

  return (
    <main ref={page}>
      <WelcomeBand query={query} onQueryChange={setQuery} />

      <div className="mx-auto w-full max-w-5xl px-5 py-8 sm:px-8 md:py-10">
        <div className="flex flex-col gap-3">
          <div role="group" aria-label="Tutor type" className="flex flex-wrap gap-2">
            {TYPES.map((t) => (
              <Chip key={t} selected={type === t} onClick={() => setType(t)}>
                {t}
              </Chip>
            ))}
          </div>
          <div role="group" aria-label="Faculty" className="flex flex-wrap gap-2">
            <Chip selected={faculty === "All"} onClick={() => setFaculty("All")}>
              All faculties
            </Chip>
            {FACULTIES.map((f) => (
              <Chip key={f.id} selected={faculty === f.name} onClick={() => setFaculty(f.name)}>
                {shortFaculty(f.name)}
              </Chip>
            ))}
          </div>
        </div>

        {browsing && (
          <div className="mt-10 flex flex-col gap-12">
            {ownFaculty && recommended.length > 0 && (
              <TutorRow
                title={`Recommended for ${shortFaculty(ownFaculty.name)}`}
                subtitle="Tutors from your own faculty"
                tutors={recommended}
              />
            )}
            <TutorRow title="Top rated on campus" subtitle="The highest-rated tutors, by student reviews" tutors={topRated} />
          </div>
        )}

        <div className="mt-10 mb-4 flex items-center justify-between">
          <h2 className="font-serif text-3xl leading-none font-normal tracking-tight md:text-4xl">All tutors</h2>
          <span className="rounded-full bg-raised px-3 py-1 text-xs font-semibold text-primary-ink">
            {tutors.length} found
          </span>
        </div>

        {tutors.length === 0 ? (
          <div className="py-16 text-center">
            <p className="font-semibold text-ink-soft">No tutors found</p>
            <p className="mt-1 text-sm text-ink-muted">Try a different search or filter.</p>
          </div>
        ) : (
          <ul className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {tutors.map((t) => (
              <li key={t.id} data-reveal>
                <TutorCard tutor={t} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}