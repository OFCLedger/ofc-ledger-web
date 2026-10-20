"use client";

import { useCallback, useRef, useSyncExternalStore } from "react";

// Ignore the bottom 20% of the viewport as a trigger zone, and require either
// 30% of the element's own area to be visible inside it, or — for elements
// taller than the viewport, which can never reach that ratio — at least 40%
// of the viewport height to be covered.
const ROOT_MARGIN = "0px 0px -20% 0px";
const RATIO_THRESHOLD = 0.3;
const VIEWPORT_HEIGHT_FRACTION = 0.4;
const THRESHOLD_STEPS = [0, 0.05, 0.1, 0.15, 0.2, 0.25, 0.3];

/**
 * Tracks whether an element has properly scrolled onscreen (not just grazed
 * the bottom edge). Fires once, then disconnects. The resulting flip to
 * in-view is deferred two animation frames so the hidden start state is
 * guaranteed to have painted at least once before the transition runs.
 */
export function useInViewOnce<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const seen = useRef(false);
  const listeners = useRef(new Set<() => void>());

  const subscribe = useCallback((callback: () => void) => {
    listeners.current.add(callback);

    if (typeof IntersectionObserver === "undefined") {
      seen.current = true;
      return () => listeners.current.delete(callback);
    }

    const el = ref.current;
    if (!el || seen.current) {
      return () => listeners.current.delete(callback);
    }

    const reveal = () => {
      seen.current = true;
      listeners.current.forEach((l) => l());
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (seen.current || !entry.isIntersecting) continue;

          const visibleHeightFraction = entry.intersectionRect.height / (window.innerHeight || 1);
          const qualifies =
            entry.intersectionRatio >= RATIO_THRESHOLD || visibleHeightFraction >= VIEWPORT_HEIGHT_FRACTION;
          if (!qualifies) continue;

          observer.disconnect();
          requestAnimationFrame(() => {
            requestAnimationFrame(reveal);
          });
        }
      },
      { threshold: THRESHOLD_STEPS, rootMargin: ROOT_MARGIN }
    );
    observer.observe(el);

    return () => {
      listeners.current.delete(callback);
      observer.disconnect();
    };
  }, []);

  const getSnapshot = useCallback(() => seen.current, []);
  const getServerSnapshot = useCallback(() => false, []);

  const inView = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  return { ref, inView };
}
