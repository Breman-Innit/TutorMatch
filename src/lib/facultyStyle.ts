import { FACULTIES } from "@/data/faculties";

export interface FacultyStyle {
  /** Small coloured dot shown beside the faculty name. */
  dot: string;
  /** Soft tinted pill with text-safe colour, for subject chips. */
  chip: string;
}

/** Each faculty gets its own colour so cards are easy to tell apart at a glance. */
const STYLES: Record<string, FacultyStyle> = {
  fba: { dot: "bg-fba", chip: "bg-fba/12 text-fba" },
  fesac: { dot: "bg-fesac", chip: "bg-fesac/12 text-fesac" },
  fhas: { dot: "bg-fhas", chip: "bg-fhas/12 text-fhas" },
  law: { dot: "bg-law", chip: "bg-law/12 text-law" },
};

const FALLBACK: FacultyStyle = { dot: "bg-primary", chip: "bg-raised text-primary-ink" };

export const facultyStyle = (facultyName: string): FacultyStyle => {
  const faculty = FACULTIES.find((f) => f.name === facultyName);
  return (faculty && STYLES[faculty.id]) || FALLBACK;
};