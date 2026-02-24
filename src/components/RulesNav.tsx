"use client";

import { useEffect, useState } from "react";

const sections = [
  { id: "what-is-ofc", label: "What is OFC?" },
  { id: "game-variants", label: "Game Variants" },
  { id: "scoring", label: "Scoring" },
  { id: "fantasy-land", label: "Fantasy Land" },
  { id: "optional-rules", label: "Optional Rules" },
  { id: "glossary", label: "Glossary" },
];

export default function RulesNav() {
  const [active, setActive] = useState(sections[0].id);

  useEffect(() => {
    const els = sections
      .map((s) => document.getElementById(s.id))
      .filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        }
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: 0 }
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  function handleClick(id: string) {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }

  return (
    <>
      {/* Mobile: horizontal sticky bar */}
      <nav className="sticky top-[53px] z-40 -mx-4 overflow-x-auto border-b border-[var(--color-card-border)] bg-[var(--color-bg)]/95 backdrop-blur-sm px-4 py-2 lg:hidden">
        <div className="flex gap-3 whitespace-nowrap">
          {sections.map((s) => (
            <button
              key={s.id}
              onClick={() => handleClick(s.id)}
              className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                active === s.id
                  ? "bg-[var(--color-gold)]/15 text-[var(--color-gold)]"
                  : "text-[var(--color-muted)] hover:text-[var(--color-gold)]"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </nav>

      {/* Desktop: sidebar */}
      <nav className="sticky top-24 hidden h-fit lg:block">
        <ul className="flex flex-col gap-1">
          {sections.map((s) => (
            <li key={s.id}>
              <button
                onClick={() => handleClick(s.id)}
                className={`block w-full rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                  active === s.id
                    ? "bg-[var(--color-gold)]/10 font-semibold text-[var(--color-gold)]"
                    : "text-[var(--color-muted)] hover:text-[var(--color-gold)]"
                }`}
              >
                {s.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
