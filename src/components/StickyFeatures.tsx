"use client";

import { useEffect, useRef, useState } from "react";

const steps = [
  {
    num: "01",
    title: "Anytime.\nAnywhere.",
    text: "Take your turn whenever it suits you. Full Pineapple OFC online — with Fantasy Land, Spades Multiplier, The Choice, and fully customizable rules.",
  },
  {
    num: "02",
    title: "AI Card\nCamera",
    text: "Point your camera at the board. Our Gemini-powered referee reads every card and scores the hand in seconds. No manual input, no disputes.",
  },
  {
    num: "03",
    title: "Live Ledger\n& Stats",
    text: "Every hand logged. See who's up, who owes what, and who hit Fantasy Land on the last card. Session stats that make settlement instant.",
  },
  {
    num: "04",
    title: "Your Rules.\nReally.",
    text: "Classic or Pineapple. Progressive Fantasy Land. Jokers. Adjustable time limits. Set it up the way your crew plays — not how a developer decided you should.",
  },
];

export default function StickyFeatures() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [fadeOut, setFadeOut] = useState(1);

  useEffect(() => {
    function onScroll() {
      const el = wrapperRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const scrollable = el.offsetHeight - window.innerHeight;
      if (scrollable <= 0) return;

      const progress = Math.min(Math.max(-rect.top / scrollable, 0), 1);

      // Steps use first 80% of scroll, last 20% fades out
      const stepZone = 0.8;
      const stepProgress = Math.min(progress / stepZone, 1);
      const step = Math.min(
        Math.floor(stepProgress * steps.length),
        steps.length - 1
      );
      setActive(step);

      // Fade out after last step
      if (progress > stepZone) {
        setFadeOut(Math.max(1 - (progress - stepZone) / (1 - stepZone), 0));
      } else {
        setFadeOut(1);
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div ref={wrapperRef} style={{ height: "220vh", position: "relative" }}>
      <div
        className="sticky top-[12vh]"
        style={{
          opacity: fadeOut,
          transition: "opacity 0.15s ease-out",
        }}
      >
        <div
          className="relative mx-auto w-full max-w-[640px] px-6 sm:px-10"
        >
          {/* Step content */}
          <div style={{ position: "relative", minHeight: 280 }}>
            {steps.map((s, i) => (
              <div
                key={i}
                style={{
                  position: i === 0 ? "relative" : "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  opacity: active === i ? 1 : 0,
                  transform:
                    active === i ? "translateY(0)" : "translateY(16px)",
                  transition: "opacity 0.5s ease, transform 0.5s ease",
                  pointerEvents: active === i ? "auto" : "none",
                }}
              >
                {/* Big number above title */}
                <span
                  aria-hidden
                  style={{
                    display: "block",
                    fontFamily: "var(--font-anton), sans-serif",
                    fontSize: "clamp(120px, 25vw, 200px)",
                    lineHeight: 0.85,
                    color: "rgba(255,215,0,0.06)",
                    userSelect: "none",
                    pointerEvents: "none",
                    marginBottom: 20,
                  }}
                >
                  {s.num}
                </span>

                {/* Gold line */}
                <div
                  style={{
                    width: 48,
                    height: 2,
                    background: "var(--color-gold)",
                    marginBottom: 20,
                  }}
                />

                {/* Title */}
                <h3
                  style={{
                    fontFamily: "var(--font-anton), sans-serif",
                    color: "var(--color-white)",
                    fontSize: "clamp(2rem, 5vw, 3rem)",
                    lineHeight: 1.05,
                    whiteSpace: "pre-line",
                  }}
                >
                  {s.title}
                </h3>

                {/* Body */}
                <p
                  className="font-[family-name:var(--font-dm-sans)]"
                  style={{
                    color: "var(--color-muted)",
                    fontSize: "0.95rem",
                    lineHeight: 1.7,
                    marginTop: 14,
                    maxWidth: 460,
                  }}
                >
                  {s.text}
                </p>

              </div>
            ))}
          </div>

          {/* Dash-dot indicators */}
          <div className="mt-8 flex items-center gap-2">
            {steps.map((_, i) => (
              <span
                key={i}
                style={{
                  display: "block",
                  height: 3,
                  borderRadius: 2,
                  width: active === i ? 24 : 8,
                  background:
                    active === i
                      ? "var(--color-gold)"
                      : "rgba(255,215,0,0.18)",
                  transition: "width 0.4s ease, background 0.4s ease",
                }}
              />
            ))}
          </div>

          {/* Mobile CTA – only on step 4 */}
          <div
            className="mt-6 flex justify-center sm:hidden"
            style={{
              opacity: active === 3 ? 1 : 0,
              transition: "opacity 0.4s ease",
              pointerEvents: active === 3 ? "auto" : "none",
            }}
          >
            <a
              href="https://github.com/OFCLedger/releases/releases/download/v1.0.0-beta/ofc-ledger-beta.apk"
              download
              className="btn-primary"
            >
              Download Beta
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
