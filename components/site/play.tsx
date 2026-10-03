"use client";

import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef, useState } from "react";

const stops = [
  { place: "Irvine", note: "Home" },
  { place: "Salt Lake", note: "Lab" },
  { place: "New Haven", note: "Yale" },
  { place: "New York", note: "Summer" },
  { place: "Mt. View", note: "Now" },
] as const;

export function TravelStamp() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLButtonElement>(null);
  const [index, setIndex] = useState(0);
  const stop = stops[index] ?? stops[0];
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const rotate = useTransform(
    scrollYProgress,
    [0, 1],
    reduce ? [-12, -12] : [-18, 6],
  );

  return (
    <motion.button
      ref={ref}
      type="button"
      data-cursor="stamp"
      aria-label={`${stop.place}, ${stop.note}. Travel stamp. Click for the next city.`}
      onClick={() => setIndex((value) => (value + 1) % stops.length)}
      style={{ rotate }}
      initial={reduce ? false : { opacity: 0, scale: 1.45 }}
      whileInView={{ opacity: 1, scale: 1 }}
      whileHover={reduce ? undefined : { scale: 1.07 }}
      viewport={{ once: true, margin: "-8%" }}
      transition={{ type: "spring", stiffness: 420, damping: 16 }}
      className="absolute right-3 bottom-3 z-10 grid size-20 place-items-center rounded-full border-2 border-dashed border-signal bg-paper/90 text-signal shadow-[3px_3px_0_0_var(--signal)] sm:size-24"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-1.5 rounded-full border border-signal/70"
      />
      <AnimatePresence mode="wait">
        <motion.span
          key={stop.place}
          initial={reduce ? false : { opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={reduce ? undefined : { opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.22 }}
          className="relative px-2 text-center"
        >
          <span className="block font-mono text-[8px] tracking-[0.2em] uppercase">
            {stop.note}
          </span>
          <span className="mt-0.5 block font-serif text-[13px] leading-none italic sm:text-sm">
            {stop.place}
          </span>
        </motion.span>
      </AnimatePresence>
    </motion.button>
  );
}
