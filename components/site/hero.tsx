"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { publicSrc } from "@/lib/base-path";
import { CropMarks, frame, Kicker, Plate, Reveal, Wipe } from "./ui";

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
            <p className="mt-4 max-w-lg font-serif text-2xl leading-snug text-signal italic md:text-3xl">
              I&apos;m a sports fan, and I&apos;m from Irvine.
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
                src={publicSrc("/home/headshot.JPG")}
                alt="Jeet Parikh smiling in a black blazer and white shirt, in a stone colonnade"
                fill
                priority
                sizes="(min-width: 1024px) 36vw, 92vw"
                className="plate-photo object-cover object-[center_42%]"
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
                I&apos;m a student at Yale, studying electrical engineering and
                computer science.
              </p>
              <p>
                I love adventure, taking pictures, traveling, and Thai food. I
                also love building cool things for people.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.14}>
            <motion.div
              style={{ scaleX: rule }}
              className="mt-8 h-px origin-left bg-signal"
            />
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
