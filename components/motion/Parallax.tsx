"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, prefersReducedMotion, registerGsap } from "@/utils/motion";

// Drifts an image inside its frame as the page scrolls. The child is rendered
// taller than the frame (see `className` at the call site) so no edge shows.
export default function Parallax({
  children,
  className,
  amount = 6,
}: {
  children: React.ReactNode;
  className?: string;
  amount?: number;
}) {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      registerGsap();
      if (prefersReducedMotion() || !scope.current) return;

      gsap.fromTo(
        scope.current,
        { yPercent: -amount },
        {
          yPercent: amount,
          ease: "none",
          scrollTrigger: {
            trigger: scope.current.parentElement,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    },
    { scope }
  );

  return (
    <div ref={scope} className={className}>
      {children}
    </div>
  );
}
