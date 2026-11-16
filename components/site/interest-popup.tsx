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
    dialog.current?.showModal();
    return () => {
      document.body.style.overflow = overflow;
      previousFocus?.focus({ preventScroll: true });
    };
  }, []);
  return createPortal(
    <dialog
      ref={dialog}
      aria-labelledby="interest-title"
      onCancel={onClose}
      className="interest-dialog m-auto max-h-[90dvh] w-[calc(100%-2rem)] max-w-3xl overflow-y-auto rounded border border-rule bg-sheet p-5 text-ink shadow-2xl backdrop:bg-black/70 backdrop:backdrop-blur-md sm:p-8"
    >
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <p className="text-[11px] font-medium tracking-[.14em] text-muted uppercase">
            Off the clock / {kind === "sports" ? "01" : "02"}
          </p>
          <h2
            className="mt-2 text-4xl font-semibold tracking-[-0.035em]"
            id="interest-title"
          >
            {kind === "sports" ? "Boston, all the way." : "A world to explore."}
          </h2>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close popup"
          className="inline-flex min-h-10 shrink-0 items-center gap-2 text-sm text-muted transition-colors hover:text-ink"
        >
          Close <span aria-hidden>×</span>
        </button>
      </div>
      {kind === "sports" ? <BostonFlight /> : <TravelMap />}
    </dialog>,
    document.body,
  );
}
