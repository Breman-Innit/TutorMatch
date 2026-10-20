import { useState } from "react";
import { Link, useParams } from "react-router";
import { IconBack, IconBook, IconGlobe, IconPin } from "@/components/icons";
import { Calendar } from "@/components/Calendar";
import { Avatar, Button, Card, Chip, ChoiceCard, TextArea, useToast } from "@/components/ui";
import { TUTORS } from "@/data/tutors";
import { ROUTES } from "@/routes";

type Location = "campus" | "online";

const TIMES = ["9:00 AM", "10:00 AM", "11:00 AM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM", "6:00 PM"];
const formatDate = (d: Date) => d.toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short" });

export default function Booking() {
  const { id } = useParams();
  const toast = useToast();
  const tutor = TUTORS.find((t) => t.id === id);

  const [course, setCourse] = useState(tutor?.subjects[0] ?? "");
  const [location, setLocation] = useState<Location>(tutor?.isCampusTutor ? "campus" : "online");
  const [date, setDate] = useState<Date | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [notes, setNotes] = useState("");

  if (!tutor) {
    return (
      <main className="mx-auto w-full max-w-xl px-5 py-20 text-center">
        <h1 className="text-2xl font-bold">Tutor not found</h1>
        <p className="mt-2 text-ink-soft">We couldn't find this tutor to book.</p>
        <Link to={ROUTES.home} className="mt-6 inline-block font-semibold text-primary underline-offset-4 hover:underline">
          Back to all tutors
        </Link>
      </main>
    );
  }

  const placeLabel = location === "campus" ? tutor.location : "Online";
  const groupClass = "min-w-0 rounded-card border border-line bg-card p-5";
  const legendClass = "float-left mb-3 w-full text-[15px] font-bold";

  return (
    <main className="mx-auto w-full max-w-5xl px-5 py-6 sm:px-8 sm:py-8">
      <Link
        to={ROUTES.tutor(tutor.id)}
        className="mb-5 inline-flex items-center gap-1 rounded-lg py-1 pr-2 text-sm font-semibold text-ink-soft hover:text-primary"
      >
        <IconBack className="text-lg" />
        Back to profile
      </Link>

      <header className="mb-6">
        <h1 className="text-2xl leading-tight font-bold sm:text-3xl">Book a session</h1>
        <p className="mt-1 text-ink-soft">with {tutor.name}</p>
      </header>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_340px] lg:items-start">
        <div className="flex flex-col gap-4">
          <fieldset className={groupClass}>
            <legend className={legendClass}>Select course</legend>
            <div className="clear-both flex flex-col gap-2.5">
              {tutor.subjects.map((subject) => (
                <ChoiceCard
                  key={subject}
                  name="course"
                  icon={IconBook}
                  title={subject}
                  checked={course === subject}
                  onChange={() => setCourse(subject)}
                />
              ))}
            </div>
          </fieldset>

          <fieldset className={groupClass}>
            <legend className={legendClass}>Session type</legend>
            <div className="clear-both flex flex-col gap-2.5">
              {tutor.isCampusTutor && (
                <ChoiceCard
                  name="location"
                  icon={IconPin}
                  title="On campus"
                  description={tutor.location}
                  checked={location === "campus"}
                  onChange={() => setLocation("campus")}
                />
              )}
              <ChoiceCard
                name="location"
                icon={IconGlobe}
                title="Online"
                description="Google Meet or Zoom"
                checked={location === "online"}
                onChange={() => setLocation("online")}
              />
            </div>
          </fieldset>

          <fieldset className={groupClass}>
            <legend className={legendClass}>Select date</legend>
            <div className="clear-both">
              <Calendar selected={date} onSelect={setDate} />
            </div>
          </fieldset>

          {date && (
            <fieldset className={groupClass}>
              <legend className={legendClass}>Select time</legend>
              <div className="clear-both flex flex-wrap gap-2">
                {TIMES.map((t) => (
                  <Chip key={t} selected={time === t} onClick={() => setTime(t)}>
                    {t}
                  </Chip>
                ))}
              </div>
            </fieldset>
          )}

          <Card className="p-5">
            <TextArea
              label="Notes (optional)"
              placeholder="What topics would you like to focus on?"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </Card>
        </div>

        <aside className="rounded-card border border-line bg-wash p-5 lg:sticky lg:top-6">
          <h2 className="mb-4 text-[15px] font-bold">Booking summary</h2>
          <div className="mb-4 flex items-center gap-3 border-b border-line pb-4">
            <Avatar name={tutor.name} size={44} tone={tutor.role === "Staff Tutor" ? "accent" : "primary"} verified={tutor.isVerified} />
            <div className="min-w-0">
              <p className="truncate text-sm font-bold">{tutor.name}</p>
              <p className="text-xs text-ink-soft">{tutor.role}</p>
            </div>
          </div>

          <dl className="flex flex-col gap-2.5 text-sm">
            <div className="flex justify-between gap-4">
              <dt className="text-ink-soft">Course</dt>
              <dd className="text-right font-semibold">{course}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-ink-soft">Location</dt>
              <dd className="text-right font-semibold">{placeLabel}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-ink-soft">Date and time</dt>
              <dd className={date && time ? "text-right font-semibold" : "text-right text-ink-muted"}>
                {date && time ? `${formatDate(date)}, ${time}` : "Not chosen yet"}
              </dd>
            </div>
          </dl>

          <div className="my-4 flex items-baseline justify-between border-t border-line pt-4">
            <span className="font-bold">Total</span>
            <span className="text-2xl font-bold text-primary">₵{tutor.studentRate}</span>
          </div>

          <Button fullWidth disabled={!date || !time} onClick={() => toast.info("Payment comes in the next step.")}>
            Continue to payment
          </Button>
        {(!date || !time) && <p className="mt-3 text-center text-xs text-ink-muted">Choose a date and time to continue.</p>}
        </aside>
      </div>
    </main>
  );
}