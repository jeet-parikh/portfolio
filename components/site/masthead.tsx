"use client";

import { useEffect, useState } from "react";
import { sections } from "@/data/sections";
import { cn } from "@/lib/utils";
import { usePress, useScrollSpy } from "./providers";

function useNewHavenClock() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const format = () =>
      new Intl.DateTimeFormat("en-US", {
        timeZone: "America/New_York",
        hour: "numeric",
        minute: "2-digit",
      }).format(new Date());

    setTime(format());
    const id = window.setInterval(() => setTime(format()), 15_000);
    return () => window.clearInterval(id);
  }, []);

  return time;
}

export function Masthead() {
  const { press, toggle, ready } = usePress();
  const { active, progress } = useScrollSpy();
  const time = useNewHavenClock();
  const folio = String(
    Math.min(99, Math.max(1, Math.round(progress * 98) + 1)),
  ).padStart(2, "0");

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-rule bg-paper">
      <div className="flex h-14 items-center justify-between gap-4 px-5 sm:px-8 lg:pr-14 lg:pl-24">
        <a
          href="#opening"
          data-cursor="go"
          className="font-mono text-[11px] tracking-[0.22em] uppercase"
        >
          Jeet Parikh
        </a>
        <p className="hidden font-mono text-[11px] tracking-[0.18em] text-muted uppercase md:block">
          Issue 01 — Make it answer back
        </p>
        <div className="flex items-center gap-4 sm:gap-5">
          <p
            className="hidden font-mono text-[11px] tracking-[0.16em] text-muted uppercase sm:block"
            aria-hidden
          >
            New Haven {time}
          </p>
          <p
            className="font-mono text-[11px] tracking-[0.16em] text-signal tabular-nums"
            aria-hidden
          >
            {folio}
          </p>
          <button
            type="button"
            onClick={toggle}
            data-cursor="flip"
            aria-label={
              press === "night"
                ? "Switch to day press"
                : "Switch to night press"
            }
            className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.18em] uppercase"
          >
            <span className="relative h-4 w-8 border border-ink">
              <span
                className={cn(
                  "absolute top-0.5 h-2.5 w-2.5 bg-signal transition-transform duration-300",
                  press === "night" ? "translate-x-4" : "translate-x-0.5",
                )}
              />
            </span>
            <span className="hidden sm:inline">
              {ready ? (press === "night" ? "Night" : "Day") : "Press"}
            </span>
          </button>
        </div>
      </div>
      <nav
        aria-label="Sections"
        className="flex flex-wrap gap-x-4 gap-y-1 border-t border-rule px-5 py-2 sm:px-8 lg:hidden"
      >
        {sections.map((section) => (
          <a
            key={section.id}
            href={`#${section.id}`}
            className={cn(
              "shrink-0 font-mono text-[10px] tracking-[0.18em] uppercase",
              active === section.id ? "text-signal" : "text-muted",
            )}
          >
            {section.n} {section.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
