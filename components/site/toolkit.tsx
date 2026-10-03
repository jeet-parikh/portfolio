"use client";

import { useState } from "react";
import { type Skill, skillCategories, skills } from "@/data/skills";
import { cn } from "@/lib/utils";
import { frame, Kicker, Reveal } from "./ui";

export function Toolkit() {
  const [active, setActive] = useState<Skill>(skills[0]);

  return (
    <section id="tools" className={`${frame} relative py-20 md:py-28`}>
      <p
        aria-hidden
        className="pointer-events-none absolute top-6 right-0 font-serif text-[24vw] leading-none text-ink/[0.045] italic select-none"
      >
        05
      </p>
      <Reveal>
        <Kicker n="05">Tools</Kicker>
        <h2 className="mt-4 max-w-4xl font-serif text-[clamp(3rem,6.4vw,5.6rem)] leading-[0.92] tracking-[-0.045em]">
          What I reach for.
        </h2>
      </Reveal>

      <div className="sticky top-28 z-20 mt-10 border border-ink bg-sheet p-5 shadow-[6px_6px_0_0_var(--ink)] md:p-7 lg:top-20">
        <div className="grid items-end gap-4 md:grid-cols-12">
          <p className="font-serif text-4xl tracking-[-0.04em] md:col-span-4 md:text-5xl">
            {active.name}
          </p>
          <p className="text-lg leading-relaxed md:col-span-6">{active.note}</p>
          <p className="font-mono text-[11px] tracking-[0.16em] text-muted uppercase md:col-span-2 md:text-right">
            {active.category}
          </p>
        </div>
      </div>

      <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {skillCategories.map((category) => (
          <div key={category}>
            <h3 className="border-b border-ink pb-3 font-mono text-[11px] tracking-[0.18em] text-muted uppercase">
              {category}
            </h3>
            <ul className="mt-1">
              {skills
                .filter((skill) => skill.category === category)
                .map((skill) => {
                  const on = skill.name === active.name;
                  return (
                    <li key={skill.name}>
                      <button
                        type="button"
                        data-cursor="hold"
                        aria-pressed={on}
                        onMouseEnter={() => setActive(skill)}
                        onFocus={() => setActive(skill)}
                        onClick={() => setActive(skill)}
                        className={cn(
                          "w-full border-b border-rule py-2.5 text-left font-serif text-[1.65rem] leading-none tracking-tight transition-colors",
                          on ? "text-signal" : "hover:text-ink",
                        )}
                      >
                        {skill.name}
                      </button>
                    </li>
                  );
                })}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
