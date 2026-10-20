"use client";

import { useEffect, useLayoutEffect, useRef } from "react";

/**
 * Looping hero phone video. Autoplays natively (works with JS disabled too),
 * pauses offscreen via IntersectionObserver, and is stopped immediately for
 * prefers-reduced-motion so only the poster frame shows.
 */
export default function HeroPhoneVideo({
  className,
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useLayoutEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.pause();
      el.currentTime = 0;
    }
  }, []);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            el.play().catch(() => {});
          } else {
            el.pause();
          }
        }
      },
      { threshold: 0.25 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={videoRef}
      className={className}
      style={style}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      poster="/home/hero-poster.jpg"
    >
      <source src="/home/hero-loop.webm" type="video/webm" />
      <source src="/home/hero-loop.mp4" type="video/mp4" />
    </video>
  );
}
