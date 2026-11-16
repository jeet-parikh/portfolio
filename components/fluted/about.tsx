"use client";

import Image from "next/image";
import { useState } from "react";
import { InterestPopup } from "@/components/site/interest-popup";
import { publicSrc } from "@/lib/base-path";

export function About() {
  const [interest, setInterest] = useState<"sports" | "traveling" | null>(null);

  return (
    <section id="who" className="wrap about" aria-label="About">
      <figure className="portrait">
        <Image
          src={publicSrc("/home/jeet.jpg")}
          alt="Jeet Parikh smiling in a black blazer and white shirt between the stone columns of a Yale building"
          width={1067}
          height={1600}
          sizes="(max-width: 700px) 100vw, 420px"
          priority
        />
        <figcaption>New Haven</figcaption>
      </figure>
      <p className="intro">
        I study engineering at Yale, lead the Yale Computer Society, and build
        products for people. Otherwise I&rsquo;m a huge{" "}
        <span className="nw">
          <button
            className="egg"
            type="button"
            onClick={() => setInterest("sports")}
          >
            sports fan
          </button>
          ,
        </span>{" "}
        always{" "}
        <span className="nw">
          <button
            className="egg"
            type="button"
            onClick={() => setInterest("traveling")}
          >
            traveling
          </button>
          ,
        </span>{" "}
        and up for good food.
      </p>
      {interest && (
        <InterestPopup kind={interest} onClose={() => setInterest(null)} />
      )}
    </section>
  );
}
