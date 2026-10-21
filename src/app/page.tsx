import Image from "next/image";
import LogoMark from "@/components/LogoMark";
import Reveal from "@/components/Reveal";
import GoldPlate from "@/components/GoldPlate";
import SpadesMultiplier from "@/components/SpadesMultiplier";
import ParallaxFrame from "@/components/ParallaxFrame";
import PromoFilm from "@/components/PromoFilm";

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
      <section id="top" className="section-depth" style={{ overflow: "hidden" }}>
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: "var(--hero-pad-top) 24px var(--hero-pad-bottom)",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: "var(--hero-row-gap)",
          }}
        >
          <div
            style={{
              flex: "1 1 520px",
              minWidth: 0,
              display: "flex",
              flexDirection: "column",
              gap: "var(--hero-copy-gap)",
            }}
          >
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
                fontSize: "var(--hero-h1-size)",
                lineHeight: 0.92,
                color: "var(--color-white)",
              }}
            >
              <span className="hero-slam">OFC ON</span>
              <span
                className="hero-wipe-plate"
                style={{
                  fontSize: "0.725em",
                  lineHeight: 1.2,
                  padding: "0.03em 0 0",
                  letterSpacing: "-0.005em",
                  textAlign: "center",
                  whiteSpace: "nowrap",
                  background: "var(--color-gold)",
                  color: "var(--color-gold-ink)",
                }}
              >
                <span className="hero-wipe-text">STEROIDS</span>
              </span>
            </h1>
            <Reveal as="p" variant="fade-up" style={{ margin: 0, maxWidth: "34em", fontSize: 19, lineHeight: 1.55, color: "var(--color-body)" }}>
              The OFC you know, played with your own crew. Plus twists you won&rsquo;t find
              anywhere else: Spades Multiplier, The Choice, Jokers and Double Decker.
            </Reveal>
            <div id="get" style={{ display: "flex", flexWrap: "wrap", gap: 14, alignItems: "center" }}>
              <StoreButtons />
            </div>
          </div>

          <div
            className="phone-wrap"
            style={{
              flex: "1 1 380px",
              minWidth: 0,
              display: "flex",
              justifyContent: "center",
              padding: "24px 0 40px",
            }}
          >
            <div className="phone-glow" aria-hidden="true" />
            <ParallaxFrame baseRotateDeg={0}>
              <PromoFilm
                webmSrc="/home/films/spades.webm"
                hevcSrc="/home/films/spades-hevc.mov"
                poster="/home/films/spades-poster.png"
                preload="metadata"
              />
            </ParallaxFrame>
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
            <Reveal
              as="h2"
              variant="slam"
              style={{ margin: 0, fontWeight: 400, fontSize: "clamp(56px, 7vw, 104px)", lineHeight: 0.95, color: "var(--color-white)" }}
            >
              HOUSE RULES, BUILT IN.
            </Reveal>
            <Reveal as="p" variant="fade-up" style={{ margin: 0, fontSize: 18, lineHeight: 1.6 }}>
              Classic or Pineapple, progressive Fantasy Land, adjustable timers. And then the
              rules that started at our own table.
            </Reveal>
          </div>

          {/* Spades Multiplier */}
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 56 }}>
            <div style={{ flex: "1 1 440px", minWidth: 0, display: "flex", flexDirection: "column", gap: 18 }}>
              <SpadesMultiplier />
              <Reveal as="h3" variant="slam" style={{ margin: 0, fontWeight: 400, fontSize: 48, color: "var(--color-white)" }}>
                SPADES MULTIPLIER
              </Reveal>
              <Reveal as="p" variant="fade-up" style={{ margin: 0, fontSize: 18, lineHeight: 1.6, maxWidth: "30em" }}>
                Play the 2♠ and your whole hand counts double, royalties included. Add the 3♠
                for x4. Add the 4♠ for x8. One hand can flip a whole session.
              </Reveal>
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
            <div style={{ flex: "1 1 440px", minWidth: 0, display: "flex", justifyContent: "center" }}>
              <PromoFilm
                webmSrc="/home/films/joker.webm"
                hevcSrc="/home/films/joker-hevc.mov"
                poster="/home/films/joker-poster.png"
                preload="none"
              />
            </div>
            <div style={{ flex: "1 1 440px", minWidth: 0, display: "flex", flexDirection: "column", gap: 18 }}>
              <Reveal as="h3" variant="slam" style={{ margin: 0, fontWeight: 400, fontSize: 48, color: "var(--color-white)" }}>
                JOKERS
              </Reveal>
              <Reveal as="p" variant="fade-up" style={{ margin: 0, fontSize: 18, lineHeight: 1.6, maxWidth: "30em" }}>
                A wild card that becomes exactly the card you need. Pick it, place it, finish
                the straight flush.
              </Reveal>
            </div>
          </div>

          {/* 3-up cards */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 24 }}>
            <div
              className="rule-card"
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
              <Reveal as="p" variant="slam" style={{ margin: 0, ...anton, fontSize: 64, lineHeight: 1, color: "var(--color-gold)" }}>
                1 OR 3
              </Reveal>
              <Reveal as="h3" variant="slam" style={{ margin: 0, fontWeight: 400, fontSize: 40, color: "var(--color-white)" }}>
                THE CHOICE
              </Reveal>
              <Reveal as="p" variant="fade-up" style={{ margin: 0, fontSize: 17, lineHeight: 1.6 }}>
                Play the 2♠ and you earn The Choice. Next hand, place 1 or 3 cards on a turn
                instead of 2. Just balance it out before the hand is done.
              </Reveal>
            </div>
            <div
              className="rule-card"
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
              <Reveal as="p" variant="slam" style={{ margin: 0, ...anton, fontSize: 64, lineHeight: 1, color: "var(--color-gold)" }}>
                +20
              </Reveal>
              <Reveal as="h3" variant="slam" style={{ margin: 0, fontWeight: 400, fontSize: 40, color: "var(--color-white)" }}>
                SHOOT THE MOON
              </Reveal>
              <Reveal as="p" variant="fade-up" style={{ margin: 0, fontSize: 17, lineHeight: 1.6 }}>
                Jack-high or worse on the bottom? Skip the rows. Take a fixed score from every
                opponent. 20 by default, and the spades still multiply it.
              </Reveal>
            </div>
            <div
              className="rule-card"
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
              <Reveal as="p" variant="slam" style={{ margin: 0, ...anton, fontSize: 64, lineHeight: 1, color: "var(--color-gold)" }}>
                104 CARDS
              </Reveal>
              <Reveal as="h3" variant="slam" style={{ margin: 0, fontWeight: 400, fontSize: 40, color: "var(--color-white)" }}>
                DOUBLE DECKER
              </Reveal>
              <Reveal as="p" variant="fade-up" style={{ margin: 0, fontSize: 17, lineHeight: 1.6 }}>
                Two full decks. Up to 6 players in Pineapple, 8 in Classic. And two spades
                multipliers can collide: up to x64.
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ── LEDGER ── */}
      <section id="ledger" className="section-depth">
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
              <Reveal as="span" variant="slam">
                TRACK EVERY POINT.
              </Reveal>
              <GoldPlate
                style={{
                  fontSize: "0.91em",
                  padding: "0.06em 0 0.02em",
                  textAlign: "center",
                  background: "var(--color-gold)",
                  color: "var(--color-gold-ink)",
                }}
              >
                RIDE EVERY SWING.
              </GoldPlate>
            </h2>
            <Reveal as="p" variant="fade-up" style={{ margin: 0, fontSize: 18, lineHeight: 1.6, maxWidth: "32em" }}>
              Every hand is logged and replayable. Standings, swings and Fantasy Land runs for
              the whole crew, session after session.
            </Reveal>
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
          <div className="phone-wrap" style={{ flex: "1 1 360px", minWidth: 0, display: "flex", justifyContent: "center" }}>
            <div className="phone-glow" aria-hidden="true" />
            <ParallaxFrame
              baseRotateDeg={3}
              className="phone-frame"
              style={{
                width: "min(330px, 82vw)",
                aspectRatio: "1440 / 3168",
                background: "#0a0d0c",
                border: "3px solid #8a8f97",
                borderRadius: 46,
                padding: 10,
                boxSizing: "border-box",
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
            </ParallaxFrame>
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
          <Reveal
            as="h2"
            variant="slam"
            style={{ margin: 0, fontWeight: 400, fontSize: "clamp(48px, 6vw, 84px)", lineHeight: 1, color: "var(--color-white)" }}
          >
            YOUR HOUSE RULE MIGHT BE NEXT.
          </Reveal>
          <Reveal as="p" variant="fade-up" style={{ margin: 0, fontSize: 18, lineHeight: 1.6, maxWidth: "36em" }}>
            Spades Multiplier and The Choice started as house rules at our own table. Got one
            your crew swears by? Send it in.
          </Reveal>
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
          <Reveal as="p" variant="slam" style={{ margin: 0, ...anton, fontSize: "clamp(64px, 9vw, 128px)", lineHeight: 1, color: "var(--color-white)" }}>
            <span style={{ color: "var(--color-gold)" }}>OFC</span> LEDGER
          </Reveal>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 14 }}>
            <StoreButtons />
          </div>
        </div>
      </section>
    </main>
  );
}
