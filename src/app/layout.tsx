import type { Metadata } from "next";
import { Calistoga, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const calistoga = Calistoga({
  variable: "--font-calistoga",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "HallHop — The hallway, understood",
    template: "%s — HallHop",
  },
  description:
    "HallHop gives schools a clearer, faster way to manage student movement — from digital passes to live hallway context and useful patterns.",
  metadataBase: new URL("https://hallhop.com"),
  openGraph: {
    title: "HallHop — The hallway, understood",
    description:
      "Digital passes, live context, and useful patterns for the school day already in motion.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      {/* suppressHydrationWarning on body: browser extensions inject
          attributes (e.g. cz-shortcut-listen) before React hydrates */}
      <body
        suppressHydrationWarning
        className={`${inter.variable} ${calistoga.variable} ${jetbrains.variable} antialiased`}
      >
        <a
          href="#main"
          className="sr-only bg-accent px-4 py-3 text-sm font-semibold text-ink focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100]"
        >
          Skip to content
        </a>
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
