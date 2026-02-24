export default function LogoHero({ size = 120 }: { size?: number }) {
  const top = "#ffd700";
  const left = "#9a7a00";
  const right = "#b89500";

  return (
    <svg
      width={size}
      height={size}
      viewBox="10 2 80 70"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Slab 3 (bottom) */}
      <polygon points="50,26 80,41 50,56 20,41" fill={top} />
      <polygon points="20,41 50,56 50,66 20,51" fill={left} />
      <polygon points="80,41 50,56 50,66 80,51" fill={right} />

      {/* Slab 2 (middle) */}
      <polygon points="50,18 72,29 50,40 28,29" fill={top} />
      <polygon points="28,29 50,40 50,50 28,39" fill={left} />
      <polygon points="72,29 50,40 50,50 72,39" fill={right} />

      {/* Slab 1 (top) */}
      <polygon points="50,10 64,17 50,24 36,17" fill={top} />
      <polygon points="36,17 50,24 50,34 36,27" fill={left} />
      <polygon points="64,17 50,24 50,34 64,27" fill={right} />
    </svg>
  );
}
