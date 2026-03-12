import type { Metadata } from "next";
import { Playfair_Display, DM_Sans, DM_Mono, Anton } from "next/font/google";
import Link from "next/link";
import Header from "@/components/Header";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

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
  description: "Score, track, and settle your Open-Face Chinese Poker sessions.",
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
    <html lang="en">
      <body
        className={`${playfair.variable} ${dmSans.variable} ${dmMono.variable} ${anton.variable} antialiased`}
      >
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
          © 2026 OFC Ledger · For grinders and gamblers. ·{" "}
          <Link href="/privacy" className="underline hover:text-[var(--color-gold)] transition-colors">Privacy</Link> ·{" "}
          <Link href="/terms" className="underline hover:text-[var(--color-gold)] transition-colors">Terms</Link>
        </footer>
        <Analytics />
      </body>
    </html>
  );
}
