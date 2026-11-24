import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpenCheck } from "lucide-react";
import { Container } from "@/components/site/container";
import { Input } from "@/components/ui/input";
import { buttonStyles } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Sign in",
  description: "Sign in to your TutorMatch account.",
};

export default function SignInPage() {
  return (
    <section className="py-8 sm:py-12 lg:py-16">
      <Container>
        <div className="mx-auto grid max-w-5xl overflow-hidden rounded-2xl border bg-background shadow-sm lg:min-h-[560px] lg:grid-cols-[0.9fr_1.1fr]">
          <div className="relative hidden min-h-full flex-col justify-end overflow-hidden bg-slate-950 p-8 text-white lg:flex lg:p-10">
            <Image src="/images/img3.webp" alt="Students working together on campus" fill sizes="(min-width: 1024px) 40vw, 0px" className="object-cover opacity-65" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/35 to-slate-950/10" />
            <div className="relative z-10">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1.5 text-xs font-medium backdrop-blur-sm">
                <BookOpenCheck className="size-3.5 text-sky-300" aria-hidden="true" /> Learn together
              </span>
              <h1 className="mt-5 max-w-md text-3xl font-semibold leading-tight tracking-tight">Pick up where your learning left off.</h1>
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/75">Your next helpful session is just around the corner.</p>
            </div>
          </div>

          <div className="flex items-center px-5 py-10 sm:px-9 sm:py-12 lg:px-12">
            <div className="mx-auto w-full max-w-md">
              <p className="text-sm font-medium text-primary">Welcome back</p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">Sign in to TutorMatch</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">Use the email address connected to your account.</p>

              <div className="mt-8 grid gap-5">
                <label htmlFor="email" className="grid gap-1.5 text-sm font-medium">Email address<Input id="email" type="email" autoComplete="email" placeholder="you@example.com" /></label>
                <label htmlFor="password" className="grid gap-1.5 text-sm font-medium">Password<Input id="password" type="password" autoComplete="current-password" placeholder="Enter your password" /></label>
              </div>
              <button type="button" className={`${buttonStyles({ size: "lg" })} mt-7 w-full`}>
                Sign in <ArrowRight className="size-4" aria-hidden="true" />
              </button>
              <p className="mt-6 text-center text-sm text-muted-foreground">New to TutorMatch? <Link href="/sign-up" className="font-medium text-foreground underline decoration-border underline-offset-4 hover:decoration-foreground">Create an account</Link></p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
