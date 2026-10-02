"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { CropMarks, frame, Kicker, Plate, Reveal, Wipe } from "./ui";

const facts = [
  { label: "Now", value: "Databricks, Mountain View" },
  { label: "Also", value: "President, Yale Computer Society" },
  { label: "Study", value: "EECS · 3.97 · Class of 2028" },
  { label: "From", value: "Irvine, and New Haven" },
];

export function Hero() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const photoY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -48]);
  const markY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 72]);
  const rule = useTransform(scrollYProgress, [0, 0.4], [0.15, 1]);

  return (
    <section
      id="who"
      ref={ref}
      className={`${frame} relative overflow-hidden pt-28 pb-14 lg:pt-32 lg:pb-20`}
    >
      <motion.p
        aria-hidden
        style={{ y: markY }}
        className="pointer-events-none absolute top-20 right-0 font-serif text-[22vw] leading-none text-signal/[0.07] italic select-none"
      >
        01
      </motion.p>

      <div className="relative grid items-start gap-8 lg:grid-cols-12 lg:gap-x-10 lg:gap-y-6">
        <div className="lg:col-span-7">
          <Reveal>
            <Kicker n="01">Who</Kicker>
            <h1 className="mt-4 font-serif text-[clamp(3.6rem,8vw,6.2rem)] leading-[0.9] tracking-[-0.045em]">
              Jeet Parikh
            </h1>
            <p className="mt-4 max-w-md font-serif text-2xl text-signal italic md:text-3xl">
              EECS at Yale. I build things people actually use.
            </p>
          </Reveal>
        </div>

        <motion.figure
          style={{ y: photoY }}
          className="lg:col-span-5 lg:row-span-2"
        >
          <Wipe from="right" className="relative">
            <CropMarks />
            <Plate className="relative h-[32vh] min-h-56 overflow-hidden border border-ink bg-sheet lg:h-auto lg:aspect-[3/4]">
              <Image
                src="/home/headshot.JPG"
                alt="Jeet Parikh, smiling with arms crossed in a stone colonnade"
                fill
                priority
                sizes="(min-width: 1024px) 36vw, 92vw"
                className="plate-photo object-cover object-[center_22%]"
              />
            </Plate>
          </Wipe>
          <figcaption className="mt-3 font-mono text-[10px] tracking-[0.16em] text-muted uppercase">
            fig. 00 — Jeet, New Haven
          </figcaption>
        </motion.figure>

        <div className="lg:col-span-7">
          <Reveal delay={0.08}>
            <div className="max-w-xl space-y-4 text-lg leading-relaxed">
              <p>
                Right now I am a software engineer intern at Databricks, where I
                built an agent that improves production data pipelines on its
                own. Latency down 30%. Compute down 25%.
              </p>
              <p>
                Before that: the Bloomberg Terminal, president of Yale&apos;s
                largest CS club, and two iOS apps I taught myself to ship from
                Irvine. I am still the person who stays with a problem because
                it belongs to someone else.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.14}>
            <motion.div
              style={{ scaleX: rule }}
              className="mt-8 h-px origin-left bg-signal"
            />
            <dl className="mt-5 grid gap-x-6 gap-y-4 sm:grid-cols-2">
              {facts.map((fact) => (
                <div key={fact.label}>
                  <dt className="font-mono text-[10px] tracking-[0.18em] text-signal uppercase">
                    {fact.label}
                  </dt>
                  <dd className="mt-1 text-base">{fact.value}</dd>
                </div>
              ))}
            </dl>
            <a
              href="#work"
              data-cursor="look"
              className="mt-8 inline-flex min-h-11 items-center gap-3 border border-ink px-5 py-3 font-mono text-[11px] tracking-[0.18em] uppercase transition-colors hover:bg-signal hover:text-paper"
            >
              What I&apos;ve built <span aria-hidden>↓</span>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
