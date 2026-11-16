"use client";

import { useEffect, useRef } from "react";
import { blob, lens } from "@/lib/fluted";

// The whole page sits on a pane of near-black fluted glass with one electric-blue light
// behind it. The light is painted small and read through the reeds, so a round glow
// comes through as soft vertical bands. It follows the pointer; on touch screens it
// rests in the hero and drifts as the page scrolls.
export function GlassBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const field = document.createElement("canvas");
    const f = field.getContext("2d");
    if (!f) return;

    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = matchMedia("(hover: hover) and (pointer: fine)").matches;
    const rest = { x: 0.66, y: 0.4 };
    const light = {
      x: rest.x,
      y: rest.y + 0.12,
      tx: rest.x,
      ty: rest.y,
      a: reduce ? 1 : 0,
    };
    let rib = 26;
    let raf = 0;

    const paint = () => {
      const w = field.width;
      const h = field.height;
      const x = light.x * w;
      const y = light.y * h;
      const r = Math.max(w, h);
      f.globalCompositeOperation = "source-over";
      f.fillStyle = "#050607";
      f.fillRect(0, 0, w, h);
      f.globalCompositeOperation = "lighter";
      blob(f, x, y, r * 0.75, r * 0.75, [
        [0, `rgba(40,90,200,${0.09 * light.a})`],
        [1, "rgba(40,90,200,0)"],
      ]);
      blob(f, x, y, r * 0.36, r * 0.46, [
        [0, `rgba(110,166,255,${0.32 * light.a})`],
        [0.3, `rgba(56,124,245,${0.24 * light.a})`],
        [0.65, `rgba(22,60,170,${0.1 * light.a})`],
        [1, "rgba(10,30,90,0)"],
      ]);
      f.globalCompositeOperation = "source-over";
    };
    const draw = () => {
      paint();
      lens(ctx, field, {
        width: canvas.width,
        height: canvas.height,
        rib,
        power: 2.4,
        strength: 2.2,
        scale: field.width / canvas.width,
      });
    };
    const tick = () => {
      light.x += (light.tx - light.x) * 0.1;
      light.y += (light.ty - light.y) * 0.1;
      light.a += (1 - light.a) * 0.05;
      draw();
      raf =
        Math.hypot(light.tx - light.x, light.ty - light.y) > 0.0008 ||
        light.a < 0.995
          ? requestAnimationFrame(tick)
          : 0;
    };
    const nudge = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };
    const size = () => {
      // One canvas pixel per CSS pixel: the light is soft, and the crisp reed edges come
      // from the CSS overlay, which lines up because both use the same reed width.
      canvas.width = innerWidth;
      canvas.height = innerHeight;
      field.width = Math.max(1, Math.round(innerWidth / 4));
      field.height = Math.max(1, Math.round(innerHeight / 4));
      rib = Math.round(
        Number.parseFloat(
          getComputedStyle(document.documentElement).getPropertyValue("--rib"),
        ) || 26,
      );
      draw();
    };

    const onPointer = (e: PointerEvent) => {
      light.tx = e.clientX / innerWidth;
      light.ty = e.clientY / innerHeight;
      nudge();
    };
    const onLeave = () => {
      light.tx = rest.x;
      light.ty = rest.y;
      nudge();
    };
    const onScroll = () => {
      const t = scrollY / innerHeight;
      light.tx = 0.5 + 0.2 * Math.sin(t * 1.1);
      light.ty = 0.42 + 0.08 * Math.cos(t * 0.9);
      nudge();
    };
    let resizeTimer = 0;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(size, 120);
    };

    if (!reduce && fine) {
      addEventListener("pointermove", onPointer, { passive: true });
      document.addEventListener("pointerleave", onLeave);
    } else if (!reduce) {
      addEventListener("scroll", onScroll, { passive: true });
    }
    addEventListener("resize", onResize);
    size();
    nudge();

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(resizeTimer);
      removeEventListener("pointermove", onPointer);
      document.removeEventListener("pointerleave", onLeave);
      removeEventListener("scroll", onScroll);
      removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <>
      <canvas ref={canvasRef} className="glass-bg" aria-hidden />
      <div className="glass-reeds" aria-hidden />
    </>
  );
}
