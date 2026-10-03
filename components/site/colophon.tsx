"use client";

import { BrandLogo } from "@/components/brand-logo";
import { frame, Kicker, Reveal } from "./ui";

const links = [
  { label: "Email", href: "mailto:jeet.parikh@yale.edu", cursor: "mail" },
  {
    label: "GitHub",
    href: "https://github.com/jeet-parikh",
    cursor: "open",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/parikhjeet",
    cursor: "open",
  },
];

export function Colophon() {
  const year = new Date().getFullYear();

  return (
    <section id="reach" className={`${frame} relative py-20 md:py-28`}>
      <p
        aria-hidden
        className="pointer-events-none absolute top-4 right-0 font-serif text-[24vw] leading-none text-signal/[0.07] italic select-none"
      >
        05
      </p>
      <Reveal>
        <Kicker n="05">Reach</Kicker>
        <h2 className="mt-3 max-w-3xl font-serif text-[clamp(2.6rem,5vw,4.2rem)] leading-[0.95] tracking-[-0.04em]">
          If you want to
          <br />
          build something,
          <br />
          <span className="text-signal italic">find me.</span>
        </h2>
        <p className="mt-6 max-w-md text-lg leading-relaxed">
          A job, a project, or just to say hi.
        </p>
      </Reveal>

      <div className="-mx-5 mt-12 grid border-ink border-y sm:-mx-8 lg:mx-0 lg:grid-cols-3">
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target={link.href.startsWith("http") ? "_blank" : undefined}
            rel={link.href.startsWith("http") ? "noreferrer" : undefined}
            data-cursor={link.cursor}
            className="border-ink border-b px-5 py-6 font-serif text-3xl transition-colors last:border-b-0 hover:bg-signal hover:text-paper sm:px-8 lg:border-r lg:border-b-0 lg:last:border-r-0"
          >
            {link.label}
          </a>
        ))}
      </div>

      <div className="mt-8 flex flex-col gap-3 font-mono text-[10px] tracking-[0.16em] text-muted uppercase sm:flex-row sm:items-end sm:justify-between">
        <p>Instrument Serif · Instrument Sans · IBM Plex Mono</p>
        <p>New Haven / Irvine</p>
        <a
          href="#who"
          data-cursor="go"
          aria-label="Jeet Parikh — back to top"
          className="flex items-center gap-3"
        >
          <BrandLogo className="h-9 w-9" />
          <span>Issue 01 · {year} · © Jeet Parikh</span>
        </a>
      </div>
      <p className="mt-4 font-mono text-[10px] tracking-[0.18em] text-muted uppercase">
        The Konami code still does something.
      </p>
    </section>
  );
}
