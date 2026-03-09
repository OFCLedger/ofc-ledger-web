const faqs = [
  {
    q: "What variants of OFC do you support?",
    a: "Both Classic and Pineapple — with settings you can tweak to match exactly how your crew plays. Set custom Fantasy Land requirements and stack on street rules to dial in the right level.",
  },
  {
    q: "Do I need an account to play?",
    a: "Yes. It takes 30 seconds and keeps your stats and history across sessions.",
  },
  {
    q: "How good is the AI camera at reading cards?",
    a: "Very good — but bad angles and poor lighting make it harder. Shoot straight down in decent light and it'll nail it. Unusual decks can trip it up, but the vast majority work without issues.",
  },
  {
    q: "What if the camera misreads a card?",
    a: "Tap the card and correct it manually. Done.",
  },
  {
    q: "How do I see my opponents' hands?",
    a: "Swipe left/right in the play screen, or tap the player names at the top.",
  },
  {
    q: "Can I play against strangers?",
    a: "No — OFC Ledger is built for private groups. Invite your players via link or QR code.",
  },
  {
    q: "Does the app handle real money?",
    a: "No. The app tracks points. What you play for is up to you.",
  },
  {
    q: "How do I activate squeeze?",
    a: "Enable 4-color deck in Preferences from the home screen. Then press and hold a face-down card to squeeze it.",
  },
  {
    q: "What happens if I don't place my cards in time?",
    a: "They're placed automatically, top-left to bottom-right. Jokers are set as 2, 3, or 4 of hearts.",
  },
  {
    q: "Will I get push notifications when it's my turn?",
    a: "Yes — make sure notifications are enabled both in the app (under Preferences) and in your phone's settings.",
  },
  {
    q: "When does the app launch and on which phones?",
    a: "An open Android beta is live now. Full releases for Android and iOS are coming.",
  },
  {
    q: "What does it cost?",
    a: "A free 3-day trial, then $2.99/month. That covers servers, infrastructure, and development. No battle pass. No coins.",
  },
  {
    q: "What if the app scores something wrong?",
    a: "It shouldn't — but bugs happen. Report anything weird to hello@ofcledger.com and we'll ship a fix fast.",
  },
  {
    q: "I have a great house rule — how do I share it?",
    a: "hello@ofcledger.com. We love a good ruling and we ship patches fast. The Spades Multiplier and The Choice both started as house rules.",
  },
];

export default function FAQPage() {
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
          SUPPORT
        </span>
        <h1
          className="mt-4 text-5xl sm:text-7xl"
          style={{
            fontFamily: "var(--font-anton), sans-serif",
            color: "var(--color-white)",
            lineHeight: 1.05,
          }}
        >
          FREQUENTLY ASKED
          <br />
          QUESTIONS.
        </h1>
        <p
          className="mx-auto mt-5 font-[family-name:var(--font-dm-sans)]"
          style={{
            color: "var(--color-muted)",
            maxWidth: 520,
            lineHeight: 1.7,
          }}
        >
          Everything you need to know about OFC Ledger.
        </p>
      </section>

      {/* ── FAQ CARDS ── */}
      <section className="mx-auto max-w-[900px] px-4 py-16 sm:px-6 sm:py-24">
        <div className="grid grid-cols-1 gap-6">
          {faqs.map((f) => (
            <div key={f.q} className="card">
              <h3
                className="font-[family-name:var(--font-dm-sans)] font-bold"
                style={{ color: "var(--color-white)" }}
              >
                {f.q}
              </h3>
              <p
                style={{
                  color: "var(--color-muted)",
                  fontSize: "0.9rem",
                  lineHeight: 1.7,
                  marginTop: 8,
                }}
              >
                {f.a}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── STILL STUCK CTA ── */}
      <section className="mx-auto max-w-[560px] px-4 py-20 text-center sm:px-6">
        <span
          className="font-[family-name:var(--font-anton)] uppercase"
          style={{
            color: "var(--color-gold)",
            letterSpacing: "0.15em",
            fontSize: "0.85rem",
          }}
        >
          STILL STUCK?
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
          Can&apos;t find what you&apos;re looking for? Drop us a line.
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
