import { Colophon } from "@/components/site/colophon";
import { Essay } from "@/components/site/essay";
import { Hero } from "@/components/site/hero";
import { Marquee } from "@/components/site/marquee";
import { Record } from "@/components/site/record";
import { Toolkit } from "@/components/site/toolkit";
import { Work } from "@/components/site/work";

export default function Home() {
  return (
    <main className="overflow-x-clip">
      <Hero />
      <Marquee />
      <Essay />
      <Work />
      <Record />
      <Toolkit />
      <Colophon />
    </main>
  );
}
