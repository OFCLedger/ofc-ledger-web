"use client";

import { useCallback, useRef, useSyncExternalStore } from "react";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

const MAX_TRANSLATE_PX = 24;
const MAX_ROTATE_DEG = 1.5;

/** Transform-only scroll parallax: translateY within ±24px, rotation within ±1.5deg of a base angle. */
export function useScrollParallax<T extends HTMLElement>(baseRotateDeg: number) {
  const ref = useRef<T | null>(null);
  const reduced = usePrefersReducedMotion();
  const baseTransform = `rotate(${baseRotateDeg}deg)`;

  const subscribe = useCallback(
    (callback: () => void) => {
      if (reduced) return () => {};

      let frame: number | null = null;
      const onScroll = () => {
        if (frame == null) {
          frame = requestAnimationFrame(() => {
            frame = null;
            callback();
          });
        }
      };

      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll);
      return () => {
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", onScroll);
        if (frame != null) cancelAnimationFrame(frame);
      };
    },
    [reduced]
  );

  const getSnapshot = useCallback(() => {
    if (reduced) return baseTransform;
    const el = ref.current;
    if (!el) return baseTransform;

    const rect = el.getBoundingClientRect();
    const viewportH = window.innerHeight || 1;
    const elCenter = rect.top + rect.height / 2;
    const progress = Math.max(-1, Math.min(1, (viewportH / 2 - elCenter) / viewportH));
    const translateY = progress * MAX_TRANSLATE_PX;
    const rotate = baseRotateDeg + progress * MAX_ROTATE_DEG;
    return `rotate(${rotate}deg) translateY(${translateY}px)`;
  }, [reduced, baseRotateDeg, baseTransform]);

  const getServerSnapshot = useCallback(() => baseTransform, [baseTransform]);

  const transform = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  return { ref, transform };
}
