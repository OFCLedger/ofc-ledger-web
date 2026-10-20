"use client";

import type { CSSProperties, ReactNode } from "react";
import { useScrollParallax } from "@/hooks/useScrollParallax";

export default function ParallaxFrame({
  baseRotateDeg,
  style,
  className,
  children,
}: {
  baseRotateDeg: number;
  style?: CSSProperties;
  className?: string;
  children: ReactNode;
}) {
  const { ref, transform } = useScrollParallax<HTMLDivElement>(baseRotateDeg);

  // The measured ref sits on an untransformed wrapper so reading its position
  // never feeds back into the transform we compute from it (which would
  // otherwise oscillate and trip React's "maximum update depth" guard).
  return (
    <div ref={ref} style={{ display: "inline-flex" }}>
      <div className={className} style={{ ...style, transform }}>
        {children}
      </div>
    </div>
  );
}
