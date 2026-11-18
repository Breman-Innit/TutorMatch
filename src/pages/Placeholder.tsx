import { Link } from "react-router";
import { ROUTES } from "@/routes";

export default function Placeholder({ title }: { title: string }) {
  return <main className="mx-auto max-w-5xl px-5 py-12">
    <Link to={ROUTES.home} className="text-sm text-primary hover:underline">← Back to tutors</Link>
    <h1 className="mt-6 font-serif text-4xl">{title}</h1>
    <p className="mt-3 text-ink-soft">This section is coming soon.</p>
  </main>;
}
