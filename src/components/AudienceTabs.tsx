"use client";

import { useState } from "react";
import { IconCheck } from "./icons";

const audiences = [
  { key: "teachers", label: "Teachers", title: "Keep the lesson moving.", body: "Issue, approve, recall, and close passes from a deliberately quiet command center.", items: ["Current-class context", "Fast approval workflow", "Visible active timers"] },
  { key: "leaders", label: "School leaders", title: "See the building as one system.", body: "A live operating picture replaces scattered pass slips, hallway calls, and incomplete memory.", items: ["Building-wide active view", "Searchable history", "Human-reviewed patterns"] },
  { key: "students", label: "Students", title: "Know where you stand.", body: "Clear status and history make expectations visible instead of surprising students after the fact.", items: ["Current pass status", "Personal history", "Transparent limits"] },
];

export function AudienceTabs() {
  const [active, setActive] = useState(0);
  const item = audiences[active];
  return (
    <div className="mt-10 grid gap-12 lg:grid-cols-[0.72fr_1.28fr]">
      <div role="tablist" aria-label="HallHop audiences" className="border-t border-ink">
        {audiences.map((audience, index) => <button key={audience.key} role="tab" aria-selected={index === active} onClick={() => setActive(index)} className={`flex min-h-16 w-full cursor-pointer items-center justify-between border-b border-ink px-1 text-left text-lg font-semibold transition-colors ${index === active ? "bg-ink px-4 text-paper" : "hover:px-4"}`}><span>{audience.label}</span><span className="font-mono text-xs">0{index + 1}</span></button>)}
      </div>
      <div key={item.key} className="audience-panel" role="tabpanel">
        <h2 className="display max-w-[10ch] text-[clamp(3.8rem,7vw,7rem)]">{item.title}</h2>
        <p className="mt-7 max-w-xl text-lg leading-relaxed">{item.body}</p>
        <ul className="mt-8 grid gap-3 sm:grid-cols-3">{item.items.map((point) => <li key={point} className="border border-ink bg-paper p-4 text-sm font-semibold"><IconCheck className="mb-6 h-5 w-5" />{point}</li>)}</ul>
      </div>
    </div>
  );
}
