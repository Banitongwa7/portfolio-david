"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, prefersReducedMotion, registerGsap } from "@/utils/motion";

export default function ProgressBar({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const bar = useRef<HTMLDivElement>(null);

  // Tied to the scroll position rather than animated on its own.
  useGSAP(() => {
    registerGsap();
    if (!bar.current) return;

    if (prefersReducedMotion()) {
      gsap.set(bar.current, { scaleX: 0 });
      return;
    }

    gsap.fromTo(
      bar.current,
      { scaleX: 0 },
      {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: document.documentElement,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.3,
        },
      }
    );
  });

  return (
    <>
      <div
        ref={bar}
        aria-hidden="true"
        className="fixed left-0 right-0 top-0 z-50 h-1 origin-left scale-x-0 transform bg-accent-500"
      />
      {children}
    </>
  );
}
