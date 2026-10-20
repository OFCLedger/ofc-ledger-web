"use client";

import { createElement, type CSSProperties, type ElementType, type ReactNode } from "react";
import { useInViewOnce } from "@/hooks/useInViewOnce";

type RevealProps = {
  as?: ElementType;
  variant: "slam" | "fade-up";
  className?: string;
  style?: CSSProperties;
  delayMs?: number;
  children: ReactNode;
};

/**
 * One-shot scroll reveal for headlines (`slam`) and body copy (`fade-up`).
 * No-op visually until html carries `.reveal-ready` (see RevealReady) and the
 * element enters the viewport — so SSR, no-JS and reduced-motion all render
 * the final, fully-visible state.
 */
export default function Reveal({
  as = "div",
  variant,
  className = "",
  style,
  delayMs = 0,
  children,
}: RevealProps) {
  const { ref, inView } = useInViewOnce<HTMLElement>();

  return createElement(
    as,
    {
      ref,
      className: `reveal-${variant} ${inView ? "in-view" : ""} ${className}`.trim(),
      style: { ...style, transitionDelay: delayMs ? `${delayMs}ms` : undefined },
    },
    children
  );
}
