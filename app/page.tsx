import { About } from "@/components/fluted/about";
import { PhotoStrip } from "@/components/fluted/photo-strip";
import { type RowItem, Rows } from "@/components/fluted/rows";
import { experience } from "@/data/experience";
import { projectOrder, projects } from "@/data/projects";

const year = (date: string) => date.split(" ").at(-1) ?? date;

const work: RowItem[] = projectOrder.map((id) => {
  const p = projects.find((project) => project.id === id);
  if (!p) throw new Error(`Unknown project: ${id}`);
  const metric = p.metrics?.[0];
  const links = [
    p.liveUrl && {
      href: p.liveUrl,
      label: p.liveUrl.includes("apps.apple.com")
        ? "App Store"
        : new URL(p.liveUrl).host.replace(/^www\./, ""),
    },
    p.githubUrl && { href: p.githubUrl, label: "Source" },
  ].filter((link): link is { href: string; label: string } => Boolean(link));
  return {
    id: p.id,
    title: p.title,
    summary: p.description,
    figure: metric
      ? `${metric.value} ${metric.label.toLowerCase()}`
      : "Web app",
    body: p.longDescription,
    meta: p.tags.join(" · "),
    links,
  };
});

// Current roles first, then newest to oldest as listed.
const jobs: RowItem[] = [...experience]
  .sort((a, b) => Number(b.current) - Number(a.current))
  .map((e) => {
    const start = year(e.startDate);
    const end = e.current ? "Now" : year(e.endDate);
    return {
      id: e.id,
      title: e.company.replace(/ LLC$/, ""),
      summary: e.title,
      figure: start === end ? start : `${start} – ${end}`,
      body: e.description.join(" "),
      meta: [e.location, ...e.tags].join(" · "),
    };
  });

export default function Home() {
  return (
    <main id="top">
      <div className="wrap hero">
        <div className="hero-foot">
          <h1>
            Jeet
            <br />
            <em>Parikh</em>
          </h1>
          <p className="tag">
            Building things and leading the Yale Computer Society.
          </p>
        </div>
      </div>

      <About />

      <section id="work" className="wrap sec" aria-labelledby="work-h">
        <h2 className="label" id="work-h">
          Selected work
        </h2>
        <Rows items={work} variant="work" />
      </section>

      <section id="experience" className="wrap sec" aria-labelledby="exp-h">
        <h2 className="label" id="exp-h">
          Experience
        </h2>
        <Rows items={jobs} variant="jobs" />
      </section>

      <PhotoStrip />

      <section className="wrap contact" id="reach" aria-labelledby="contact-h">
        <p className="label">Say hello</p>
        <h2 id="contact-h">
          <a href="mailto:jeet.parikh@yale.edu">jeet.parikh@yale.edu</a>
        </h2>
        <div className="links">
          <a
            href="https://github.com/jeet-parikh"
            target="_blank"
            rel="noreferrer"
          >
            GitHub ↗
          </a>
          <a
            href="https://www.linkedin.com/in/parikhjeet"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn ↗
          </a>
        </div>
        <footer>
          <span>© {new Date().getFullYear()} Jeet Parikh</span>
          <span>New Haven, Connecticut</span>
        </footer>
      </section>
    </main>
  );
}
