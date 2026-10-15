"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { EASE, ScrollTrigger, gsap, prefersReducedMotion, registerGsap } from "@/utils/motion";

// The career line draws itself as you scroll through it, and each milestone
// pops in as the line reaches it.
export default function TimelineDraw({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      registerGsap();
      if (prefersReducedMotion() || !scope.current) return;

      const line = scope.current.querySelector("[data-line]");
      const dots = scope.current.querySelectorAll("[data-dot]");

      if (line) {
        gsap.fromTo(
          line,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: scope.current,
              start: "top 75%",
              end: "bottom 85%",
              scrub: 0.4,
            },
          }
        );
      }

      if (dots.length) {
        gsap.set(dots, { scale: 0, opacity: 0 });
        ScrollTrigger.create({
          trigger: scope.current,
          start: "top 75%",
          once: true,
          onEnter: () =>
            gsap.to(dots, {
              scale: 1,
              opacity: 1,
              duration: 0.4,
              ease: EASE,
              stagger: 0.12,
              overwrite: true,
            }),
        });
      }
    },
    { scope }
  );

  return (
    <div ref={scope} className={className}>
      {children}
    </div>
  );
}
