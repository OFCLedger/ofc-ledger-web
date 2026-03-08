const steps = [
  {
    emoji: "👥",
    title: "Create or join a game",
    text: "Tap the + button to create a new game. Choose your variant (Pineapple), match length, and time per turn. Share the link or QR code with your crew — they join in one tap.",
  },
  {
    emoji: "🃏",
    title: "Play on your schedule",
    text: "When it's your turn you get a push notification. Open the app, drag your cards to top, mid, or bottom. Confirm when you're ready. The server validates your move and notifies the next player.",
  },
  {
    emoji: "📸",
    title: "Physical table mode",
    text: "Playing live? Switch to camera mode. Point your phone at a player's board — the AI reads all 13 cards instantly. Correct any misread cards manually, then move to the next player. Scoring is automatic when all boards are complete.",
  },
  {
    emoji: "📊",
    title: "Track every hand",
    text: "Every hand is saved automatically. After each hand you see royalties, Fantasy Land bonuses, and running totals. When the match ends the stats show exactly how the session played out.",
  },
];

export default function GuidePage() {
  return (
    <main>
      {/* ── HERO ── */}
      <section className="flex flex-col items-center px-4 pt-10 pb-4 text-center sm:px-6 sm:pt-16 sm:pb-8">
        <span
          className="font-[family-name:var(--font-anton)] uppercase"
          style={{
            color: "var(--color-gold)",
            letterSpacing: "0.15em",
            fontSize: "0.8rem",
          }}
        >
          GETTING STARTED
        </span>
        <h1
          className="mt-4 text-5xl sm:text-7xl"
          style={{
            fontFamily: "var(--font-anton), sans-serif",
            color: "var(--color-white)",
            lineHeight: 1.05,
          }}
        >
          UP AND RUNNING
          <br />
          IN MINUTES.
        </h1>
        <p
          className="mx-auto mt-5 font-[family-name:var(--font-dm-sans)]"
          style={{
            color: "var(--color-muted)",
            maxWidth: 520,
            lineHeight: 1.7,
          }}
        >
          OFC Ledger works two ways — play on your schedule with your crew
          online, or use it as a scoring referee at the physical table.
          Here&apos;s how to get going.
        </p>
      </section>

      {/* ── STEPS ── */}
      <section className="mx-auto max-w-[900px] px-4 py-16 sm:px-6 sm:py-24">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {steps.map((s) => (
            <div key={s.title} className="card">
              <span
                className="inline-flex items-center"
                style={{
                  padding: "6px 12px",
                  borderRadius: 9999,
                  background: "rgba(255,215,0,0.08)",
                  border: "1px solid rgba(255,215,0,0.15)",
                  fontSize: "1.1rem",
                }}
              >
                {s.emoji}
              </span>
              <h3
                className="font-[family-name:var(--font-dm-sans)] font-bold"
                style={{
                  color: "var(--color-white)",
                  marginTop: 12,
                }}
              >
                {s.title}
              </h3>
              <p
                style={{
                  color: "var(--color-muted)",
                  fontSize: "0.9rem",
                  lineHeight: 1.7,
                  marginTop: 8,
                }}
              >
                {s.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── QUESTIONS CTA ── */}
      <section className="mx-auto max-w-[560px] px-4 py-20 text-center sm:px-6">
        <span
          className="font-[family-name:var(--font-anton)] uppercase"
          style={{
            color: "var(--color-gold)",
            letterSpacing: "0.15em",
            fontSize: "0.85rem",
          }}
        >
          QUESTIONS?
        </span>
        <h2
          className="mt-3 text-3xl sm:text-4xl"
          style={{
            fontFamily: "var(--font-anton), sans-serif",
            color: "var(--color-white)",
          }}
        >
          We&apos;re easy to reach.
        </h2>
        <p
          className="mt-4"
          style={{ color: "var(--color-muted)", lineHeight: 1.8 }}
        >
          Something unclear or not working as expected? Drop us a line.
        </p>
        <div className="mt-8">
          <a href="mailto:hello@ofcledger.com" className="btn-gold">
            Contact us →
          </a>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer
        className="text-center italic"
        style={{
          borderTop: "1px solid var(--color-card-border)",
          padding: "1.5rem",
          color: "var(--color-muted)",
          fontSize: "0.8rem",
        }}
      >
        © 2025 OFC Ledger · For grinders and gamblers.
      </footer>
    </main>
  );
}
