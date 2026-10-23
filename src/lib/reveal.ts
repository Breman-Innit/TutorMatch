import type { RefObject } from "react";
import { EASE, gsap, prefersReducedMotion, ScrollTrigger, useGSAP } from "@/lib/motion";

/**
 * Fades and lifts every matching element into place as it scrolls into view, in a short cascade.
 * Pass `deps` to replay the animation when the content changes (for example after a filter).
 * Does nothing for visitors who prefer reduced motion.
 */
export function useReveal(scope: RefObject<HTMLElement | null>, deps: unknown[] = [], selector = "[data-reveal]") {
  useGSAP(
    () => {
      const root = scope.current;
      if (!root || prefersReducedMotion()) return;
      const items = Array.from(root.querySelectorAll<HTMLElement>(selector));
      if (items.length === 0) return;

      gsap.set(items, { autoAlpha: 0, y: 28 });
      ScrollTrigger.batch(items, {
        start: "top 94%",
        end: "max",
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, { autoAlpha: 1, y: 0, duration: 0.7, ease: EASE.out, stagger: 0.08, overwrite: true }),
      });
    },
    { scope, dependencies: deps, revertOnUpdate: true },
  );
}