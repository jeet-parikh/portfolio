"use client";

import Image from "next/image";
import {
  type PointerEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { photos } from "@/data/photos";
import { publicSrc } from "@/lib/base-path";
import { coverSource, lens } from "@/lib/fluted";

type Photo = (typeof photos)[number];

// Each photo sits behind a small pane of the same glass, with a clear slot that follows
// the pointer. On touch screens nothing hovers, so the frame nearest the centre clears.
export function PhotoStrip() {
  const strip = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState<number | null>(null);
  const opener = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const root = strip.current;
    if (!root || matchMedia("(hover: hover) and (pointer: fine)").matches)
      return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries)
          e.target.classList.toggle("clear", e.isIntersecting);
      },
      { root, rootMargin: "0px -30% 0px -30%", threshold: 0.5 },
    );
    for (const el of root.querySelectorAll(".ph")) io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section id="photos" aria-labelledby="photos-h">
      <div className="wrap photos-head">
        <h2 className="label" id="photos-h">
          Photographs
        </h2>
        <p>Twenty-one countries so far</p>
      </div>
      <div className="strip" ref={strip}>
        {photos.map((photo, i) => (
          <Frame
            key={photo.id}
            photo={photo}
            onOpen={(el) => {
              opener.current = el;
              setOpen(i);
            }}
          />
        ))}
      </div>
      {open !== null && (
        <Viewer
          index={open}
          onMove={(i) => setOpen((i + photos.length) % photos.length)}
          onClose={() => {
            setOpen(null);
            opener.current?.focus({ preventScroll: true });
          }}
        />
      )}
    </section>
  );
}

function Frame({
  photo,
  onOpen,
}: {
  photo: Photo;
  onOpen: (el: HTMLButtonElement) => void;
}) {
  const host = useRef<HTMLButtonElement>(null);
  const img = useRef<HTMLImageElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);

  const build = useCallback(() => {
    const h = host.current;
    const i = img.current;
    const c = canvas.current;
    const ctx = c?.getContext("2d");
    if (
      !h ||
      !i ||
      !c ||
      !ctx ||
      !i.complete ||
      !i.naturalWidth ||
      !h.offsetWidth
    )
      return;
    const dpr = Math.min(devicePixelRatio || 1, 2);
    const src = coverSource(i, h.offsetWidth, h.offsetHeight, dpr);
    c.width = src.width;
    c.height = src.height;
    lens(ctx, src, {
      width: c.width,
      height: c.height,
      rib: Math.round(14 * dpr),
      strength: 1.6,
    });
  }, []);

  useEffect(() => {
    if (img.current?.complete) build();
    let timer = 0;
    const onResize = () => {
      clearTimeout(timer);
      timer = window.setTimeout(build, 150);
    };
    window.addEventListener("resize", onResize);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", onResize);
    };
  }, [build]);

  const slot = (e: PointerEvent<HTMLButtonElement>) =>
    e.currentTarget.style.setProperty(
      "--mx",
      `${e.clientX - e.currentTarget.getBoundingClientRect().left}px`,
    );
  // Slide the clear slot out the side the pointer left from.
  const leave = (e: PointerEvent<HTMLButtonElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty(
      "--mx",
      e.clientX > r.left + r.width / 2 ? `${r.width + 200}px` : "-200px",
    );
  };

  return (
    <button
      ref={host}
      type="button"
      className="ph"
      aria-label={`${photo.place}: ${photo.alt}. Open photo.`}
      onClick={(e) => onOpen(e.currentTarget)}
      onPointerMove={slot}
      onPointerLeave={leave}
    >
      <Image
        ref={img}
        src={publicSrc(photo.thumb)}
        alt=""
        width={480}
        height={640}
        sizes="280px"
        onLoad={build}
      />
      <span className="glass" aria-hidden>
        <canvas ref={canvas} />
      </span>
      <span className="ph-label">{photo.place}</span>
    </button>
  );
}

function Viewer({
  index,
  onMove,
  onClose,
}: {
  index: number;
  onMove: (i: number) => void;
  onClose: () => void;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const photo = photos[index];

  useEffect(() => {
    dialog.current?.showModal();
  }, []);

  useEffect(() => {
    const next = photos[(index + 1) % photos.length];
    new window.Image().src = publicSrc(next.src);
  }, [index]);

  return (
    <dialog
      ref={dialog}
      className="viewer"
      aria-label="Photo viewer"
      onCancel={onClose}
      onClick={(e) => {
        if (e.target === e.currentTarget) dialog.current?.close();
      }}
      onClose={onClose}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") onMove(index + 1);
        if (e.key === "ArrowLeft") onMove(index - 1);
      }}
    >
      <button
        className="x"
        type="button"
        onClick={() => dialog.current?.close()}
      >
        Close
      </button>
      <figure>
        <button
          type="button"
          className="viewer-img"
          onClick={() => onMove(index + 1)}
          aria-label="Next photo"
        >
          <Image
            src={publicSrc(photo.src)}
            alt={photo.alt}
            width={photo.width}
            height={photo.height}
            sizes="(max-width: 700px) 92vw, 1000px"
          />
        </button>
        <figcaption>
          <span className="label">
            {photo.place} · {index + 1} / {photos.length}
          </span>
          <i>{photo.caption}</i>
        </figcaption>
      </figure>
    </dialog>
  );
}
