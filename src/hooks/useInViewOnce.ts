"use client";

import { useCallback, useRef, useSyncExternalStore } from "react";

/** Tracks whether an element has ever intersected the viewport. Fires once, then disconnects. */
export function useInViewOnce<T extends HTMLElement>(threshold = 0.2) {
  const ref = useRef<T | null>(null);
  const seen = useRef(false);
  const listeners = useRef(new Set<() => void>());

  const subscribe = useCallback(
    (callback: () => void) => {
      listeners.current.add(callback);

      if (typeof IntersectionObserver === "undefined") {
        seen.current = true;
        return () => listeners.current.delete(callback);
      }

      const el = ref.current;
      if (!el || seen.current) {
        return () => listeners.current.delete(callback);
      }

      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              seen.current = true;
              observer.disconnect();
              listeners.current.forEach((l) => l());
            }
          }
        },
        { threshold }
      );
      observer.observe(el);

      return () => {
        listeners.current.delete(callback);
        observer.disconnect();
      };
    },
    [threshold]
  );

  const getSnapshot = useCallback(() => seen.current, []);
  const getServerSnapshot = useCallback(() => false, []);

  const inView = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  return { ref, inView };
}
