"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const KONAMI = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "KeyB",
  "KeyA",
];

const pieces = Array.from({ length: 14 }, (_, index) => ({
  id: index,
  left: `${(index * 7.1) % 96}%`,
  delay: index * 0.06,
  size: 8 + (index % 4) * 7,
}));

export function Konami() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let buffer: string[] = [];

    const onKey = (event: KeyboardEvent) => {
      const target = event.target;
      if (
        target instanceof HTMLInputElement ||
        target instanceof HTMLTextAreaElement
      ) {
        return;
      }
      if (event.key === "Escape") {
        setOpen(false);
        return;
      }
      buffer = [...buffer, event.code].slice(-KONAMI.length);
      if (KONAMI.every((code, index) => buffer[index] === code)) {
        setOpen(true);
        buffer = [];
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (!open) return;
    const id = window.setTimeout(() => setOpen(false), 4600);
    return () => window.clearTimeout(id);
  }, [open]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.button
          type="button"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-[90] grid place-items-center bg-ink/92 px-6 text-paper"
        >
          {pieces.map((piece) => (
            <motion.span
              key={piece.id}
              aria-hidden
              className="absolute top-0 bg-signal"
              style={{
                left: piece.left,
                width: piece.size,
                height: piece.size,
              }}
              initial={{ y: -24, opacity: 0, rotate: 0 }}
              animate={{ y: "100vh", opacity: [0, 1, 0], rotate: 180 }}
              transition={{ duration: 2.5, delay: piece.delay, ease: "easeIn" }}
            />
          ))}
          <span className="relative max-w-xl text-center">
            <span className="font-mono text-[11px] tracking-[0.22em] text-mark uppercase">
              Margin note
            </span>
            <span className="mt-4 block font-serif text-5xl leading-[0.95] md:text-7xl">
              You found the margin.
            </span>
            <span className="mt-4 block font-serif text-2xl text-mark italic">
              The fourth batch of tomatoes never stood a chance.
            </span>
          </span>
        </motion.button>
      ) : null}
    </AnimatePresence>
  );
}
