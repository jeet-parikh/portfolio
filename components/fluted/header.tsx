"use client";

import { useEffect, useState } from "react";

const links = [
  { href: "#work", label: "Work" },
  { href: "#experience", label: "Experience" },
  { href: "#photos", label: "Photos" },
];

// Transparent over the hero; frosts over once the page moves under it.
export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="site-top" data-scrolled={scrolled}>
      <header className="wrap site-header">
        <a className="site-name" href="#top">
          Jeet Parikh
        </a>
        <nav aria-label="Sections">
          {links.map((link) => (
            <a key={link.href} className="opt" href={link.href}>
              {link.label}
            </a>
          ))}
          <a href="#reach">Contact</a>
        </nav>
      </header>
    </div>
  );
}
