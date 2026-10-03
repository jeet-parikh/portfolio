"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { photos } from "@/data/photos";
import { publicSrc } from "@/lib/base-path";
import { cn } from "@/lib/utils";
import { frame, Kicker, Reveal } from "./ui";

export function Pictures() {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const photo = photos[index] ?? photos[0];
  const closeRef = useRef<HTMLButtonElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);
  const optionRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const openRef = useRef(false);
  openRef.current = open;

  const choose = useCallback((next: number) => {
    const count = photos.length;
    const wrapped = ((next % count) + count) % count;
    setIndex(wrapped);
    if (openRef.current) return;
    const sheet = sheetRef.current;
    const node = optionRefs.current[wrapped];
    node?.focus({ preventScroll: true });
    if (!sheet || !node) return;
    const behavior = window.matchMedia("(prefers-reduced-motion: reduce)")
      .matches
      ? "auto"
      : "smooth";
    const sheetRect = sheet.getBoundingClientRect();
    const nodeRect = node.getBoundingClientRect();
    if (nodeRect.top < sheetRect.top + 4) {
      sheet.scrollBy({ top: nodeRect.top - sheetRect.top - 8, behavior });
    } else if (nodeRect.bottom > sheetRect.bottom - 4) {
      sheet.scrollBy({
        top: nodeRect.bottom - sheetRect.bottom + 8,
        behavior,
      });
    }
  }, []);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
      if (event.key === "ArrowRight") choose(index + 1);
      if (event.key === "ArrowLeft") choose(index - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [choose, index, open]);

  return (
    <section id="pictures" className={`${frame} relative py-16 md:py-20`}>
      <p
        aria-hidden
        className="pointer-events-none absolute top-6 right-0 font-serif text-[22vw] leading-none text-signal/[0.07] italic select-none"
      >
        04
      </p>
      <Reveal>
        <Kicker n="04">Pictures</Kicker>
        <h2 className="mt-3 max-w-3xl font-serif text-[clamp(2.6rem,5vw,4.2rem)] leading-[0.95] tracking-[-0.04em]">
          Out with a camera.
        </h2>
        <p className="mt-4 max-w-xl text-lg leading-relaxed">
          I take pictures when I&apos;m traveling. Pick one up.
        </p>
      </Reveal>

      <div className="mt-10 grid items-start gap-8 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-7">
          <button
            type="button"
            data-cursor="open"
            onClick={() => setOpen(true)}
            className="relative block w-fit max-w-full border border-ink bg-sheet p-0 shadow-[8px_8px_0_0_var(--signal)] transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-x-1 hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:translate-none"
          >
            <Image
              src={publicSrc(photo.src)}
              alt={photo.alt}
              width={photo.width}
              height={photo.height}
              sizes="(min-width: 1024px) 52vw, 92vw"
              className="h-auto max-h-[min(62vh,680px)] w-auto max-w-full object-contain"
            />
          </button>
          <div className="mt-4 flex items-baseline justify-between gap-4">
            <p className="font-mono text-[10px] tracking-[0.16em] text-muted uppercase">
              fig. {String(index + 1).padStart(2, "0")} — {photo.place}
            </p>
            <p className="font-mono text-[10px] tracking-[0.16em] text-signal tabular-nums">
              {String(index + 1).padStart(2, "0")} /{" "}
              {String(photos.length).padStart(2, "0")}
            </p>
          </div>
          <motion.p
            key={photo.id}
            initial={reduce ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="mt-3 max-w-md font-serif text-2xl leading-snug italic"
          >
            {photo.caption}
          </motion.p>
        </div>

        <div
          ref={sheetRef}
          className="grid max-h-72 grid-cols-3 content-start gap-2 overflow-y-auto overscroll-contain pr-1 lg:col-span-5 lg:h-[min(68vh,720px)] lg:max-h-none lg:grid-cols-2 lg:gap-3"
          role="listbox"
          aria-label="Pictures"
          onKeyDown={(event) => {
            if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") {
              return;
            }
            event.preventDefault();
            choose(event.key === "ArrowRight" ? index + 1 : index - 1);
          }}
        >
          {photos.map((item, itemIndex) => {
            const on = item.id === photo.id;
            return (
              <button
                key={item.id}
                ref={(node) => {
                  optionRefs.current[itemIndex] = node;
                }}
                type="button"
                role="option"
                aria-selected={on}
                data-cursor="hold"
                onClick={() => choose(itemIndex)}
                className={cn(
                  "bg-paper p-1.5 text-left",
                  on
                    ? "border border-signal shadow-[4px_4px_0_0_var(--signal)]"
                    : "border border-ink",
                )}
              >
                <span className="relative block aspect-square overflow-hidden bg-sheet">
                  <Image
                    src={publicSrc(item.thumb)}
                    alt=""
                    fill
                    sizes="160px"
                    className="object-cover"
                  />
                </span>
                <span className="mt-1.5 block truncate font-mono text-[9px] tracking-[0.14em] text-muted uppercase">
                  {item.place}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={photo.place}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-paper p-5 sm:p-10"
            initial={false}
            animate={{ opacity: 1 }}
            exit={{ opacity: 1 }}
            transition={{ duration: 0.18 }}
          >
            <button
              type="button"
              aria-label="Close picture"
              className="absolute inset-0 cursor-default bg-transparent"
              onClick={() => setOpen(false)}
            />
            <motion.div
              className="relative z-10 w-full max-w-5xl"
              initial={reduce ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0 }}
              transition={{ duration: 0.18 }}
            >
              <div className="border border-ink bg-paper p-3 shadow-[10px_10px_0_0_var(--signal)] sm:p-5">
                <Image
                  src={publicSrc(photo.src)}
                  alt={photo.alt}
                  width={photo.width}
                  height={photo.height}
                  sizes="90vw"
                  className="mx-auto max-h-[68vh] w-auto max-w-full object-contain"
                />
              </div>
              <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
                <div>
                  <p className="font-mono text-[10px] tracking-[0.16em] text-muted uppercase">
                    {photo.place}
                  </p>
                  <p className="mt-1 max-w-md font-serif text-2xl italic">
                    {photo.caption}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => choose(index - 1)}
                    className="border border-ink px-3 py-2 font-mono text-[10px] tracking-[0.16em] uppercase hover:bg-signal hover:text-paper"
                  >
                    Prev
                  </button>
                  <button
                    type="button"
                    onClick={() => choose(index + 1)}
                    className="border border-ink px-3 py-2 font-mono text-[10px] tracking-[0.16em] uppercase hover:bg-signal hover:text-paper"
                  >
                    Next
                  </button>
                  <button
                    ref={closeRef}
                    type="button"
                    onClick={() => setOpen(false)}
                    className="border border-ink bg-ink px-3 py-2 font-mono text-[10px] tracking-[0.16em] text-paper uppercase"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
