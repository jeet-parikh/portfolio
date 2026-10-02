"use client";

import { useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { openRecord } from "@/lib/open-record";

const signals = [
  {
    id: "bloomberg",
    value: 100,
    suffix: "M+",
    label: "records a day",
    detail: "Bloomberg pipeline",
  },
  {
    id: "pariglo",
    value: 8000,
    suffix: "+",
    label: "downloads, 50 countries",
    detail: "Kare & PlantVision",
  },
  {
    id: "yale-cs",
    value: 20000,
    suffix: "+",
    label: "people on y/cs products",
    detail: "Yale Computer Society",
  },
  {
    id: "utah-research",
    value: 4614,
    suffix: "",
    label: "CUDA-core years",
    detail: "Utah materials lab",
  },
];

function useCount(value: number, active: boolean) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (!active || reduce) {
      setCurrent(value);
      return;
    }

    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / 1100);
      const eased = 1 - (1 - t) ** 3;
      setCurrent(Math.round(value * eased));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, value]);

  return current;
}

function Signal({
  item,
  active,
}: {
  item: (typeof signals)[number];
  active: boolean;
}) {
  const current = useCount(item.value, active);
  const formatted = new Intl.NumberFormat("en-US").format(current);

  return (
    <button
      type="button"
      data-cursor="read"
      onClick={() => openRecord(item.id)}
      className="group border-t border-rule px-1 py-7 text-left transition-colors hover:bg-mark/40 md:px-8 md:[&:nth-child(odd)]:border-r"
    >
      <span className="block font-serif text-[clamp(3.6rem,8vw,6.4rem)] leading-none tracking-[-0.05em] transition-colors group-hover:text-signal">
        {formatted}
        {item.suffix}
      </span>
      <span className="mt-4 flex items-baseline justify-between gap-4">
        <span className="font-mono text-[11px] tracking-[0.16em] uppercase">
          {item.label}
        </span>
        <span className="font-serif text-lg text-muted italic group-hover:text-ink">
          {item.detail}
        </span>
      </span>
    </button>
  );
}

export function Signals() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });

  return (
    <div ref={ref} className="grid md:grid-cols-2">
      {signals.map((item) => (
        <Signal key={item.id} item={item} active={inView} />
      ))}
    </div>
  );
}
