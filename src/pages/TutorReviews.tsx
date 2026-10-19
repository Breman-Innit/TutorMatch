import { Link, useParams } from "react-router";
import { IconBack, IconStar } from "@/components/icons";
import { ReviewCard } from "@/components/ReviewCard";
import { StarRating } from "@/components/ui";
import { REVIEWS } from "@/data/reviews";
import { TUTORS } from "@/data/tutors";
import { ROUTES } from "@/routes";

export default function TutorReviews() {
  const { id } = useParams();
  const tutor = TUTORS.find((t) => t.id === id);

  if (!tutor) {
    return (
      <main className="mx-auto w-full max-w-xl px-5 py-20 text-center">
        <h1 className="text-2xl font-bold">Tutor not found</h1>
        <p className="mt-2 text-ink-soft">We couldn't find reviews for this tutor.</p>
        <Link to={ROUTES.home} className="mt-6 inline-block font-semibold text-primary underline-offset-4 hover:underline">
          Back to all tutors
        </Link>
      </main>
    );
  }

  const reviews = REVIEWS.filter((r) => r.tutorId === tutor.id);

  return (
    <main className="mx-auto w-full max-w-3xl px-5 py-6 sm:px-8 sm:py-8">
      <Link
        to={ROUTES.tutor(tutor.id)}
        className="mb-5 inline-flex items-center gap-1 rounded-lg py-1 pr-2 text-sm font-semibold text-ink-soft hover:text-primary"
      >
        <IconBack className="text-lg" />
        Back to profile
      </Link>

      <header className="mb-6">
        <h1 className="text-2xl leading-tight font-bold sm:text-3xl">Reviews for {tutor.name}</h1>
        <div className="mt-2 flex items-center gap-2">
          <StarRating rating={tutor.rating} size={16} />
          <span className="text-sm font-bold">{tutor.rating.toFixed(1)}</span>
          <span className="text-sm text-ink-soft">
            · {reviews.length} review{reviews.length === 1 ? "" : "s"}
          </span>
        </div>
      </header>

      {reviews.length === 0 ? (
        <div className="flex flex-col items-center py-16 text-center">
          <span className="grid size-14 place-items-center rounded-tile bg-raised text-3xl text-primary">
            <IconStar />
          </span>
          <p className="mt-4 font-semibold text-ink-soft">No reviews yet</p>
          <p className="mt-1 text-sm text-ink-muted">Be the first to review this tutor.</p>
        </div>
      ) : (
        <ul className="flex flex-col gap-3">
          {reviews.map((r) => (
            <li key={r.id}>
              <ReviewCard review={r} />
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}