import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export { gsap, ScrollTrigger, useGSAP };

/** True when the visitor has asked their device to minimise motion. */
export const prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Shared easing curves so every animation in the app feels related. */
export const EASE = {
  out: "power3.out",
  inOut: "power3.inOut",
  expo: "expo.out",
} as const;