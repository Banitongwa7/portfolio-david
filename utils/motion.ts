import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

// Shared motion vocabulary: every animation on the site uses these, so the
// whole page feels like one hand made it.
export const EASE = "power3.out";
export const DURATION = {
  short: 0.35,
  base: 0.6,
  long: 0.75,
};

let registered = false;

export function registerGsap() {
  if (!registered) {
    gsap.registerPlugin(ScrollTrigger, SplitText);
    registered = true;
  }
}

// Honoured by every animated component: when it returns true they render the
// final state and skip the motion entirely.
export function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export { gsap, ScrollTrigger, SplitText };
