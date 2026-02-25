import { createClient } from "@supabase/supabase-js";
import LogoOutline from "@/components/LogoOutline";

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
}

interface SharedHand {
  id: string;
  hand_data: PlayerData[];
  round_index: number;
}

/* ── Card parsing ── */

const suitMap: Record<string, string> = {
  h: "\u2665",
  s: "\u2660",
  d: "\u2666",
  c: "\u2663",
};
const redSuits = new Set(["h", "d"]);

function parseCard(card: string) {
  const rank = card.slice(0, -1);
  const suitChar = card.slice(-1);
  return {
    rank,
    suit: suitMap[suitChar] ?? suitChar,
    isRed: redSuits.has(suitChar),
  };
}

/* ── Match result (2 players) ── */

type MatchResult = {
  wins: [number, number];
  foul: [boolean, boolean];
  scores: [number, number];
};

function computeMatch(players: PlayerData[]): MatchResult | null {
  if (players.length !== 2) return null;
  const [p1, p2] = players;

  if (p1.analysis.isFoul && p2.analysis.isFoul)
    return { wins: [0, 0], foul: [true, true], scores: [0, 0] };
  if (p1.analysis.isFoul)
    return {
      wins: [0, 3],
      foul: [true, false],
      scores: [-6 - p2.analysis.royalties, 6 + p2.analysis.royalties],
    };
  if (p2.analysis.isFoul)
    return {
      wins: [3, 0],
      foul: [false, true],
      scores: [6 + p1.analysis.royalties, -6 - p1.analysis.royalties],
    };

  const rows = ["top", "mid", "bot"] as const;
  let w1 = 0;
  let w2 = 0;
  for (const r of rows) {
    const v1 = p1.analysis.details[r].rankValue;
    const v2 = p2.analysis.details[r].rankValue;
    if (v1 > v2) w1++;
    else if (v2 > v1) w2++;
  }

  const rowDiff = w1 - w2;
  const scoop = w1 === 3 ? 3 : w2 === 3 ? -3 : 0;
  const royDiff = p1.analysis.royalties - p2.analysis.royalties;
  const net = rowDiff + scoop + royDiff;

  const mult = Math.max(
    p1.analysis.multiplier || 1,
    p2.analysis.multiplier || 1
  );

  return {
    wins: [w1, w2],
    foul: [false, false],
    scores: [net * mult, -net * mult],
  };
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

/* ── Playing card chip ── */

function PlayingCard({ code }: { code: string }) {
  const { rank, suit, isRed } = parseCard(code);
  return (
    <span
      className="inline-flex h-8 w-6 flex-col items-center justify-center rounded-[4px] font-[family-name:var(--font-dm-mono)] text-[10px] font-bold leading-none"
      style={{
        backgroundColor: "#f5f0e8",
        color: isRed ? "#cc2200" : "#1a1a1a",
      }}
    >
      <span>{rank}</span>
      <span className="text-[8px]">{suit}</span>
    </span>
  );
}

/* ── Row component ── */

function BoardRow({
  label,
  data,
}: {
  label: string;
  data: CardDetail;
}) {
  return (
    <div>
      <div className="mb-1 font-[family-name:var(--font-dm-mono)] text-[9px] uppercase tracking-wider text-[var(--color-muted)]">
        {label}
      </div>
      <div className="flex items-center gap-2">
        <div className="flex gap-1">
          {data.cards.map((c, i) => (
            <PlayingCard key={i} code={c} />
          ))}
        </div>
        <div className="ml-auto text-right">
          <span className="font-[family-name:var(--font-dm-mono)] text-[11px] italic text-[var(--color-muted)]">
            {data.name}
          </span>
          {data.pts > 0 && (
            <span className="ml-1.5 font-[family-name:var(--font-dm-mono)] text-[10px] text-[var(--color-gold)]">
              +{data.pts}
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
      {/* Hand header */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <LogoOutline size={24} />
          <span className="font-[family-name:var(--font-anton)] text-base tracking-wider text-[var(--color-gold)]">
            OFC LEDGER
          </span>
        </div>
        <span className="rounded-full border border-[var(--color-gold)] px-3 py-1 font-[family-name:var(--font-anton)] text-xs tracking-wide text-[var(--color-gold)]">
          HAND #{(hand.round_index ?? 0) + 1}
        </span>
      </div>

      {/* Player cards */}
      <div className="flex flex-col gap-4">
        {players.map((player, idx) => {
          const isFoul = player.analysis.isFoul;

          /* W/L from this player's perspective */
          let resultText = "";
          let resultColor = "";
          if (match) {
            const my = match.wins[idx];
            const their = match.wins[idx === 0 ? 1 : 0];
            if (match.foul[idx]) {
              resultText = "FOUL";
              resultColor = "#ef5350";
            } else if (my === 3) {
              resultText = `SCOOP! ${my}\u2013${their}`;
              resultColor = "#4caf50";
            } else if (my > their) {
              resultText = `${my}\u2013${their}`;
              resultColor = "#4caf50";
            } else if (my < their) {
              resultText = `${my}\u2013${their}`;
              resultColor = "#ef5350";
            } else {
              resultText = `${my}\u2013${their}`;
              resultColor = "var(--color-muted)";
            }
          }

          /* Score */
          const score = match ? match.scores[idx] : 0;
          const scoreColor =
            score > 0
              ? "#4caf50"
              : score < 0
                ? "#ef5350"
                : "var(--color-muted)";

          /* Pills */
          const pills: { label: string; color?: string }[] = [];
          if (player.fantasyLand?.isActive) {
            pills.push({ label: "FL", color: "#ffd700" });
          }
          if (player.analysis.bonusMessage) {
            pills.push({ label: player.analysis.bonusMessage });
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
                    {pills.map((pill, i) => (
                      <span
                        key={i}
                        className="rounded-full bg-white/10 px-2 py-0.5 font-[family-name:var(--font-dm-mono)] text-[10px] font-medium"
                        style={{ color: pill.color || "var(--color-muted)" }}
                      >
                        {pill.label}
                      </span>
                    ))}
                  </div>
                  {match && (
                    <div
                      className="mt-1 font-[family-name:var(--font-dm-mono)] text-[11px]"
                      style={{
                        color: resultColor,
                        fontWeight: isFoul ? 700 : 400,
                      }}
                    >
                      {resultText}
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

              {/* Board */}
              <div className="flex flex-col gap-2">
                <BoardRow label="TOP" data={player.analysis.details.top} />
                <BoardRow label="MID" data={player.analysis.details.mid} />
                <BoardRow label="BOT" data={player.analysis.details.bot} />
              </div>

              {/* Royalties footer */}
              {player.analysis.royalties > 0 && (
                <div className="mt-3 border-t border-white/10 pt-2 text-right font-[family-name:var(--font-dm-mono)] text-[11px] text-[var(--color-gold)]">
                  Royalties: {player.analysis.royalties}p
                </div>
              )}
            </div>
          );
        })}
      </div>
    </main>
  );
}
