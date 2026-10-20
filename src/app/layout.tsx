import type { Metadata } from "next";
import { DM_Sans, DM_Mono, Anton } from "next/font/google";
import Link from "next/link";
import Script from "next/script";
import Header from "@/components/Header";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

// Arms the one-shot scroll reveals before first paint (no flash of a
// hidden-then-shown state), and skips them under prefers-reduced-motion.
// `reveal-done` is a pure-CSS safety net: if the React bundle never runs,
// every reveal is forced visible 3s after load regardless.
const REVEAL_GATE_SCRIPT = `(function(){try{if(!window.matchMedia("(prefers-reduced-motion: reduce)").matches){document.documentElement.classList.add("reveal-ready");}}catch(e){}try{setTimeout(function(){document.documentElement.classList.add("reveal-done");},3000);}catch(e){}})();`;

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

const dmMono = DM_Mono({
  variable: "--font-dm-mono",
  weight: ["400", "500"],
  subsets: ["latin"],
  display: "swap",
});

const anton = Anton({
  variable: "--font-anton",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "OFC Ledger",
  description: "Score and track your Open-Face Chinese Poker sessions with your crew.",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${dmMono.variable} ${anton.variable}`}
      suppressHydrationWarning
    >
      <body className="antialiased">
        <Script
          id="reveal-gate"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: REVEAL_GATE_SCRIPT }}
        />
        <Header />
        {children}
        <footer
          className="text-center italic"
          style={{
            borderTop: "1px solid var(--color-card-border)",
            padding: "1.5rem",
            color: "var(--color-muted)",
            fontSize: "0.8rem",
          }}
        >
          © 2026 OFC Ledger · Track every point. Ride every swing. ·{" "}
          <Link href="/privacy" className="underline hover:text-[var(--color-gold)] transition-colors">Privacy</Link> ·{" "}
          <Link href="/terms" className="underline hover:text-[var(--color-gold)] transition-colors">Terms</Link>
        </footer>
        <Analytics />
      </body>
    </html>
  );
}
