"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, prefersReducedMotion, registerGsap } from "@/utils/motion";

const PULL = 6; // px — enough to feel, small enough to never misplace a click

// Makes a button lean slightly towards the pointer. Pointer devices only:
// on a touch screen there is nothing to follow.
export default function Magnetic({ children }: { children: React.ReactNode }) {
  const scope = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const target = scope.current?.firstElementChild;
      if (
        !scope.current ||
        !target ||
        prefersReducedMotion() ||
        !window.matchMedia("(hover: hover) and (pointer: fine)").matches
      ) {
        return;
      }

      registerGsap();
      const moveX = gsap.quickTo(target, "x", { duration: 0.4, ease: "power3.out" });
      const moveY = gsap.quickTo(target, "y", { duration: 0.4, ease: "power3.out" });

      const onMove = (e: PointerEvent) => {
        const rect = scope.current!.getBoundingClientRect();
        moveX(((e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2)) * PULL);
        moveY(((e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2)) * PULL);
      };
      const onLeave = () => {
        moveX(0);
        moveY(0);
      };

      scope.current.addEventListener("pointermove", onMove);
      scope.current.addEventListener("pointerleave", onLeave);

      return () => {
        scope.current?.removeEventListener("pointermove", onMove);
        scope.current?.removeEventListener("pointerleave", onLeave);
      };
    },
    { scope }
  );

  return (
    <span ref={scope} className="inline-flex">
      {children}
    </span>
  );
}
