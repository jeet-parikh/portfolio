import type { Metadata, Viewport } from "next";
import {
  IBM_Plex_Mono,
  Instrument_Sans,
  Instrument_Serif,
} from "next/font/google";
import type { ReactNode } from "react";
import { Cursor } from "@/components/site/cursor";
import { Konami } from "@/components/site/konami";
import { Masthead } from "@/components/site/masthead";
import { Providers } from "@/components/site/providers";
import { Rail } from "@/components/site/rail";
import { Spine } from "@/components/site/spine";
import "./globals.css";

const sans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument-sans",
  display: "swap",
});

const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
  display: "swap",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Jeet Parikh — Make it answer back",
  description:
    "Jeet Parikh is a computer science student at Yale. He builds systems for plants, patients, pipelines, and a campus full of people — and he still owes it to a backyard of tomatoes.",
  keywords: [
    "Jeet Parikh",
    "Yale",
    "EECS",
    "Software Engineer",
    "Machine Learning",
    "Yale Computer Society",
    "PlantVision",
    "Kare",
    "ymeets",
    "DeepDoc",
  ],
  authors: [{ name: "Jeet Parikh" }],
  creator: "Jeet Parikh",
  openGraph: {
    title: "Jeet Parikh — Make it answer back",
    description:
      "A single-scroll portfolio. Computer science at Yale, told like a paper trail.",
    type: "website",
    locale: "en_US",
    siteName: "Jeet Parikh",
    images: [
      {
        url: "/home/headshot.JPG",
        alt: "Jeet Parikh",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jeet Parikh — Make it answer back",
    description:
      "Computer science at Yale. Systems for plants, patients, pipelines, and a campus.",
    images: ["/home/headshot.JPG"],
    creator: "@jeetparikh",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f3ecdf",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${sans.variable} ${serif.variable} ${mono.variable}`}
    >
      <body className="antialiased">
        <script
          // biome-ignore lint/security/noDangerouslySetInnerHtml: static theme bootstrap, no user input
          dangerouslySetInnerHTML={{
            __html:
              "try{if(localStorage.getItem('jeet-press')==='night')document.documentElement.dataset.press='night'}catch(e){}",
          }}
        />
        <a
          href="#opening"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[95] focus:bg-ink focus:px-3 focus:py-2 focus:text-paper"
        >
          Skip to content
        </a>
        <Providers>
          <Cursor />
          <Masthead />
          <Rail />
          <Spine />
          {children}
          <Konami />
        </Providers>
      </body>
    </html>
  );
}
