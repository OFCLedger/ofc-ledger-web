export default function Logo({ size = 48 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="10 2 80 70"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Bottom slab */}
      <polygon points="50,68 15,52 50,44 85,52" fill="#1e3a2f" />
      <polygon points="50,68 15,52 50,44 85,52" fill="none" stroke="#ffd700" strokeWidth="2" />
      {/* Middle slab */}
      <polygon points="50,48 22,35 50,27 78,35" fill="#1e3a2f" />
      <polygon points="50,48 22,35 50,27 78,35" fill="none" stroke="#ffd700" strokeWidth="2" />
      {/* Top slab */}
      <polygon points="50,30 30,20 50,12 70,20" fill="#1e3a2f" />
      <polygon points="50,30 30,20 50,12 70,20" fill="none" stroke="#ffd700" strokeWidth="2" />
    </svg>
  );
}
