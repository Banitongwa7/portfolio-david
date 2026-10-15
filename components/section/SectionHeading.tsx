"use client";

import Link from "next/link";
import { useRef } from "react";
import { HiArrowRight } from "react-icons/hi2";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger, gsap, prefersReducedMotion, registerGsap } from "@/utils/motion";

export default function SectionHeading({
  title,
  meta,
  href,
  linkLabel,
}: {
  title: string;
  meta: string;
  href: string;
  linkLabel: string;
}) {
  const scope = useRef<HTMLDivElement>(null);

  // The rule under the heading draws itself when the section arrives.
  useGSAP(
    () => {
      registerGsap();
      if (prefersReducedMotion() || !scope.current) return;

      const rule = scope.current.querySelector("[data-rule]");
      if (!rule) return;

      gsap.set(rule, { scaleX: 0 });
      ScrollTrigger.create({
        trigger: scope.current,
        start: "top 88%",
        once: true,
        onEnter: () =>
          gsap.to(rule, { scaleX: 1, duration: 0.9, ease: "power2.inOut" }),
      });
    },
    { scope }
  );

  return (
    <div
      ref={scope}
      className="relative mb-8 flex items-end justify-between gap-4 pb-4"
    >
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-3xl">
          {title}
        </h2>
        <p className="mt-1 font-mono text-xs uppercase tracking-widest text-slate-500 dark:text-slate-400">
          {meta}
        </p>
      </div>
      <Link href={href} className="text-link group shrink-0 text-sm">
        {linkLabel}
        <HiArrowRight
          className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transition-none"
          aria-hidden="true"
        />
      </Link>
      <span
        data-rule
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-px origin-left bg-slate-200 dark:bg-slate-800"
      />
    </div>
  );
}
