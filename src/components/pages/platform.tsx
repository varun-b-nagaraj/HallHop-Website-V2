import Link from "next/link";
import { IconArrow, IconCheck, IconCommand, IconInsight, IconPass, IconPattern, IconRadar, IconSchedule } from "../icons";
import { CTAButton, Eyebrow, PageHeader, Reveal } from "../ui";

const systems = [
  { n: "01", icon: IconPass, title: "Pass flow", body: "Create, approve, time, recall, and close a pass without turning a routine request into a classroom event.", detail: "Student · Teacher · Destination · Time" },
  { n: "02", icon: IconSchedule, title: "Schedule context", body: "Account for class periods, A/B days, room assignments, and split schedules through Home Access Center data.", detail: "Period · Day type · Room · Roster" },
  { n: "03", icon: IconCommand, title: "Teacher command", body: "A deliberately small surface for the actions teachers need now, with the current class already in context.", detail: "Approve · Decline · Recall · Close" },
  { n: "04", icon: IconRadar, title: "Live hallway", body: "Give authorized staff a shared view of active passes, destinations, and elapsed time across the building.", detail: "Active · Expected · Extended · Returned" },
  { n: "05", icon: IconPattern, title: "Pattern review", body: "Surface recurring timing, destination, and duration patterns for a person to review—not an automated discipline score.", detail: "Signal · Context · Human review" },
  { n: "06", icon: IconInsight, title: "Student insight", body: "Make individual status, history, and expectations visible so accountability is understandable from both sides.", detail: "Status · History · Limits · Reset" },
];

function ProductFrame() {
  const rows = [["Jordan M.", "Library", "02:14", "On time"], ["Avery S.", "Nurse", "07:42", "Extended"], ["Riley T.", "Office", "01:08", "On time"]];
  return <div className="border border-ink bg-panel text-ink"><div className="flex items-center justify-between border-b border-ink px-4 py-3"><span className="font-mono text-[11px] uppercase tracking-wider">Campus · active movement</span><span className="flex items-center gap-2 font-mono text-[10px]"><span className="live-dot" /> Live</span></div><div className="grid grid-cols-[1fr_1fr_70px_90px] border-b border-ink bg-bg-2 px-4 py-2 font-mono text-[9px] uppercase tracking-wider"><span>Student</span><span>Destination</span><span>Elapsed</span><span>Status</span></div>{rows.map((row, i) => <div key={row[0]} className="grid min-h-14 grid-cols-[1fr_1fr_70px_90px] items-center border-b border-line px-4 text-xs last:border-b-0"><span className="font-semibold">{row[0]}</span><span>{row[1]}</span><span className="font-mono">{row[2]}</span><span className={i === 1 ? "text-danger" : "text-go"}>{row[3]}</span></div>)}</div>;
}

export function PlatformPage() {
  return (
    <main id="main">
      <PageHeader eyebrow="HallHop platform" title="One movement." accent="One shared picture."><p>Digital passes are only the beginning. HallHop connects the moment a student leaves class to the context a school needs before, during, and after.</p></PageHeader>

      <section className="ink-section"><div className="shell grid gap-14 py-[clamp(5rem,9vw,9rem)] lg:grid-cols-[0.8fr_1.2fr] lg:items-center"><Reveal><Eyebrow className="text-chalk">Live operations</Eyebrow><h2 className="display mt-8 text-[clamp(3.6rem,7vw,7rem)]">See now.<br />Understand later.</h2><p className="mt-7 max-w-md text-lg leading-relaxed text-paper/65">The live view answers the immediate question. Searchable history and pattern review help teams understand what keeps happening.</p></Reveal><Reveal delay={0.05}><ProductFrame /></Reveal></div></section>

      <section className="fresh-section"><div className="shell py-[clamp(5rem,9vw,9rem)]"><Reveal><Eyebrow>Six connected systems</Eyebrow><h2 className="display mt-8 max-w-4xl text-[clamp(3.5rem,7vw,7rem)]">Built around the whole trip.</h2></Reveal><div className="mt-16 grid border-t border-ink lg:grid-cols-2">{systems.map((system, i) => { const Icon = system.icon; return <Reveal key={system.title} delay={(i % 2) * 0.04} className={`min-h-[330px] border-b border-ink p-7 sm:p-10 ${i % 2 ? "lg:border-l" : ""}`}><div className="flex items-start justify-between"><Icon className="h-9 w-9 text-accent" /><span className="font-mono text-xs">{system.n}</span></div><h3 className="display mt-14 text-4xl sm:text-5xl">{system.title}</h3><p className="mt-5 max-w-xl leading-relaxed text-ink-2">{system.body}</p><p className="mt-8 border-t border-line pt-4 font-mono text-[10px] uppercase tracking-wider text-faint">{system.detail}</p></Reveal>; })}</div></div></section>

      <section className="signal-section border-y border-ink"><div className="shell grid gap-14 py-[clamp(5rem,8vw,8rem)] lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]"><Reveal><Eyebrow>Fits the day</Eyebrow><h2 className="display mt-8 text-[clamp(3.5rem,6vw,5.8rem)]">Browser first.<br />Schedule aware.</h2></Reveal><Reveal delay={0.05} className="lg:pt-12"><ul className="border-t border-ink">{["Chrome-based student workflow", "Home Access Center schedule context", "Views shaped for students, teachers, and staff", "No new hallway hardware required"].map((point) => <li key={point} className="flex min-h-16 items-center gap-4 border-b border-ink"><IconCheck className="h-5 w-5 shrink-0" /><span className="font-semibold">{point}</span></li>)}</ul></Reveal></div></section>

      <section className="section"><div className="shell grid gap-12 lg:grid-cols-[1fr_0.7fr] lg:items-end"><Reveal><Eyebrow>Ready to look closer?</Eyebrow><h2 className="display mt-8 max-w-[11ch] text-[clamp(3.7rem,8vw,7.5rem)]">Walk through your school day with us.</h2></Reveal><Reveal delay={0.05}><p className="mb-7 text-lg leading-relaxed text-ink-2">We’ll use your schedule, your roles, and your questions—not a generic sales script.</p><CTAButton href="/contact">Contact sales</CTAButton><Link href="/security" prefetch={false} className="link-arrow ml-0 mt-4 sm:ml-5 sm:mt-0">Read our trust approach <IconArrow className="h-5 w-5" /></Link></Reveal></div></section>
    </main>
  );
}
