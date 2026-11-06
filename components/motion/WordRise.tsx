"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, prefersReducedMotion, registerGsap } from "@/utils/motion";

// A word whose letters rise into place as it scrolls into view. Browsers with
// CSS scroll-driven animations handle it in styles/site.css; the others get
// the same effect from ScrollTrigger.
export default function WordRise({ word, className }: { word: string; className?: string }) {
  const scope = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      registerGsap();
      if (!scope.current || prefersReducedMotion()) return;
      if (typeof CSS !== "undefined" && CSS.supports("animation-timeline: view()")) return;

      gsap.fromTo(
        scope.current.children,
        { yPercent: 55, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          ease: "none",
          stagger: 0.04,
          scrollTrigger: {
            trigger: scope.current,
            start: "top bottom",
            end: "bottom 85%",
            scrub: true,
          },
        }
      );
    },
    { scope }
  );

  return (
    <p ref={scope} className={className} aria-hidden="true">
      {Array.from(word).map((char, i) => (
        <span key={i}>{char === " " ? " " : char}</span>
      ))}
    </p>
  );
}
