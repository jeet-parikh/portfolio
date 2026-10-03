"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { BrandLogo } from "@/components/brand-logo";
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

function PressSparks({ burst, night }: { burst: number; night: boolean }) {
  const reduce = useReducedMotion();
  if (reduce || burst === 0) return null;

  const sparks = night
    ? ["n1", "n2", "n3", "n4", "n5", "n6", "n7"]
    : ["d1", "d2", "d3", "d4", "d5"];

  return (
    <span
      key={burst}
      aria-hidden
      className="pointer-events-none absolute inset-0"
    >
      {sparks.map((id, index) => {
        const angle = (index / sparks.length) * Math.PI * 2 - Math.PI / 2;
        const dist = 16 + (index % 3) * 7;
        return (
          <motion.span
            key={id}
            className={cn(
              "absolute top-1/2 left-1/2 bg-signal",
              night ? "size-1.5 rounded-full" : "h-2.5 w-px",
            )}
            initial={{ x: 0, y: 0, opacity: 1, rotate: 0 }}
            animate={{
              x: Math.cos(angle) * dist,
              y: Math.sin(angle) * dist,
              opacity: 0,
              rotate: night ? 180 : 50,
            }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          />
        );
      })}
    </span>
  );
}

export function Masthead() {
  const { press, toggle, ready } = usePress();
  const { active, progress } = useScrollSpy();
  const reduce = useReducedMotion();
  const time = useNewHavenClock();
  const [burst, setBurst] = useState(0);
  const folio = String(
    Math.min(99, Math.max(1, Math.round(progress * 98) + 1)),
  ).padStart(2, "0");

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-rule bg-paper">
      <div className="flex h-14 items-center justify-between gap-4 px-5 sm:px-8 lg:pr-14 lg:pl-24">
        <a
          href="#who"
          data-cursor="go"
          className="flex items-center gap-3 font-mono text-[11px] tracking-[0.22em] uppercase"
        >
          <BrandLogo className="h-9 w-9" />
          Jeet Parikh
        </a>
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
            onClick={() => {
              toggle();
              setBurst((value) => value + 1);
            }}
            data-cursor="flip"
            aria-label={
              press === "night"
                ? "Switch to day press"
                : "Switch to night press"
            }
            className="relative inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.18em] uppercase"
          >
            <PressSparks burst={burst} night={press === "night"} />
            <span className="relative h-4 w-8 border border-ink">
              <motion.span
                key={press}
                initial={reduce ? false : { scale: 0.4, rotate: -70 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 18 }}
                className={cn(
                  "absolute top-0.5 size-2.5 bg-signal",
                  press === "night" ? "left-4 rounded-full" : "left-0.5",
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
