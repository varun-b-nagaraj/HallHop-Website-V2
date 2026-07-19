import { DemoForm } from "../DemoForm";
import { IconCheck } from "../icons";
import { Eyebrow, PageHeader, Reveal } from "../ui";

export function ContactPage() {
  return <main id="main">
    <PageHeader eyebrow="Contact sales" title="Bring your hallway." accent="We’ll bring HallHop."><p>Tell us how movement works at your campus today. We’ll shape the conversation around your schedule, roles, and actual questions.</p></PageHeader>
    <section className="fresh-section"><div className="shell grid gap-14 py-[clamp(5rem,9vw,9rem)] lg:grid-cols-[0.72fr_1.28fr] lg:items-start"><Reveal className="lg:sticky lg:top-32"><Eyebrow>What we’ll cover</Eyebrow><h2 className="display mt-8 text-5xl sm:text-6xl">A useful first conversation.</h2><ul className="mt-10 border-t border-ink">{["Your current pass workflow", "Schedules, roles, and browser environment", "What a responsible pilot would need", "Questions about privacy and access"].map((item) => <li key={item} className="flex min-h-16 items-center gap-4 border-b border-ink"><IconCheck className="h-5 w-5 text-accent" /><span className="font-semibold">{item}</span></li>)}</ul><p className="mt-7 text-sm leading-relaxed text-ink-2">Prefer to write directly? <a href="mailto:hallhop123@gmail.com" className="font-semibold underline underline-offset-4">hallhop123@gmail.com</a></p></Reveal><Reveal delay={0.05}><DemoForm /></Reveal></div></section>
    <section className="chalk-section border-y border-ink"><div className="shell grid gap-8 py-14 sm:grid-cols-3">{[["01", "No student data", "We can discuss fit without receiving student information."], ["02", "No generic script", "The walkthrough follows your campus workflow."], ["03", "Clear next step", "You’ll know what a realistic pilot requires."]].map(([n, t, b]) => <div key={n}><span className="font-mono text-xs">{n}</span><h2 className="display mt-6 text-3xl">{t}</h2><p className="mt-3 text-sm leading-relaxed">{b}</p></div>)}</div></section>
  </main>;
}
