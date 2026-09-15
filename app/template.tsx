"use client";

import { motion, useReducedMotion } from "framer-motion";

export default function Template({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
