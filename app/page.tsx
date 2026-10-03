import { Colophon } from "@/components/site/colophon";
import { Hero } from "@/components/site/hero";
import { Pictures } from "@/components/site/pictures";
import { Record } from "@/components/site/record";
import { Work } from "@/components/site/work";

export default function Home() {
  return (
    <main className="overflow-x-clip">
      <Hero />
      <Work />
      <Record />
      <Pictures />
      <Colophon />
    </main>
  );
}
