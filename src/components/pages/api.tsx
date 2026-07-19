import { IconApi, IconCheck, IconReport, IconSchedule } from "../icons";
import { CTAButton, Counter, Eyebrow, PageHeader, Reveal } from "../ui";

const endpoints = [
  ["Schedule reports", "Classes, periods, rooms, teachers, and schedule rows"],
  ["Grades & assignments", "Current course grades and assignment-level details"],
  ["Student context", "Authorized student lookup and active-student selection"],
  ["Day type", "A/B day and non-school-day schedule context"],
  ["Transcript reports", "Transcript information for authorized workflows"],
];

function CodeBlock() {
  return <div className="border border-paper/30 bg-black/20 p-5 font-mono text-xs leading-7 text-paper/70" aria-label="Example HAC API response"><p className="text-chalk">POST /api/report</p><pre className="mt-4 overflow-x-auto">{`{
  "day_type": "B",
  "current_period": 3,
  "room": "204",
  "status": "ok"
}`}</pre></div>;
}

export function ApiPage() {
  return <main id="main">
    <PageHeader eyebrow="HallHop developer services" title="School context." accent="Made useful."><p>The HAC API is a separate HallHop service that translates Home Access Center information into structured data for authorized tools and workflows.</p></PageHeader>

    <section className="ink-section"><div className="shell grid gap-14 py-[clamp(5rem,9vw,9rem)] lg:grid-cols-2 lg:items-center"><Reveal><IconApi className="h-12 w-12 text-chalk" /><h2 className="display mt-10 text-[clamp(3.8rem,8vw,8rem)]"><Counter to={15000} suffix=" reads" /></h2><p className="mt-3 font-mono text-xs uppercase tracking-widest text-paper/45">in a typical month</p><p className="mt-8 max-w-lg text-lg leading-relaxed text-paper/65">The service supports a live use case at Round Rock High School. That refers to API usage, not a claim that the full HallHop pass platform is deployed school-wide.</p></Reveal><Reveal delay={0.05}><CodeBlock /></Reveal></div></section>

    <section className="fresh-section"><div className="shell py-[clamp(5rem,9vw,9rem)]"><Reveal><Eyebrow>Available context</Eyebrow><h2 className="display mt-8 max-w-4xl text-[clamp(3.5rem,7vw,7rem)]">One interface for the data school tools keep needing.</h2></Reveal><div className="mt-16 border-t border-ink">{endpoints.map(([title, body], i) => <Reveal key={title} className="grid gap-6 border-b border-ink py-8 sm:grid-cols-[70px_0.8fr_1.2fr] sm:items-center"><span className="font-mono text-xs text-accent">0{i + 1}</span><h3 className="display text-3xl">{title}</h3><p className="leading-relaxed text-ink-2">{body}</p></Reveal>)}</div></div></section>

    <section className="chalk-section border-y border-ink"><div className="shell grid gap-14 py-[clamp(5rem,8vw,8rem)] lg:grid-cols-2"><Reveal><IconSchedule className="h-10 w-10" /><h2 className="display mt-8 text-5xl sm:text-6xl">Built for authorized, specific use.</h2></Reveal><Reveal delay={0.05}><ul className="border-t border-ink">{["Credentials are used only for the requested HAC session", "Consumers receive structured responses", "Routes cover specific reports and lookups", "Integrations should be reviewed by the responsible school or district"].map((point) => <li key={point} className="flex min-h-16 items-center gap-4 border-b border-ink"><IconCheck className="h-5 w-5" /><span className="font-semibold">{point}</span></li>)}</ul></Reveal></div></section>

    <section className="section"><div className="shell grid gap-12 lg:grid-cols-[1fr_0.7fr] lg:items-end"><Reveal><IconReport className="h-10 w-10 text-accent" /><h2 className="display mt-8 max-w-[11ch] text-[clamp(3.5rem,7vw,7rem)]">Have a school workflow in mind?</h2></Reveal><Reveal delay={0.05}><p className="mb-7 text-lg leading-relaxed text-ink-2">Tell us what context you need and who the workflow serves. We’ll discuss fit, authorization, and practical constraints.</p><CTAButton href="/contact">Contact sales</CTAButton></Reveal></div></section>
  </main>;
}
