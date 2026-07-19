"use client";

import { useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

export function useHydratedReducedMotion() {
  const prefersReducedMotion = useReducedMotion();
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setHydrated(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  return hydrated && Boolean(prefersReducedMotion);
}
