"use client";

import Image from "next/image";
import { projectOrder, projects } from "@/data/projects";
import { openRecord } from "@/lib/open-record";
import { cn } from "@/lib/utils";
import { frame, Kicker, Reveal } from "./ui";

const questions: {
  n: string;
  question: string;
  answer: string;
  href: string;
  recordId?: string;
}[] = [
  {
    n: "01",
    question: "Why did the tomatoes die?",
    answer: "PlantVision",
    href: "#plantvision",
  },
  {
    n: "02",
    question: "How is grandfather today?",
    answer: "Kare",
    href: "#kare",
  },
  {
    n: "03",
    question: "When can everyone meet?",
    answer: "ymeets",
    href: "#ymeets",
  },
  {
    n: "04",
    question: "What does the paper say?",
    answer: "DeepDoc",
    href: "#deepdoc",
  },
  {
    n: "05",
    question: "Will the cancer come back?",
    answer: "Yale Medicine",
    href: "#record",
    recordId: "yale-medicine",
  },
  {
    n: "06",
    question: "What is in a hundred million rows?",
    answer: "Bloomberg",
    href: "#record",
    recordId: "bloomberg",
  },
];

function linkLabel(url: string) {
  if (url.includes("apps.apple.com")) return "App Store";
  if (url.includes("github.com")) return "Code";
  return "Visit";
}

export function Work() {
  const ordered = projectOrder.map((id) => {
    const project = projects.find((item) => item.id === id);
    if (!project) throw new Error(`Missing project ${id}`);
    return project;
  });

  return (
    <section id="work" className={`${frame} relative py-20 md:py-28`}>
      <p
        aria-hidden
        className="pointer-events-none absolute top-6 right-0 font-serif text-[24vw] leading-none text-ink/[0.045] italic select-none"
      >
        03
      </p>
      <Reveal>
        <Kicker n="03">Work</Kicker>
        <h2 className="mt-4 max-w-4xl font-serif text-[clamp(3rem,6.4vw,5.6rem)] leading-[0.92] tracking-[-0.045em]">
          Questions I actually chased.
        </h2>
        <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">
          Hover a line. The ones with pictures are below. The rest live in the
          record.
        </p>
      </Reveal>

      <div className="mt-12">
        {questions.map((item) => (
          <a
            key={item.n}
            href={item.href}
            data-cursor="ask"
            onClick={(event) => {
              if (!item.recordId) return;
              event.preventDefault();
              openRecord(item.recordId);
            }}
            className="group -mx-5 grid grid-cols-12 items-baseline gap-x-3 border-t border-rule px-5 py-5 transition-colors last:border-b hover:bg-signal hover:text-paper focus-visible:bg-signal focus-visible:text-paper sm:-mx-8 sm:px-8 md:py-7 lg:-mr-14 lg:-ml-24 lg:px-24"
          >
            <span className="col-span-2 font-mono text-[11px] tracking-[0.16em] sm:col-span-1">
              {item.n}
            </span>
            <span className="col-span-10 font-serif text-[clamp(1.65rem,3.5vw,3.15rem)] leading-[1.05] tracking-[-0.03em] transition-transform duration-300 group-hover:translate-x-1 sm:col-span-8">
              {item.question}
            </span>
            <span className="col-span-12 pt-2 font-mono text-[11px] tracking-[0.16em] uppercase opacity-70 sm:col-span-3 sm:pt-0 sm:text-right">
              {item.answer}
            </span>
          </a>
        ))}
      </div>

      <div className="mt-8">
        {ordered.map((project, index) => (
          <article
            key={project.id}
            id={project.id}
            className="grid scroll-mt-28 items-center gap-8 border-t border-rule py-14 lg:grid-cols-12 lg:gap-12 lg:py-20"
          >
            <div
              className={cn("lg:col-span-6", index % 2 === 1 && "lg:order-2")}
            >
              <div className="group/plate relative" data-plate>
                <div className="relative aspect-[4/3] overflow-hidden border border-ink bg-sheet shadow-[8px_8px_0_0_var(--ink)] transition-transform duration-500 group-hover/plate:-translate-x-1 group-hover/plate:-translate-y-1">
                  {project.imageUrl ? (
                    <Image
                      src={project.imageUrl}
                      alt={`${project.title} product preview`}
                      fill
                      sizes="(min-width: 1024px) 46vw, 100vw"
                      className="plate-photo object-contain p-3"
                    />
                  ) : null}
                </div>
              </div>
              <p className="mt-3 font-mono text-[10px] tracking-[0.16em] text-muted uppercase">
                {project.caption}
              </p>
            </div>

            <div className="lg:col-span-6">
              <p className="font-mono text-[11px] tracking-[0.2em] text-signal uppercase">
                {String(index + 1).padStart(2, "0")} / {project.tags[0]}
              </p>
              <h3 className="mt-3 font-serif text-5xl tracking-[-0.04em] md:text-7xl">
                {project.title}
              </h3>
              <p className="mt-6 max-w-xl text-lg leading-relaxed">
                {project.lede}
              </p>
              {project.metrics ? (
                <dl className="mt-8 grid grid-cols-3 gap-3 border-t border-rule pt-4">
                  {project.metrics.map((metric) => (
                    <div key={metric.label}>
                      <dt className="font-mono text-[10px] tracking-[0.14em] text-muted uppercase">
                        {metric.label}
                      </dt>
                      <dd className="mt-1 font-serif text-2xl md:text-3xl">
                        {metric.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              ) : null}
              <div className="mt-6 flex flex-wrap gap-3">
                {project.liveUrl ? (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    data-cursor="open"
                    className="inline-flex min-h-11 items-center border border-ink px-4 py-2 font-mono text-[11px] tracking-[0.16em] uppercase transition-colors hover:bg-ink hover:text-paper"
                  >
                    {linkLabel(project.liveUrl)} ↗
                  </a>
                ) : null}
                {project.githubUrl ? (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    data-cursor="open"
                    className="inline-flex min-h-11 items-center border border-rule px-4 py-2 font-mono text-[11px] tracking-[0.16em] uppercase transition-colors hover:border-ink"
                  >
                    Code ↗
                  </a>
                ) : null}
              </div>
              <ul className="mt-5 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <li
                    key={tag}
                    className="border border-rule px-2 py-1 font-mono text-[10px] tracking-[0.14em] uppercase"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
