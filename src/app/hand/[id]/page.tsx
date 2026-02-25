import { createClient } from "@supabase/supabase-js";

/* ── Types ── */

interface CardDetail {
  cards: string[];
  name: string;
  pts: number;
  rankValue: number;
}

interface PlayerAnalysis {
  isFoul: boolean;
  details: { top: CardDetail; mid: CardDetail; bot: CardDetail };
  royalties: number;
  multiplier: number;
  bonusMessage: string | null;
}

interface PlayerData {
  player: string;
  analysis: PlayerAnalysis;
  fantasyLand: { isActive: boolean };
  choice?: { hasAbility: boolean };
}

interface SharedHand {
  id: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  hand_data: any;
  round_index: number;
  game_id?: string;
}

/* ── Card parsing ── */

const suitMap: Record<string, string> = {
  h: "\u2665",
  s: "\u2660",
  d: "\u2666",
  c: "\u2663",
};
const redSuits = new Set(["h", "d"]);
const validSuits = new Set(["h", "s", "d", "c"]);

function parseCard(str: string) {
  // "JJ" → joker displayed as Jack
  if (str === "JJ") {
    return { rank: "J", suit: "", isRed: false, isJoker: true };
  }

  let rank: string;
  let suitChar: string;
  let isJoker = false;

  if (str.length > 2 && str.endsWith("J") && validSuits.has(str[str.length - 2])) {
    // "AhJ" → rank=A, suit=h, joker
    suitChar = str[str.length - 2];
    rank = str.slice(0, -2);
    isJoker = true;
  } else if (str.length > 2 && str[str.length - 2] === "J" && validSuits.has(str[str.length - 1])) {
    // "AJh" → rank=A, suit=h, joker
    suitChar = str[str.length - 1];
    rank = str.slice(0, -2);
    isJoker = true;
  } else {
    // Normal: "Ah"
    suitChar = str[str.length - 1];
    rank = str.slice(0, -1);
  }

  return {
    rank,
    suit: suitMap[suitChar] ?? "",
    isRed: redSuits.has(suitChar),
    isJoker,
  };
}

/* ── Pairwise head-to-head ── */

interface PairH2H {
  opponentName: string;
  label: string;
  h2h: number;
}

function computePairH2H(me: PlayerData, opp: PlayerData): PairH2H {
  const myFoul = me.analysis.isFoul;
  const oppFoul = opp.analysis.isFoul;

  if (myFoul && oppFoul) {
    return { opponentName: opp.player, label: "FOUL", h2h: 0 };
  }
  if (myFoul) {
    return { opponentName: opp.player, label: "FOUL", h2h: -6 };
  }
  if (oppFoul) {
    return { opponentName: opp.player, label: "SCOOP", h2h: 6 };
  }

  const rows = ["top", "mid", "bot"] as const;
  let wins = 0;
  let losses = 0;
  for (const r of rows) {
    const myVal = me.analysis.details[r].rankValue;
    const oppVal = opp.analysis.details[r].rankValue;
    if (myVal > oppVal) wins++;
    else if (oppVal > myVal) losses++;
  }

  const scoop = wins === 3 ? 3 : losses === 3 ? -3 : 0;
  const h2h = (wins - losses) + scoop;
  const label = wins === 3 ? "SCOOP" : `${wins}\u2013${losses}`;

  return { opponentName: opp.player, label, h2h };
}

/* ── Format score with sign ── */

function fmtScore(n: number, suffix = "p") {
  if (n > 0) return `+${n}${suffix}`;
  if (n < 0) return `\u2212${Math.abs(n)}${suffix}`;
  return `0${suffix}`;
}

/* ── Not-found fallback ── */

function NotFound() {
  return (
    <main className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="text-center">
        <h1 className="font-[family-name:var(--font-anton)] text-3xl text-[var(--color-gold)]">
          Hand Not Found
        </h1>
        <p className="mt-2 text-sm text-[var(--color-muted)]">
          This hand may have been removed or the link is invalid.
        </p>
      </div>
    </main>
  );
}

/* ── Playing card ── */

function PlayingCard({
  code,
  overlap,
  isLast,
}: {
  code: string;
  overlap: boolean;
  isLast: boolean;
}) {
  const { rank, suit, isRed, isJoker } = parseCard(code);

  const baseShadow = overlap
    ? "-2px 0 4px rgba(0,0,0,0.3)"
    : "0 1px 4px rgba(0,0,0,0.35)";
  const jokerShadow = "0 0 6px rgba(255,215,0,0.4), inset 0 0 0 1px rgba(255,215,0,0.2)";

  return (
    <span
      className="relative inline-flex items-center justify-center rounded-[6px] font-[family-name:var(--font-dm-mono)] text-[13px] font-[800] leading-none"
      style={{
        width: 36,
        height: 52,
        backgroundColor: "#f5f0e8",
        color: isRed ? "#cc2200" : "#1a1a1a",
        border: isJoker ? "2px solid #ffd700" : undefined,
        boxShadow: isJoker ? `${baseShadow}, ${jokerShadow}` : baseShadow,
        marginRight: overlap && !isLast ? -10 : 0,
        zIndex: isLast ? 5 : undefined,
      }}
    >
      {rank}{suit}
    </span>
  );
}

/* ── Board row ── */

function BoardRow({
  label,
  data,
}: {
  label: string;
  data: CardDetail;
}) {
  const overlap = data.cards.length > 1;

  return (
    <div>
      <div className="mb-1 font-[family-name:var(--font-dm-mono)] text-[9px] uppercase tracking-wider text-[var(--color-muted)]">
        {label}
      </div>
      <div className="flex items-center gap-2">
        <div className="flex">
          {data.cards.map((c, i) => (
            <PlayingCard
              key={i}
              code={c}
              overlap={overlap}
              isLast={i === data.cards.length - 1}
            />
          ))}
        </div>
        <div className="ml-auto flex min-w-[120px] flex-col items-end">
          <span className="font-[family-name:var(--font-dm-mono)] text-[11px] italic text-[var(--color-muted)]">
            {data.name}
          </span>
          {data.pts > 0 && (
            <span className="font-[family-name:var(--font-dm-mono)] text-[10px] text-[var(--color-gold)]">
              +{data.pts}p
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── Page ── */

export default async function HandPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const { data, error } = await supabase
    .from("shared_hands")
    .select("*")
    .eq("id", id)
    .single();

  if (!data || error) return <NotFound />;

  const hand = data as SharedHand;
  const raw = hand.hand_data;
  const players: PlayerData[] = Array.isArray(raw) ? raw : (raw?.hands || []);
  const scores: Record<string, number> | null = Array.isArray(raw) ? null : (raw?.scores || null);

  return (
    <main className="mx-auto max-w-[480px] px-4 py-6">
      {/* Player cards */}
      <div className="flex flex-col gap-4">
        {players.map((player, idx) => {
          const isFoul = player.analysis.isFoul;

          /* Pairwise results vs each opponent */
          const pairs = players
            .filter((_, i) => i !== idx)
            .map((opp) => computePairH2H(player, opp));
          const totalH2H = pairs.reduce((sum, p) => sum + p.h2h, 0);

          /* Royalties: net & gross */
          const d = player.analysis.details;
          const bruttoRoyalties =
            (d?.top?.pts || 0) + (d?.mid?.pts || 0) + (d?.bot?.pts || 0);
          const effectiveRoy = isFoul ? 0 : player.analysis.royalties;
          const oppRoySum = players
            .filter((_, i) => i !== idx)
            .reduce(
              (sum, opp) =>
                sum + (opp.analysis.isFoul ? 0 : opp.analysis.royalties),
              0
            );
          const netRoy = effectiveRoy - oppRoySum;

          /* Total score: use pre-computed if available, else calculate */
          const mult = Math.max(
            ...players.map((p) => p.analysis.multiplier || 1)
          );
          const score =
            scores && scores[player.player] != null
              ? scores[player.player]
              : (totalH2H + netRoy) * mult;
          const scoreColor =
            score > 0
              ? "#4caf50"
              : score < 0
                ? "#ef5350"
                : "var(--color-muted)";

          /* Badges */
          const badges: { label: string; bg: string }[] = [];
          if (player.fantasyLand?.isActive) {
            badges.push({ label: "FL", bg: "#9c27b0" });
          }
          if (player.choice?.hasAbility) {
            badges.push({ label: "TC", bg: "#0066cc" });
          }

          return (
            <div key={idx} className="rounded-[14px] bg-black/20 p-4">
              {/* Player header */}
              <div className="mb-3 flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[15px] font-bold text-white">
                      {player.player}
                    </span>
                    {badges.map((b, i) => (
                      <span
                        key={i}
                        className="text-[10px] font-semibold text-white"
                        style={{
                          backgroundColor: b.bg,
                          borderRadius: 20,
                          padding: "2px 7px",
                          letterSpacing: "0.5px",
                        }}
                      >
                        {b.label}
                      </span>
                    ))}
                  </div>
                  {/* Per-opponent result lines */}
                  {pairs.length > 0 && (
                    <div className="mt-1 flex flex-col gap-0.5 font-[family-name:var(--font-dm-mono)] text-[11px]">
                      {pairs.map((pair, i) => (
                        <div key={i} className="flex items-center gap-1.5">
                          <span style={{ color: "#a3c2b0" }}>
                            vs {pair.opponentName}:
                          </span>
                          <span style={{ color: "#ffd700" }}>
                            {pair.label}
                          </span>
                          <span
                            style={{
                              color:
                                pair.h2h > 0
                                  ? "#4caf50"
                                  : pair.h2h < 0
                                    ? "#ef5350"
                                    : "#a3c2b0",
                            }}
                          >
                            {fmtScore(pair.h2h)}
                          </span>
                        </div>
                      ))}
                      {/* Royalties line */}
                      <div className="flex items-center gap-1.5">
                        <span style={{ color: "#ffd700" }}>{"\u{1F451}"}</span>
                        <span
                          style={{
                            color:
                              netRoy > 0
                                ? "#4caf50"
                                : netRoy < 0
                                  ? "#ef5350"
                                  : "#a3c2b0",
                          }}
                        >
                          {fmtScore(netRoy)}
                        </span>
                        <span
                          style={{
                            color: "#ffd700",
                            opacity: isFoul ? 0.5 : 1,
                          }}
                        >
                          ({bruttoRoyalties}p)
                        </span>
                        {player.analysis.multiplier > 1 &&
                          player.analysis.bonusMessage && (
                            <>
                              <span
                                style={{ color: "#a3c2b0", opacity: 0.4 }}
                              >
                                |
                              </span>
                              <span
                                className="text-[10px] font-semibold"
                                style={{
                                  background: "rgba(255,215,0,0.12)",
                                  border: "1px solid rgba(255,215,0,0.3)",
                                  borderRadius: 20,
                                  padding: "2px 8px",
                                  color: "#ffd700",
                                  letterSpacing: "0.5px",
                                }}
                              >
                                {player.analysis.bonusMessage}
                              </span>
                            </>
                          )}
                      </div>
                    </div>
                  )}
                </div>
                <div className="flex flex-col items-end">
                  <div
                    className="font-[family-name:var(--font-anton)] text-[32px] leading-none"
                    style={{ color: scoreColor }}
                  >
                    {score > 0 ? `+${score}` : score}
                  </div>
                </div>
              </div>

              {/* Board — dim if foul */}
              <div
                className="flex flex-col gap-2"
                style={{ opacity: isFoul ? 0.5 : 1 }}
              >
                <BoardRow label="TOP" data={player.analysis.details.top} />
                <BoardRow label="MID" data={player.analysis.details.mid} />
                <BoardRow label="BOT" data={player.analysis.details.bot} />
              </div>

            </div>
          );
        })}
      </div>

      {/* CTA footer */}
      <div
        className="mt-6 flex flex-col items-center text-center"
        style={{
          borderTop: "1px solid rgba(255,215,0,0.08)",
          padding: "24px 20px 40px",
        }}
      >
        <span className="text-[11px] text-[var(--color-muted)]">Played with</span>
        <span className="mt-1 font-[family-name:var(--font-anton)] text-lg tracking-wider text-[var(--color-gold)]">
          OFC LEDGER
        </span>
        <span className="mt-0.5 text-[11px] italic text-[var(--color-muted)]">
          For grinders and gamblers.
        </span>
        <span
          className="mt-4 text-[12px] uppercase"
          style={{
            border: "1px solid rgba(255,215,0,0.3)",
            borderRadius: 20,
            padding: "8px 20px",
            color: "#ffd700",
            opacity: 0.5,
            letterSpacing: "2px",
            cursor: "default",
          }}
        >
          Download — Coming Soon
        </span>
      </div>
    </main>
  );
}
