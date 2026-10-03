"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { travelPlaces, visitedCountries } from "@/data/travel";
import { publicSrc } from "@/lib/base-path";
import { BostonFlight } from "./boston-flight";

export function InterestPopup({
  kind,
  onClose,
}: {
  kind: "sports" | "traveling";
  onClose: () => void;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const previousFocus = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    // Native dialogs occupy the browser's top layer, above any z-index.
    // Move the existing cursor into that layer while this dialog is open.
    const cursorNodes = Array.from(
      document.querySelectorAll<HTMLElement>(".cursor-dot, .cursor-ring"),
    ).map((node) => {
      const marker = document.createComment("cursor position");
      node.before(marker);
      dialog.current?.append(node);
      return { node, marker };
    });
    dialog.current?.showModal();
    return () => {
      for (const { node, marker } of cursorNodes) {
        marker.replaceWith(node);
      }
      document.body.style.overflow = overflow;
      previousFocus?.focus({ preventScroll: true });
    };
  }, []);
  return createPortal(
    <dialog
      ref={dialog}
      aria-labelledby="interest-title"
      onCancel={onClose}
      className="interest-dialog m-auto max-h-[90dvh] w-[calc(100%-2rem)] max-w-3xl overflow-y-auto border border-ink bg-paper p-5 text-ink shadow-2xl backdrop:bg-black/65 sm:p-8"
    >
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <p className="font-mono text-[10px] tracking-[.2em] text-signal uppercase">
            Off the clock / {kind === "sports" ? "01" : "02"}
          </p>
          <h2 className="mt-2 font-serif text-4xl" id="interest-title">
            {kind === "sports" ? "Boston, all the way." : "A world to explore."}
          </h2>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close popup"
          className="border border-ink px-3 py-2 text-sm"
        >
          Close ×
        </button>
      </div>
      {kind === "sports" ? <BostonFlight /> : <TravelMap />}
    </dialog>,
    document.body,
  );
}

function TravelMap() {
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [selected, setSelected] = useState<number | null>(null);
  const drag = useRef<{ x: number; y: number } | null>(null);
  const place = selected === null ? null : travelPlaces[selected];
  function reset() {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  }
  return (
    <div>
      <p className="mb-5 text-muted">
        {visitedCountries.length} countries, and Hawaii. A few places I&apos;ve
        called adventure.
      </p>
      <div className="relative overflow-hidden border border-rule bg-[#e4edf7]">
        <div
          className="relative aspect-[2/1] touch-none overflow-hidden"
          onPointerDown={(e) => {
            if ((e.target as HTMLElement).closest("button")) return;
            drag.current = { x: e.clientX, y: e.clientY };
            e.currentTarget.setPointerCapture(e.pointerId);
          }}
          onPointerUp={() => {
            drag.current = null;
          }}
          onPointerCancel={() => {
            drag.current = null;
          }}
          onPointerMove={(e) => {
            if (!drag.current) return;
            const dx = e.clientX - drag.current.x;
            const dy = e.clientY - drag.current.y;
            drag.current = { x: e.clientX, y: e.clientY };
            setPan((p) => ({
              x: Math.max(-300, Math.min(300, p.x + dx)),
              y: Math.max(-180, Math.min(180, p.y + dy)),
            }));
          }}
        >
          <div
            className="absolute inset-0"
            style={{
              transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
            }}
          >
            <Image
              src={publicSrc("/maps/visited-world.svg")}
              alt="World map highlighting the 20 countries Jeet has visited"
              fill
              className="object-contain"
            />
            {travelPlaces.map((p, i) => (
              <button
                key={`${p.name}-${p.latitude}-${p.longitude}`}
                type="button"
                aria-label={`Explore ${p.name}, ${p.country}`}
                onClick={() => setSelected(i)}
                className={`absolute size-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white shadow-md ${selected === i ? "bg-[#d44b25] ring-2 ring-[#d44b25]/40" : "bg-[#162033]"}`}
                style={{
                  left: `${((p.longitude + 180) / 360) * 100}%`,
                  top: `${((90 - p.latitude) / 180) * 100}%`,
                }}
              />
            ))}
          </div>
        </div>
        <div className="absolute top-3 right-3 flex gap-1">
          <button
            type="button"
            aria-label="Zoom out"
            onClick={() => setZoom((z) => Math.max(1, z - 0.5))}
            className="border border-rule bg-paper px-3 py-2"
          >
            −
          </button>
          <button
            type="button"
            aria-label="Zoom in"
            onClick={() => setZoom((z) => Math.min(3, z + 0.5))}
            className="border border-rule bg-paper px-3 py-2"
          >
            +
          </button>
          <button
            type="button"
            onClick={reset}
            className="border border-rule bg-paper px-3 py-2 text-xs"
          >
            Reset
          </button>
        </div>
        <p className="absolute bottom-3 left-3 font-mono text-[9px] tracking-widest text-[#162033] uppercase">
          Jeet&apos;s atlas / {visitedCountries.length} countries
        </p>
      </div>
      <div className="mt-5 border-l-2 border-signal pl-4" aria-live="polite">
        <h3 className="font-serif text-2xl">
          {place
            ? place.name
            : travelPlaces.length
              ? "Where I’ve been."
              : "The map is ready. The stories are next."}
        </h3>
        <p className="mt-1 text-sm text-muted">
          {place
            ? `${place.country}${place.note ? ` — ${place.note}` : ""}`
            : travelPlaces.length
              ? "Blue countries are places I’ve visited. Pick a pin or a destination below; country pins mark approximate locations."
              : "My travel pins are coming soon."}
        </p>
      </div>
      {travelPlaces.length > 0 && (
        <div className="mt-4 flex max-h-36 flex-wrap gap-2 overflow-y-auto">
          {travelPlaces.map((p, i) => (
            <button
              key={`${p.name}-${p.latitude}`}
              type="button"
              onClick={() => setSelected(i)}
              aria-pressed={selected === i}
              className={`border px-3 py-2 text-sm hover:border-signal ${selected === i ? "border-signal bg-signal/10" : "border-rule"}`}
            >
              {p.name}
            </button>
          ))}
        </div>
      )}
      <p className="mt-5 text-xs text-muted">
        Drag to explore · Use + / − to zoom · Map: Natural Earth
      </p>
    </div>
  );
}
