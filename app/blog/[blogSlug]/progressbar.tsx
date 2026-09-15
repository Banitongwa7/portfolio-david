"use client";
import { motion, useScroll, useSpring } from "framer-motion";

export default function ProgressBar({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <>
      <motion.div
        className="fixed top-0 z-50 left-0 right-0 h-1 transform origin-left bg-accent-500"
        style={{ scaleX }}
      />
      {children}
    </>
  );
}
