"use client";

import { useCallback, useLayoutEffect, useState, useSyncExternalStore, type CSSProperties } from "react";
import { useVideoAutoplay } from "@/hooks/useVideoAutoplay";

/**
 * VP9 alpha (webm) has no alpha channel in Safari — it plays, but as an
 * opaque black box — so the format can't be left to <source> negotiation.
 * Safari (including "Chrome"/"Firefox" on iOS, which are just Safari's
 * engine under a different name) gets the HEVC-with-alpha .mov instead.
 */
function pickFormat(): "hevc" | "webm" {
  if (typeof navigator === "undefined") return "webm";
  const ua = navigator.userAgent;
  const isIOSDevice =
    /iPad|iPhone|iPod/.test(ua) ||
    (ua.includes("Macintosh") && typeof document !== "undefined" && "ontouchend" in document);
  const isSafariUA = /Safari/.test(ua) && !/Chrome|CriOS|FxiOS|Android/.test(ua);
  return isSafariUA || isIOSDevice ? "hevc" : "webm";
}

// The engine can't change mid-session, so there's nothing to subscribe to —
// this is purely a way to defer reading navigator.userAgent until the
// client has mounted, matching the project's external-store convention
// instead of a setState-in-effect.
const noSubscription = () => () => {};
const getServerSrc = () => undefined;

export default function PromoFilm({
  webmSrc,
  hevcSrc,
  poster,
  preload = "metadata",
  className = "",
  style,
}: {
  webmSrc: string;
  hevcSrc: string;
  poster: string;
  preload?: "metadata" | "none";
  className?: string;
  style?: CSSProperties;
}) {
  const { ref, reduced, play } = useVideoAutoplay(0.3);
  const [started, setStarted] = useState(false);
  // Server/first paint renders just the poster (no src — guessing the alpha
  // format before we know the engine could show a black box in Safari) —
  // the correct src attaches once the client has actually mounted.
  const getClientSrc = useCallback(
    () => (pickFormat() === "hevc" ? hevcSrc : webmSrc),
    [hevcSrc, webmSrc]
  );
  const src = useSyncExternalStore(noSubscription, getClientSrc, getServerSrc);

  // The native `autoplay` attribute (kept so the film still starts with JS
  // disabled, once a src exists) can start playback before this component
  // has a chance to react to prefers-reduced-motion — stop it before paint.
  useLayoutEffect(() => {
    if (reduced) {
      ref.current?.pause();
    }
  }, [reduced, ref]);

  return (
    <div className={`promo-film ${className}`.trim()} style={style}>
      <video
        ref={ref}
        src={src}
        autoPlay
        muted
        loop
        playsInline
        preload={preload}
        poster={poster}
        style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }}
      />
      {reduced && !started && (
        <button
          type="button"
          aria-label="Play video"
          className="promo-film-play-button"
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
