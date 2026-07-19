"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

/**
 * HallwayBoard — the signature element.
 * An ambient, always-running "mission control" view of a school hallway:
 * live passes with counting durations, destinations, and one pass that
 * crosses an alert threshold. It IS the product, quietly running — not a
 * static screenshot. Deterministic (no Math.random) so SSR/CSR agree.
 */

type Pass = {
  id: string;
  student: string;
  room: string;
  dest: string;
  start: number; // seconds elapsed at t=0
};

const DESTS: Record<string, string> = {
  restroom: "Restroom",
  nurse: "Nurse",
  office: "Front Office",
  library: "Library",
  counselor: "Counselor",
  locker: "Locker",
};

const SEED: Pass[] = [
  { id: "P-4821", student: "M. Alvarez", room: "204", dest: "restroom", start: 62 },
  { id: "P-4822", student: "J. Chen", room: "118", dest: "library", start: 148 },
  { id: "P-4823", student: "T. Okafor", room: "233", dest: "nurse", start: 512 }, // alert soon
  { id: "P-4824", student: "R. Patel", room: "141", dest: "office", start: 33 },
  { id: "P-4825", student: "S. Kim", room: "209", dest: "counselor", start: 205 },
];

const ALERT_THRESHOLD = 540; // 9 min

function fmt(sec: number) {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

function statusFor(sec: number) {
  if (sec >= ALERT_THRESHOLD) return "alert" as const;
  if (sec >= 300) return "watch" as const;
  return "ok" as const;
}

export function HallwayBoard() {
  const reduce = useReducedMotion();
  const [tick, setTick] = useState(0);
  const [visible, setVisible] = useState(SEED);
  const rotationRef = useRef(0);

  // advance a shared clock once per second
  useEffect(() => {
    if (reduce) return;
    const t = setInterval(() => setTick((n) => n + 1), 1000);
    return () => clearInterval(t);
  }, [reduce]);

  // occasionally cycle a pass out and a fresh one in — keeps the board alive
  useEffect(() => {
    if (reduce) return;
    if (tick > 0 && tick % 6 === 0) {
      rotationRef.current += 1;
      const r = rotationRef.current;
      setVisible((prev) => {
        const incoming: Pass = {
          id: `P-${4826 + r}`,
          student: ["D. Wright", "L. Nguyen", "A. Silva", "C. Brooks"][r % 4],
          room: ["112", "227", "150", "218"][r % 4],
          dest: ["locker", "restroom", "office", "library"][r % 4],
          start: 5,
        };
        return [incoming, ...prev.slice(0, 4)];
      });
    }
  }, [tick, reduce]);

  const rows = useMemo(
    () =>
      visible.map((p) => ({ ...p, elapsed: p.start + (reduce ? 0 : tick) })),
    [visible, tick, reduce],
  );

  const activeCount = rows.length;
  const alerts = rows.filter((r) => statusFor(r.elapsed) === "alert").length;
  const avg = Math.round(
    rows.reduce((a, r) => a + r.elapsed, 0) / Math.max(rows.length, 1),
  );

  return (
    <div
      className="relative overflow-hidden rounded-2xl border border-line-strong shadow-[var(--shadow-glow)]"
      style={{
        background:
          "linear-gradient(160deg, rgba(18,29,55,0.85) 0%, rgba(8,13,26,0.95) 65%)",
        backdropFilter: "blur(16px)",
      }}
    >
      {/* window chrome */}
      <div className="flex items-center justify-between border-b border-line px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-danger/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-alert/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-go/70" />
          <span className="ml-3 font-mono text-xs text-muted">
            hallhop / live hallway — West Building
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className={`h-2 w-2 rounded-full bg-go ${reduce ? "" : "pulse-dot"}`} />
          <span className="font-mono text-xs text-go">LIVE</span>
        </div>
      </div>

      {/* stat strip */}
      <div className="grid grid-cols-3 divide-x divide-line border-b border-line">
        <Stat label="Active passes" value={activeCount.toString()} />
        <Stat label="Avg. duration" value={fmt(avg)} mono />
        <Stat
          label="Alerts"
          value={alerts.toString()}
          tone={alerts > 0 ? "alert" : "ok"}
        />
      </div>

      {/* live rows */}
      <div className="scroll-thin max-h-[320px] overflow-hidden p-2 sm:max-h-[360px]">
        <div className="grid grid-cols-[1fr_auto] gap-2 px-2 pb-1 font-mono text-[10px] uppercase tracking-wider text-faint sm:grid-cols-[1.4fr_1fr_auto]">
          <span>Student · Room</span>
          <span className="hidden sm:block">Destination</span>
          <span className="text-right">Elapsed</span>
        </div>

        <AnimatePresence initial={false} mode="popLayout">
          {rows.map((r) => {
            const status = statusFor(r.elapsed);
            return (
              <motion.div
                key={r.id}
                layout={!reduce}
                initial={reduce ? false : { opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="grid grid-cols-[1fr_auto] items-center gap-2 rounded-xl px-2 py-2.5 transition-colors sm:grid-cols-[1.4fr_1fr_auto]"
                style={{
                  background:
                    status === "alert" ? "var(--alert-soft)" : "transparent",
                }}
              >
                <div className="flex items-center gap-2.5 overflow-hidden">
                  <span
                    className="grid h-8 w-8 shrink-0 place-items-center rounded-lg font-mono text-[11px] font-semibold"
                    style={{
                      background: "var(--accent-soft)",
                      color: "var(--accent-2)",
                    }}
                  >
                    {r.student
                      .split(" ")
                      .map((x) => x[0])
                      .join("")}
                  </span>
                  <div className="min-w-0">
                    <div className="truncate text-sm text-ink">{r.student}</div>
                    <div className="font-mono text-[11px] text-muted">
                      Rm {r.room} · {r.id}
                    </div>
                  </div>
                </div>

                <div className="hidden items-center gap-1.5 text-sm text-ink-2 sm:flex">
                  <span
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ background: "var(--accent)" }}
                  />
                  {DESTS[r.dest]}
                </div>

                <div className="flex items-center justify-end gap-2">
                  <StatusPill status={status} />
                  <span
                    className="w-[52px] text-right font-mono text-sm tabular-nums"
                    style={{
                      color:
                        status === "alert"
                          ? "var(--alert)"
                          : status === "watch"
                            ? "var(--ink)"
                            : "var(--ink-2)",
                    }}
                  >
                    {fmt(r.elapsed)}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}

function Stat({
  label,
  value,
  mono,
  tone = "default",
}: {
  label: string;
  value: string;
  mono?: boolean;
  tone?: "default" | "alert" | "ok";
}) {
  return (
    <div className="px-4 py-3">
      <div className="font-mono text-[10px] uppercase tracking-wider text-faint">
        {label}
      </div>
      <div
        className={`mt-0.5 text-xl font-semibold tabular-nums ${mono ? "font-mono" : ""}`}
        style={{
          color:
            tone === "alert"
              ? "var(--alert)"
              : tone === "ok"
                ? "var(--go)"
                : "var(--ink)",
        }}
      >
        {value}
      </div>
    </div>
  );
}

function StatusPill({ status }: { status: "ok" | "watch" | "alert" }) {
  const map = {
    ok: { c: "var(--go)", bg: "var(--go-soft)", t: "On time" },
    watch: { c: "var(--ink-2)", bg: "var(--line)", t: "Extended" },
    alert: { c: "var(--alert)", bg: "var(--alert-soft)", t: "Alert" },
  }[status];
  return (
    <span
      className="hidden rounded-md px-2 py-0.5 font-mono text-[10px] font-medium sm:inline-block"
      style={{ background: map.bg, color: map.c }}
    >
      {map.t}
    </span>
  );
}
