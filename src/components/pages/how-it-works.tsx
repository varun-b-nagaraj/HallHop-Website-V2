/* eslint-disable @typescript-eslint/no-unused-vars */
import { IconClock, IconCommand, IconPass, IconPattern, IconRadar, IconSchedule } from "../icons";
import { Accordion, CTAButton, Eyebrow, PageHeader, Reveal } from "../ui";

const steps = [
  { n: "01", title: "Request", label: "A student needs to move", body: "The student starts a pass from the browser-based HallHop experience. Their current school-day context can be pulled from the schedule instead of entered again.", icon: IconPass, meta: ["Current class", "Destination", "Request time"] },
  { n: "02", title: "Decide", label: "The teacher stays in control", body: "The teacher approves or declines from a compact command view. The pass becomes active only after that decision.", icon: IconCommand, meta: ["Approve or decline", "Expected duration", "Active status"] },
  { n: "03", title: "Move", label: "The trip stays visible", body: "Authorized staff can see the active pass, destination, and elapsed time. Returning closes the trip and creates a clear record.", icon: IconRadar, meta: ["Live timer", "Authorized view", "Return record"] },
  { n: "04", title: "Learn", label: "History becomes context", body: "Over time, repeated destinations, timing, and longer trips can be surfaced for a human to understand and discuss.", icon: IconPattern, meta: ["Searchable history", "Pattern signal", "Human review"] },
];

const faq = [
  { q: "Does HallHop require a student phone?", a: "No. The experience is browser-based and can fit the Chromebook or computer workflows a school already uses. The exact deployment is planned with each campus." },
  { q: "How does schedule context work?", a: "HallHop’s supporting HAC service can retrieve Home Access Center schedule information such as classes, rooms, and day types. Integration scope depends on the school’s environment and authorization." },
  { q: "Does pattern detection make discipline decisions?", a: "No. A pattern is a prompt to look closer, never a verdict. School staff retain the context, judgment, and responsibility for any follow-up." },
  { q: "How quickly can a school get started?", a: "That depends on roster access, roles, schedules, and the desired pilot scope. A sales conversation maps those requirements before anyone promises a date." },
];

export function HowItWorksPage() {
  return <main id="main">
    <PageHeader eyebrow="How HallHop works" title="Four moments." accent="Almost no friction."><p>The workflow follows a trip from request to return, preserving the context people need without asking teachers to run another complicated system.</p></PageHeader>

    <section className="fresh-section"><div className="shell py-[clamp(5rem,10vw,10rem)]">{steps.map((step, i) => { const Icon = step.icon; return <Reveal key={step.n} className="grid gap-8 border-t border-ink py-12 lg:grid-cols-[0.2fr_0.65fr_1.15fr] lg:py-16"><div className="font-mono text-xs font-semibold text-accent-2">{step.n} / 04</div><div><Icon className="h-10 w-10" /><h2 className="display mt-8 text-5xl sm:text-6xl">{step.title}</h2><p className="mt-3 font-semibold">{step.label}</p></div><div className="lg:pt-16"><p className="max-w-xl text-lg leading-relaxed text-ink-2">{step.body}</p><div className="mt-8 grid gap-2 sm:grid-cols-3">{step.meta.map((m) => <span key={m} className="border border-ink px-3 py-3 font-mono text-[10px] uppercase tracking-wider">{m}</span>)}</div></div></Reveal>; })}<div className="border-t border-ink" /></div></section>

    <section className="ink-section"><div className="shell grid gap-16 py-[clamp(5rem,9vw,9rem)] lg:grid-cols-[0.85fr_1.15fr]"><Reveal><Eyebrow className="text-chalk">What the system knows</Eyebrow><h2 className="display mt-8 text-[clamp(3.5rem,7vw,7rem)]">Context enters once.</h2></Reveal><Reveal delay={0.05}><div className="grid gap-px border border-paper/30 bg-paper/30 sm:grid-cols-2">{[[IconSchedule, "Schedule", "Class, room, period, and day type"], [IconClock, "Time", "Requested, approved, elapsed, returned"], [IconRadar, "Movement", "Origin, destination, and current state"], [IconPattern, "History", "Prior trips and recurring patterns"]].map(([I, title, body]) => { const Icon = I as typeof IconSchedule; return <div key={title as string} className="bg-ink p-7"><Icon className="h-8 w-8 text-chalk" /><h3 className="display mt-10 text-3xl">{title as string}</h3><p className="mt-3 text-sm leading-relaxed text-paper/60">{body as string}</p></div>; })}</div></Reveal></div></section>

    <section className="section"><div className="shell grid gap-14 lg:grid-cols-[0.7fr_1.3fr]"><Reveal><Eyebrow>Questions schools ask</Eyebrow><h2 className="display mt-8 text-5xl sm:text-6xl">The practical details.</h2></Reveal><Reveal delay={0.05}><Accordion items={faq} /></Reveal></div></section>

    <section className="chalk-section border-y border-ink"><div className="shell flex flex-col items-start justify-between gap-8 py-16 lg:flex-row lg:items-center"><div><p className="display text-5xl sm:text-6xl">See the complete flow.</p><p className="mt-3 text-lg">Bring your bell schedule. We’ll bring the walkthrough.</p></div><CTAButton href="/contact" secondary>Contact sales</CTAButton></div></section>
  </main>;
}
