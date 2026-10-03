"use client";

import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import { type SectionId, sections } from "@/data/sections";

type Press = "day" | "night";

const PressContext = createContext<{
  press: Press;
  toggle: () => void;
  ready: boolean;
} | null>(null);

const ScrollContext = createContext<{
  active: SectionId;
  progress: number;
}>({ active: "who", progress: 0 });

export function usePress() {
  const value = useContext(PressContext);
  if (!value) {
    throw new Error("usePress must be used within Providers");
  }
  return value;
}

export function useScrollSpy() {
  return useContext(ScrollContext);
}

export function Providers({ children }: { children: ReactNode }) {
  const [press, setPress] = useState<Press>("day");
  const [ready, setReady] = useState(false);
  const [active, setActive] = useState<SectionId>("who");
  const [progress, setProgress] = useState(0);

  useLayoutEffect(() => {
    const stored = window.localStorage.getItem("jeet-press");
    if (stored === "night" || stored === "day") {
      setPress(stored);
      document.documentElement.dataset.press = stored;
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    document.documentElement.dataset.press = press;
    window.localStorage.setItem("jeet-press", press);
  }, [press, ready]);

  useEffect(() => {
    let ticking = false;

    const update = () => {
      ticking = false;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const nextProgress = max > 0 ? window.scrollY / max : 0;
      setProgress(nextProgress);

      const marker = window.scrollY + window.innerHeight * 0.33;
      let current: SectionId = sections[0].id;
      for (const section of sections) {
        const el = document.getElementById(section.id);
        if (el && el.offsetTop <= marker) {
          current = section.id;
        }
      }
      setActive(current);
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <PressContext.Provider
      value={{
        press,
        ready,
        toggle: () => setPress((value) => (value === "day" ? "night" : "day")),
      }}
    >
      <ScrollContext.Provider value={{ active, progress }}>
        {children}
      </ScrollContext.Provider>
    </PressContext.Provider>
  );
}
