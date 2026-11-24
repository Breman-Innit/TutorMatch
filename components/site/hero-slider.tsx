"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowDown, ArrowLeft, ArrowRight, Sparkles } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { buttonStyles } from "@/components/ui/button";
import { ease } from "@/lib/motion";

const slides = [
  { image: "/images/img1.jpg", eyebrow: "Your next breakthrough starts here", title: "Learn from somebody who has already been there.", detail: "TutorMatch connects Pentecost University students with verified peer tutors for one-to-one support." },
  { image: "/images/img2.jpg", eyebrow: "Learn from someone who's been there", title: "Make the hard courses feel possible.", detail: "Get one-to-one guidance from Pentecost University students who have already passed." },
  { image: "/images/img3.jpg", eyebrow: "Study smarter, together", title: "The right help changes everything.", detail: "Find a peer tutor who understands your classes, your campus, and your goals." },
  { image: "/images/img4.jpg", eyebrow: "Your learning journey, your way", title: "A little support goes a long way.", detail: "Book a session that fits your schedule and build confidence one course at a time." },
  { image: "/images/img5.jpg", eyebrow: "Make every study session count", title: "Get focused help with your coursework.", detail: "Work through challenging topics with a peer who has already passed your course." },
  { image: "/images/img6.jpg", eyebrow: "Progress is better together", title: "Find your people. Find your pace.", detail: "Connect with a student tutor and make a plan that works for your semester." },
];

export function HeroSlider() {
  const [active, setActive] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    // Warm the browser cache so a slide is ready before it becomes visible.
    slides.forEach(({ image }) => {
      const preload = new window.Image();
      preload.src = image;
    });
    const timer = window.setInterval(() => setActive((current) => (current + 1) % slides.length), 6000);
    return () => window.clearInterval(timer);
  }, []);

  const move = (direction: number) => setActive((current) => (current + direction + slides.length) % slides.length);
  const slide = slides[active];

  return (
    <section aria-label="Discover peer tutoring" className="px-3 pt-3 sm:px-5 sm:pt-5">
      <div className="relative isolate mx-auto min-h-[690px] max-w-[1600px] overflow-hidden rounded-[1.75rem] bg-slate-950 sm:min-h-[710px] sm:rounded-[2rem] lg:min-h-[720px]">
        {slides.map((item, index) => (
          <div key={item.image} aria-hidden="true" className={`absolute inset-0 -z-20 transition-opacity ${prefersReducedMotion ? "duration-150" : "duration-700 ease-in-out"} ${active === index ? "opacity-100" : "opacity-0"}`}>
            <Image src={item.image} alt="" fill priority={index === 0} loading="eager" sizes="100vw" className="object-cover" />
          </div>
        ))}
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-slate-950/90 via-slate-950/65 to-slate-950/15" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-slate-950/45 via-transparent to-slate-950/10" />

        <div className="mx-auto flex min-h-[690px] max-w-7xl flex-col justify-center px-6 py-16 sm:min-h-[710px] sm:px-10 lg:min-h-[720px] lg:px-16">
          <div className="max-w-3xl">
            <AnimatePresence mode="wait">
              <motion.div key={active} initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.55, ease }}>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3.5 py-2 text-xs font-medium text-white backdrop-blur-md sm:text-sm">
                  <Sparkles className="size-4 text-sky-300" aria-hidden="true" /> {slide.eyebrow}
                </span>
                <h1 className="mt-6 max-w-3xl text-4xl font-semibold leading-[1.08] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">{slide.title}</h1>
                <p className="mt-5 max-w-xl font-serif text-lg leading-relaxed text-white/80 sm:text-xl">{slide.detail}</p>
              </motion.div>
            </AnimatePresence>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link href="#how-it-works" className={buttonStyles({ size: "lg", className: "bg-white text-slate-950 hover:bg-white/90" })}>
                How it works <ArrowDown className="size-4" aria-hidden="true" />
              </Link>
              <Link href="/sign-in" className="text-sm font-medium text-white/90 underline decoration-white/50 underline-offset-4 transition-colors hover:text-white">
                Sign in
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute bottom-6 right-6 flex items-center gap-3 sm:bottom-10 sm:right-10 lg:right-16">
          <span className="mr-2 hidden text-sm tabular-nums text-white/80 sm:inline">0{active + 1} <span className="text-white/45">/ 0{slides.length}</span></span>
          {slides.map((item, index) => <button key={item.image} type="button" aria-label={`Show slide ${index + 1}`} aria-current={active === index} onClick={() => setActive(index)} className="group flex h-8 items-center focus-visible:outline-white">
            <span className="relative h-1 w-7 overflow-hidden rounded-full bg-white/45 transition-all group-hover:bg-white/70 sm:w-10" aria-hidden="true">
              {active === index && <motion.span key={`progress-${active}`} className="absolute inset-y-0 left-0 rounded-full bg-white" initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: 6, ease: "linear" }} />}
            </span>
          </button>)}
          <button type="button" aria-label="Previous slide" onClick={() => move(-1)} className="ml-2 flex size-10 items-center justify-center rounded-full border border-white/30 text-white transition-colors hover:bg-white/15"><ArrowLeft className="size-4" /></button>
          <button type="button" aria-label="Next slide" onClick={() => move(1)} className="flex size-10 items-center justify-center rounded-full bg-white text-slate-900 transition-transform hover:scale-105"><ArrowRight className="size-4" /></button>
        </div>
      </div>
    </section>
  );
}
