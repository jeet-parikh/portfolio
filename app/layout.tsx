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
  metadataBase: new URL("https://jeet-parikh.github.io"),
  title: "Jeet Parikh — EECS, Yale",
  description:
    "Jeet Parikh studies electrical engineering and computer science at Yale. Software engineer intern at Databricks, president of the Yale Computer Society, and founder of two iOS apps.",
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
    title: "Jeet Parikh — EECS, Yale",
    description:
      "Who Jeet is, and the work: Databricks, Yale Computer Society, Bloomberg, and the apps he shipped.",
    type: "website",
    locale: "en_US",
    siteName: "Jeet Parikh",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/home/headshot.JPG`,
        alt: "Jeet Parikh",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jeet Parikh — EECS, Yale",
    description:
      "EECS at Yale. Databricks, Yale Computer Society, Bloomberg, and two iOS apps.",
    images: [`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/home/headshot.JPG`],
    creator: "@jeetparikh",
  },
  icons: {
    icon: [
      {
        url: `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/icon.svg`,
        type: "image/svg+xml",
      },
    ],
    shortcut: `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/icon.svg`,
    apple: `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/apple-icon.png`,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f3f6fb",
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
          href="#who"
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
