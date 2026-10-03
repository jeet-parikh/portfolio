"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { BostonFlight } from "./boston-flight";
import { TravelMap } from "./travel-map";

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
