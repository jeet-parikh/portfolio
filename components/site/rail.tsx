"use client";

import { sections } from "@/data/sections";
import { cn } from "@/lib/utils";
import { useScrollSpy } from "./providers";

export function Rail() {
  const { active } = useScrollSpy();

  return (
    <nav
      aria-label="Section index"
      className="fixed top-1/2 left-5 z-40 hidden -translate-y-1/2 flex-col gap-3 lg:flex"
    >
      {sections.map((section) => {
        const on = active === section.id;
        return (
          <a
            key={section.id}
            href={`#${section.id}`}
            data-cursor="go"
            aria-current={on ? "true" : undefined}
            className={cn(
              "group flex items-center gap-2 font-mono text-[10px] tracking-[0.18em] uppercase",
              on ? "text-signal" : "text-muted hover:text-ink",
            )}
          >
            <span
              className={cn(
                "h-px bg-current transition-all duration-300",
                on ? "w-8" : "w-3 group-hover:w-6",
              )}
            />
            <span>{section.n}</span>
            <span className="sr-only">{section.label}</span>
          </a>
        );
      })}
    </nav>
  );
}
