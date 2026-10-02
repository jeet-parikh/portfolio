"use client";

import Image from "next/image";
import { projectOrder, projects } from "@/data/projects";
import { cn } from "@/lib/utils";
import { frame, Kicker, Reveal, Wipe } from "./ui";

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
    <section id="work" className={`${frame} relative py-16 md:py-20`}>
      <p
        aria-hidden
        className="pointer-events-none absolute top-6 right-0 font-serif text-[22vw] leading-none text-signal/[0.07] italic select-none"
      >
        02
      </p>
      <Reveal>
        <Kicker n="02">Work</Kicker>
        <h2 className="mt-3 max-w-3xl font-serif text-[clamp(2.6rem,5vw,4.2rem)] leading-[0.95] tracking-[-0.04em]">
          What I&apos;ve built.
        </h2>
      </Reveal>

      <div className="mt-6">
        {ordered.map((project, index) => (
          <article
            key={project.id}
            id={project.id}
            className="grid scroll-mt-28 items-center gap-8 border-t border-rule py-10 lg:grid-cols-12 lg:gap-12 lg:py-14"
          >
            <div
              className={cn("lg:col-span-6", index % 2 === 1 && "lg:order-2")}
            >
              <Wipe
                from={index % 2 === 0 ? "left" : "right"}
                plated
                className="group/plate relative"
              >
                <div className="relative aspect-[4/3] overflow-hidden border border-ink bg-sheet shadow-[8px_8px_0_0_var(--signal)] transition-transform duration-500 group-hover/plate:-translate-x-1 group-hover/plate:-translate-y-1">
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
              </Wipe>
              <p className="mt-3 font-mono text-[10px] tracking-[0.16em] text-muted uppercase">
                {project.caption}
              </p>
            </div>

            <div className="lg:col-span-6">
              <p className="font-mono text-[11px] tracking-[0.2em] text-signal uppercase">
                {String(index + 1).padStart(2, "0")} / {project.tags[0]}
              </p>
              <h3 className="mt-3 font-serif text-4xl tracking-[-0.04em] md:text-6xl">
                {project.title}
              </h3>
              <p className="mt-6 max-w-xl text-lg leading-relaxed">
                {project.lede}
              </p>
              {project.metrics ? (
                <dl className="mt-8 grid grid-cols-2 gap-3 border-t border-rule pt-4 sm:grid-cols-3">
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
