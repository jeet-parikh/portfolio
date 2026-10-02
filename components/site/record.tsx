"use client";

import { AnimatePresence, motion } from "framer-motion";
import { type KeyboardEvent, useEffect, useState } from "react";
import { type Experience, experience } from "@/data/experience";
import { SELECT_RECORD } from "@/lib/open-record";
import { cn } from "@/lib/utils";
import { Signals } from "./signals";
import { frame, Kicker, Reveal } from "./ui";

function RoleBody({ exp }: { exp: Experience }) {
  const year = exp.startDate.slice(-4);

  return (
    <div className="relative">
      <p
        aria-hidden
        className="pointer-events-none absolute -top-4 right-0 font-serif text-7xl text-ink/10 italic md:text-8xl"
      >
        {year}
      </p>
      <p className="font-mono text-[11px] tracking-[0.2em] text-signal uppercase">
        {exp.company}
      </p>
      <h3 className="mt-2 font-serif text-4xl tracking-[-0.04em] md:text-5xl">
        {exp.title}
      </h3>
      <p className="mt-3 font-mono text-[11px] tracking-[0.14em] text-muted uppercase">
        {exp.startDate} — {exp.current ? "Present" : exp.endDate}
        <span className="mx-2">·</span>
        {exp.location}
      </p>
      <p className="mt-6 max-w-xl font-serif text-2xl leading-snug italic">
        {exp.aside}
      </p>
      <ul className="mt-6 max-w-xl space-y-3">
        {exp.description.map((line) => (
          <li
            key={line}
            className="border-t border-rule pt-3 text-[15px] leading-relaxed"
          >
            {line}
          </li>
        ))}
      </ul>
      <ul className="mt-6 flex flex-wrap gap-2">
        {exp.tags.map((tag) => (
          <li
            key={tag}
            className="border border-rule px-2 py-1 font-mono text-[10px] tracking-[0.14em] uppercase"
          >
            {tag}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Record() {
  const [selected, setSelected] = useState(experience[0]?.id ?? "");
  const current =
    experience.find((item) => item.id === selected) ?? experience[0];

  useEffect(() => {
    const onSelect = (event: Event) => {
      const id = (event as CustomEvent<string>).detail;
      if (!experience.some((item) => item.id === id)) return;
      setSelected(id);
      requestAnimationFrame(() => {
        document.getElementById(`role-${id}`)?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      });
    };

    window.addEventListener(SELECT_RECORD, onSelect);
    return () => window.removeEventListener(SELECT_RECORD, onSelect);
  }, []);

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;
    event.preventDefault();
    const ids = experience.map((item) => item.id);
    const index = ids.indexOf(selected);
    const next =
      event.key === "ArrowDown"
        ? Math.min(ids.length - 1, index + 1)
        : Math.max(0, index - 1);
    const id = ids[next];
    if (!id) return;
    setSelected(id);
    document.getElementById(`role-${id}`)?.focus();
  };

  return (
    <section id="record" className={`${frame} relative py-20 md:py-28`}>
      <p
        aria-hidden
        className="pointer-events-none absolute top-6 right-0 font-serif text-[24vw] leading-none text-ink/[0.045] italic select-none"
      >
        04
      </p>
      <Reveal>
        <Kicker n="04">Record</Kicker>
        <h2 className="mt-4 max-w-4xl font-serif text-[clamp(3rem,6.4vw,5.6rem)] leading-[0.92] tracking-[-0.045em]">
          The paper trail.
        </h2>
        <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">
          Four numbers, then the jobs behind them. Pick a line. Arrow keys work
          once you are in the list.
        </p>
      </Reveal>

      <div className="mt-12">
        <Signals />
      </div>

      <div className="mt-12 grid gap-10 lg:grid-cols-12">
        <div
          className="lg:col-span-5"
          role="listbox"
          aria-label="Roles"
          onKeyDown={onKeyDown}
        >
          {experience.map((exp, index) => {
            const on = exp.id === selected;
            return (
              <div key={exp.id} className="border-t border-rule last:border-b">
                <button
                  id={`role-${exp.id}`}
                  type="button"
                  role="option"
                  aria-selected={on}
                  data-cursor="read"
                  onClick={() => setSelected(exp.id)}
                  className={cn(
                    "flex w-full items-baseline justify-between gap-4 px-1 py-4 text-left transition-colors",
                    on ? "bg-ink px-3 text-paper" : "hover:bg-mark/40",
                  )}
                >
                  <span className="font-mono text-[11px] tracking-[0.16em]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="flex-1">
                    <span className="block font-serif text-2xl tracking-tight md:text-3xl">
                      {exp.company}
                    </span>
                    <span
                      className={cn(
                        "mt-1 block font-mono text-[10px] tracking-[0.14em] uppercase",
                        on ? "text-paper/70" : "text-muted",
                      )}
                    >
                      {exp.title}
                    </span>
                  </span>
                  <span className="font-mono text-[10px] tracking-[0.12em] uppercase">
                    {exp.current ? "Now" : exp.endDate.slice(-4)}
                  </span>
                </button>
                {on ? (
                  <div className="px-1 py-6 lg:hidden">
                    <RoleBody exp={exp} />
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>

        <div className="hidden lg:col-span-6 lg:col-start-7 lg:block">
          <div className="sticky top-28" aria-live="polite">
            <AnimatePresence mode="wait">
              {current ? (
                <motion.div
                  key={current.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                >
                  <RoleBody exp={current} />
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
