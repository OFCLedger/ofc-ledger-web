"use client";

import { useInViewOnce } from "@/hooks/useInViewOnce";

const STEP_MS = 220;
const anton = { fontFamily: "var(--font-anton), sans-serif" };

/** "x2 x4 x8" headline: each multiplier slams in 220ms after the last, x8 settling into a gold glow. */
export default function SpadesMultiplier() {
  const { ref, inView } = useInViewOnce<HTMLParagraphElement>();

  return (
    <p
      ref={ref}
      style={{ margin: 0, ...anton, fontSize: 96, lineHeight: 1, color: "var(--color-gold)" }}
    >
      <span
        className={`reveal-slam ${inView ? "in-view" : ""}`}
        style={{ transitionDelay: "0ms" }}
      >
        x2
      </span>{" "}
      <span
        className={`reveal-slam ${inView ? "in-view" : ""}`}
        style={{ transitionDelay: `${STEP_MS}ms` }}
      >
        x4
      </span>{" "}
      <span
        className={`reveal-slam reveal-glow ${inView ? "in-view" : ""}`}
        style={{ transitionDelay: `${STEP_MS * 2}ms` }}
      >
        x8
      </span>
    </p>
  );
}
