"use client";

import { useState } from "react";
import Link from "next/link";
import LogoHero from "./LogoHero";

const links = [
  { href: "/", label: "Home" },
  { href: "/rules", label: "Rules" },
  { href: "/privacy", label: "Privacy" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-[var(--color-bg)]/80 border-b border-[var(--color-card-border)]">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-2 sm:gap-3">
          <LogoHero size={28} />
          <span className="font-[family-name:var(--font-anton)] text-base font-bold tracking-wider text-[var(--color-white)] sm:text-lg">
            OFC LEDGER
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-6 text-sm sm:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="transition-colors hover:text-[var(--color-gold)]"
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="flex flex-col gap-1.5 sm:hidden"
          aria-label="Toggle menu"
        >
          <span
            className={`block h-0.5 w-5 bg-[var(--color-gold)] transition-transform ${open ? "translate-y-2 rotate-45" : ""}`}
          />
          <span
            className={`block h-0.5 w-5 bg-[var(--color-gold)] transition-opacity ${open ? "opacity-0" : ""}`}
          />
          <span
            className={`block h-0.5 w-5 bg-[var(--color-gold)] transition-transform ${open ? "-translate-y-2 -rotate-45" : ""}`}
          />
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-[var(--color-card-border)] px-4 pb-4 sm:hidden">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block py-3 text-sm transition-colors hover:text-[var(--color-gold)]"
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
