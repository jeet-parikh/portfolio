"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { type PhotoTone, photos } from "@/data/photos";
import { cn } from "@/lib/utils";
import { frame, Kicker, Reveal } from "./ui";

const tilts = [-2.4, 1.8, -1.2, 2.2, -1.8, 1.4];

export function Pictures() {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const photo = photos[index] ?? photos[0];
  const closeRef = useRef<HTMLButtonElement>(null);
  const optionRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const choose = useCallback((next: number) => {
    const count = photos.length;
    setIndex(((next % count) + count) % count);
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

      <div className="mt-10 grid items-start gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-7">
          <button
            type="button"
            data-cursor="open"
            onClick={() => setOpen(true)}
            className="group block w-full bg-transparent p-0 text-left"
          >
            <span className="block border border-ink bg-paper p-3 shadow-[8px_8px_0_0_var(--signal)] transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-x-1 group-hover:-translate-y-1 sm:p-4">
              <span className="relative block aspect-[3/2] overflow-hidden bg-sheet">
                <PrintArt tone={photo.tone} />
                <Loupe tone={photo.tone} />
              </span>
            </span>
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
          className="grid grid-cols-3 gap-3 sm:gap-4 lg:col-span-5 lg:grid-cols-2 lg:pt-6"
          role="listbox"
          aria-label="Pictures"
          onKeyDown={(event) => {
            if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") {
              return;
            }
            event.preventDefault();
            const next = event.key === "ArrowRight" ? index + 1 : index - 1;
            const wrapped =
              ((next % photos.length) + photos.length) % photos.length;
            choose(wrapped);
            optionRefs.current[wrapped]?.focus();
          }}
        >
          {photos.map((item, itemIndex) => {
            const on = item.id === photo.id;
            const tilt = reduce || on ? 0 : (tilts[itemIndex] ?? 0);
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
                style={{ ["--tilt" as string]: `${tilt}deg` }}
                className={cn(
                  "bg-paper p-1.5 text-left transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] [transform:rotate(var(--tilt))] hover:[transform:rotate(0deg)_translateY(-4px)]",
                  on
                    ? "border border-signal shadow-[4px_4px_0_0_var(--signal)]"
                    : "border border-ink",
                )}
              >
                <span className="relative block aspect-[3/2] overflow-hidden bg-sheet">
                  <PrintArt tone={item.tone} />
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
            className="fixed inset-0 z-[60] flex items-center justify-center bg-paper/92 p-5 sm:p-10"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduce ? undefined : { opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <button
              type="button"
              aria-label="Close picture"
              className="absolute inset-0 cursor-default bg-transparent"
              onClick={() => setOpen(false)}
            />
            <div className="relative z-10 w-full max-w-4xl">
              <div className="border border-ink bg-paper p-3 shadow-[10px_10px_0_0_var(--signal)] sm:p-5">
                <div className="relative aspect-[3/2] overflow-hidden bg-sheet">
                  <PrintArt tone={photo.tone} />
                </div>
              </div>
              <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
                <div>
                  <p className="font-mono text-[10px] tracking-[0.16em] text-muted uppercase">
                    {photo.place}
                  </p>
                  <p className="mt-1 font-serif text-2xl italic">
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
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}

function Loupe({ tone }: { tone: PhotoTone }) {
  const reduce = useReducedMotion();
  const [fine, setFine] = useState(false);
  const [spot, setSpot] = useState<{
    x: number;
    y: number;
    w: number;
    h: number;
  } | null>(null);

  useEffect(() => {
    const media = window.matchMedia("(hover: hover) and (pointer: fine)");
    const apply = () => setFine(media.matches);
    apply();
    media.addEventListener("change", apply);
    return () => media.removeEventListener("change", apply);
  }, []);

  if (reduce || !fine) return null;

  return (
    <span
      aria-hidden
      className="absolute inset-0"
      onMouseMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        setSpot({
          x: event.clientX - rect.left,
          y: event.clientY - rect.top,
          w: rect.width,
          h: rect.height,
        });
      }}
      onMouseLeave={() => setSpot(null)}
    >
      {spot ? (
        <span
          className="pointer-events-none absolute size-36 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full border-2 border-paper shadow-[0_0_0_1px_var(--ink)]"
          style={{ left: spot.x, top: spot.y }}
        >
          <span
            className="absolute top-0 left-0"
            style={{
              width: spot.w,
              height: spot.h,
              transform: `translate(${72 - spot.x * 2}px, ${72 - spot.y * 2}px) scale(2)`,
              transformOrigin: "top left",
            }}
          >
            <span className="relative block h-full w-full">
              <PrintArt tone={tone} />
            </span>
          </span>
        </span>
      ) : null}
    </span>
  );
}

function PrintArt({ tone }: { tone: PhotoTone }) {
  return (
    <span className="absolute inset-0 block">
      <Study tone={tone} />
      <span
        aria-hidden
        className="absolute inset-0 opacity-[0.18] mix-blend-multiply"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, color-mix(in srgb, var(--ink) 18%, transparent) 3px)",
        }}
      />
    </span>
  );
}

function Study({ tone }: { tone: PhotoTone }) {
  if (tone === "coast") {
    return (
      <>
        <span className="absolute inset-0 bg-[#d5e3ff]" />
        <span className="absolute inset-x-0 bottom-0 h-[44%] bg-[#1e4fd7]" />
        <span className="absolute inset-x-0 bottom-[40%] h-[8%] bg-[#8eb0ff]" />
        <span className="absolute right-[18%] bottom-[36%] aspect-square w-[18%] rounded-full bg-[#1e4fd7]" />
        <span className="absolute inset-x-0 bottom-[16%] h-px bg-[#f3f6fb]/80" />
      </>
    );
  }

  if (tone === "range") {
    return (
      <>
        <span className="absolute inset-0 bg-[#d5e3ff]" />
        <span
          className="absolute inset-x-0 bottom-0 h-[78%] bg-[#162033]"
          style={{
            clipPath:
              "polygon(0 72%, 16% 38%, 34% 58%, 52% 12%, 74% 46%, 100% 18%, 100% 100%, 0 100%)",
          }}
        />
      </>
    );
  }

  if (tone === "stone") {
    return (
      <>
        <span className="absolute inset-0 bg-[#162033]" />
        {[14, 30, 46, 62, 78].map((left) => (
          <span
            key={left}
            className="absolute bottom-[10%] w-[7%] bg-[#e7eef8]"
            style={{ left: `${left}%`, height: `${52 + (left % 7) * 4}%` }}
          />
        ))}
        <span className="absolute inset-x-0 bottom-0 h-[12%] bg-[#1e4fd7]" />
      </>
    );
  }

  if (tone === "blocks") {
    return (
      <>
        <span className="absolute inset-0 bg-[#162033]" />
        <span className="absolute inset-[7%] grid grid-cols-5 grid-rows-4 gap-1">
          {"abcdefghijklmnopqrst".split("").map((pane, cell) => (
            <span
              key={pane}
              className={cell === 7 ? "bg-[#8eb0ff]" : "bg-[#e7eef8]"}
              style={{ opacity: cell % 5 === 0 ? 0.4 : 0.92 }}
            />
          ))}
        </span>
      </>
    );
  }

  if (tone === "evening") {
    return (
      <>
        <span className="absolute inset-0 bg-gradient-to-b from-[#8eb0ff] to-[#162033]" />
        <span className="absolute bottom-[24%] left-[14%] aspect-square w-[12%] rounded-full bg-[#d5e3ff]" />
        <span className="absolute inset-x-0 bottom-0 h-[30%] bg-[#162033]" />
        <span className="absolute inset-x-0 bottom-[30%] h-px bg-[#f3f6fb]" />
      </>
    );
  }

  return (
    <>
      <span className="absolute inset-0 bg-[#d5e3ff]" />
      <span className="absolute inset-x-0 bottom-0 h-[46%] bg-[#162033]" />
      <span className="absolute top-[22%] left-[18%] h-[70%] w-[3px] origin-bottom -rotate-[16deg] bg-[#f3f6fb]" />
      <span className="absolute top-[22%] right-[18%] h-[70%] w-[3px] origin-bottom rotate-[16deg] bg-[#f3f6fb]" />
      <span className="absolute top-[18%] left-1/2 aspect-square w-[3%] -translate-x-1/2 rounded-full bg-[#1e4fd7]" />
    </>
  );
}
