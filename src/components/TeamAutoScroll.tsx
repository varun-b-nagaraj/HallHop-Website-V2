"use client";

import { useEffect } from "react";

export function TeamAutoScroll() {
  useEffect(() => {
    const teamSection = document.getElementById("team");
    if (!teamSection) return;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const behavior = motionQuery.matches ? "auto" : "smooth";
    const frame = requestAnimationFrame(() => {
      teamSection.scrollIntoView({ behavior, block: "start" });
    });

    return () => cancelAnimationFrame(frame);
  }, []);

  return null;
}
