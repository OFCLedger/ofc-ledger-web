"use client";

import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

/**
 * Plays a <video> while >= `threshold` of it is onscreen, pauses it
 * otherwise (battery-friendly for background loops). Under
 * prefers-reduced-motion, autoplay is suppressed entirely until the viewer
 * explicitly starts it via the returned `play()`, after which the normal
 * onscreen/offscreen pausing still applies.
 */
export function useVideoAutoplay(threshold = 0.3) {
  const ref = useRef<HTMLVideoElement | null>(null);
  const reduced = usePrefersReducedMotion();
  const userStarted = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            if (!reduced || userStarted.current) {
              el.play().catch(() => {});
            }
          } else {
            el.pause();
          }
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, reduced]);

  const play = () => {
    userStarted.current = true;
    ref.current?.play().catch(() => {});
  };

  return { ref, reduced, play };
}
