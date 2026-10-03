"use client";

import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "framer-motion";
import {
  type KeyboardEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { type Experience, experience } from "@/data/experience";
import { SELECT_RECORD } from "@/lib/open-record";
import { cn } from "@/lib/utils";
import { frame, Kicker, Reveal } from "./ui";

const lastIndex = Math.max(experience.length - 1, 1);

function indexFromProgress(value: number) {
  const clamped = Math.min(1, Math.max(0, value));
  return Math.round(clamped * lastIndex);
}

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
      {exp.tags.length > 0 ? (
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
      ) : null}
    </div>
  );
}

export function Record() {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const scrollingTo = useRef(false);
  const [selected, setSelected] = useState(experience[0]?.id ?? "");
  const current =
    experience.find((item) => item.id === selected) ?? experience[0];
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const applyIndex = useCallback((index: number) => {
    const id = experience[index]?.id;
    if (!id) return;
    setSelected((prev) => (prev === id ? prev : id));
  }, []);

  const scrollToIndex = useCallback((index: number) => {
    const el = sectionRef.current;
    if (!el) return;
    const start = window.scrollY + el.getBoundingClientRect().top;
    const distance = el.offsetHeight - window.innerHeight;
    const next = start + distance * (index / lastIndex);
    scrollingTo.current = true;
    window.scrollTo({ top: next, behavior: "auto" });
    window.setTimeout(() => {
      scrollingTo.current = false;
    }, 80);
  }, []);

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    if (scrollingTo.current) return;
    applyIndex(indexFromProgress(value));
  });

  useEffect(() => {
    applyIndex(indexFromProgress(scrollYProgress.get()));
  }, [scrollYProgress, applyIndex]);

  useEffect(() => {
    const onSelect = (event: Event) => {
      const id = (event as CustomEvent<string>).detail;
      const index = experience.findIndex((item) => item.id === id);
      if (index < 0) return;
      applyIndex(index);
      scrollToIndex(index);
    };

    window.addEventListener(SELECT_RECORD, onSelect);
    return () => window.removeEventListener(SELECT_RECORD, onSelect);
  }, [applyIndex, scrollToIndex]);

  const choose = (index: number) => {
    applyIndex(index);
    scrollToIndex(index);
    document.getElementById(`role-${experience[index]?.id}`)?.focus();
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;
    event.preventDefault();
    const index = experience.findIndex((item) => item.id === selected);
    const next =
      event.key === "ArrowDown"
        ? Math.min(experience.length - 1, index + 1)
        : Math.max(0, index - 1);
    choose(next);
  };

  return (
    <section
      id="record"
      ref={sectionRef}
      className="relative"
      style={{ height: `calc(100svh + ${lastIndex} * 56vh)` }}
    >
      <div
        className={`${frame} sticky top-14 flex h-[calc(100svh-3.5rem)] flex-col overflow-hidden py-8 md:py-10`}
      >
        <p
          aria-hidden
          className="pointer-events-none absolute top-6 right-0 font-serif text-[22vw] leading-none text-signal/[0.07] italic select-none"
        >
          03
        </p>
        <Reveal>
          <Kicker n="03">Record</Kicker>
          <h2 className="mt-3 max-w-3xl font-serif text-[clamp(2.4rem,4.5vw,3.6rem)] leading-[0.95] tracking-[-0.04em]">
            Where I&apos;ve worked.
          </h2>
          <p className="mt-3 max-w-xl text-base leading-relaxed text-muted md:text-lg">
            Scroll to step through them. Clicking still works.
          </p>
        </Reveal>

        <div className="mt-6 grid min-h-0 flex-1 grid-rows-[minmax(0,42%)_minmax(0,1fr)] gap-6 lg:grid-cols-12 lg:grid-rows-1 lg:gap-10">
          <div
            className="overflow-y-auto lg:col-span-5"
            role="listbox"
            aria-label="Roles"
            onKeyDown={onKeyDown}
          >
            {experience.map((exp, index) => {
              const on = exp.id === selected;
              return (
                <div
                  key={exp.id}
                  className="border-t border-rule last:border-b"
                >
                  <button
                    id={`role-${exp.id}`}
                    type="button"
                    role="option"
                    aria-selected={on}
                    data-cursor="read"
                    onClick={() => choose(index)}
                    className={cn(
                      "flex w-full items-baseline justify-between gap-4 px-1 py-3 text-left transition-colors md:py-4",
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
                </div>
              );
            })}
          </div>

          <div className="min-h-0 overflow-y-auto lg:col-span-6 lg:col-start-7">
            <div aria-live="polite">
              <AnimatePresence mode="wait">
                {current ? (
                  <motion.div
                    key={current.id}
                    initial={reduce ? false : { opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduce ? undefined : { opacity: 0, y: -14 }}
                    transition={{
                      duration: reduce ? 0 : 0.38,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    <RoleBody exp={current} />
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
