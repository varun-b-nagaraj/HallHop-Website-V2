"use client";

import { useState } from "react";

export type AccordionItem = { q: string; a: string };

export function AccordionClient({ items }: { items: AccordionItem[] }) {
  const [open, setOpen] = useState(0);
  return (
    <div className="border-t border-ink">
      {items.map((item, index) => {
        const active = open === index;
        return (
          <div key={item.q} className="border-b border-ink">
            <button type="button" aria-expanded={active} onClick={() => setOpen(active ? -1 : index)} className="flex min-h-16 w-full cursor-pointer items-center justify-between gap-6 py-5 text-left text-lg font-semibold">
              {item.q}<span className="font-mono text-2xl" aria-hidden="true">{active ? "−" : "+"}</span>
            </button>
            {active && <div className="accordion-panel overflow-hidden"><p className="max-w-3xl pb-6 leading-relaxed text-ink-2">{item.a}</p></div>}
          </div>
        );
      })}
    </div>
  );
}
