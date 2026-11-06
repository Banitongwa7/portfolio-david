"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, prefersReducedMotion, registerGsap } from "@/utils/motion";

// A headline that colors in as it is read. CSS scroll-driven animations do it
// where supported (see .fill-text in styles/site.css); ScrollTrigger covers
// the other browsers. Without motion it simply stays fully colored.
export default function ScrollFill({
  children,
  className = "",
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  const scope = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      registerGsap();
      if (!scope.current || prefersReducedMotion()) return;
      if (typeof CSS !== "undefined" && CSS.supports("animation-timeline: view()")) return;

      gsap.fromTo(
        scope.current,
        { backgroundPosition: "0% 100%" },
        {
          backgroundPosition: "0% 0%",
          ease: "none",
          scrollTrigger: {
            trigger: scope.current,
            start: "top 85%",
            end: "top 35%",
            scrub: true,
          },
        }
      );
    },
    { scope }
  );

  return (
    <h2 ref={scope} id={id} className={`fill-text ${className}`}>
      {children}
    </h2>
  );
}
