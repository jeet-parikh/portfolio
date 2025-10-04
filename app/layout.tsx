import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { ScrollProgress } from "@/components/scroll-progress";
import { EasterEgg } from "@/components/easter-egg";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Jeet Parikh - Software Engineer & AI Researcher",
  description:
    "Computer Science student at Yale University with experience in AI, data engineering, and full-stack development. Building the future with code.",
  keywords: [
    "Jeet Parikh",
    "Software Engineer",
    "AI Researcher",
    "Machine Learning",
    "Data Science",
    "Yale University",
    "Computer Science",
    "Full Stack Developer",
    "iOS Developer",
    "Data Engineering",
    "Bloomberg",
    "Healthcare AI",
  ],
  authors: [{ name: "Jeet Parikh" }],
  creator: "Jeet Parikh",
  publisher: "Jeet Parikh",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Jeet Parikh - Software Engineer & AI Researcher",
    description:
      "Computer Science student at Yale University with experience in AI, data engineering, and full-stack development. Building the future with code.",
    type: "website",
    locale: "en_US",
    siteName: "Jeet Parikh Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Jeet Parikh - Software Engineer & AI Researcher",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jeet Parikh - Software Engineer & AI Researcher",
    description:
      "Computer Science student at Yale University with experience in AI, data engineering, and full-stack development.",
    images: ["/og-image.png"],
    creator: "@jeetparikh",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${poppins.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ScrollProgress />
          <Navigation />
          <main className="pt-16">{children}</main>
          <Footer />
          <EasterEgg />
        </ThemeProvider>
      </body>
    </html>
  );
}
