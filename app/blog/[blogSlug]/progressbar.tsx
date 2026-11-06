"use client";

import { useRef, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { useGSAP } from "@gsap/react";
import { gsap, prefersReducedMotion, registerGsap } from "@/utils/motion";

// The bar is portaled to <body>: inside the page, `.pg` (a size container)
// and the page-transition wrapper both become its containing block, so a
// `position: fixed` bar would scroll away with the article.
const subscribe = () => () => {};
const onClient = () => true;
const onServer = () => false;

export default function ProgressBar({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const bar = useRef<HTMLDivElement>(null);
  const mounted = useSyncExternalStore(subscribe, onClient, onServer);

  // Tied to the scroll position rather than animated on its own.
  useGSAP(
    () => {
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
    },
    { dependencies: [mounted] }
  );

  return (
    <>
      {mounted &&
        createPortal(
          <div
            ref={bar}
            aria-hidden="true"
            className="fixed left-0 right-0 top-0 z-50 h-1 origin-left scale-x-0 transform"
            style={{ background: "linear-gradient(90deg, #FF8A3D, #E8479B 50%, #7B5CFA)" }}
          />,
          document.body
        )}
      {children}
    </>
  );
}
