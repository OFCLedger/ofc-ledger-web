import Image from "next/image";
import LogoMark from "@/components/LogoMark";

const GOOGLE_PLAY_URL =
  "https://play.google.com/store/apps/details?id=com.ofcledger.OFCScorekeeper";
const TESTFLIGHT_URL = "https://testflight.apple.com/join/xNxPJuVr";

const anton = { fontFamily: "var(--font-anton), sans-serif" };

function StoreButtons() {
  return (
    <>
      <a
        href={GOOGLE_PLAY_URL}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          background: "var(--color-gold)",
          color: "var(--color-gold-ink)",
          textDecoration: "none",
          fontWeight: 700,
          fontSize: 17,
          padding: "16px 26px",
          borderRadius: 999,
        }}
      >
        Get it on Google Play
      </a>
      <a
        href={TESTFLIGHT_URL}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          border: "2px solid var(--color-gold)",
          color: "var(--color-gold)",
          textDecoration: "none",
          fontWeight: 700,
          fontSize: 17,
          padding: "14px 24px",
          borderRadius: 999,
        }}
      >
        iOS beta on TestFlight
      </a>
    </>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p
      style={{
        margin: 0,
        ...anton,
        fontSize: 15,
        letterSpacing: "0.16em",
        color: "var(--color-gold)",
      }}
    >
      {children}
    </p>
  );
}

export default function Home() {
  return (
    <main>
      {/* ── HERO ── */}
      <section id="top" style={{ background: "var(--color-bg-alt)", overflow: "hidden" }}>
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: "clamp(48px, 7vw, 104px) 24px clamp(56px, 7vw, 112px)",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: 56,
          }}
        >
          <div style={{ flex: "1 1 520px", minWidth: 0, display: "flex", flexDirection: "column", gap: 28 }}>
            <Eyebrow>OPEN FACE CHINESE · FOR YOUR CREW</Eyebrow>
            <h1
              style={{
                margin: 0,
                display: "inline-flex",
                flexDirection: "column",
                alignSelf: "flex-start",
                gap: 10,
                ...anton,
                fontWeight: 400,
                fontSize: "clamp(96px, 11vw, 176px)",
                lineHeight: 0.92,
                color: "var(--color-white)",
              }}
            >
              <span>OFC ON</span>
              <span
                style={{
                  background: "var(--color-gold)",
                  color: "var(--color-gold-ink)",
                  fontSize: "0.725em",
                  lineHeight: 1.2,
                  padding: "0.03em 0 0",
                  letterSpacing: "-0.005em",
                  textAlign: "center",
                  whiteSpace: "nowrap",
                }}
              >
                STEROIDS
              </span>
            </h1>
            <p style={{ margin: 0, maxWidth: "34em", fontSize: 19, lineHeight: 1.55, color: "var(--color-body)" }}>
              The OFC you know, played with your own crew. Plus twists you won&rsquo;t find
              anywhere else: Spades Multiplier, The Choice, Jokers and Double Decker.
            </p>
            <div id="get" style={{ display: "flex", flexWrap: "wrap", gap: 14, alignItems: "center" }}>
              <StoreButtons />
            </div>
          </div>

          <div
            style={{
              flex: "1 1 380px",
              minWidth: 0,
              display: "flex",
              justifyContent: "center",
              position: "relative",
              padding: "24px 0 40px",
            }}
          >
            <div
              style={{
                width: "min(340px, 82vw)",
                aspectRatio: "1440 / 3168",
                background: "#0a0d0c",
                border: "3px solid #8a8f97",
                borderRadius: 46,
                padding: 10,
                boxSizing: "border-box",
                transform: "rotate(-4deg)",
                boxShadow: "0 40px 90px rgba(0,0,0,0.55)",
              }}
            >
              <Image
                src="/home/spades.jpg"
                alt="OFC Ledger board with the bonus at x8"
                width={720}
                height={1584}
                style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 36, display: "block" }}
              />
            </div>
            <div
              style={{
                position: "absolute",
                left: "max(0px, calc(50% - 300px))",
                top: "26%",
                width: "min(380px, 70vw)",
                borderRadius: 18,
                overflow: "hidden",
                boxShadow: "0 0 0 3px #ffd700, 0 0 60px rgba(255,215,0,0.45), 0 24px 50px rgba(0,0,0,0.5)",
                transform: "rotate(2deg)",
              }}
            >
              <Image
                src="/home/bonus-x8.jpg"
                alt="Hand summary showing Bonus: x8"
                width={900}
                height={188}
                style={{ width: "100%", height: "auto", display: "block" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── BANNER ── */}
      <div
        style={{
          background: "var(--color-gold)",
          color: "var(--color-gold-ink)",
          ...anton,
          fontSize: "clamp(18px, 2.2vw, 28px)",
          letterSpacing: "0.06em",
          padding: "18px 24px",
          textAlign: "center",
        }}
      >
        NO COINS · NO FEED · NO RANDOM MATCHMAKING · JUST YOUR CREW
      </div>

      {/* ── HOUSE RULES ── */}
      <section id="rules" style={{ background: "var(--color-bg)" }}>
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: "clamp(64px, 8vw, 120px) 24px",
            display: "flex",
            flexDirection: "column",
            gap: "clamp(64px, 8vw, 112px)",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 760 }}>
            <Eyebrow>ONLY IN OFC LEDGER</Eyebrow>
            <h2
              style={{
                margin: 0,
                ...anton,
                fontWeight: 400,
                fontSize: "clamp(56px, 7vw, 104px)",
                lineHeight: 0.95,
                color: "var(--color-white)",
              }}
            >
              HOUSE RULES, BUILT IN.
            </h2>
            <p style={{ margin: 0, fontSize: 18, lineHeight: 1.6 }}>
              Classic or Pineapple, progressive Fantasy Land, adjustable timers. And then the
              rules that started at our own table.
            </p>
          </div>

          {/* Spades Multiplier */}
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 56 }}>
            <div style={{ flex: "1 1 440px", minWidth: 0, display: "flex", flexDirection: "column", gap: 18 }}>
              <p style={{ margin: 0, ...anton, fontSize: 96, lineHeight: 1, color: "var(--color-gold)" }}>
                x2 x4 x8
              </p>
              <h3 style={{ margin: 0, ...anton, fontWeight: 400, fontSize: 48, color: "var(--color-white)" }}>
                SPADES MULTIPLIER
              </h3>
              <p style={{ margin: 0, fontSize: 18, lineHeight: 1.6, maxWidth: "30em" }}>
                Play the 2♠ and your whole hand counts double, royalties included. Add the 3♠
                for x4. Add the 4♠ for x8. One hand can flip a whole session.
              </p>
            </div>
            <div style={{ flex: "1 1 440px", minWidth: 0, display: "flex", justifyContent: "center" }}>
              <Image
                src="/home/bonus-x8.jpg"
                alt="Hand summary with Bonus: x8"
                width={900}
                height={188}
                style={{
                  width: "100%",
                  maxWidth: 560,
                  height: "auto",
                  borderRadius: 20,
                  boxShadow: "0 0 0 2px #ffd700, 0 30px 70px rgba(0,0,0,0.5)",
                }}
              />
            </div>
          </div>

          {/* Jokers */}
          <div style={{ display: "flex", flexWrap: "wrap-reverse", alignItems: "center", gap: 56 }}>
            <div style={{ flex: "1 1 440px", minWidth: 0, display: "flex", justifyContent: "center", gap: 20 }}>
              <Image
                src="/home/joker-picker.jpg"
                alt="Select Card for Joker picker"
                width={720}
                height={1584}
                style={{
                  width: "46%",
                  maxWidth: 250,
                  height: "auto",
                  borderRadius: 28,
                  border: "3px solid #8a8f97",
                  transform: "rotate(-3deg)",
                }}
              />
              <Image
                src="/home/straight-flush.jpg"
                alt="The joker played as 6 of clubs, completing a straight flush"
                width={720}
                height={1584}
                style={{
                  width: "46%",
                  maxWidth: 250,
                  height: "auto",
                  borderRadius: 28,
                  border: "3px solid #8a8f97",
                  transform: "rotate(3deg) translateY(28px)",
                }}
              />
            </div>
            <div style={{ flex: "1 1 440px", minWidth: 0, display: "flex", flexDirection: "column", gap: 18 }}>
              <h3 style={{ margin: 0, ...anton, fontWeight: 400, fontSize: 48, color: "var(--color-white)" }}>
                JOKERS
              </h3>
              <p style={{ margin: 0, fontSize: 18, lineHeight: 1.6, maxWidth: "30em" }}>
                A wild card that becomes exactly the card you need. Pick it, place it, finish
                the straight flush.
              </p>
            </div>
          </div>

          {/* 3-up cards */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 24 }}>
            <div
              style={{
                flex: "1 1 300px",
                minWidth: 0,
                background: "var(--color-bg-alt)",
                borderRadius: 24,
                padding: 36,
                display: "flex",
                flexDirection: "column",
                gap: 14,
              }}
            >
              <p style={{ margin: 0, ...anton, fontSize: 64, lineHeight: 1, color: "var(--color-gold)" }}>1 OR 3</p>
              <h3 style={{ margin: 0, ...anton, fontWeight: 400, fontSize: 40, color: "var(--color-white)" }}>
                THE CHOICE
              </h3>
              <p style={{ margin: 0, fontSize: 17, lineHeight: 1.6 }}>
                Play the 2♠ and you earn The Choice. Next hand, place 1 or 3 cards on a turn
                instead of 2. Just balance it out before the hand is done.
              </p>
            </div>
            <div
              style={{
                flex: "1 1 300px",
                minWidth: 0,
                background: "var(--color-bg-alt)",
                borderRadius: 24,
                padding: 36,
                display: "flex",
                flexDirection: "column",
                gap: 14,
              }}
            >
              <p style={{ margin: 0, ...anton, fontSize: 64, lineHeight: 1, color: "var(--color-gold)" }}>+20</p>
              <h3 style={{ margin: 0, ...anton, fontWeight: 400, fontSize: 40, color: "var(--color-white)" }}>
                SHOOT THE MOON
              </h3>
              <p style={{ margin: 0, fontSize: 17, lineHeight: 1.6 }}>
                Jack-high or worse on the bottom? Skip the rows. Take a fixed score from every
                opponent. 20 by default, and the spades still multiply it.
              </p>
            </div>
            <div
              style={{
                flex: "1 1 300px",
                minWidth: 0,
                background: "var(--color-bg-alt)",
                borderRadius: 24,
                padding: 36,
                display: "flex",
                flexDirection: "column",
                gap: 14,
              }}
            >
              <p style={{ margin: 0, ...anton, fontSize: 64, lineHeight: 1, color: "var(--color-gold)" }}>
                104 CARDS
              </p>
              <h3 style={{ margin: 0, ...anton, fontWeight: 400, fontSize: 40, color: "var(--color-white)" }}>
                DOUBLE DECKER
              </h3>
              <p style={{ margin: 0, fontSize: 17, lineHeight: 1.6 }}>
                Two full decks. Up to 6 players in Pineapple, 8 in Classic. And two spades
                multipliers can collide: up to x64.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── LEDGER ── */}
      <section id="ledger" style={{ background: "var(--color-bg-alt)" }}>
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: "clamp(64px, 8vw, 120px) 24px",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: 64,
          }}
        >
          <div style={{ flex: "1 1 520px", minWidth: 0, display: "flex", flexDirection: "column", gap: 28 }}>
            <h2
              style={{
                margin: 0,
                display: "inline-flex",
                flexDirection: "column",
                alignSelf: "flex-start",
                gap: 10,
                ...anton,
                fontWeight: 400,
                fontSize: "clamp(48px, 6vw, 88px)",
                lineHeight: 1,
                color: "var(--color-white)",
              }}
            >
              <span>TRACK EVERY POINT.</span>
              <span
                style={{
                  background: "var(--color-gold)",
                  color: "var(--color-gold-ink)",
                  fontSize: "0.91em",
                  padding: "0.06em 0 0.02em",
                  textAlign: "center",
                }}
              >
                RIDE EVERY SWING.
              </span>
            </h2>
            <p style={{ margin: 0, fontSize: 18, lineHeight: 1.6, maxWidth: "32em" }}>
              Every hand is logged and replayable. Standings, swings and Fantasy Land runs for
              the whole crew, session after session.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 28 }}>
              <div style={{ flex: "1 1 160px", display: "flex", flexDirection: "column", gap: 6 }}>
                <span style={{ ...anton, fontSize: 22, color: "var(--color-gold)" }}>PLAY ONLINE</span>
                <span style={{ fontSize: 15, lineHeight: 1.5 }}>Take your turn when it suits you.</span>
              </div>
              <div style={{ flex: "1 1 160px", display: "flex", flexDirection: "column", gap: 6 }}>
                <span style={{ ...anton, fontSize: 22, color: "var(--color-gold)" }}>LIVE TABLE</span>
                <span style={{ fontSize: 15, lineHeight: 1.5 }}>The card camera scores your real-life game.</span>
              </div>
              <div style={{ flex: "1 1 160px", display: "flex", flexDirection: "column", gap: 6 }}>
                <span style={{ ...anton, fontSize: 22, color: "var(--color-gold)" }}>HAND REPLAYS</span>
                <span style={{ fontSize: 15, lineHeight: 1.5 }}>Share the hand everyone will talk about.</span>
              </div>
            </div>
          </div>
          <div style={{ flex: "1 1 360px", minWidth: 0, display: "flex", justifyContent: "center" }}>
            <div
              style={{
                width: "min(330px, 82vw)",
                aspectRatio: "1440 / 3168",
                background: "#0a0d0c",
                border: "3px solid #8a8f97",
                borderRadius: 46,
                padding: 10,
                boxSizing: "border-box",
                transform: "rotate(3deg)",
                boxShadow: "0 40px 90px rgba(0,0,0,0.55)",
              }}
            >
              <Image
                src="/home/result.jpg"
                alt="Hand result with points, Fantasy Land and the crew's score graph"
                width={720}
                height={1584}
                style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 36, display: "block" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── SUGGEST A RULE ── */}
      <section style={{ background: "var(--color-bg)" }}>
        <div
          style={{
            maxWidth: 900,
            margin: "0 auto",
            padding: "clamp(64px, 8vw, 112px) 24px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 22,
            textAlign: "center",
          }}
        >
          <Eyebrow>BUILT BY PLAYERS, FOR PLAYERS</Eyebrow>
          <h2
            style={{
              margin: 0,
              ...anton,
              fontWeight: 400,
              fontSize: "clamp(48px, 6vw, 84px)",
              lineHeight: 1,
              color: "var(--color-white)",
            }}
          >
            YOUR HOUSE RULE MIGHT BE NEXT.
          </h2>
          <p style={{ margin: 0, fontSize: 18, lineHeight: 1.6, maxWidth: "36em" }}>
            Spades Multiplier and The Choice started as house rules at our own table. Got one
            your crew swears by? Send it in.
          </p>
          <a
            href="mailto:hello@ofcledger.com"
            style={{
              background: "var(--color-gold)",
              color: "var(--color-gold-ink)",
              textDecoration: "none",
              fontWeight: 700,
              fontSize: 17,
              padding: "16px 26px",
              borderRadius: 999,
            }}
          >
            Suggest a rule
          </a>
        </div>
      </section>

      {/* ── BIG LOGO CTA ── */}
      <section style={{ background: "var(--color-bg-alt)" }}>
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: "clamp(72px, 9vw, 128px) 24px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 30,
            textAlign: "center",
          }}
        >
          <LogoMark width={220} height={196} />
          <p style={{ margin: 0, ...anton, fontSize: "clamp(64px, 9vw, 128px)", lineHeight: 1, color: "var(--color-white)" }}>
            <span style={{ color: "var(--color-gold)" }}>OFC</span> LEDGER
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 14 }}>
            <StoreButtons />
          </div>
        </div>
      </section>
    </main>
  );
}
