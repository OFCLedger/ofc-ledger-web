"use client";

import { useLayoutEffect, useState, type CSSProperties } from "react";
import { useVideoAutoplay } from "@/hooks/useVideoAutoplay";

export default function FilmCard({
  webmSrc,
  mp4Src,
  poster,
  preload = "metadata",
  className = "",
  style,
}: {
  webmSrc: string;
  mp4Src: string;
  poster: string;
  preload?: "metadata" | "none";
  className?: string;
  style?: CSSProperties;
}) {
  const { ref, reduced, play } = useVideoAutoplay(0.3);
  const [started, setStarted] = useState(false);

  // The native `autoplay` attribute (kept so the film still loops with JS
  // disabled) can start playback before this component has a chance to
  // react to prefers-reduced-motion — stop it immediately, before paint.
  useLayoutEffect(() => {
    if (reduced) {
      ref.current?.pause();
    }
  }, [reduced, ref]);

  return (
    <div className={`film-card ${className}`.trim()} style={style}>
      <video
        ref={ref}
        autoPlay
        muted
        loop
        playsInline
        preload={preload}
        poster={poster}
        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
      >
        <source src={webmSrc} type="video/webm" />
        <source src={mp4Src} type="video/mp4" />
      </video>
      {reduced && !started && (
        <button
          type="button"
          aria-label="Play video"
          className="film-play-button"
          onClick={() => {
            setStarted(true);
            play();
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            <path d="M8 5v14l11-7z" fill="currentColor" />
          </svg>
        </button>
      )}
    </div>
  );
}
