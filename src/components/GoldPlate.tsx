"use client";

import type { CSSProperties, ReactNode } from "react";
import { useInViewOnce } from "@/hooks/useInViewOnce";

const WIPE_MS = 200;
const TEXT_DELAY_MS = 60;

/**
 * Gold plate (STEROIDS, RIDE EVERY SWING.) that wipes in left-to-right via
 * clip-path, with its text fading in just after the wipe lands.
 */
export default function GoldPlate({
  children,
  className = "",
  style,
  delayMs = 0,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  delayMs?: number;
}) {
  const { ref, inView } = useInViewOnce<HTMLSpanElement>();

  // Chrome's IntersectionObserver treats a self-applied clip-path as zero
  // visible area, so observing the clipped plate directly would never fire.
  // The ref sits on an unclipped wrapper; the clip-path lives one level in.
  return (
    <span ref={ref}>
      <span
        className={`reveal-wipe ${inView ? "in-view" : ""} ${className}`.trim()}
        style={{ ...style, transitionDelay: delayMs ? `${delayMs}ms` : undefined }}
      >
        <span
          className="reveal-wipe-text"
          style={{ transitionDelay: `${delayMs + WIPE_MS + TEXT_DELAY_MS}ms` }}
        >
          {children}
        </span>
      </span>
    </span>
  );
}
