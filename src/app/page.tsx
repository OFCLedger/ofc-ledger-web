import Link from "next/link";

const features = [
  {
    emoji: "🎮",
    title: "Play on your schedule",
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

function PhoneMockup() {
  const cardStyle = {
    width: 32,
    height: 44,
    borderRadius: 6,
    background: "linear-gradient(135deg, #2a4a38, #1e3329)",
    border: "1px solid rgba(255,215,0,0.3)",
  };

  return (
    <div style={{ position: "relative" }}>
      {/* Phone shell */}
      <div
        style={{
          width: 260,
          height: 520,
          borderRadius: "2.5rem",
          border: "2px solid rgba(255,215,0,0.25)",
          background: "#0f1f18",
          boxShadow:
            "0 40px 80px rgba(0,0,0,0.5), 0 0 60px rgba(255,215,0,0.06)",
          margin: "0 auto",
          position: "relative",
        }}
      >
        {/* Screen */}
        <div
          style={{
            width: "90%",
            margin: "0 auto",
            height: "92%",
            marginTop: "4%",
            borderRadius: "2rem",
            background: "linear-gradient(180deg, #1a3329 0%, #0f1f18 100%)",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            paddingTop: 12,
            gap: 8,
          }}
        >
          {/* Notch */}
          <div
            style={{
              width: 60,
              height: 8,
              background: "#0f1f18",
              borderRadius: "0 0 8px 8px",
            }}
          />

          {/* TOP */}
          <span
            className="font-[family-name:var(--font-dm-mono)]"
            style={{
              color: "var(--color-muted)",
              fontSize: 9,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
            }}
          >
            TOP
          </span>
          <div style={{ display: "flex", gap: 4 }}>
            <div style={cardStyle} />
            <div style={cardStyle} />
            <div style={cardStyle} />
          </div>

          {/* MID */}
          <span
            className="font-[family-name:var(--font-dm-mono)]"
            style={{
              color: "var(--color-muted)",
              fontSize: 9,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
            }}
          >
            MID
          </span>
          <div style={{ display: "flex", gap: 4 }}>
            <div style={cardStyle} />
            <div style={cardStyle} />
            <div style={cardStyle} />
            <div style={cardStyle} />
            <div style={cardStyle} />
          </div>

          {/* BOT */}
          <span
            className="font-[family-name:var(--font-dm-mono)]"
            style={{
              color: "var(--color-muted)",
              fontSize: 9,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
            }}
          >
            BOT
          </span>
          <div style={{ display: "flex", gap: 4 }}>
            <div style={cardStyle} />
            <div style={cardStyle} />
            <div style={cardStyle} />
            <div style={cardStyle} />
            <div style={cardStyle} />
          </div>

          {/* Score bar */}
          <div
            className="font-[family-name:var(--font-dm-mono)]"
            style={{
              background: "rgba(255,215,0,0.1)",
              borderRadius: 8,
              padding: "4px 12px",
              fontSize: 10,
              color: "var(--color-gold)",
            }}
          >
            +9 royalties
          </div>

          {/* Fantasy Land pill */}
          <span
            className="font-[family-name:var(--font-anton)]"
            style={{
              background: "rgba(255,215,0,0.15)",
              border: "1px solid rgba(255,215,0,0.4)",
              color: "var(--color-gold)",
              fontSize: 9,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              padding: "4px 10px",
              borderRadius: 9999,
            }}
          >
            FANTASY LAND
          </span>
        </div>
      </div>

      {/* Ellipse glow */}
      <div
        style={{
          width: 300,
          height: 100,
          background: "rgba(255,215,0,0.06)",
          borderRadius: "50%",
          filter: "blur(40px)",
          position: "absolute",
          bottom: -20,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: -1,
        }}
      />
    </div>
  );
}

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
          The cleanest OFC app built for private groups. Async online play, an
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

      {/* ── PHONE MOCKUP ── */}
      <section className="relative px-4 pt-4 pb-8">
        <PhoneMockup />
        <p
          className="mt-4 text-center text-sm"
          style={{ color: "var(--color-muted)" }}
        >
          Pineapple OFC · Async multiplayer
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
