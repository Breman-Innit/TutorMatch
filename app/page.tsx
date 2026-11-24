import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BadgeCheck, CalendarDays, CreditCard, GraduationCap } from "lucide-react";
import { Container } from "@/components/site/container";
import { HeroSlider } from "@/components/site/hero-slider";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { buttonStyles } from "@/components/ui/button";

export const metadata: Metadata = {
  title: { absolute: "TutorMatch | Peer tutoring for university students" },
  description: "Find verified student tutors for your university courses. Book a session, pay with Mobile Money and learn from someone who has passed the course.",
};

const steps = [
  { number: "01", title: "Choose a course", body: "Find a tutor approved for the course you want help with." },
  { number: "02", title: "Book a session", body: "Choose a time and meeting format, then confirm with Mobile Money." },
  { number: "03", title: "Learn together", body: "Meet with your tutor, focus on what you need, and share a review." },
];

export default function HomePage() {
  return (
    <>
      <HeroSlider />
      <section className="py-20 sm:py-24">
        <Container>
          <Reveal className="grid gap-6 md:grid-cols-[0.8fr_1.2fr] md:gap-16">
            <p className="text-sm font-medium text-primary">Peer tutoring at Pentecost University</p>
            <div>
              <h2 className="max-w-2xl text-2xl font-semibold leading-snug tracking-tight sm:text-3xl">Course-specific support from students who have already passed.</h2>
              <p className="mt-4 max-w-2xl leading-relaxed text-muted-foreground">TutorMatch helps you find a peer tutor for the subjects you’re taking. Review their course approval, rate and availability, then book a session that works for you.</p>
            </div>
          </Reveal>
          <Stagger className="mt-12 grid gap-6 border-t pt-6 sm:grid-cols-3 sm:gap-8">
            <StaggerItem><div className="flex gap-3"><BadgeCheck className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" /><div><h3 className="text-sm font-medium">Verified by course</h3><p className="mt-1 text-sm leading-relaxed text-muted-foreground">Tutors submit results for review before approval to teach a course.</p></div></div></StaggerItem>
            <StaggerItem><div className="flex gap-3"><CalendarDays className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" /><div><h3 className="text-sm font-medium">Flexible sessions</h3><p className="mt-1 text-sm leading-relaxed text-muted-foreground">Choose an available time and meet online or face to face.</p></div></div></StaggerItem>
            <StaggerItem><div className="flex gap-3"><CreditCard className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" /><div><h3 className="text-sm font-medium">Straightforward payment</h3><p className="mt-1 text-sm leading-relaxed text-muted-foreground">See the tutor rate up front and confirm with Mobile Money.</p></div></div></StaggerItem>
          </Stagger>
        </Container>
      </section>
      <section id="how-it-works" className="scroll-mt-20 border-y bg-muted/35 py-16 sm:py-20">
        <Container>
          <div className="grid gap-10 md:grid-cols-[0.8fr_1.2fr] md:gap-16">
            <Reveal><p className="text-sm font-medium text-primary">How it works</p><h2 className="mt-3 max-w-sm text-2xl font-semibold leading-snug tracking-tight sm:text-3xl">Good support, without the guesswork.</h2></Reveal>
            <Stagger className="divide-y border-y">
              {steps.map((step) => <StaggerItem key={step.number}><article className="grid gap-2 py-5 sm:grid-cols-[3.5rem_1fr] sm:gap-4 sm:py-6"><span className="text-sm tabular-nums text-muted-foreground">{step.number}</span><div><h3 className="font-medium">{step.title}</h3><p className="mt-1 text-sm leading-relaxed text-muted-foreground">{step.body}</p></div></article></StaggerItem>)}
            </Stagger>
          </div>
        </Container>
      </section>
      <section className="py-16 sm:py-20">
        <Container>
          <Reveal className="grid overflow-hidden rounded-[1.75rem] bg-slate-950 md:min-h-[430px] md:grid-cols-2">
            <div className="relative min-h-[280px] md:order-2 md:min-h-full">
              <Image src="/images/img6.webp" alt="University students working together on their studies" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/35 to-transparent md:bg-gradient-to-l md:from-transparent md:to-slate-950/15" />
            </div>
            <div className="flex flex-col justify-center px-6 py-10 text-white sm:px-10 sm:py-12 lg:px-14">
              <p className="text-sm font-medium text-sky-300">Make your next semester count</p>
              <h2 className="mt-3 max-w-lg text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">A familiar face can make a tough course feel easier.</h2>
              <p className="mt-4 max-w-lg leading-relaxed text-white/75">Get practical, one-to-one support from a fellow student who knows the course and can help you find your stride.</p>
              <Link href="/tutors" className={buttonStyles({ size: "lg", className: "mt-7 w-fit bg-white text-slate-950 hover:bg-white/90" })}>Find your tutor <ArrowRight className="size-4" /></Link>
            </div>
          </Reveal>
        </Container>
      </section>
      <section className="py-16 sm:py-20">
        <Container>
          <div className="grid gap-10 md:grid-cols-[0.8fr_1.2fr] md:gap-16">
            <Reveal><p className="text-sm font-medium text-primary">For the campus community</p><h2 className="mt-3 max-w-sm text-2xl font-semibold leading-snug tracking-tight sm:text-3xl">Learn from each other.</h2></Reveal>
            <Stagger className="divide-y border-y">
              <StaggerItem><div className="flex items-start gap-4 py-5 sm:py-6"><GraduationCap className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" /><div className="flex-1"><h3 className="font-medium">Need help with a course?</h3><p className="mt-1 text-sm leading-relaxed text-muted-foreground">Browse approved tutors and find a session that fits your schedule.</p></div><Link href="/tutors" aria-label="Find a tutor" className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"><ArrowRight className="size-4" /></Link></div></StaggerItem>
              <StaggerItem><div className="flex items-start gap-4 py-5 sm:py-6"><BadgeCheck className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" /><div className="flex-1"><h3 className="font-medium">Ready to tutor?</h3><p className="mt-1 text-sm leading-relaxed text-muted-foreground">Apply with your results, choose the courses you teach, and set your availability.</p></div><Link href="/tutors/apply" aria-label="Apply to become a tutor" className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"><ArrowRight className="size-4" /></Link></div></StaggerItem>
            </Stagger>
          </div>
          <Reveal className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t pt-6"><p className="text-sm text-muted-foreground">A more personal way to make progress, one course at a time.</p><Link href="/tutors" className={buttonStyles({ variant: "outline" })}>Explore TutorMatch <ArrowRight className="size-4" /></Link></Reveal>
        </Container>
      </section>
    </>
  );
}
