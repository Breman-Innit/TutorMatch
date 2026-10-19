import { Avatar, StarRating } from "@/components/ui";
import type { TutorReview } from "@/types";

/** One student review: who wrote it, the course, the rating, and their comment. */
export function ReviewCard({ review }: { review: TutorReview }) {
  return (
    <article className="rounded-field bg-raised p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2.5">
          <Avatar name={review.studentName} size={36} />
          <div className="min-w-0">
            <p className="truncate text-sm font-bold">{review.studentName}</p>
            <p className="text-xs text-ink-soft">{review.subject}</p>
          </div>
        </div>
        <div className="flex shrink-0 flex-col items-end gap-1">
          <StarRating rating={review.rating} size={13} />
          <time className="text-xs text-ink-muted">{review.date}</time>
        </div>
      </div>
      {review.reviewText && <p className="mt-3 text-sm leading-relaxed text-ink-soft italic">“{review.reviewText}”</p>}
    </article>
  );
}