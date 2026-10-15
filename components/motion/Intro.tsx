"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { DURATION, EASE, gsap, prefersReducedMotion, registerGsap } from "@/utils/motion";

// On-load entrance for a block: its `[data-intro]` children arrive in order.
export default function Intro({
  children,
  className,
  delay = 0.15,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      registerGsap();
      if (prefersReducedMotion() || !scope.current) return;

      const items = scope.current.querySelectorAll("[data-intro]");
      if (!items.length) return;

      gsap.from(items, {
        y: 14,
        opacity: 0,
        duration: DURATION.base,
        ease: EASE,
        stagger: 0.07,
        delay,
      });
    },
    { scope }
  );

  return (
    <div ref={scope} className={className}>
      {children}
    </div>
  );
}
