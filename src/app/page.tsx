import Image from "next/image";
import Link from "next/link";

const screenshots = [
  { src: "/screenshot1.png", label: "Live play" },
  { src: "/screenshot2.png", label: "Hand results" },
  { src: "/screenshot3.png", label: "Stats & ledger" },
];

const features = [
  {
    emoji: "🎮",
    title: "Anytime. Anywhere.",
    text: "Take your turn whenever it suits you. Full Pineapple OFC online — with Fantasy Land, Spades Multiplier, The Choice, and fully customizable rules.",
  },
  {
    emoji: "📸",
    title: "AI Card Camera",
    text: "Point your camera at the board. Our Gemini-powered referee reads every card and scores the hand in seconds. No manual input, no disputes.",
  },
  {
    emoji: "📊",
    title: "Live Ledger & Stats",
    text: "Every hand logged. See who's up, who owes what, and who hit Fantasy Land on the last card. Session stats that make settlement instant.",
  },
  {
    emoji: "⚙️",
    title: "Your Rules. Really.",
    text: "Classic or Pineapple. Progressive Fantasy Land. Jokers. Adjustable time limits. Set it up the way your crew plays — not how a developer decided you should.",
  },
];

export default function Home() {
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
          OPEN FACE CHINESE POKER
        </span>
        <h1
          className="mt-4 text-5xl sm:text-7xl"
          style={{
            fontFamily: "var(--font-anton), sans-serif",
            color: "var(--color-white)",
            lineHeight: 1.05,
          }}
        >
          OFC FOR YOUR
          <br />
          CREW.
        </h1>
        <p
          className="mx-auto mt-5 font-[family-name:var(--font-dm-sans)]"
          style={{
            color: "var(--color-muted)",
            maxWidth: 520,
            lineHeight: 1.7,
          }}
        >
          The cleanest OFC app built for private groups. Instant online play, an
          AI card-camera referee, and stats that make the ledger settle itself.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <button disabled className="btn-primary opacity-70 cursor-not-allowed">
            Download — Coming Soon
          </button>
          <Link href="/rules" className="btn-gold">
            Learn the rules →
          </Link>
        </div>
        <p
          className="mt-5 text-sm italic"
          style={{ color: "var(--color-muted)" }}
        >
          iOS &amp; Android
        </p>
      </section>

      {/* ── PHONE MOCKUPS ── */}
      <section className="relative px-4 pt-4 pb-8">
        <div
          className="flex justify-center gap-6 overflow-x-auto sm:overflow-x-visible"
          style={{ flexWrap: "nowrap" }}
        >
          {screenshots.map((s) => (
            <div
              key={s.src}
              className="flex-shrink-0 flex flex-col items-center"
            >
              <div
                style={{
                  width: 200,
                  height: 400,
                  borderRadius: "2rem",
                  border: "2px solid rgba(255,215,0,0.25)",
                  background: "#0f1f18",
                  boxShadow:
                    "0 40px 80px rgba(0,0,0,0.5), 0 0 60px rgba(255,215,0,0.06)",
                  overflow: "hidden",
                }}
              >
                <Image
                  src={s.src}
                  alt={s.label}
                  width={200}
                  height={400}
                  style={{
                    borderRadius: "1.8rem",
                    objectFit: "cover",
                    objectPosition: "top",
                    width: "100%",
                    height: "100%",
                  }}
                />
              </div>
              <span
                className="font-[family-name:var(--font-dm-mono)]"
                style={{
                  fontSize: 11,
                  color: "var(--color-muted)",
                  textAlign: "center",
                  marginTop: 8,
                }}
              >
                {s.label}
              </span>
            </div>
          ))}
        </div>
        <p
          className="mt-4 text-center text-sm"
          style={{ color: "var(--color-muted)" }}
        >
          Pineapple OFC · Anywhere. Anytime.
        </p>
      </section>

      {/* ── FEATURES ── */}
      <section className="mx-auto max-w-[900px] px-4 py-16 sm:px-6 sm:py-24">
        <h2
          className="text-center text-3xl sm:text-4xl"
          style={{
            fontFamily: "var(--font-anton), sans-serif",
            color: "var(--color-white)",
          }}
        >
          Built for serious play.
        </h2>
        <div
          className="mx-auto mt-4"
          style={{
            width: 40,
            height: 2,
            background: "var(--color-gold)",
            marginBottom: "3rem",
          }}
        />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {features.map((f) => (
            <div key={f.title} className="card">
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
                {f.emoji}
              </span>
              <h3
                className="font-[family-name:var(--font-dm-sans)] font-bold"
                style={{
                  color: "var(--color-white)",
                  marginTop: 12,
                }}
              >
                {f.title}
              </h3>
              <p
                style={{
                  color: "var(--color-muted)",
                  fontSize: "0.9rem",
                  lineHeight: 1.7,
                  marginTop: 8,
                }}
              >
                {f.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── NO FLUFF ── */}
      <section
        style={{
          background: "rgba(0,0,0,0.25)",
          borderTop: "1px solid var(--color-card-border)",
          borderBottom: "1px solid var(--color-card-border)",
        }}
      >
        <div className="mx-auto max-w-[640px] px-4 py-20 text-center sm:px-6">
          <span
            className="font-[family-name:var(--font-anton)] uppercase"
            style={{
              color: "var(--color-gold)",
              letterSpacing: "0.15em",
              fontSize: "0.85rem",
            }}
          >
            PHILOSOPHY
          </span>
          <h2
            className="mt-3 text-3xl sm:text-4xl"
            style={{
              fontFamily: "var(--font-anton), sans-serif",
              color: "var(--color-white)",
              lineHeight: 1.1,
            }}
          >
            100% OFC. Nothing else.
          </h2>
          <p
            className="mt-6"
            style={{ color: "var(--color-muted)", lineHeight: 1.8 }}
          >
            No social feed. No coins. No random matchmaking. OFC Ledger does one
            thing: gives your group the best possible OFC experience, online or
            at the table.
          </p>
          <p
            className="mt-4"
            style={{ color: "var(--color-muted)", lineHeight: 1.8 }}
          >
            Built by players, for players. No investor roadmap telling us to add
            a battle pass.
          </p>
        </div>
      </section>

      {/* ── COMMUNITY ── */}
      <section className="mx-auto max-w-[560px] px-4 py-20 text-center sm:px-6">
        <span
          className="font-[family-name:var(--font-anton)] uppercase"
          style={{
            color: "var(--color-gold)",
            letterSpacing: "0.15em",
            fontSize: "0.85rem",
          }}
        >
          COMMUNITY
        </span>
        <h2
          className="mt-3 text-3xl sm:text-4xl"
          style={{
            fontFamily: "var(--font-anton), sans-serif",
            color: "var(--color-white)",
          }}
        >
          Your house rule might be next.
        </h2>
        <p
          className="mt-4"
          style={{ color: "var(--color-muted)", lineHeight: 1.8 }}
        >
          We listen. If your crew has a ruling or variant that makes the game
          better — tell us. We ship patches fast. The Spades Multiplier and The
          Choice both started as house rules.
        </p>
        <div className="mt-8">
          <a href="mailto:hello@ofcledger.com" className="btn-gold">
            Suggest a rule →
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
