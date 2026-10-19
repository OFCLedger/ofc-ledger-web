export default function LogoMark({
  width = 190,
  height = 169,
  className,
}: {
  width?: number;
  height?: number;
  className?: string;
}) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="-95 -114 190 169"
      aria-hidden="true"
      className={className}
    >
      <path d="M-94.0 -29.4 L0.0 24.9 L0.0 54.3 L-94.0 0.0 Z" fill="#9a7a00" />
      <path d="M0.0 24.9 L94.0 -29.4 L94.0 0.0 L0.0 54.3 Z" fill="#b89500" />
      <path d="M94.0 -29.4 L0.0 24.9 L-94.0 -29.4 L0.0 -83.7 Z" fill="#ffd700" />
      <path d="M-69.1 -58.8 L0.0 -18.9 L0.0 10.5 L-69.1 -29.4 Z" fill="#9a7a00" />
      <path d="M0.0 -18.9 L69.1 -58.8 L69.1 -29.4 L0.0 10.5 Z" fill="#b89500" />
      <path d="M69.1 -58.8 L0.0 -18.9 L-69.1 -58.8 L0.0 -98.7 Z" fill="#ffd700" />
      <path d="M-43.8 -88.2 L0.0 -62.9 L0.0 -33.5 L-43.8 -58.8 Z" fill="#9a7a00" />
      <path d="M0.0 -62.9 L43.8 -88.2 L43.8 -58.8 L0.0 -33.5 Z" fill="#b89500" />
      <path d="M43.8 -88.2 L0.0 -62.9 L-43.8 -88.2 L0.0 -113.5 Z" fill="#ffd700" />
    </svg>
  );
}
