import Link from "next/link";
import LogoMark from "./LogoMark";

const links = [
  { href: "/rules", label: "House rules" },
  { href: "/#ledger", label: "Ledger" },
  { href: "/faq", label: "FAQ" },
];

export default function Header() {
  return (
    <header
      style={{ background: "var(--color-bg)", borderBottom: "1px solid var(--color-card-border)" }}
    >
      <nav className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-4 px-4 py-[18px] sm:px-6">
        <Link href="/" className="flex items-center gap-3 no-underline">
          <LogoMark width={34} height={31} />
          <span
            className="font-[family-name:var(--font-anton)]"
            style={{ fontSize: 24, letterSpacing: "0.02em", color: "var(--color-white)" }}
          >
            <span style={{ color: "var(--color-gold)" }}>OFC</span> LEDGER
          </span>
        </Link>

        <div className="flex flex-wrap items-center gap-7">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="no-underline"
              style={{ color: "var(--color-body)", fontSize: 15, fontWeight: 500 }}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/#get"
            className="no-underline"
            style={{
              background: "var(--color-gold)",
              color: "var(--color-gold-ink)",
              fontWeight: 700,
              fontSize: 15,
              padding: "12px 20px",
              borderRadius: 999,
            }}
          >
            Get the app
          </Link>
        </div>
      </nav>
    </header>
  );
}
