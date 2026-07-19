import Link from "next/link";
import { type ReactNode } from "react";
import { AccordionClient, type AccordionItem } from "./Accordion";
import { IconArrow } from "./icons";

export function Shell({ children, className = "", id }: { children: ReactNode; className?: string; id?: string }) {
  return <section id={id} className={`section ${className}`}><div className="shell">{children}</div></section>;
}

export function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return <div className={`reveal-on-scroll ${className}`} style={{ animationDelay: `${delay}s` }}>{children}</div>;
}

export function Eyebrow({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <p className={`eyebrow ${className}`}>{children}</p>;
}

export function CTAButton({ href, children, secondary = false, light = false }: { href: string; children: ReactNode; secondary?: boolean; light?: boolean }) {
  const kind = light ? "btn-light" : secondary ? "btn-ghost" : "btn-primary";
  return <Link href={href} prefetch={false} className={`btn ${kind}`}>{children}<IconArrow className="h-5 w-5" /></Link>;
}

export function PageHeader({ eyebrow, title, accent, children }: { eyebrow: string; title: string; accent?: string; children?: ReactNode }) {
  return (
    <section className="relative overflow-hidden border-b border-line pt-32 sm:pt-40">
      <div className="rule-grid absolute inset-0 opacity-60" aria-hidden="true" />
      <div className="shell relative pb-16 sm:pb-24">
        <div>
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="display mt-8 max-w-5xl text-[clamp(3.5rem,9vw,8.6rem)]">
            {title} {accent && <span className="text-accent">{accent}</span>}
          </h1>
          {children && <div className="mt-8 max-w-2xl text-lg leading-relaxed text-ink-2 sm:text-xl">{children}</div>}
        </div>
      </div>
    </section>
  );
}

export function Counter({ to, suffix = "", prefix = "" }: { to: number; suffix?: string; prefix?: string }) {
  return <span className="tabular-nums">{prefix}{to.toLocaleString()}{suffix}</span>;
}

export function Accordion({ items }: { items: AccordionItem[] }) {
  return <AccordionClient items={items} />;
}

export function Ticker({ items }: { items: string[] }) {
  const doubled = [...items, ...items];
  return <div className="overflow-hidden border-y border-ink bg-chalk py-4" aria-hidden="true"><div className="marquee-track flex w-max items-center whitespace-nowrap">{doubled.map((item, i) => <span key={`${item}-${i}`} className="flex items-center font-mono text-xs font-semibold uppercase tracking-widest"><span className="mx-8 h-2 w-2 bg-accent" />{item}</span>)}</div></div>;
}
