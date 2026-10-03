"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { travelPlaces } from "@/data/travel";
import { publicSrc } from "@/lib/base-path";

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
      {kind === "sports" ? <SportsGame /> : <TravelMap />}
    </dialog>,
    document.body,
  );
}

function SportsGame() {
  const [team, setTeam] = useState<"celtics" | "patriots">("celtics");
  const [phase, setPhase] = useState<"ready" | "playing" | "over">("ready");
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [player, setPlayer] = useState(50);
  const [drop, setDrop] = useState({ x: 50, y: -8 });
  const state = useRef({ player: 50, x: 50, y: -8, score: 0, lives: 3 });
  const arena = useRef<HTMLDivElement>(null);
  const green = team === "celtics";
  function move(x: number) {
    state.current.player = Math.max(8, Math.min(92, x));
    setPlayer(state.current.player);
  }
  function start() {
    state.current = {
      player: 50,
      x: 15 + Math.random() * 70,
      y: -8,
      score: 0,
      lives: 3,
    };
    setScore(0);
    setLives(3);
    setPlayer(50);
    setDrop({ x: state.current.x, y: -8 });
    setPhase("playing");
    arena.current?.focus();
  }
  useEffect(() => {
    if (phase !== "playing") return;
    let id = 0;
    let last = performance.now();
    function tick(now: number) {
      const s = state.current;
      s.y +=
        (Math.min(now - last, 40) / 1000) * (26 + Math.min(s.score, 20) * 1.7);
      last = now;
      if (s.y >= 84) {
        if (Math.abs(s.x - s.player) < 13) {
          s.score += 1;
          setScore(s.score);
        } else {
          s.lives -= 1;
          setLives(s.lives);
        }
        s.x = 12 + Math.random() * 76;
        s.y = -8;
        if (s.lives === 0) {
          setPhase("over");
          return;
        }
      }
      setDrop({ x: s.x, y: s.y });
      id = requestAnimationFrame(tick);
    }
    id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, [phase]);
  return (
    <div>
      <div className="mb-5 grid grid-cols-2 gap-3">
        {(["celtics", "patriots"] as const).map((t) => (
          <button
            key={t}
            type="button"
            aria-pressed={team === t}
            disabled={phase === "playing"}
            onClick={() => {
              setTeam(t);
              setPhase("ready");
            }}
            className={`border p-4 text-left disabled:opacity-60 ${team === t ? "border-signal bg-signal/10" : "border-rule"}`}
          >
            <span className="block text-2xl" aria-hidden>
              {t === "celtics" ? "☘" : "★"}
            </span>
            <span className="mt-2 block font-mono text-xs uppercase">
              {t === "celtics" ? "Boston Celtics" : "New England Patriots"}
            </span>
            <span className="mt-1 block text-xs text-muted">
              {t === "celtics"
                ? "Catch the basketballs."
                : "Catch the footballs."}
            </span>
          </button>
        ))}
      </div>
      <div className="mb-2 flex justify-between font-mono text-xs">
        <span>Score {String(score).padStart(2, "0")}</span>
        <span>Chances {lives} / 3</span>
      </div>
      <div
        ref={arena}
        role="application"
        aria-label="Catch game. Use left and right arrows or move your pointer to catch the falling balls."
        // biome-ignore lint/a11y/noNoninteractiveTabindex: Game arena uses arrow keys.
        tabIndex={0}
        onKeyDown={(e) => {
          if (
            phase === "playing" &&
            ["ArrowLeft", "ArrowRight"].includes(e.key)
          ) {
            e.preventDefault();
            move(state.current.player + (e.key === "ArrowLeft" ? -6 : 6));
          }
        }}
        onPointerMove={(e) => {
          if (phase !== "playing") return;
          const r = e.currentTarget.getBoundingClientRect();
          move(((e.clientX - r.left) / r.width) * 100);
        }}
        className="relative h-72 touch-none overflow-hidden rounded-sm border border-ink text-white sm:h-80"
        style={{ background: green ? "#063f2a" : "#101f3e" }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-4 border border-white/20"
        >
          <div className="absolute inset-x-0 top-1/2 border-t border-white/20" />
          <div className="absolute top-1/2 left-1/2 size-24 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/20" />
        </div>
        {phase === "playing" && (
          <span
            aria-hidden
            className="absolute -translate-x-1/2 text-3xl"
            style={{ left: `${drop.x}%`, top: `${drop.y}%` }}
          >
            {green ? "🏀" : "🏈"}
          </span>
        )}
        <span
          aria-hidden
          className="absolute bottom-3 flex h-9 w-20 -translate-x-1/2 items-center justify-center rounded-b-xl border-2 border-white bg-white/15 text-xl"
          style={{ left: `${player}%` }}
        >
          {green ? "☘" : "★"}
        </span>
        {phase !== "playing" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/35 p-5 text-center">
            <p className="font-serif text-4xl">
              {phase === "over"
                ? `${score} catches. Run it back?`
                : "Game night."}
            </p>
            <p className="mt-3 max-w-xs text-sm">
              Move left and right. Catch the falling balls. Three misses and
              it&apos;s the final whistle.
            </p>
            <button
              type="button"
              onClick={start}
              className="mt-5 border border-white bg-white px-5 py-3 font-mono text-xs text-black uppercase"
            >
              {phase === "over" ? "Play again" : "Tip off"}
            </button>
          </div>
        )}
      </div>
      <p className="mt-3 text-xs text-muted">
        Mouse, touch, or ← → keys · The pace picks up with every catch.
      </p>
      <output className="sr-only">
        {phase === "over"
          ? `Game over. ${score} catches.`
          : phase === "playing"
            ? "Game started."
            : "Choose a team and start."}
      </output>
    </div>
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
        Places I&apos;ve been, stories I&apos;ve brought back.
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
              src={publicSrc("/maps/world.svg")}
              alt="World map"
              fill
              className="object-contain"
            />
            {travelPlaces.map((p, i) => (
              <button
                key={`${p.name}-${p.latitude}-${p.longitude}`}
                type="button"
                aria-label={`Explore ${p.name}, ${p.country}`}
                onClick={() => setSelected(i)}
                className="absolute size-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-[#1e4fd7] shadow-md"
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
          Jeet&apos;s atlas / {travelPlaces.length} stops
        </p>
      </div>
      <div className="mt-5 border-l-2 border-signal pl-4" aria-live="polite">
        <h3 className="font-serif text-2xl">
          {place
            ? place.name
            : travelPlaces.length
              ? "Pick a pin."
              : "The map is ready. The stories are next."}
        </h3>
        <p className="mt-1 text-sm text-muted">
          {place
            ? `${place.country}${place.note ? ` — ${place.note}` : ""}`
            : travelPlaces.length
              ? "Select a destination to explore it."
              : "My travel pins are coming soon."}
        </p>
      </div>
      {travelPlaces.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {travelPlaces.map((p, i) => (
            <button
              key={`${p.name}-${p.latitude}`}
              type="button"
              onClick={() => setSelected(i)}
              className="border border-rule px-3 py-2 text-sm hover:border-signal"
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
