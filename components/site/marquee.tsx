const items = [
  "databricks",
  "yale",
  "bloomberg",
  "ymeets",
  "plantvision",
  "kare",
  "deepdoc",
  "irvine",
];

function Row({ copy }: { copy: "lead" | "echo" }) {
  return (
    <div className="flex items-center" aria-hidden={copy === "echo"}>
      {items.map((item) => (
        <span key={`${copy}-${item}`} className="flex items-center">
          <span className="px-6 font-serif text-4xl italic md:text-6xl">
            {item}
          </span>
          <span className="text-signal" aria-hidden>
            ▪
          </span>
        </span>
      ))}
    </div>
  );
}

export function Marquee() {
  return (
    <div className="marquee overflow-hidden border-y border-ink motion-reduce:overflow-x-auto">
      <div className="animate-marquee flex w-max items-center py-4 motion-reduce:animate-none">
        <Row copy="lead" />
        <Row copy="echo" />
      </div>
    </div>
  );
}
