import Link from "next/link";
import Logo from "./Logo";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-[var(--color-bg)]/80 border-b border-[var(--color-card-border)]">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-3">
        <Link href="/" className="flex items-center gap-3 group">
          <Logo size={36} />
          <span className="font-[family-name:var(--font-display)] text-lg font-bold tracking-wider text-[var(--color-gold)]">
            OFC LEDGER
          </span>
        </Link>
        <div className="flex items-center gap-6 text-sm">
          <Link href="/" className="transition-colors hover:text-[var(--color-gold)]">
            Home
          </Link>
          <Link href="/rules" className="transition-colors hover:text-[var(--color-gold)]">
            Rules
          </Link>
          <Link href="/privacy" className="transition-colors hover:text-[var(--color-gold)]">
            Privacy
          </Link>
        </div>
      </nav>
    </header>
  );
}
