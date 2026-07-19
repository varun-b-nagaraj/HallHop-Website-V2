import { IconCheck, IconLock, IconShield } from "../icons";
import { CTAButton, Eyebrow, PageHeader, Reveal } from "../ui";

const boundaries = [
  { title: "Role-shaped views", body: "A teacher, hall monitor, and administrator do different work. HallHop’s access model is designed so each role sees the information its work requires." },
  { title: "Minimal exposure", body: "The product direction favors the smallest useful data surface over collecting or displaying information simply because it is available." },
  { title: "Auditable actions", body: "Sensitive actions and movement records should be attributable and reviewable by authorized school personnel." },
  { title: "Human decisions", body: "Patterns and alerts provide context. They do not make disciplinary decisions, label students, or remove staff judgment." },
];

export function SecurityPage() {
  return <main id="main">
    <PageHeader eyebrow="Trust & privacy" title="Visibility needs." accent="Boundaries."><p>School movement data is useful because it is sensitive. HallHop’s product direction starts with that tension instead of hiding it behind a compliance badge.</p></PageHeader>

    <section className="ink-section"><div className="shell grid gap-16 py-[clamp(5rem,9vw,9rem)] lg:grid-cols-[0.8fr_1.2fr]"><Reveal><IconShield className="h-12 w-12 text-chalk" /><Eyebrow className="mt-10 text-chalk">Our principle</Eyebrow><h2 className="display mt-8 text-[clamp(3.6rem,7vw,7rem)]">Clarity without surveillance.</h2></Reveal><Reveal delay={0.05} className="lg:pt-28"><p className="max-w-2xl text-2xl leading-relaxed text-paper/80">The goal is not to watch every student more closely. It is to replace ambiguous, inconsistent paper processes with shared context, transparent expectations, and accountable access.</p><p className="mt-8 max-w-xl leading-relaxed text-paper/55">HallHop uses “FERPA-aware” to describe a design approach. It is not a claim of legal certification, and every deployment still requires school-led review of policy, contracts, access, retention, and local requirements.</p></Reveal></div></section>

    <section className="fresh-section"><div className="shell py-[clamp(5rem,9vw,9rem)]"><Reveal><Eyebrow>Product boundaries</Eyebrow><h2 className="display mt-8 max-w-4xl text-[clamp(3.5rem,7vw,7rem)]">What responsible context looks like.</h2></Reveal><div className="mt-16 grid border-t border-ink lg:grid-cols-2">{boundaries.map((item, i) => <Reveal key={item.title} delay={(i % 2) * 0.04} className={`min-h-[280px] border-b border-ink p-8 sm:p-10 ${i % 2 ? "lg:border-l" : ""}`}><span className="font-mono text-xs text-accent">0{i + 1}</span><h3 className="display mt-12 text-4xl">{item.title}</h3><p className="mt-5 max-w-xl leading-relaxed text-ink-2">{item.body}</p></Reveal>)}</div></div></section>

    <section className="signal-section border-y border-ink"><div className="shell grid gap-14 py-[clamp(5rem,8vw,8rem)] lg:grid-cols-[0.8fr_1.2fr]"><Reveal><IconLock className="h-11 w-11" /><h2 className="display mt-8 text-5xl sm:text-6xl">A deployment is a trust decision.</h2></Reveal><Reveal delay={0.05}><div className="border-t border-ink">{["Define roles and least-access expectations", "Review what data is required and why", "Set school-owned retention and response policy", "Document the student and staff experience", "Validate integrations before a live rollout"].map((item) => <div key={item} className="flex min-h-16 items-center gap-4 border-b border-ink"><IconCheck className="h-5 w-5" /><span className="font-semibold">{item}</span></div>)}</div></Reveal></div></section>

    <section className="section"><div className="shell flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end"><Reveal><Eyebrow>Bring your questions</Eyebrow><h2 className="display mt-8 max-w-[11ch] text-[clamp(3.5rem,7vw,7rem)]">Trust belongs in the first conversation.</h2></Reveal><Reveal delay={0.05}><CTAButton href="/contact">Contact sales</CTAButton></Reveal></div></section>
  </main>;
}
