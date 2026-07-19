"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { IconClose, IconMenu, LogoMark } from "./icons";

const links = [
  { href: "/platform", label: "Platform" },
  { href: "/how-it-works", label: "How it works" },
  { href: "/security", label: "Trust" },
  { href: "/api", label: "HAC API" },
  { href: "/about", label: "Our story" },
];

export function Nav() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 160, damping: 28 });

  useEffect(() => {
    const check = () => setScrolled(window.scrollY > 8);
    check();
    window.addEventListener("scroll", check, { passive: true });
    return () => window.removeEventListener("scroll", check);
  }, []);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-200 ${scrolled || open ? "border-line bg-panel" : "border-transparent bg-transparent"}`}>
      <motion.div className="absolute inset-x-0 bottom-[-1px] h-[3px] origin-left bg-accent" style={{ scaleX: progress }} aria-hidden="true" />
      <nav className="shell flex h-20 items-center justify-between" aria-label="Primary navigation">
        <Link href="/" className="flex min-h-12 items-center gap-3" aria-label="HallHop home">
          <LogoMark className="h-9 w-9 text-ink" />
          <span className="display text-2xl tracking-[-0.03em]">HallHop</span>
        </Link>

        <div className="hidden items-center gap-6 lg:flex">
          {links.map((link) => {
            const active = path === link.href;
            return <Link key={link.href} href={link.href} aria-current={active ? "page" : undefined} className={`relative flex min-h-12 items-center text-sm font-semibold transition-colors duration-200 ${active ? "text-accent-2" : "text-ink hover:text-accent-2"}`}>{link.label}{active && <span className="absolute inset-x-0 bottom-1 h-0.5 bg-accent" />}</Link>;
          })}
        </div>

        <div className="flex items-center gap-3">
          <Link href="/contact" className="btn btn-dark hidden sm:inline-flex">Contact sales</Link>
          <button type="button" onClick={() => setOpen((v) => !v)} aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? "Close menu" : "Open menu"} className="grid h-12 w-12 cursor-pointer place-items-center border border-ink lg:hidden">
            {open ? <IconClose className="h-6 w-6" /> : <IconMenu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {open && (
        <motion.div id="mobile-menu" initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="border-t border-line bg-panel lg:hidden">
          <div className="shell grid py-3">
            {links.map((link, index) => <Link key={link.href} href={link.href} onClick={() => setOpen(false)} className="flex min-h-14 items-center justify-between border-b border-line text-lg font-semibold"><span>{link.label}</span><span className="font-mono text-xs">0{index + 1}</span></Link>)}
            <Link href="/contact" onClick={() => setOpen(false)} className="btn btn-primary my-4 sm:hidden">Contact sales</Link>
          </div>
        </motion.div>
      )}
    </header>
  );
}
