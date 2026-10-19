import { useMemo, useState } from "react";
import { IconClose, IconSearch } from "@/components/icons";
import { TextField } from "@/components/ui";
import { TUTORS } from "@/data/tutors";

function greeting(now = new Date()) {
  const hour = now.getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  if (hour < 21) return "Good evening";
  return "Good night";
}

export default function Home() {
  const [query, setQuery] = useState("");

  const tutors = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return TUTORS;
    return TUTORS.filter((t) =>
      [t.name, t.faculty, t.program, ...t.subjects].some((field) => field.toLowerCase().includes(q)),
    );
  }, [query]);

  return (
    <main className="mx-auto w-full max-w-5xl px-5 py-8 sm:px-8">
      <header className="mb-6">
        <p className="text-sm text-ink-soft">{greeting()}</p>
        <h1 className="text-[1.75rem] leading-tight font-bold sm:text-3xl">Find your tutor</h1>
      </header>

      <TextField
        label="Search tutors"
        type="search"
        placeholder="Search by name, course or faculty"
        leadingIcon={IconSearch}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        trailing={
          query && (
            <button
              type="button"
              aria-label="Clear search"
              onClick={() => setQuery("")}
              className="flex size-9 items-center justify-center rounded-full text-ink-muted hover:bg-primary/10 hover:text-ink"
            >
              <IconClose />
            </button>
          )
        }
      />

      <div className="mt-8 mb-4 flex items-center justify-between">
        <h2 className="text-lg font-bold">Available tutors</h2>
        <span className="rounded-full bg-raised px-3 py-1 text-xs font-semibold text-primary-ink">
          {tutors.length} found
        </span>
      </div>

      {tutors.length === 0 ? (
        <div className="py-16 text-center">
          <p className="font-semibold text-ink-soft">No tutors found</p>
          <p className="mt-1 text-sm text-ink-muted">Try a different search.</p>
        </div>
      ) : (
        <ul className="flex flex-col gap-3">
          {tutors.map((t) => (
            <li key={t.id} className="rounded-card border border-line p-4">
              <p className="font-semibold">{t.name}</p>
              <p className="text-sm text-ink-soft">
                {t.role} · {t.subjects.join(", ")}
              </p>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}