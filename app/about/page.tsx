"use client";

import { useEffect } from "react";

export default function AboutRedirect() {
  useEffect(() => {
    window.location.replace(`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/#who`);
  }, []);

  return (
    <main className="grid min-h-[60vh] place-items-center px-6 pt-28 font-mono text-[11px] tracking-[0.18em] uppercase">
      <a href={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/#who`}>Continue</a>
    </main>
  );
}
