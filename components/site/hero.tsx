"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import type { ReactNode } from "react";
import { CropMarks, frame, Kicker } from "./ui";

function Line({ children, delay }: { children: ReactNode; delay: number }) {
  const reduce = useReducedMotion();
  return (
    <span className="block overflow-hidden py-[0.06em] -my-[0.06em]">
      <motion.span
        className="block"
        initial={reduce ? false : { y: "110%" }}
        animate={{ y: "0%" }}
        transition={{ duration: 0.95, delay, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.span>
    </span>
  );
}

export function Hero() {
  return (
    <section
      id="opening"
      className={`${frame} relative flex flex-col pt-28 pb-10 lg:min-h-[100svh] lg:pt-24 lg:pb-8`}
    >
      <p
        aria-hidden
        className="pointer-events-none absolute top-16 right-0 font-serif text-[28vw] leading-none text-ink/[0.045] italic select-none"
      >
        01
      </p>

      <div className="relative grid gap-8 lg:flex-1 lg:content-center lg:grid-cols-12 lg:gap-x-8 lg:gap-y-10">
        <div className="lg:col-span-8">
          <Kicker n="01">Opening — New Haven / Irvine</Kicker>
          <h1 className="mt-4 font-serif text-[clamp(4.4rem,12vw,8.4rem)] leading-[0.84] tracking-[-0.055em]">
            <Line delay={0.05}>Make it</Line>
            <Line delay={0.14}>
              <span className="bg-mark px-[0.06em] text-[#1c1612] italic">
                answer
              </span>
            </Line>
            <Line delay={0.22}>
              back<span className="text-signal">.</span>
            </Line>
          </h1>
        </div>

        <figure className="lg:col-span-4 lg:col-start-9 lg:row-span-2 lg:row-start-1 lg:self-center">
          <div className="group/plate relative" data-plate>
            <CropMarks />
            <div className="relative h-[42vh] overflow-hidden border border-ink bg-sheet shadow-[8px_8px_0_0_var(--ink)] lg:aspect-[3/4] lg:h-auto">
              <Image
                src="/home/headshot.JPG"
                alt="Jeet Parikh, smiling with arms crossed in a stone colonnade"
                fill
                priority
                sizes="(min-width: 1024px) 28vw, 90vw"
                className="plate-photo object-cover object-[center_24%]"
              />
            </div>
          </div>
          <figcaption className="mt-3 font-mono text-[10px] tracking-[0.16em] text-muted uppercase">
            fig. 00 — color returns if you look
          </figcaption>
        </figure>

        <div className="max-w-xl lg:col-span-7">
          <p className="text-lg leading-relaxed md:text-xl">
            I study computer science at Yale. I taught myself to code during a
            pandemic, first to save a backyard of tomatoes, then to help my
            family look after my grandfather. The puzzles got larger. Pipelines,
            patients, a campus full of builders. The question stayed the same.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#work"
              data-cursor="look"
              className="inline-flex min-h-11 items-center gap-3 border border-ink px-5 py-3 font-mono text-[11px] tracking-[0.18em] uppercase transition-colors hover:bg-ink hover:text-paper"
            >
              See the work <span aria-hidden>↓</span>
            </a>
            <a
              href="#write"
              data-cursor="write"
              className="inline-flex min-h-11 items-center px-5 py-3 font-mono text-[11px] tracking-[0.18em] text-signal uppercase"
            >
              Write me
            </a>
          </div>
          <dl className="mt-8 space-y-1 font-mono text-[11px] tracking-[0.16em] text-muted uppercase">
            <div>EECS, Yale University</div>
            <div>
              <a
                href="https://yalecomputersociety.org/"
                target="_blank"
                rel="noreferrer"
                data-cursor="open"
                className="underline decoration-rule underline-offset-4 hover:text-ink hover:decoration-ink"
              >
                President, Yale Computer Society
              </a>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
