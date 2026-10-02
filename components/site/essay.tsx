"use client";

import { motion, useReducedMotion } from "framer-motion";
import { frame, Kicker, Reveal } from "./ui";

const paragraphs = [
  "Eighth grade was the pandemic. The entertainment was a television and my twin, so I drifted back to code.org, the games I used to play with friends on the school computers. The joy was still there. I googled “coding for beginners,” opened a video about Python, and followed it into Xcode, which is a strange door to walk through on purpose.",
  "The first thing worth shipping was a garden. Friends and family had started planting, and we buried a fourth batch of tomato plants to a disease nobody could name. I was done scrolling Reddit for a diagnosis. Five months of long days later, PlantVision could look at one photo of a leaf and say what was wrong. By the end of 2020 it had left the house.",
  "The next version of that question was a person. Keeping the family current on my grandfather’s health was messier than a plant, and it was private. Kare took about ten thousand lines and eighteen months. A summer as a deep learning intern with MIT FutureMakers changed how I held it: personalized care, accessibility, and simplicity were the actual puzzle, underneath the features. I named the little company Pariglo Solutions. Between the two apps: eight thousand downloads, fifty countries.",
  "Yale is where the scale changed. I have moved pipelines of a hundred million financial records onto the Bloomberg Terminal, built tools for oncology trial data, and spent time at the School of Medicine on models that try to see whether breast cancer returns. I also lead the Yale Computer Society — nine products, something like twenty thousand users, a hundred student developers — including ymeets, the scheduling board a few thousand Yalies actually open.",
  "I still like the trial and error. Right now I am learning how to build agentic systems: software with enough judgment to work beside you. If there is a through-line, it is this. Find the pile. Make it answer.",
];

export function Essay() {
  const reduce = useReducedMotion();

  return (
    <section id="origin" className={`${frame} relative py-20 md:py-28`}>
      <p
        aria-hidden
        className="pointer-events-none absolute top-8 right-0 font-serif text-[24vw] leading-none text-ink/[0.045] italic select-none"
      >
        02
      </p>
      <Reveal>
        <Kicker n="02">Origin</Kicker>
        <h2 className="mt-4 max-w-5xl font-serif text-[clamp(3.2rem,7vw,6.4rem)] leading-[0.9] tracking-[-0.045em]">
          A puzzle, eventually.
        </h2>
      </Reveal>

      <div className="mt-12 grid items-start gap-12 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <Reveal>
            <p className="font-serif text-2xl leading-snug md:text-[2rem]">
              I had no plan to become an engineer. I had a search bar, a twin,
              and a house that had run out of things to do.
            </p>
          </Reveal>
          <div className="mt-8 space-y-6 text-[1.05rem] leading-8">
            {paragraphs.map((paragraph, index) => (
              <Reveal key={paragraph.slice(0, 24)} delay={index * 0.04}>
                <p>
                  {index === 0 ? (
                    <>
                      <span className="float-left pr-3 font-serif text-7xl leading-[0.8] text-signal">
                        E
                      </span>
                      {paragraph.slice(1)}
                    </>
                  ) : (
                    paragraph
                  )}
                </p>
              </Reveal>
            ))}
          </div>
        </div>

        <aside className="space-y-8 lg:col-span-4 lg:col-start-9">
          <motion.div
            drag={!reduce}
            dragConstraints={{ left: -120, right: 80, top: -30, bottom: 180 }}
            dragElastic={0.18}
            data-cursor="drag"
            whileDrag={{ scale: 1.03 }}
            className="w-44 border border-signal bg-paper p-3 shadow-[5px_5px_0_0_var(--signal)]"
            style={{ rotate: -2.5 }}
          >
            <p className="font-mono text-[10px] tracking-[0.18em] text-signal uppercase">
              p.s.
            </p>
            <p className="mt-2 font-serif text-lg leading-tight">
              The fourth batch of tomatoes started all of this.
            </p>
            <p className="mt-3 font-mono text-[10px] tracking-[0.14em] text-muted uppercase">
              drag me
            </p>
          </motion.div>

          <div className="bg-mark p-4 text-[#1c1612]">
            <p className="font-mono text-[10px] tracking-[0.2em] uppercase">
              Now
            </p>
            <p className="mt-2 font-serif text-xl leading-snug">
              Yale School of Medicine, recurrence models, and software with
              enough judgment to work beside you.
            </p>
          </div>

          <ul className="space-y-4 font-mono text-[11px] leading-relaxed tracking-[0.04em] text-muted uppercase">
            <li className="border-t border-rule pt-3">
              Then — Northwood High, Irvine. Learned Swift because a garden
              asked.
            </li>
            <li className="border-t border-rule pt-3">
              Always — patterns, wrong turns, the piece that fits.
            </li>
            <li className="border-t border-rule pt-3">
              Will talk about Kafka, tomatoes, or both.
            </li>
          </ul>

          <blockquote className="border-l-2 border-signal pl-4">
            <p className="font-serif text-2xl leading-snug italic">
              “I had no idea I wanted to go into software engineering before I
              tried it out.”
            </p>
            <footer className="mt-3 font-mono text-[10px] tracking-[0.16em] text-muted uppercase">
              <a
                href="https://thehowleronline.org/10208/accent/glowing-with-pariglo-jeet-parikhs-tech-journey/"
                target="_blank"
                rel="noreferrer"
                data-cursor="open"
                className="underline decoration-rule underline-offset-4 hover:text-ink"
              >
                Jeet, to The Northwood Howler, 2024
              </a>
            </footer>
          </blockquote>
        </aside>
      </div>
    </section>
  );
}
