"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { LogoMark } from "./icons";

/**
 * PassCard — the digital hall pass, rendered as a glass credential that
 * tilts in 3D toward the cursor. A live timer counts up and the status
 * pill breathes: this is the product, not a screenshot.
 * Deterministic start (no Math.random) so SSR/CSR agree.
 */
export function PassCard() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [elapsed, setElapsed] = useState(134); // 2:14 on the clock

  useEffect(() => {
    if (reduce) return;
    const t = setInterval(() => setElapsed((s) => s + 1), 1000);
    return () => clearInterval(t);
  }, [reduce]);

  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(my, [0, 1], [9, -9]), {
    stiffness: 180,
    damping: 22,
  });
  const rotateY = useSpring(useTransform(mx, [0, 1], [-11, 11]), {
    stiffness: 180,
    damping: 22,
  });
  const glareX = useTransform(mx, [0, 1], ["20%", "80%"]);

  function onMove(e: React.PointerEvent) {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width);
    my.set((e.clientY - r.top) / r.height);
  }
  function onLeave() {
    mx.set(0.5);
    my.set(0.5);
  }

  const m = Math.floor(elapsed / 60);
  const s = (elapsed % 60).toString().padStart(2, "0");

  return (
    <div style={{ perspective: 1100 }} className="relative">
      {/* ambient glow under the card */}
      <div
        aria-hidden="true"
        className="absolute inset-6 rounded-3xl opacity-60 blur-3xl"
        style={{ background: "rgba(37,99,235,0.35)" }}
      />
      <motion.div
        ref={ref}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        style={reduce ? undefined : { rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative"
      >
        <div
          className="relative overflow-hidden rounded-2xl border border-line-strong p-6 sm:p-7"
          style={{
            background:
              "linear-gradient(155deg, rgba(23,37,70,0.92) 0%, rgba(8,13,26,0.96) 60%)",
            boxShadow: "var(--shadow-glow)",
            backdropFilter: "blur(20px)",
          }}
        >
          {/* glare that follows the cursor */}
          {!reduce && (
            <motion.div
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 w-1/3 opacity-20"
              style={{
                left: glareX,
                background:
                  "linear-gradient(100deg, transparent, rgba(190,215,255,0.9), transparent)",
                transform: "translateX(-50%) skewX(-12deg)",
              }}
            />
          )}

          {/* header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <LogoMark className="h-8 w-8" />
              <div>
                <p className="font-mono text-[10px] tracking-[0.3em] text-ink-2">
                  DIGITAL HALL PASS
                </p>
                <p className="font-mono text-[10px] text-faint">
                  NO. P-4831 · WESTFIELD HS
                </p>
              </div>
            </div>
            <span className="flex items-center gap-1.5 rounded-full border border-line bg-go-soft px-2.5 py-1 font-mono text-[10px] font-medium text-go">
              <span className={`h-1.5 w-1.5 rounded-full bg-go ${reduce ? "" : "pulse-dot"}`} />
              ACTIVE
            </span>
          </div>

          {/* live timer */}
          <div className="mt-6 flex items-end justify-between rounded-xl border border-line bg-bg/50 px-4 py-3">
            <div>
              <p className="font-mono text-[9px] uppercase tracking-widest text-faint">
                Time out
              </p>
              <p className="font-mono text-3xl font-semibold tabular-nums text-ink">
                {m}:{s}
              </p>
            </div>
            <div className="text-right">
              <p className="font-mono text-[9px] uppercase tracking-widest text-faint">
                Expected
              </p>
              <p className="font-mono text-sm text-accent-2">≤ 8:00</p>
            </div>
          </div>

          <div className="mt-5 space-y-2.5 font-mono text-[12px]">
            <Row k="STUDENT" v="Jordan M." />
            <Row k="FROM" v="Rm 204 — Biology" />
            <Row k="DESTINATION" v="Library" />
            <Row k="AUTHORIZED BY" v="Ms. Rivera" />
          </div>

          {/* signal strip footer */}
          <div className="mt-6 flex items-center gap-[3px]" aria-hidden="true">
            {BARS.map((h, i) => (
              <span
                key={i}
                className="w-[3px] rounded-full"
                style={{
                  height: h,
                  background: i % 4 === 0 ? "var(--accent-bright)" : "var(--line-strong)",
                }}
              />
            ))}
            <span className="ml-3 font-mono text-[9px] tracking-widest text-faint">
              TRACKED · LIVE · HALLHOP
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

const BARS = [8, 14, 10, 18, 12, 8, 16, 10, 14, 8, 18, 12, 10, 16, 8, 12, 14, 10, 18, 8];

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-baseline justify-between border-b border-line pb-1.5">
      <span className="text-[10px] tracking-widest text-faint">{k}</span>
      <span className="font-semibold text-ink-2">{v}</span>
    </div>
  );
}
