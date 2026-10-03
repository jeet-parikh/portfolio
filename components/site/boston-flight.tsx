"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { publicSrc } from "@/lib/base-path";
import {
  flap,
  freshFlight,
  GAP,
  HEIGHT,
  PIPE_WIDTH,
  PLAYER_X,
  stepFlight,
  WIDTH,
} from "@/lib/boston-flight";

const teams = {
  celtics: {
    name: "Boston Celtics",
    short: "CELTICS",
    color: "#007a33",
    accent: "#c8aa65",
    sky: "#092b22",
    venue: "THE GARDEN",
    logo: "/sports/celtics.png",
  },
  patriots: {
    name: "New England Patriots",
    short: "PATRIOTS",
    color: "#c8102e",
    accent: "#b0b7bc",
    sky: "#09172d",
    venue: "FOXBOROUGH",
    logo: "/sports/patriots.png",
  },
};
type Team = keyof typeof teams;
export function BostonFlight() {
  const [team, setTeam] = useState<Team>("celtics");
  const [phase, setPhase] = useState<"ready" | "playing" | "over">("ready");
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(0);
  const [paused, setPaused] = useState(false);
  const [sound, setSound] = useState(false);
  const canvas = useRef<HTMLCanvasElement>(null);
  const arena = useRef<HTMLDivElement>(null);
  const flight = useRef(freshFlight());
  const audio = useRef<AudioContext | null>(null);
  const skin = teams[team];
  useEffect(() => {
    try {
      setBest(Number(localStorage.getItem(`boston-flight-${team}`)) || 0);
    } catch {}
  }, [team]);
  useEffect(
    () => () => {
      void audio.current?.close();
    },
    [],
  );
  function tone(frequency: number) {
    if (!sound) return;
    try {
      audio.current ??= new AudioContext();
      void audio.current.resume();
      const oscillator = audio.current.createOscillator();
      const gain = audio.current.createGain();
      oscillator.type = "triangle";
      oscillator.frequency.value = frequency;
      gain.gain.setValueAtTime(0.06, audio.current.currentTime);
      gain.gain.exponentialRampToValueAtTime(
        0.001,
        audio.current.currentTime + 0.12,
      );
      oscillator.connect(gain);
      gain.connect(audio.current.destination);
      oscillator.start();
      oscillator.stop(audio.current.currentTime + 0.12);
    } catch {}
  }
  function jump() {
    if (phase !== "playing") {
      flight.current = freshFlight();
      setScore(0);
      setPaused(false);
      setPhase("playing");
    } else if (paused) {
      setPaused(false);
    }
    flap(flight.current);
    tone(450);
    arena.current?.focus();
  }
  useEffect(() => {
    function visibility() {
      if (document.hidden && phase === "playing") setPaused(true);
    }
    document.addEventListener("visibilitychange", visibility);
    return () => document.removeEventListener("visibilitychange", visibility);
  }, [phase]);
  useEffect(() => {
    const c = canvas.current;
    const ctx = c?.getContext("2d");
    if (!c || !ctx) return;
    ctx.setTransform(2, 0, 0, 2, 0, 0);
    const logo = new window.Image();
    logo.src = publicSrc(skin.logo);
    let id = 0;
    let last = performance.now();
    let accumulator = 0;
    function render(now: number) {
      if (!ctx) return;
      const s = flight.current;
      const elapsed = Math.min((now - last) / 1000, 0.05);
      last = now;
      if (phase === "playing" && !paused && !s.dead) {
        accumulator += elapsed;
        while (accumulator >= 1 / 120) {
          stepFlight(s, 1 / 120);
          accumulator -= 1 / 120;
        }
        setScore(s.score);
        if (s.dead) {
          setPhase("over");
          setBest((value) => {
            const next = Math.max(value, s.score);
            try {
              localStorage.setItem(`boston-flight-${team}`, String(next));
            } catch {}
            return next;
          });
        }
      }
      ctx.fillStyle = skin.sky;
      ctx.fillRect(0, 0, WIDTH, HEIGHT);
      // Stadium skyline and floodlights move slower than the obstacles.
      for (let i = 0; i < 12; i++) {
        const x = ((((i * 65 - s.distance * 0.18) % 780) + 780) % 780) - 65;
        ctx.fillStyle = "#ffffff09";
        ctx.fillRect(x, 160 - (i % 4) * 15, 48, 172);
        ctx.fillStyle = "#ffffff12";
        for (let j = 0; j < 4; j++) ctx.fillRect(x + 8 + j * 9, 180, 3, 3);
      }
      ctx.fillStyle = "#ffffff18";
      ctx.font = "bold 38px monospace";
      ctx.textAlign = "center";
      ctx.fillText(skin.venue, WIDTH / 2, 75);
      ctx.strokeStyle = "#ffffff13";
      ctx.lineWidth = 1;
      for (let i = 0; i < 6; i++) {
        ctx.beginPath();
        ctx.moveTo(i * 96 - ((s.distance * 0.4) % 96), 332);
        ctx.lineTo(i * 96 - ((s.distance * 0.4) % 96) + 40, 250);
        ctx.stroke();
      }
      for (const g of s.gates) {
        const top = g.center - GAP / 2;
        const bottom = g.center + GAP / 2;
        ctx.fillStyle = skin.color;
        ctx.fillRect(g.x, 0, PIPE_WIDTH, top);
        ctx.fillRect(g.x, bottom, PIPE_WIDTH, 332 - bottom);
        ctx.fillStyle = skin.accent;
        ctx.fillRect(g.x - 4, top - 12, PIPE_WIDTH + 8, 12);
        ctx.fillRect(g.x - 4, bottom, PIPE_WIDTH + 8, 12);
        ctx.fillStyle = "#ffffff25";
        ctx.fillRect(g.x + 6, 0, 5, top - 12);
        ctx.fillRect(g.x + 6, bottom + 12, 5, 320 - bottom);
        ctx.save();
        ctx.translate(g.x + PIPE_WIDTH / 2, top - 28);
        ctx.rotate(-Math.PI / 2);
        ctx.fillStyle = "#ffffffbb";
        ctx.font = "bold 10px monospace";
        ctx.fillText(skin.short, 0, 0);
        ctx.restore();
      }
      ctx.fillStyle = skin.color;
      ctx.fillRect(0, 332, WIDTH, 28);
      ctx.fillStyle = skin.accent;
      ctx.fillRect(0, 332, WIDTH, 3);
      ctx.fillStyle = "#ffffff55";
      for (let i = 0; i < 20; i++)
        ctx.fillRect(i * 30 - (s.distance % 30), 346, 12, 2);
      ctx.save();
      ctx.translate(PLAYER_X, s.y);
      ctx.rotate(Math.max(-0.4, Math.min(1, s.velocity / 500)));
      ctx.shadowColor = skin.accent;
      ctx.shadowBlur = 12;
      if (logo.complete && logo.naturalWidth)
        ctx.drawImage(logo, -24, -24, 48, 48);
      ctx.restore();
      id = requestAnimationFrame(render);
    }
    id = requestAnimationFrame(render);
    return () => cancelAnimationFrame(id);
  }, [phase, paused, skin, team]);
  return (
    <div>
      <div className="mb-3 flex items-center justify-between gap-2 font-mono text-xs">
        <span>
          Score {String(score).padStart(2, "0")}{" "}
          <span className="ml-3 text-muted">
            Best {String(best).padStart(2, "0")}
          </span>
        </span>
        <div className="flex gap-2">
          <button
            type="button"
            aria-pressed={sound}
            onClick={() => setSound((v) => !v)}
            className="border border-rule px-2 py-1"
          >
            Sound {sound ? "on" : "off"}
          </button>
          {phase === "playing" && (
            <button
              type="button"
              onClick={() => setPaused((v) => !v)}
              className="border border-rule px-2 py-1"
            >
              {paused ? "Resume" : "Pause"}
            </button>
          )}
        </div>
      </div>
      <div
        ref={arena}
        role="application"
        aria-label="Boston Flight. Tap, click, or press Space or Arrow Up to flap. Avoid the stadium gates."
        // biome-ignore lint/a11y/noNoninteractiveTabindex: Game surface receives flap and pause keys.
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.target !== e.currentTarget) return;
          if ([" ", "ArrowUp"].includes(e.key)) {
            e.preventDefault();
            if (!e.repeat) jump();
          }
          if (e.key.toLowerCase() === "p" && phase === "playing")
            setPaused((v) => !v);
        }}
        onPointerDown={(e) => {
          if ((e.target as HTMLElement).closest("button")) return;
          e.preventDefault();
          jump();
        }}
        className="relative touch-none overflow-hidden border border-ink bg-[#09172d]"
      >
        <canvas
          ref={canvas}
          width={WIDTH * 2}
          height={HEIGHT * 2}
          className="block aspect-[4/3] w-full"
          aria-label="Team avatar flying through scrolling stadium gates"
        />
        {(phase !== "playing" || paused) && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/55 px-5 text-center text-white backdrop-blur-[2px]">
            <p className="font-mono text-[10px] tracking-[.25em] uppercase">
              {skin.venue} / Boston Flight
            </p>
            <h3 className="mt-2 font-serif text-3xl sm:text-5xl">
              {paused
                ? "Timeout."
                : phase === "over"
                  ? "Final whistle."
                  : "Take flight."}
            </h3>
            <p className="mt-3 max-w-xs text-sm text-white/80">
              {phase === "over"
                ? `${score} gates cleared. One more run?`
                : "Fly your team's colors through the stadium gates. Tap to rise. Keep the streak alive."}
            </p>
            {!paused && (
              <fieldset className="mt-4 flex gap-3">
                <legend className="sr-only">Choose your team</legend>
                {(Object.keys(teams) as Team[]).map((t) => (
                  <button
                    key={t}
                    type="button"
                    aria-label={`Play as ${teams[t].name}`}
                    aria-pressed={team === t}
                    onClick={() => {
                      setTeam(t);
                      flight.current = freshFlight();
                      setScore(0);
                      setPhase("ready");
                    }}
                    className={`flex flex-col items-center gap-1 border px-4 py-2 transition-colors ${team === t ? "border-white bg-white/20" : "border-white/30 hover:bg-white/10"}`}
                  >
                    <Image
                      src={publicSrc(teams[t].logo)}
                      alt=""
                      width={44}
                      height={44}
                      className="h-11 w-11 object-contain"
                    />
                    <span className="font-mono text-[9px] uppercase">
                      {teams[t].short}
                    </span>
                  </button>
                ))}
              </fieldset>
            )}
            <button
              type="button"
              onClick={jump}
              className="mt-3 border border-white bg-white px-5 py-3 font-mono text-xs text-black uppercase"
            >
              {paused
                ? "Resume flight"
                : phase === "over"
                  ? "Run it back"
                  : "Let's fly"}
            </button>
          </div>
        )}
      </div>
      <p className="mt-3 text-xs text-muted">
        Tap / click / Space / ↑ to flap · P to pause · One collision ends the
        run.
      </p>
      <output className="sr-only">
        {phase === "over"
          ? `Game over. ${score} gates cleared.`
          : paused
            ? "Paused."
            : phase === "playing"
              ? "Game started."
              : "Choose your team."}
      </output>
    </div>
  );
}
