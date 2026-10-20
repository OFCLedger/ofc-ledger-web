"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import LogoMark from "./LogoMark";

const links = [
  { href: "/rules", label: "House rules" },
  { href: "/#ledger", label: "Ledger" },
  { href: "/faq", label: "FAQ" },
];

export default function Header() {
  const [heroCtaVisible, setHeroCtaVisible] = useState(true);

  useEffect(() => {
    const target = document.getElementById("get");
    if (!target || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      ([entry]) => setHeroCtaVisible(entry.isIntersecting),
      { rootMargin: "-72px 0px 0px 0px", threshold: 0 }
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  const scrollToGet = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    document.getElementById("get")?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <header
      className="sticky top-0 z-50"
      style={{
        background: "rgba(15,31,24,0.85)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        borderBottom: "1px solid var(--color-card-border)",
      }}
    >
      <nav className="mx-auto flex max-w-[1200px] items-center justify-between gap-4 px-4 py-[14px] sm:flex-wrap sm:px-6 sm:py-[18px]">
        <Link href="/" className="flex shrink-0 items-center gap-3 no-underline">
          <LogoMark width={28} height={25} className="sm:hidden" />
          <LogoMark width={34} height={31} className="hidden sm:block" />
          <span
            className="font-[family-name:var(--font-anton)] whitespace-nowrap"
            style={{ fontSize: 20, letterSpacing: "0.02em", color: "var(--color-white)" }}
          >
            <span style={{ color: "var(--color-gold)" }}>OFC</span> LEDGER
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden flex-wrap items-center gap-7 sm:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="no-underline"
              style={{ color: "var(--color-body)", fontSize: 15, fontWeight: 500 }}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/#get"
            className="no-underline"
            style={{
              background: "var(--color-gold)",
              color: "var(--color-gold-ink)",
              fontWeight: 700,
              fontSize: 15,
              padding: "12px 20px",
              borderRadius: 999,
            }}
          >
            Get the app
          </Link>
        </div>

        {/* Mobile: one fixed-height row that crossfades Rules/FAQ into a compact "Get the app" pill */}
        <div className="relative flex h-9 shrink-0 items-center sm:hidden">
          <div
            className="flex items-center gap-4 transition-opacity duration-300 ease-out"
            style={{ opacity: heroCtaVisible ? 1 : 0, pointerEvents: heroCtaVisible ? "auto" : "none" }}
            aria-hidden={!heroCtaVisible}
          >
            <Link
              href="/rules"
              className="no-underline whitespace-nowrap"
              style={{ color: "var(--color-body)", fontSize: 14, fontWeight: 500 }}
            >
              Rules
            </Link>
            <Link
              href="/faq"
              className="no-underline whitespace-nowrap"
              style={{ color: "var(--color-body)", fontSize: 14, fontWeight: 500 }}
            >
              FAQ
            </Link>
          </div>
          <Link
            href="/#get"
            onClick={scrollToGet}
            className="absolute right-0 no-underline whitespace-nowrap transition-opacity duration-300 ease-out"
            style={{
              opacity: heroCtaVisible ? 0 : 1,
              pointerEvents: heroCtaVisible ? "none" : "auto",
              background: "var(--color-gold)",
              color: "var(--color-gold-ink)",
              fontWeight: 700,
              fontSize: 13,
              padding: "8px 14px",
              borderRadius: 999,
            }}
            aria-hidden={heroCtaVisible}
          >
            Get the app
          </Link>
        </div>
      </nav>
    </header>
  );
}
