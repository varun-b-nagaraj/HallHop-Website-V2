"use client";

import { motion } from "framer-motion";
import { useHydratedReducedMotion } from "@/components/useHydratedReducedMotion";

/** Route transition — every page enters with a soft rise. */
export default function Template({ children }: { children: React.ReactNode }) {
  const reduce = useHydratedReducedMotion();
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduce ? 0 : 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
