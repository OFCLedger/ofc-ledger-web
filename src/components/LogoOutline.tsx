export default function LogoOutline({ size = 32 }: { size?: number }) {
  const s = "#ffd700";
  const f = "#1e3a2f";
  const sw = 1.3;

  return (
    <svg
      width={size}
      height={size}
      viewBox="10 2 80 70"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Slab 3 (bottom) — fills */}
      <polygon points="50,26 80,41 50,56 20,41" fill={f} />
      <polygon points="20,41 50,56 50,66 20,51" fill={f} />
      <polygon points="80,41 50,56 50,66 80,51" fill={f} />
      {/* Slab 3 — strokes: outer contour + internal V */}
      <path d="M20,51 L20,41 L50,26 L80,41 L80,51 L50,66 Z" fill="none" stroke={s} strokeWidth={sw} />
      <polyline points="20,41 50,56 80,41" fill="none" stroke={s} strokeWidth={sw} />

      {/* Slab 2 (middle) — fills */}
      <polygon points="50,18 72,29 50,40 28,29" fill={f} />
      <polygon points="28,29 50,40 50,50 28,39" fill={f} />
      <polygon points="72,29 50,40 50,50 72,39" fill={f} />
      {/* Slab 2 — strokes */}
      <path d="M28,39 L28,29 L50,18 L72,29 L72,39 L50,50 Z" fill="none" stroke={s} strokeWidth={sw} />
      <polyline points="28,29 50,40 72,29" fill="none" stroke={s} strokeWidth={sw} />

      {/* Slab 1 (top) — fills */}
      <polygon points="50,10 64,17 50,24 36,17" fill={f} />
      <polygon points="36,17 50,24 50,34 36,27" fill={f} />
      <polygon points="64,17 50,24 50,34 64,27" fill={f} />
      {/* Slab 1 — strokes */}
      <path d="M36,27 L36,17 L50,10 L64,17 L64,27 L50,34 Z" fill="none" stroke={s} strokeWidth={sw} />
      <polyline points="36,17 50,24 64,17" fill="none" stroke={s} strokeWidth={sw} />
    </svg>
  );
}
