"use client";

import { type PointerEvent, useId, useState } from "react";

export interface RowItem {
  id: string;
  title: string;
  summary: string;
  figure: string;
  body: string;
  meta?: string;
  links?: { href: string; label: string }[];
}

// Hairline rows: a name, one line, a figure, and a plus that opens the details. Each
// row hides a strip of finer reeds; a little blue light comes through under the pointer.
export function Rows({
  items,
  variant,
}: {
  items: RowItem[];
  variant: "work" | "jobs";
}) {
  return (
    <ul className={`rows ${variant}`}>
      {items.map((item) => (
        <Row key={item.id} item={item} />
      ))}
    </ul>
  );
}

function Row({ item }: { item: RowItem }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  const track = (e: PointerEvent<HTMLLIElement>) =>
    e.currentTarget.style.setProperty(
      "--x",
      `${e.clientX - e.currentTarget.getBoundingClientRect().left}px`,
    );

  return (
    <li data-open={open || undefined} onPointerMove={track}>
      <button
        className="row"
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((v) => !v)}
      >
        <span className="t">{item.title}</span>
        <span className="s">{item.summary}</span>
        <span className="m">{item.figure}</span>
        <span className="pm" aria-hidden />
      </button>
      <div className="more" id={id}>
        <div>
          <div className="in">
            <p>{item.body}</p>
            {item.meta && <p className="meta">{item.meta}</p>}
            {item.links && item.links.length > 0 && (
              <p className="go-links">
                {item.links.map((link) => (
                  <a
                    key={link.href}
                    className="go"
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    tabIndex={open ? undefined : -1}
                  >
                    {link.label} ↗
                  </a>
                ))}
              </p>
            )}
          </div>
        </div>
      </div>
    </li>
  );
}
