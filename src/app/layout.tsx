import type { Metadata } from "next";
import { Playfair_Display, DM_Sans, DM_Mono, Anton } from "next/font/google";
import Header from "@/components/Header";
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
  icons: { icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='10 2 80 70'><polygon points='50,26 80,41 50,56 20,41' fill='%23ffd700'/><polygon points='20,41 50,56 50,66 20,51' fill='%239a7a00'/><polygon points='80,41 50,56 50,66 80,51' fill='%23b89500'/><polygon points='50,18 72,29 50,40 28,29' fill='%23ffd700'/><polygon points='28,29 50,40 50,50 28,39' fill='%239a7a00'/><polygon points='72,29 50,40 50,50 72,39' fill='%23b89500'/><polygon points='50,10 64,17 50,24 36,17' fill='%23ffd700'/><polygon points='36,17 50,24 50,34 36,27' fill='%239a7a00'/><polygon points='64,17 50,24 50,34 64,27' fill='%23b89500'/></svg>" },
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
      </body>
    </html>
  );
}
