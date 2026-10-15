"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import {
  DURATION,
  EASE,
  SplitText,
  gsap,
  prefersReducedMotion,
  registerGsap,
} from "@/utils/motion";

// The headline rises line by line from behind a mask. The text itself is in
// the server-rendered HTML, so it is readable before (and without) JavaScript.
export default function HeadlineReveal({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const headline = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      registerGsap();
      if (prefersReducedMotion() || !headline.current) return;

      let split: SplitText | undefined;

      // Splitting before the webfont is ready would cut the lines in the
      // wrong places.
      document.fonts.ready.then(() => {
        if (!headline.current) return;

        split = SplitText.create(headline.current, {
          type: "lines",
          mask: "lines",
        });

        gsap.from(split.lines, {
          yPercent: 110,
          duration: DURATION.long,
          ease: EASE,
          stagger: 0.08,
        });
      });

      return () => split?.revert();
    },
    { scope: headline }
  );

  return (
    <h1 ref={headline} className={className}>
      {text}
    </h1>
  );
}
