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
      });
    },
    { scope }
  );

  return <div ref={scope}>{children}</div>;
}
