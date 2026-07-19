import Link from "next/link";
import { IconArrowUpRight, LogoMark } from "./icons";

const groups = [
  { title: "Product", links: [["Platform", "/platform"], ["How it works", "/how-it-works"], ["Trust & privacy", "/security"], ["HAC API", "/api"]] },
  { title: "Company", links: [["Our story", "/about"], ["Resources", "/resources"], ["Contact sales", "/contact"]] },
];

export function Footer() {
  return (
    <footer className="ink-section border-t border-white/20">
      <div className="shell grid gap-16 py-16 sm:py-20 lg:grid-cols-[1.5fr_1fr]">
        <div>
          <Link href="/" prefetch={false} className="inline-flex items-center gap-3" aria-label="HallHop home">
            <LogoMark className="h-11 w-11 text-paper" />
            <span className="display text-3xl">HallHop</span>
          </Link>
          <p className="display mt-8 max-w-2xl text-[clamp(2.4rem,5vw,5rem)]">The hallway, understood.</p>
          <Link href="/contact" prefetch={false} className="link-arrow mt-8 text-chalk">Bring HallHop to your campus <IconArrowUpRight className="h-5 w-5" /></Link>
        </div>
        <div className="grid grid-cols-2 gap-8">
          {groups.map((group) => <div key={group.title}><h2 className="font-mono text-xs uppercase tracking-widest text-paper/55">{group.title}</h2><ul className="mt-5 space-y-3">{group.links.map(([label, href]) => <li key={href}><Link href={href} prefetch={false} className="inline-flex min-h-11 items-center text-sm text-paper/80 transition-colors hover:text-chalk">{label}</Link></li>)}</ul></div>)}
        </div>
      </div>
      <div className="border-t border-white/20">
        <div className="shell flex flex-col gap-3 py-6 font-mono text-[11px] uppercase tracking-wider text-paper/55 sm:flex-row sm:items-center sm:justify-between">
          <span>© 2026 HallHop · Built in Texas</span>
          <span>Clarity without surveillance</span>
        </div>
      </div>
    </footer>
  );
}
