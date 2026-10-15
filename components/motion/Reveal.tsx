"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import {
  DURATION,
  EASE,
  ScrollTrigger,
  gsap,
  prefersReducedMotion,
  registerGsap,
} from "@/utils/motion";

// Lifts a block into place as it enters the viewport. `items` is a selector
// for children that should arrive one after the other.
//
// Built on ScrollTrigger.batch with plain `to` tweens on purpose: a `from`
// tween tied to a trigger re-applies its start values on every refresh, and a
// trigger that kills itself mid-scroll can leave an element half-faded.
export default function Reveal({
  children,
  className,
  items,
}: {
  children: React.ReactNode;
  className?: string;
  items?: string;
}) {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      registerGsap();
      if (prefersReducedMotion() || !scope.current) return;

      const targets: Element[] = items
        ? Array.from(scope.current.querySelectorAll(items))
        : [scope.current];
      if (!targets.length) return;

      gsap.set(targets, { opacity: 0, y: 18 });

      ScrollTrigger.batch(targets, {
        start: "top 88%",
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            duration: DURATION.base,
            ease: EASE,
            stagger: 0.08,
            overwrite: true,
          }),
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
