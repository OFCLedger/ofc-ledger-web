import Image from "next/image";
import Link from "next/link";

const screenshots = [
  { src: "/screenshot1.png", label: "Live play" },
  { src: "/screenshot2.png", label: "Hand results" },
  { src: "/screenshot3.png", label: "Stats & ledger" },
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
          <a
            href="https://github.com/OFCLedger/releases/releases/download/v1.0.0-beta/ofc-ledger-beta.apk"
            download
            className="btn-primary"
          >
            Download Beta
          </a>
          <Link href="/rules" className="btn-gold">
            Learn the rules →
          </Link>
        </div>
        <p
          className="mt-5 text-sm italic"
          style={{ color: "var(--color-muted)" }}
        >
          Android beta live &bull; iOS coming soon
        </p>
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
        {/* Bento grid: mobile stacked, desktop 2-col with hero left */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {/* AI Card Camera — hero */}
          <div
            className="sm:row-span-3"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,215,0,0.12)",
              borderRadius: 12,
              padding: "2rem 1.5rem",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <h3
              style={{
                fontFamily: "var(--font-anton), sans-serif",
                color: "var(--color-white)",
                fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
                lineHeight: 1.1,
              }}
            >
              AI Card Camera
            </h3>
            <p
              className="font-[family-name:var(--font-dm-sans)]"
              style={{
                color: "var(--color-muted)",
                fontSize: "0.95rem",
                lineHeight: 1.7,
                marginTop: 12,
              }}
            >
              Point your camera at the board. Our Gemini-powered referee
              reads every card and scores the hand in seconds. No manual
              input, no disputes.
            </p>
          </div>

          {/* Live Ledger & Stats */}
          <div
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,215,0,0.12)",
              borderRadius: 12,
              padding: "1.5rem",
            }}
          >
            <h3
              style={{
                fontFamily: "var(--font-anton), sans-serif",
                color: "var(--color-white)",
                fontSize: "1.25rem",
                lineHeight: 1.15,
              }}
            >
              Live Ledger &amp; Stats
            </h3>
            <p
              className="font-[family-name:var(--font-dm-sans)]"
              style={{
                color: "var(--color-muted)",
                fontSize: "0.85rem",
                lineHeight: 1.65,
                marginTop: 8,
              }}
            >
              Every hand logged. See who&apos;s up, who owes what, and who
              hit Fantasy Land on the last card. Session stats that make
              settlement instant.
            </p>
          </div>

          {/* Anytime. Anywhere. */}
          <div
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,215,0,0.12)",
              borderRadius: 12,
              padding: "1.5rem",
            }}
          >
            <h3
              style={{
                fontFamily: "var(--font-anton), sans-serif",
                color: "var(--color-white)",
                fontSize: "1.25rem",
                lineHeight: 1.15,
              }}
            >
              Anytime. Anywhere.
            </h3>
            <p
              className="font-[family-name:var(--font-dm-sans)]"
              style={{
                color: "var(--color-muted)",
                fontSize: "0.85rem",
                lineHeight: 1.65,
                marginTop: 8,
              }}
            >
              Take your turn whenever it suits you. Full Pineapple OFC
              online — with Fantasy Land, Spades Multiplier, The Choice,
              and fully customizable rules.
            </p>
          </div>

          {/* Your Rules. Really. */}
          <div
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,215,0,0.12)",
              borderRadius: 12,
              padding: "1.5rem",
            }}
          >
            <h3
              style={{
                fontFamily: "var(--font-anton), sans-serif",
                color: "var(--color-white)",
                fontSize: "1.25rem",
                lineHeight: 1.15,
              }}
            >
              Your Rules. Really.
            </h3>
            <p
              className="font-[family-name:var(--font-dm-sans)]"
              style={{
                color: "var(--color-muted)",
                fontSize: "0.85rem",
                lineHeight: 1.65,
                marginTop: 8,
              }}
            >
              Classic or Pineapple. Progressive Fantasy Land. Jokers.
              Adjustable time limits. Set it up the way your crew plays —
              not how a developer decided you should.
            </p>
          </div>
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
