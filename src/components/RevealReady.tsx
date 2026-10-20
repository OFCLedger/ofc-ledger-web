"use client";

import { useEffect } from "react";

/**
 * Flips on the gate class that arms one-shot scroll reveals, but only after
 * hydration and only when the visitor hasn't asked for reduced motion. With
 * JS disabled (or on crawlers) this never runs, so `.reveal-*` elements stay
 * in their fully-visible default state defined in globals.css.
 */
export default function RevealReady() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduced) {
      document.documentElement.classList.add("reveal-ready");
    }
  }, []);

  return null;
}
