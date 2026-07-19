"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useRef, useState } from "react";
import { CTAButton, Eyebrow, Reveal, Ticker } from "../ui";
import { IconApi, IconArrow, IconCheck, IconClock, IconCommand, IconPattern, IconRadar, IconSchedule, IconShield } from "../icons";
import { useHydratedReducedMotion } from "../useHydratedReducedMotion";

const EASE = [0.22, 1, 0.36, 1] as const;

const heroStats = [
  { value: "4,000+", compactValue: "4K+", label: "users across the HallHop ecosystem" },
  { value: "15,000/mo", compactValue: "15K/mo", label: "reads served by the separate HAC API" },
  { value: "1 view", compactValue: "1 view", label: "for active movement across a campus" },
];

function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useHydratedReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 70]);
  return (
    <section ref={ref} className="relative min-h-dvh overflow-hidden border-b border-ink pt-32 sm:pt-40">
      <div className="rule-grid absolute inset-0 opacity-60" aria-hidden="true" />
      <motion.div style={reduce ? undefined : { y }} className="shell relative">
        <div className="grid gap-10 lg:grid-cols-[1.45fr_0.55fr] lg:items-end">
          <div>
            <motion.div initial={reduce ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, ease: EASE }}><Eyebrow>School movement, made clear</Eyebrow></motion.div>
            <motion.h1 initial={reduce ? false : { opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08, duration: 0.4, ease: EASE }} className="display mt-7 max-w-[11ch] text-[clamp(4.3rem,11vw,10.8rem)]">The hallway,<br /><span className="text-accent">understood.</span></motion.h1>
          </div>
          <motion.div initial={reduce ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.38, ease: EASE }} className="pb-2">
            <p className="max-w-md text-lg leading-relaxed text-ink-2">HallHop turns every pass into useful context—so students move with clarity, teachers keep teaching, and school leaders can see the day as it happens.</p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row"><CTAButton href="/contact">Contact sales</CTAButton><CTAButton href="/how-it-works" secondary>See the flow</CTAButton></div>
          </motion.div>
        </div>
        <div className="mt-[clamp(3.5rem,7vw,7rem)] border-y border-ink" aria-label="HallHop at a glance">
          <p className="border-b border-ink py-3 font-mono text-[10px] uppercase tracking-[0.18em] text-faint">Current scale</p>
          <div className="grid grid-cols-3">
            {heroStats.map((stat, index) => (
              <div key={stat.label} className={`min-w-0 py-5 pr-2 sm:px-6 sm:py-8 lg:px-8 ${index ? "border-l border-ink" : ""}`}>
                <p className="display whitespace-nowrap text-[1.45rem] leading-none sm:text-[clamp(2.6rem,5vw,5.5rem)]"><span className="sm:hidden">{stat.compactValue}</span><span className="hidden sm:inline">{stat.value}</span></p>
                <p className="mt-2 max-w-xs text-[10px] leading-snug text-ink-2 sm:mt-3 sm:text-sm sm:leading-relaxed">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}

const moments = [
  { n: "01", time: "10:18", title: "A request arrives", body: "A student asks to go. The current class, room, and schedule context are already there.", icon: IconSchedule },
  { n: "02", time: "10:18", title: "The teacher decides", body: "Approve or decline in a few seconds, without turning a small request into a classroom interruption.", icon: IconCommand },
  { n: "03", time: "10:20", title: "The school can see", body: "Authorized staff share a live view of who is out, where they are headed, and how long they have been gone.", icon: IconRadar },
  { n: "04", time: "Later", title: "The pattern has context", body: "Recurring timing and unusually long trips can be reviewed by people—not scored by an invisible algorithm.", icon: IconPattern },
];

function DayInMotion() {
  return (
    <section className="ink-section">
      <div className="shell grid gap-16 py-[clamp(5rem,10vw,10rem)] lg:grid-cols-[0.85fr_1.15fr]">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <Reveal><Eyebrow className="text-chalk">One ordinary moment</Eyebrow><h2 className="display mt-8 max-w-[8ch] text-[clamp(3.8rem,7vw,7rem)]">A school day in motion.</h2><p className="mt-7 max-w-md text-lg leading-relaxed text-paper/65">HallHop stays out of the way until context is useful. Then it is exactly where staff need it.</p></Reveal>
        </div>
        <div>
          {moments.map((moment, i) => { const Icon = moment.icon; return <Reveal key={moment.n} className={`grid min-h-[290px] gap-8 border-t border-paper/25 py-10 sm:grid-cols-[84px_1fr] ${i === moments.length - 1 ? "border-b" : ""}`}><div><span className="font-mono text-xs text-chalk">{moment.n}</span><p className="mt-2 font-mono text-xs text-paper/70">{moment.time}</p></div><div><Icon className="h-9 w-9 text-chalk" /><h3 className="display mt-8 text-4xl sm:text-5xl">{moment.title}</h3><p className="mt-5 max-w-xl text-lg leading-relaxed text-paper/70">{moment.body}</p></div></Reveal>; })}
        </div>
      </div>
    </section>
  );
}

const audiences = [
  { key: "teachers", label: "Teachers", title: "Keep the lesson moving.", body: "Issue, approve, recall, and close passes from a deliberately quiet command center.", items: ["Current-class context", "Fast approval workflow", "Visible active timers"] },
  { key: "leaders", label: "School leaders", title: "See the building as one system.", body: "A live operating picture replaces scattered pass slips, hallway calls, and incomplete memory.", items: ["Building-wide active view", "Searchable history", "Human-reviewed patterns"] },
  { key: "students", label: "Students", title: "Know where you stand.", body: "Clear status and history make expectations visible instead of surprising students after the fact.", items: ["Current pass status", "Personal history", "Transparent limits"] },
];

function Audience() {
  const [active, setActive] = useState(0);
  const item = audiences[active];
  return (
    <section className="signal-section border-y border-ink"><div className="shell py-[clamp(5rem,9vw,9rem)]"><Reveal><Eyebrow>Designed around people</Eyebrow><div className="mt-10 grid gap-12 lg:grid-cols-[0.72fr_1.28fr]"><div role="tablist" aria-label="HallHop audiences" className="border-t border-ink">{audiences.map((a, i) => <button key={a.key} role="tab" aria-selected={i === active} onClick={() => setActive(i)} className={`flex min-h-16 w-full cursor-pointer items-center justify-between border-b border-ink px-1 text-left text-lg font-semibold transition-colors ${i === active ? "bg-ink px-4 text-paper" : "hover:px-4"}`}><span>{a.label}</span><span className="font-mono text-xs">0{i + 1}</span></button>)}</div><motion.div key={item.key} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.28, ease: EASE }} role="tabpanel"><h2 className="display max-w-[10ch] text-[clamp(3.8rem,7vw,7rem)]">{item.title}</h2><p className="mt-7 max-w-xl text-lg leading-relaxed">{item.body}</p><ul className="mt-8 grid gap-3 sm:grid-cols-3">{item.items.map((point) => <li key={point} className="border border-ink bg-paper p-4 text-sm font-semibold"><IconCheck className="mb-6 h-5 w-5" />{point}</li>)}</ul></motion.div></div></Reveal></div></section>
  );
}

function Principles() {
  const items = [
    { icon: IconClock, title: "Fast by default", body: "The workflow is designed around the teacher's attention, not the software's appetite for clicks." },
    { icon: IconShield, title: "Context with boundaries", body: "Role-aware views and minimal exposure keep useful information in the right hands." },
    { icon: IconPattern, title: "Signals, not verdicts", body: "Patterns can suggest where to look. People decide what they mean and what happens next." },
  ];
  return <section className="fresh-section"><div className="shell py-[clamp(5rem,9vw,9rem)]"><Reveal><Eyebrow>How we build</Eyebrow><h2 className="display mt-8 max-w-4xl text-[clamp(3.5rem,7vw,7rem)]">Useful enough to notice.<br />Quiet enough to trust.</h2></Reveal><div className="mt-16 grid border-y border-ink lg:grid-cols-3">{items.map((item, i) => { const Icon = item.icon; return <Reveal key={item.title} delay={i * 0.04} className={`p-7 sm:p-9 ${i ? "border-t border-ink lg:border-l lg:border-t-0" : ""}`}><Icon className="h-8 w-8 text-accent" /><h3 className="display mt-12 text-3xl">{item.title}</h3><p className="mt-5 leading-relaxed text-ink-2">{item.body}</p></Reveal>; })}</div></div></section>;
}

function ApiSpotlight() {
  return <section className="chalk-section border-y border-ink"><div className="shell grid gap-12 py-[clamp(4rem,8vw,7rem)] lg:grid-cols-[1fr_1fr] lg:items-end"><Reveal><IconApi className="h-11 w-11" /><Eyebrow className="mt-8">Also from HallHop</Eyebrow><h2 className="display mt-7 text-[clamp(3.4rem,7vw,6.8rem)]">The HAC API.</h2></Reveal><Reveal delay={0.05}><p className="max-w-xl text-xl leading-relaxed">A separate service that turns Home Access Center data into useful building blocks for school tools. It currently handles about 15,000 reads each month and supports a live use case at Round Rock High School.</p><Link href="/api" className="link-arrow mt-7">Explore the API <IconArrow className="h-5 w-5" /></Link></Reveal></div></section>;
}

function FinalCta() {
  return <section className="hallway-lines signal-section relative overflow-hidden"><div className="shell relative py-[clamp(6rem,11vw,11rem)]"><Reveal><p className="display max-w-[11ch] text-[clamp(4rem,10vw,10rem)]">Your hallway already tells a story.</p><p className="mt-8 max-w-xl text-xl leading-relaxed">HallHop helps your school read it—clearly, responsibly, and in time to act.</p><div className="mt-9"><Link href="/contact" className="btn btn-dark">Contact sales <IconArrow className="h-5 w-5" /></Link></div></Reveal></div></section>;
}

export function HomePage() {
  return <main id="main"><Hero /><Ticker items={["Digital passes", "Live movement", "Schedule context", "Role-aware views", "Pattern review", "Student transparency"]} /><DayInMotion /><Audience /><Principles /><ApiSpotlight /><FinalCta /></main>;
}
