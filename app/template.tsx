"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { DURATION, EASE, gsap, prefersReducedMotion, registerGsap } from "@/utils/motion";

// Runs on every navigation: the new page settles in instead of snapping.
export default function Template({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      registerGsap();
      if (prefersReducedMotion() || !scope.current) return;

      gsap.from(scope.current, {
        opacity: 0,
        y: 10,
        duration: DURATION.short,
        ease: EASE,
        // A leftover transform would make this wrapper the containing block
        // of every `position: fixed` element on the page.
        clearProps: "transform,opacity",
      });
    },
    { scope }
  );

  return <div ref={scope}>{children}</div>;
}
