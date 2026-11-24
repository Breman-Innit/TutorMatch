import type { Metadata } from "next";
import Image from "next/image";
import { Check } from "lucide-react";
import { Container } from "@/components/site/container";
import { SignUpForm } from "@/components/site/sign-up-form";

export const metadata: Metadata = {
  title: "Create your account",
  description: "Create a TutorMatch student account to find peer tutoring at Pentecost University.",
};

export default function SignUpPage() {
  return (
    <section className="py-8 sm:py-12 lg:py-16">
      <Container>
        <div className="mx-auto grid max-w-5xl overflow-hidden rounded-2xl border bg-background shadow-sm lg:grid-cols-[0.85fr_1.15fr]">
          <div className="relative hidden min-h-full flex-col justify-end overflow-hidden bg-slate-950 p-8 text-white lg:flex lg:p-10">
            <Image src="/images/img4.webp" alt="Students studying together on campus" fill sizes="(min-width: 1024px) 40vw, 0px" className="object-cover opacity-65" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/35 to-slate-950/10" />
            <div className="relative z-10">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1.5 text-xs font-medium backdrop-blur-sm">
                <Check className="size-3.5 text-sky-300" aria-hidden="true" /> Built for Pentecost University
              </span>
              <h1 className="mt-5 max-w-md text-3xl font-semibold leading-tight tracking-tight">Good things happen when students learn together.</h1>
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/75">Find course-specific support from peers who have already been there.</p>
            </div>
          </div>

          <div className="px-5 py-8 sm:px-9 sm:py-10 lg:px-10">
            <div className="mx-auto max-w-xl">
              <p className="text-sm font-medium text-primary">Get started with TutorMatch</p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">Create your student account</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">Add your details to get set up with your campus community.</p>

              <SignUpForm />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
