"use client";

import { useEffect, useRef } from "react";

export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const fine = window.matchMedia(
      "(hover: hover) and (pointer: fine)",
    ).matches;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (!fine || reduce) return;

    document.documentElement.classList.add("cursor-on");

    let x = 0;
    let y = 0;
    let rx = 0;
    let ry = 0;
    let shown = false;
    let raf = 0;

    const paint = () => {
      rx += (x - rx) * 0.18;
      ry += (y - ry) * 0.18;
      if (ring.current) {
        ring.current.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
      }
      raf = requestAnimationFrame(paint);
    };

    const move = (event: MouseEvent) => {
      x = event.clientX;
      y = event.clientY;
      if (!shown) {
        shown = true;
        rx = x;
        ry = y;
        if (dot.current) dot.current.style.opacity = "1";
        if (ring.current) ring.current.style.opacity = "1";
      }
      if (dot.current) {
        dot.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      }
      const target = event.target instanceof Element ? event.target : null;
      const hot = target?.closest("[data-cursor]");
      const text = hot instanceof HTMLElement ? (hot.dataset.cursor ?? "") : "";
      if (label.current) label.current.textContent = text;
      if (inner.current) inner.current.dataset.hot = text ? "true" : "false";
    };

    window.addEventListener("mousemove", move, { passive: true });
    raf = requestAnimationFrame(paint);

    return () => {
      document.documentElement.classList.remove("cursor-on");
      window.removeEventListener("mousemove", move);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div ref={dot} className="cursor-dot" aria-hidden />
      <div ref={ring} className="cursor-ring" aria-hidden>
        <div ref={inner} className="cursor-ring-inner">
          <span ref={label} className="cursor-label" />
        </div>
      </div>
    </>
  );
}
