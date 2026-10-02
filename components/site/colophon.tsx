"use client";

import { type FormEvent, useState } from "react";
import { frame, Kicker, Reveal } from "./ui";

const links = [
  { label: "Email", href: "mailto:jeet.parikh@yale.edu", cursor: "write" },
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
  {
    label: "X",
    href: "https://twitter.com/jeetparikh",
    cursor: "open",
  },
];

export function Colophon() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);
  const [copied, setCopied] = useState(false);
  const year = new Date().getFullYear();

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText("jeet.parikh@yale.edu");
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const cleanName = name.trim();
    const cleanEmail = email.trim();
    const cleanMessage = message.trim();
    if (cleanName.length < 2) {
      setError("I need a name.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      setError("That email looks unfinished.");
      return;
    }
    if (cleanMessage.length < 4) {
      setError("Say a little more.");
      return;
    }
    setError(null);
    setSent(true);
    const href = `mailto:jeet.parikh@yale.edu?subject=${encodeURIComponent(`A note from ${cleanName}`)}&body=${encodeURIComponent(`${cleanMessage}\n\n— ${cleanName}\n${cleanEmail}`)}`;
    window.location.href = href;
  };

  return (
    <section id="write" className={`${frame} relative py-20 md:py-28`}>
      <p
        aria-hidden
        className="pointer-events-none absolute top-4 right-0 font-serif text-[24vw] leading-none text-signal/[0.07] italic select-none"
      >
        04
      </p>
      <div className="grid items-start gap-12 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <Reveal>
            <Kicker n="04">Write</Kicker>
            <h2 className="mt-3 font-serif text-[clamp(2.6rem,5vw,4.2rem)] leading-[0.95] tracking-[-0.04em]">
              If you want to
              <br />
              build something,
              <br />
              <span className="text-signal italic">write.</span>
            </h2>
            <p className="mt-6 max-w-md text-lg leading-relaxed">
              A role, a team, a product, a hello. I read what arrives.
            </p>
            <button
              type="button"
              onClick={copyEmail}
              data-cursor="copy"
              className="mt-8 text-left"
            >
              <span className="block font-mono text-[11px] tracking-[0.18em] text-muted uppercase">
                {copied ? "Copied" : "Email"}
              </span>
              <span className="mt-1 block font-serif text-2xl underline decoration-signal decoration-2 underline-offset-4 md:text-3xl">
                jeet.parikh@yale.edu
              </span>
            </button>
          </Reveal>
        </div>

        <form
          onSubmit={onSubmit}
          className="relative border border-ink bg-sheet p-5 shadow-[10px_10px_0_0_var(--ink)] sm:p-8 lg:col-span-6"
        >
          <div
            aria-hidden
            className="absolute top-4 right-4 grid size-16 rotate-12 place-items-center rounded-full border border-signal font-mono text-[10px] tracking-[0.16em] text-signal uppercase"
          >
            note
          </div>
          <p className="font-serif text-2xl italic">Dear Jeet,</p>
          <label className="mt-6 block">
            <span className="font-mono text-[10px] tracking-[0.16em] text-muted uppercase">
              From
            </span>
            <input
              name="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              autoComplete="name"
              placeholder="Your name"
              className="mt-1 w-full border-b border-rule bg-transparent py-2 font-serif text-2xl outline-none placeholder:text-ink/30 focus:border-ink"
            />
          </label>
          <label className="mt-5 block">
            <span className="font-mono text-[10px] tracking-[0.16em] text-muted uppercase">
              Reply
            </span>
            <input
              name="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              autoComplete="email"
              placeholder="you@domain.com"
              className="mt-1 w-full border-b border-rule bg-transparent py-2 font-mono text-base outline-none placeholder:text-ink/30 focus:border-ink"
            />
          </label>
          <label className="mt-5 block">
            <span className="font-mono text-[10px] tracking-[0.16em] text-muted uppercase">
              The note
            </span>
            <textarea
              name="message"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              rows={5}
              placeholder="The puzzle, the role, the hello."
              className="mt-2 w-full resize-y border-b border-rule bg-transparent py-2 font-serif text-xl leading-snug outline-none placeholder:text-ink/30 focus:border-ink"
            />
          </label>
          <p className="mt-4 font-serif text-lg italic">
            — {name.trim() || "someone"}
          </p>
          {error ? (
            <p className="mt-4 font-mono text-[11px] tracking-[0.12em] text-signal uppercase">
              {error}
            </p>
          ) : null}
          {sent ? (
            <p className="mt-4 text-sm leading-relaxed text-muted">
              If your mail app opened, the note is waiting for you to send it.
              If it didn’t, the address above still works.
            </p>
          ) : null}
          <button
            type="submit"
            data-cursor="write"
            className="mt-6 inline-flex min-h-12 w-full items-center justify-center bg-ink px-4 py-3 font-mono text-[11px] tracking-[0.18em] text-paper uppercase transition-colors hover:bg-signal"
          >
            Send the note
          </button>
        </form>
      </div>

      <div className="-mx-5 mt-16 grid border-ink border-y sm:-mx-8 sm:grid-cols-2 lg:-mr-14 lg:-ml-24 lg:grid-cols-4">
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target={link.href.startsWith("http") ? "_blank" : undefined}
            rel={link.href.startsWith("http") ? "noreferrer" : undefined}
            data-cursor={link.cursor}
            className="border-ink border-b px-5 py-6 font-serif text-3xl transition-colors last:border-b-0 hover:bg-signal hover:text-paper sm:px-8 sm:[&:nth-child(odd)]:border-r lg:border-r lg:border-b-0 lg:last:border-r-0"
          >
            {link.label}
          </a>
        ))}
      </div>

      <div className="mt-8 flex flex-col gap-3 font-mono text-[10px] tracking-[0.16em] text-muted uppercase sm:flex-row sm:items-end sm:justify-between">
        <p>Instrument Serif · Instrument Sans · IBM Plex Mono</p>
        <p>
          <a
            href="tel:+19494049805"
            data-cursor="write"
            className="hover:text-ink"
          >
            (949) 404-9805
          </a>
          <span> · New Haven / Irvine</span>
        </p>
        <p>Issue 01 · {year} · © Jeet Parikh</p>
      </div>
      <p className="mt-4 font-mono text-[10px] tracking-[0.18em] text-muted uppercase">
        The Konami code still does something.
      </p>
    </section>
  );
}
