"use client";

import { useEffect } from "react";
import { experience } from "@/data/experience";
import { SELECT_RECORD } from "@/lib/open-record";
import { frame, Kicker, Reveal } from "./ui";

export function Record() {
  useEffect(() => {
    const onSelect = (event: Event) => {
      const id = (event as CustomEvent<string>).detail;
      if (!experience.some((item) => item.id === id)) return;
      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      document.getElementById(`role-${id}`)?.scrollIntoView({
        behavior: reduce ? "auto" : "smooth",
        block: "center",
      });
    };

    window.addEventListener(SELECT_RECORD, onSelect);
    return () => window.removeEventListener(SELECT_RECORD, onSelect);
  }, []);

  return (
    <section id="record" className={`${frame} relative py-16 md:py-20`}>
      <p
        aria-hidden
        className="pointer-events-none absolute top-6 right-0 font-serif text-[22vw] leading-none text-signal/[0.07] italic select-none"
      >
        03
      </p>
      <Reveal>
        <Kicker n="03">Record</Kicker>
        <h2 className="mt-3 max-w-3xl font-serif text-[clamp(2.6rem,5vw,4.2rem)] leading-[0.95] tracking-[-0.04em]">
          Where I&apos;ve worked.
        </h2>
        <p className="mt-4 max-w-xl text-lg leading-relaxed text-muted">
          Newest first.
        </p>
      </Reveal>

      <ol className="mt-10">
        {experience.map((exp, index) => (
          <li
            key={exp.id}
            id={`role-${exp.id}`}
            className="scroll-mt-28 border-t border-rule last:border-b"
          >
            <Reveal>
              <article className="grid gap-4 py-7 lg:grid-cols-12 lg:gap-10 lg:py-9">
                <div className="lg:col-span-4">
                  <p className="font-mono text-[11px] tracking-[0.2em] text-signal uppercase">
                    {String(index + 1).padStart(2, "0")}
                    <span className="mx-2 text-muted">/</span>
                    {exp.current ? "Now" : exp.endDate.slice(-4)}
                  </p>
                  <h3 className="mt-2 font-serif text-3xl tracking-[-0.04em] md:text-4xl">
                    {exp.company}
                  </h3>
                  <p className="mt-2 text-base leading-snug">{exp.title}</p>
                  <p className="mt-3 font-mono text-[10px] tracking-[0.14em] text-muted uppercase">
                    {exp.startDate} — {exp.current ? "Present" : exp.endDate}
                    <span className="mx-2">·</span>
                    {exp.location}
                  </p>
                </div>
                <div className="lg:col-span-7 lg:col-start-6">
                  <p className="max-w-xl font-serif text-xl leading-snug italic md:text-2xl">
                    {exp.aside}
                  </p>
                  <ul className="mt-4 max-w-xl space-y-2.5">
                    {exp.description.map((line) => (
                      <li key={line} className="text-[15px] leading-relaxed">
                        {line}
                      </li>
                    ))}
                  </ul>
                  {exp.tags.length > 0 ? (
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {exp.tags.map((tag) => (
                        <li
                          key={tag}
                          className="border border-rule px-2 py-1 font-mono text-[10px] tracking-[0.14em] uppercase"
                        >
                          {tag}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              </article>
            </Reveal>
          </li>
        ))}
      </ol>
    </section>
  );
}
