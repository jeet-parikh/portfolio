import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import type { ReactNode } from "react";
import { GlassBackground } from "@/components/fluted/glass-background";
import { Header } from "@/components/fluted/header";
import { Konami } from "@/components/site/konami";
import "./globals.css";

// One typeface everywhere: clean and legible, with a little quirk in the letterforms.
// It's variable, and optical sizing tightens the display sizes on its own.
const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  axes: ["opsz"],
  variable: "--font-bricolage",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://jeet-parikh.github.io"),
  title: "Jeet Parikh — EECS, Yale",
  description:
    "Jeet Parikh studies electrical engineering and computer science at Yale, leads the Yale Computer Society, and builds products for people. Previously at Databricks and Bloomberg.",
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
      "EECS at Yale. President of the Yale Computer Society; previously Databricks and Bloomberg; two iOS apps.",
    type: "website",
    locale: "en_US",
    siteName: "Jeet Parikh",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/home/jeet.jpg`,
        alt: "Jeet Parikh",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jeet Parikh — EECS, Yale",
    description:
      "EECS at Yale. Yale Computer Society; previously Databricks and Bloomberg; two iOS apps.",
    images: [`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/home/jeet.jpg`],
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
  themeColor: "#050607",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={bricolage.variable}>
      <body className="antialiased">
        <a
          href="#who"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[95] focus:bg-ink focus:px-3 focus:py-2 focus:text-paper"
        >
          Skip to content
        </a>
        <GlassBackground />
        <Header />
        {children}
        <Konami />
      </body>
    </html>
  );
}
