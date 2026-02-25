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
  hand_data: PlayerData[];
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

/* ── Match result (2 players) ── */

type MatchResult = {
  wins: [number, number];
  foul: [boolean, boolean];
  headToHead: [number, number]; // rows + scoop only (for result line)
  scores: [number, number]; // total net incl. royalties (for big number)
};

function computeMatch(players: PlayerData[]): MatchResult | null {
  if (players.length !== 2) return null;
  const [p1, p2] = players;

  if (p1.analysis.isFoul && p2.analysis.isFoul)
    return { wins: [0, 0], foul: [true, true], headToHead: [0, 0], scores: [0, 0] };
  if (p1.analysis.isFoul) {
    const h2h = -6;
    return {
      wins: [0, 3],
      foul: [true, false],
      headToHead: [h2h, -h2h],
      scores: [h2h - p2.analysis.royalties, -h2h + p2.analysis.royalties],
    };
  }
  if (p2.analysis.isFoul) {
    const h2h = 6;
    return {
      wins: [3, 0],
      foul: [false, true],
      headToHead: [h2h, -h2h],
      scores: [h2h + p1.analysis.royalties, -h2h - p1.analysis.royalties],
    };
  }

  const rows = ["top", "mid", "bot"] as const;
  let w1 = 0;
  let w2 = 0;
  for (const r of rows) {
    const v1 = p1.analysis.details[r].rankValue;
    const v2 = p2.analysis.details[r].rankValue;
    if (v1 > v2) w1++;
    else if (v2 > v1) w2++;
  }

  const rawDiff = w1 - w2;
  const scoop = w1 === 3 ? 3 : w2 === 3 ? -3 : 0;
  const h2h = rawDiff + scoop; // rows + scoop only

  const royDiff = p1.analysis.royalties - p2.analysis.royalties;
  const net = h2h + royDiff;

  const mult = Math.max(
    p1.analysis.multiplier || 1,
    p2.analysis.multiplier || 1
  );

  return {
    wins: [w1, w2],
    foul: [false, false],
    headToHead: [h2h * mult, -h2h * mult],
    scores: [net * mult, -net * mult],
  };
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
  const players = hand.hand_data;
  const match = computeMatch(players);

  return (
    <main className="mx-auto max-w-[480px] px-4 py-6">
      {/* Player cards */}
      <div className="flex flex-col gap-4">
        {players.map((player, idx) => {
          const isFoul = player.analysis.isFoul;
          const otherIdx = idx === 0 ? 1 : 0;

          /* Royalties: net & gross */
          const myRoy = player.analysis.royalties;
          const opponentRoy =
            players.length === 2 ? players[otherIdx].analysis.royalties : 0;
          // Foul = you collect 0, but we show actual royalties as gross
          const effectiveRoy = isFoul ? 0 : myRoy;
          const effectiveOppRoy = match?.foul[otherIdx] ? 0 : opponentRoy;
          const netRoy = effectiveRoy - effectiveOppRoy;

          /* Result line parts */
          let resultLabel = "";
          let h2hVal = 0;

          if (match) {
            const my = match.wins[idx];
            const their = match.wins[otherIdx];
            h2hVal = match.headToHead[idx];

            if (match.foul[idx]) {
              resultLabel = "FOUL";
            } else if (my === 3) {
              resultLabel = "SCOOP!";
            } else {
              resultLabel = `${my}\u2013${their}`;
            }
          }

          /* Score for big number */
          const score = match ? match.scores[idx] : 0;
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
                  {match && (
                    <div className="mt-1 flex items-center gap-1.5 font-[family-name:var(--font-dm-mono)] text-[11px]">
                      {/* Label: SCOOP!/2-1/FOUL — gold */}
                      <span style={{ color: "#ffd700" }}>
                        {resultLabel}
                      </span>
                      {/* H2H score — green/red/muted */}
                      <span style={{ color: h2hVal > 0 ? "#4caf50" : h2hVal < 0 ? "#ef5350" : "#a3c2b0" }}>
                        {fmtScore(h2hVal)}
                      </span>
                      {/* Separator */}
                      <span style={{ color: "#a3c2b0", opacity: 0.4 }}>|</span>
                      {/* Crown — gold */}
                      <span style={{ color: "#ffd700" }}>{"\u{1F451}"}</span>
                      {/* Net royalties — green/red/muted */}
                      <span style={{ color: netRoy > 0 ? "#4caf50" : netRoy < 0 ? "#ef5350" : "#a3c2b0" }}>
                        {fmtScore(netRoy)}
                      </span>
                      {/* Gross (parens) — gold, dimmed if foul */}
                      <span style={{ color: "#ffd700", opacity: isFoul ? 0.5 : 1 }}>
                        ({myRoy}p)
                      </span>
                    </div>
                  )}
                </div>
                <div
                  className="font-[family-name:var(--font-anton)] text-[32px] leading-none"
                  style={{ color: scoreColor }}
                >
                  {score > 0 ? `+${score}` : score}
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
    </main>
  );
}
