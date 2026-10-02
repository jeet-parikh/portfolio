"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export const frame = "px-5 sm:px-8 lg:pl-24 lg:pr-14";

export function Kicker({
  n,
  children,
  className,
}: {
  n?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "font-mono text-[11px] uppercase tracking-[0.22em] text-muted",
        className,
      )}
    >
      {n ? <span className="mr-3 text-signal">{n}</span> : null}
      {children}
    </p>
  );
}

export function CropMarks() {
  const arm = "absolute size-3.5 border-signal";
  return (
    <div aria-hidden className="pointer-events-none absolute inset-2">
      <span className={`${arm} top-0 left-0 border-t border-l`} />
      <span className={`${arm} top-0 right-0 border-t border-r`} />
      <span className={`${arm} bottom-0 left-0 border-b border-l`} />
      <span className={`${arm} right-0 bottom-0 border-r border-b`} />
    </div>
  );
}

export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
