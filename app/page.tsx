import { Colophon } from "@/components/site/colophon";
import { Hero } from "@/components/site/hero";
import { Marquee } from "@/components/site/marquee";
import { Record } from "@/components/site/record";
import { Work } from "@/components/site/work";

export default function Home() {
  return (
    <main className="overflow-x-clip">
      <Hero />
      <Marquee />
      <Work />
      <Record />
      <Colophon />
    </main>
  );
}
