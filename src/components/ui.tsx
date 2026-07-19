"use client";

import { AnimatePresence, motion, useInView } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { IconArrow } from "./icons";
import { useHydratedReducedMotion } from "./useHydratedReducedMotion";

const EASE = [0.22, 1, 0.36, 1] as const;

export function Shell({ children, className = "", id }: { children: ReactNode; className?: string; id?: string }) {
  return <section id={id} className={`section ${className}`}><div className="shell">{children}</div></section>;
}

export function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const reduce = useHydratedReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.4, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

export function Eyebrow({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <p className={`eyebrow ${className}`}>{children}</p>;
}

export function CTAButton({ href, children, secondary = false, light = false }: { href: string; children: ReactNode; secondary?: boolean; light?: boolean }) {
  const kind = light ? "btn-light" : secondary ? "btn-ghost" : "btn-primary";
  return <Link href={href} className={`btn ${kind}`}>{children}<IconArrow className="h-5 w-5" /></Link>;
}

export function PageHeader({ eyebrow, title, accent, children }: { eyebrow: string; title: string; accent?: string; children?: ReactNode }) {
  return (
    <section className="relative overflow-hidden border-b border-line pt-32 sm:pt-40">
      <div className="rule-grid absolute inset-0 opacity-60" aria-hidden="true" />
      <div className="shell relative pb-16 sm:pb-24">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, ease: EASE }}>
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="display mt-8 max-w-5xl text-[clamp(3.5rem,9vw,8.6rem)]">
            {title} {accent && <span className="text-accent">{accent}</span>}
          </h1>
          {children && <div className="mt-8 max-w-2xl text-lg leading-relaxed text-ink-2 sm:text-xl">{children}</div>}
        </motion.div>
      </div>
    </section>
  );
}

export function Counter({ to, suffix = "", prefix = "" }: { to: number; suffix?: string; prefix?: string }) {
  const reduce = useHydratedReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      const reducedRaf = requestAnimationFrame(() => setValue(to));
      return () => cancelAnimationFrame(reducedRaf);
    }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / 900, 1);
      setValue(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduce, to]);

  return <span ref={ref} className="tabular-nums">{prefix}{value.toLocaleString()}{suffix}</span>;
}

export function Accordion({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState(0);
  const reduce = useHydratedReducedMotion();
  return (
    <div className="border-t border-ink">
      {items.map((item, index) => {
        const active = open === index;
        return (
          <div key={item.q} className="border-b border-ink">
            <button type="button" aria-expanded={active} onClick={() => setOpen(active ? -1 : index)} className="flex min-h-16 w-full cursor-pointer items-center justify-between gap-6 py-5 text-left text-lg font-semibold">
              {item.q}<span className="font-mono text-2xl" aria-hidden="true">{active ? "−" : "+"}</span>
            </button>
            <AnimatePresence initial={false}>
              {active && <motion.div initial={reduce ? false : { height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: reduce ? 0 : 0.28, ease: EASE }} className="overflow-hidden"><p className="max-w-3xl pb-6 leading-relaxed text-ink-2">{item.a}</p></motion.div>}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

export function Ticker({ items }: { items: string[] }) {
  const doubled = [...items, ...items];
  return <div className="overflow-hidden border-y border-ink bg-chalk py-4" aria-hidden="true"><div className="marquee-track flex w-max items-center whitespace-nowrap">{doubled.map((item, i) => <span key={`${item}-${i}`} className="flex items-center font-mono text-xs font-semibold uppercase tracking-widest"><span className="mx-8 h-2 w-2 bg-accent" />{item}</span>)}</div></div>;
}
