import type { Metadata } from "next";
import { ArrowRight, BadgeCheck, CircleDashed, FileCheck2, ShieldCheck, Upload, TriangleAlert } from "lucide-react";
import { Container } from "@/components/site/container";
import { Input } from "@/components/ui/input";
import { buttonStyles } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Student verification",
  description: "Review the student identity verification process for TutorMatch.",
};

const fieldClass = "grid gap-1.5 text-sm font-medium";
const selectClass = "h-11 w-full rounded-md border bg-background px-3.5 text-sm text-foreground";

const reviewStates = [
  {
    icon: CircleDashed,
    title: "Under review",
    description: "Your submission is being checked by the university operations team.",
    color: "text-amber-600",
  },
  {
    icon: BadgeCheck,
    title: "Verified",
    description: "Your student status is confirmed and you can access student features.",
    color: "text-primary",
  },
  {
    icon: TriangleAlert,
    title: "More information needed",
    description: "You’ll see what needs attention and can submit an updated document.",
    color: "text-muted-foreground",
  },
];

export default function VerificationPage() {
  return (
    <section className="py-8 sm:py-12 lg:py-16">
      <Container>
        <div className="mx-auto max-w-5xl">
          <div className="max-w-2xl">
            <p className="text-sm font-medium text-primary">Student account</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">Verify your student status</h1>
            <p className="mt-3 leading-relaxed text-muted-foreground">Confirm that you’re part of the Pentecost University community to unlock booking and tutoring features.</p>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-[1.35fr_0.85fr]">
            <div className="rounded-2xl border bg-background p-5 sm:p-8">
              <div className="flex flex-wrap items-start justify-between gap-4 border-b pb-5">
                <div>
                  <h2 className="text-lg font-semibold">Your student details</h2>
                  <p className="mt-1 text-sm text-muted-foreground">Enter the details shown on your university ID.</p>
                </div>
                <span className="inline-flex items-center gap-2 rounded-full border bg-muted/50 px-3 py-1.5 text-xs font-medium text-muted-foreground">
                  <span className="size-1.5 rounded-full bg-muted-foreground/60" aria-hidden="true" /> Not submitted
                </span>
              </div>

              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <label htmlFor="student-id" className={fieldClass}>Student ID number<Input id="student-id" autoComplete="off" placeholder="Enter your student ID" /></label>
                <label htmlFor="university" className={fieldClass}>University
                  <select id="university" defaultValue="pentecost" className={selectClass}>
                    <option value="pentecost">Pentecost University</option>
                  </select>
                </label>
                <label htmlFor="programme" className={fieldClass}>Programme<Input id="programme" placeholder="e.g. BSc Computer Science" /></label>
                <label htmlFor="academic-level" className={fieldClass}>Academic level
                  <select id="academic-level" defaultValue="" className={selectClass}>
                    <option value="" disabled>Select your level</option>
                    <option>Level 100</option><option>Level 200</option><option>Level 300</option><option>Level 400</option>
                  </select>
                </label>
                <label htmlFor="id-card" className={`${fieldClass} sm:col-span-2`}>
                  Student ID card image
                  <span className="relative flex min-h-24 cursor-pointer items-center gap-4 rounded-lg border border-dashed px-4 py-4 text-muted-foreground transition-colors hover:border-primary hover:bg-muted/50">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary"><Upload className="size-5" aria-hidden="true" /></span>
                    <span className="min-w-0"><span className="block text-sm font-medium text-foreground">Choose a photo or scan</span><span className="mt-1 block text-xs font-normal">JPG or PNG</span></span>
                    <input id="id-card" type="file" accept="image/jpeg,image/png" className="absolute inset-0 cursor-pointer opacity-0" aria-label="Choose student ID card image" />
                  </span>
                </label>
              </div>

              <div className="mt-5 flex gap-3 rounded-lg bg-muted/50 p-4">
                <ShieldCheck className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" />
                <p className="text-xs leading-relaxed text-muted-foreground">Your ID image contains private information. It should only be accessible to authorised reviewers during verification.</p>
              </div>

              <button type="button" className={`${buttonStyles({ size: "lg" })} mt-6 w-full sm:w-auto`}>
                Submit for review <ArrowRight className="size-4" aria-hidden="true" />
              </button>
            </div>

            <aside className="rounded-2xl border bg-muted/25 p-5 sm:p-7">
              <div className="flex items-center gap-3">
                <span className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary"><FileCheck2 className="size-5" aria-hidden="true" /></span>
                <div><h2 className="font-semibold">What happens next</h2><p className="mt-0.5 text-xs text-muted-foreground">A quick look at the review process</p></div>
              </div>
              <ol className="mt-6 space-y-5">
                {reviewStates.map((state, index) => {
                  const Icon = state.icon;
                  return (
                    <li key={state.title} className="relative flex gap-3">
                      {index < reviewStates.length - 1 && <span className="absolute left-[11px] top-7 h-[calc(100%+0.5rem)] w-px bg-border" aria-hidden="true" />}
                      <span className={`relative z-10 flex size-6 shrink-0 items-center justify-center rounded-full border bg-background ${state.color}`}><Icon className="size-3.5" aria-hidden="true" /></span>
                      <div className="pb-1"><h3 className="text-sm font-medium">{state.title}</h3><p className="mt-1 text-xs leading-relaxed text-muted-foreground">{state.description}</p></div>
                    </li>
                  );
                })}
              </ol>
              <div className="mt-6 border-t pt-5">
                <p className="text-xs leading-relaxed text-muted-foreground">If a clearer image is needed, the review outcome can explain what to update before trying again.</p>
              </div>
            </aside>
          </div>
        </div>
      </Container>
    </section>
  );
}
