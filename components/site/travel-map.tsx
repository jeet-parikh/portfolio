"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { travelPlaces, visitedCountries } from "@/data/travel";
import { publicSrc } from "@/lib/base-path";
import { constrainMap, type MapView, zoomMap } from "@/lib/map-view";

const initial: MapView = { x: 0, y: 0, zoom: 1 };
export function TravelMap() {
  const viewport = useRef<HTMLDivElement>(null);
  const current = useRef(initial);
  const [view, setView] = useState(initial);
  const [dragging, setDragging] = useState(false);
  const pointers = useRef(new Map<number, { x: number; y: number }>());
  const frame = useRef(0);
  const update = useCallback((next: MapView) => {
    current.current = next;
    if (!frame.current)
      frame.current = requestAnimationFrame(() => {
        frame.current = 0;
        setView(current.current);
      });
  }, []);

  function dimensions() {
    const r = viewport.current?.getBoundingClientRect();
    return r ? { width: r.width, height: r.height } : { width: 1, height: 1 };
  }
  function zoom(factor: number) {
    const { width, height } = dimensions();
    update(
      zoomMap(
        current.current,
        current.current.zoom * factor,
        width / 2,
        height / 2,
        width,
        height,
      ),
    );
  }
  useEffect(() => {
    const node = viewport.current;
    if (!node) return;
    function wheel(e: WheelEvent) {
      e.preventDefault();
      if (!node) return;
      const r = node.getBoundingClientRect();
      // Trackpad pinch and wheel zoom stay anchored under the pointer.
      update(
        zoomMap(
          current.current,
          current.current.zoom *
            Math.exp(-e.deltaY * (e.ctrlKey ? 0.012 : 0.002)),
          e.clientX - r.left,
          e.clientY - r.top,
          r.width,
          r.height,
        ),
      );
    }
    node.addEventListener("wheel", wheel, { passive: false });
    const observer = new ResizeObserver(() => {
      const r = node.getBoundingClientRect();
      update(constrainMap(current.current, r.width, r.height));
    });
    observer.observe(node);
    return () => {
      node.removeEventListener("wheel", wheel);
      observer.disconnect();
      cancelAnimationFrame(frame.current);
      frame.current = 0;
    };
  }, [update]);
  function release(id: number) {
    pointers.current.delete(id);
    setDragging(pointers.current.size > 0);
  }
  return (
    <div className="relative overflow-hidden border border-rule bg-[#e4edf7]">
      <div
        ref={viewport}
        role="application"
        aria-label="Travel map. Drag to pan, scroll or pinch to zoom. Arrow keys pan, plus and minus zoom, Home resets."
        // biome-ignore lint/a11y/noNoninteractiveTabindex: Keyboard-operable map surface.
        tabIndex={0}
        className={`travel-map relative aspect-[2/1] touch-none overflow-hidden ${dragging ? "is-dragging" : ""}`}
        onKeyDown={(e) => {
          const { width, height } = dimensions();
          const v = current.current;
          if (
            [
              "ArrowLeft",
              "ArrowRight",
              "ArrowUp",
              "ArrowDown",
              "+",
              "=",
              "-",
              "Home",
            ].includes(e.key)
          )
            e.preventDefault();
          if (e.key === "+" || e.key === "=") zoom(1.3);
          if (e.key === "-") zoom(1 / 1.3);
          if (e.key === "Home") update(initial);
          if (e.key.startsWith("Arrow"))
            update(
              constrainMap(
                {
                  ...v,
                  x:
                    v.x +
                    (e.key === "ArrowLeft"
                      ? 40
                      : e.key === "ArrowRight"
                        ? -40
                        : 0),
                  y:
                    v.y +
                    (e.key === "ArrowUp"
                      ? 40
                      : e.key === "ArrowDown"
                        ? -40
                        : 0),
                },
                width,
                height,
              ),
            );
        }}
        onPointerDown={(e) => {
          if (e.button !== 0) return;
          pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
          e.currentTarget.setPointerCapture(e.pointerId);
          setDragging(true);
          e.currentTarget.focus({ preventScroll: true });
        }}
        onPointerMove={(e) => {
          const old = pointers.current.get(e.pointerId);
          if (!old) return;
          const before = [...pointers.current.values()];
          pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
          const after = [...pointers.current.values()];
          const r = e.currentTarget.getBoundingClientRect();
          if (after.length === 1)
            update(
              constrainMap(
                {
                  ...current.current,
                  x: current.current.x + e.clientX - old.x,
                  y: current.current.y + e.clientY - old.y,
                },
                r.width,
                r.height,
              ),
            );
          else if (after.length === 2) {
            const distance = (a: typeof after) =>
              Math.hypot(a[0].x - a[1].x, a[0].y - a[1].y);
            const previousDistance = distance(before);
            if (previousDistance < 1) return;
            const bx = (before[0].x + before[1].x) / 2 - r.left;
            const by = (before[0].y + before[1].y) / 2 - r.top;
            const ax = (after[0].x + after[1].x) / 2 - r.left;
            const ay = (after[0].y + after[1].y) / 2 - r.top;
            const next = zoomMap(
              current.current,
              (current.current.zoom * distance(after)) / previousDistance,
              bx,
              by,
              r.width,
              r.height,
            );
            update(
              constrainMap(
                { ...next, x: next.x + ax - bx, y: next.y + ay - by },
                r.width,
                r.height,
              ),
            );
          }
        }}
        onPointerUp={(e) => release(e.pointerId)}
        onPointerCancel={(e) => release(e.pointerId)}
        onLostPointerCapture={(e) => release(e.pointerId)}
      >
        <div
          className="absolute inset-0 origin-top-left will-change-transform"
          style={{
            transform: `translate3d(${view.x}px, ${view.y}px, 0) scale(${view.zoom})`,
          }}
        >
          <Image
            src={publicSrc("/maps/visited-world.svg")}
            alt={`World map highlighting ${visitedCountries.length} visited countries, with Hawaii marked separately`}
            fill
            draggable={false}
            className="pointer-events-none select-none"
          />
          {travelPlaces.map((p) => (
            <span
              key={`${p.name}-${p.latitude}`}
              className="group absolute"
              style={{
                left: `${((p.longitude + 180) / 360) * 100}%`,
                top: `${((90 - p.latitude) / 180) * 100}%`,
              }}
            >
              <span
                className="relative block"
                title={`${p.name}${p.name === p.country ? "" : `, ${p.country}`}`}
                style={{
                  transform: `translate(-50%, -100%) scale(${1 / view.zoom})`,
                  transformOrigin: "50% 100%",
                }}
              >
                <svg
                  width="12"
                  height="16"
                  viewBox="0 0 12 16"
                  fill="#162033"
                  aria-hidden="true"
                  className="drop-shadow-sm"
                >
                  <path
                    d="M6 15S1 9 1 6a5 5 0 0 1 10 0c0 3-5 9-5 9Z"
                    stroke="white"
                    strokeWidth="1.3"
                  />
                  <circle cx="6" cy="6" r="1.8" fill="white" />
                </svg>
                <span
                  className={`pointer-events-none absolute bottom-full left-1/2 mb-2 -translate-x-1/2 whitespace-nowrap rounded bg-[#162033] px-2 py-1 text-[11px] text-white shadow-lg ${dragging ? "hidden" : "hidden group-hover:block"}`}
                >
                  {p.name}
                  {p.name !== p.country ? `, ${p.country}` : ""}
                </span>
              </span>
            </span>
          ))}
        </div>
      </div>
      <div className="absolute top-3 right-3 flex gap-1 shadow-sm">
        <button
          type="button"
          aria-label="Zoom out"
          disabled={view.zoom <= 1}
          onClick={() => zoom(1 / 1.4)}
          className="border border-rule bg-paper px-3 py-2 disabled:opacity-40"
        >
          −
        </button>
        <button
          type="button"
          aria-label="Zoom in"
          disabled={view.zoom >= 8}
          onClick={() => zoom(1.4)}
          className="border border-rule bg-paper px-3 py-2 disabled:opacity-40"
        >
          +
        </button>
        <button
          type="button"
          onClick={() => update(initial)}
          className="border border-rule bg-paper px-3 py-2 text-xs"
        >
          Reset
        </button>
      </div>
      <p className="pointer-events-none absolute bottom-2 left-3 font-mono text-[9px] text-[#162033]">
        Drag to pan · Scroll / pinch to zoom
      </p>
      <p className="pointer-events-none absolute right-3 bottom-2 text-[9px] text-[#162033]">
        Natural Earth
      </p>
    </div>
  );
}
