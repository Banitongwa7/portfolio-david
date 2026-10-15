"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { gsap, ScrollTrigger, prefersReducedMotion, registerGsap } from "@/utils/motion";

// Gives the page its inertia and keeps ScrollTrigger in sync with it.
let lenisInstance: Lenis | null = null;

export default function SmoothScroll() {
  const pathname = usePathname();
  const firstRender = useRef(true);

  useEffect(() => {
    registerGsap();
    if (prefersReducedMotion()) return;

    const lenis = new Lenis({
      duration: 1,
      // `anchors` lets Lenis handle in-page links such as "Back to top".
      anchors: true,
      autoRaf: false,
    });
    lenisInstance = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
      lenisInstance = null;
    };
  }, []);

  // A new page starts at the top, and its triggers are measured once it is in.
  // Skipped on the very first render: refreshing there lands in the middle of
  // the entrance animations and freezes them half-way.
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }

    lenisInstance?.scrollTo(0, { immediate: true });
    const id = window.setTimeout(() => ScrollTrigger.refresh(), 400);
    return () => window.clearTimeout(id);
  }, [pathname]);

  return null;
}
