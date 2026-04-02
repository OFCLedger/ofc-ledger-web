import Image from "next/image";

const screenshots = [
  { src: "/screenshot1.png", label: "Live play" },
  { src: "/screenshot2.png", label: "Hand results" },
  { src: "/screenshot3.png", label: "Stats & ledger" },
];

const features = [
  {
    num: "1",
    title: "Anytime. Anywhere.",
    text: "Take your turn whenever it suits you. Full Pineapple OFC online — with Fantasy Land, Spades Multiplier, The Choice, and fully customizable rules.",
  },
  {
    num: "2",
    title: "AI Card Camera",
    text: "Point your camera at the board. Our Gemini-powered referee reads every card and scores the hand in seconds. No manual input, no disputes.",
  },
  {
    num: "3",
    title: "Live Ledger & Stats",
    text: "Every hand logged. See who's up, who owes what, and who hit Fantasy Land on the last card. Session stats that make settlement instant.",
  },
  {
    num: "4",
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
        >OFC FOR <br />YOUR CREW.
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
        <span
          className="mt-8 font-[family-name:var(--font-anton)] uppercase"
          style={{
            color: "var(--color-gold)",
            letterSpacing: "0.15em",
            fontSize: "0.75rem",
          }}
        >
          OPEN BETA — NOW LIVE
        </span>
        <div
          className="mt-4"
          style={{ display: "flex", gap: 12, alignItems: "center" }}
        >
          <a
            href="https://github.com/OFCLedger/releases/releases/download/v1.0.1-beta/ofc-ledger-beta-1.0.1.apk"
            download
            className="btn-primary"
          >
            Download for Android
          </a>
          <div className="flex flex-col items-center">
            <a
              href="https://testflight.apple.com/join/xNxPJuVr"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              Download for iOS
            </a>
            <span
              className="mt-2 text-xs"
              style={{ color: "var(--color-muted)" }}
            >
              Requires TestFlight – free on App Store
            </span>
          </div>
        </div>
      </section>

      {/* ── PHONE MOCKUPS ── */}
      <section
        className="relative px-4 pt-4 pb-8"
        style={{
          paddingLeft: "1rem",
          paddingRight: "1rem",
        }}
      >
        <div
          className="flex gap-6 overflow-x-auto sm:justify-center sm:overflow-x-visible"
          style={{
            flexWrap: "nowrap",
            scrollSnapType: "x mandatory",
            paddingLeft: "calc(50% - 100px)",
            paddingRight: "calc(50% - 100px)",
            maskImage:
              "linear-gradient(to bottom, black 70%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, black 70%, transparent 100%)",
          }}
        >
          {screenshots.map((s) => (
            <div
              key={s.src}
              className="flex-shrink-0 flex flex-col items-center"
              style={{ scrollSnapAlign: "center" }}
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
            </div>
          ))}
        </div>
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
            <div key={f.title} className="card" style={{ position: "relative", overflow: "hidden" }}>
              <span
                style={{
                  position: "absolute",
                  top: "-0.1em",
                  right: "-0.05em",
                  fontFamily: "var(--font-anton), sans-serif",
                  fontSize: "8rem",
                  lineHeight: 1,
                  color: "rgba(255,255,255,0.07)",
                  pointerEvents: "none",
                  userSelect: "none",
                  maskImage: "linear-gradient(to bottom, white 40%, transparent 90%)",
                  WebkitMaskImage: "linear-gradient(to bottom, white 40%, transparent 90%)",
                }}
              >
                {f.num}
              </span>
              <div style={{ position: "relative" }}>
                <h3
                  className="font-[family-name:var(--font-anton)]"
                  style={{
                    color: "var(--color-white)",
                    fontSize: "1.25rem",
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
    </main>
  );
}
