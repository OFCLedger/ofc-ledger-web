"use client";

import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabase";
import { analyzeHand } from "@/lib/scoring";

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
  fantasyLand: { isActive: boolean; cardsToReceive?: number };
  choice?: { hasAbility: boolean };
}

interface SharedHand {
  id: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  hand_data: any;
  round_index: number;
  game_id?: string;
}

interface ReplaySnapshot {
  round: number;
  players: {
    id: string;
    board: {
      top: (string | null)[];
      mid: (string | null)[];
      bot: (string | null)[];
    };
  }[];
}

/* ── Card parsing ── */

const suitMap: Record<string, string> = {
  h: "\u2665",
  s: "\u2660",
  d: "\u2666",
  c: "\u2663",
};
const suitColorMap: Record<string, string> = {
  s: "#1a1a1a",
  h: "#cc2200",
  d: "#2f52ba",
  c: "#2e7d32",
};
const validSuits = new Set(["h", "s", "d", "c"]);

function parseCard(str: string) {
  // "JJ" → joker displayed as Jack
  if (str === "JJ") {
    return { rank: "J", suit: "", suitChar: "", isJoker: true };
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
    suitChar,
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
  const pairMult = Math.max(me.analysis.multiplier || 1, opp.analysis.multiplier || 1);

  if (myFoul && oppFoul) {
    return { opponentName: opp.player, label: "FOUL", h2h: 0 };
  }
  if (myFoul) {
    return { opponentName: opp.player, label: "FOUL", h2h: -6 * pairMult };
  }
  if (oppFoul) {
    return { opponentName: opp.player, label: "SCOOP", h2h: 6 * pairMult };
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
  const h2h = ((wins - losses) + scoop) * pairMult;
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
  const { rank, suit, suitChar, isJoker } = parseCard(code);

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
        color: suitColorMap[suitChar] || "#1a1a1a",
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
  slotCount,
}: {
  label: string;
  data: CardDetail;
  slotCount?: number;
}) {
  const validCards = data.cards.filter((c) => c != null && c !== "");
  const totalSlots = slotCount ?? validCards.length;
  const overlap = totalSlots > 1;

  return (
    <div>
      <div className="mb-1 font-[family-name:var(--font-dm-mono)] text-[9px] uppercase tracking-wider text-[var(--color-muted)]">
        {label}
      </div>
      <div className="flex items-center gap-2" style={{ minHeight: 52 }}>
        <div className="flex">
          {Array.from({ length: totalSlots }, (_, i) => {
            const card = validCards[i];
            if (card) {
              return (
                <PlayingCard
                  key={i}
                  code={card}
                  overlap={overlap}
                  isLast={i === totalSlots - 1}
                />
              );
            }
            return (
              <span
                key={i}
                className="inline-block rounded-[6px]"
                style={{
                  width: 36,
                  height: 52,
                  border: "1px dashed rgba(255,255,255,0.08)",
                  marginRight: overlap && i !== totalSlots - 1 ? -10 : 0,
                }}
              />
            );
          })}
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

export default function HandPage() {
  const { id } = useParams<{ id: string }>();

  const [originalPlayers, setOriginalPlayers] = useState<PlayerData[]>([]);
  const [scores, setScores] = useState<Record<string, number> | null>(null);
  const [replayData, setReplayData] = useState<ReplaySnapshot[] | null>(null);
  const [replayRound, setReplayRound] = useState(-1);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      const { data, error } = await supabase
        .from("shared_hands")
        .select("*")
        .eq("id", id)
        .single();

      if (!data || error) {
        setNotFound(true);
        setLoading(false);
        return;
      }

      const hand = data as SharedHand;
      const raw = hand.hand_data;
      const players: PlayerData[] = Array.isArray(raw) ? raw : (raw?.hands || []);
      const scoresData: Record<string, number> | null = Array.isArray(raw) ? null : (raw?.scores || null);

      setOriginalPlayers(players);
      setScores(scoresData);

      // Source 1: replay_data embedded in hand_data (shared from play.tsx review mode)
      let rd: ReplaySnapshot[] | null = null;
      if (!Array.isArray(raw) && raw?.replay_data) {
        rd = raw.replay_data;
      }

      // Source 2: fallback to game_rounds query (requires anon RLS policy)
      if (!rd && hand.game_id) {
        const { data: roundRow } = await supabase
          .from("game_rounds")
          .select("replay_data")
          .eq("game_id", hand.game_id)
          .eq("hand_number", hand.round_index + 1)
          .single();
        if (roundRow?.replay_data) {
          rd = roundRow.replay_data;
        }
      }

      if (rd && rd.length > 0) {
        setReplayData(rd);
        setReplayRound(rd.length - 1); // Start on final state
      }

      setLoading(false);
    };

    fetchData();
  }, [id]);

  /* ── Replay board computation ── */

  const spadesActive = useMemo(
    () => originalPlayers.some((p) => (p.analysis?.multiplier || 1) > 1),
    [originalPlayers]
  );

  const totalSnapshots = replayData?.length || 0;
  const isReplayAvailable = totalSnapshots > 1;
  const isFinalRound = !replayData || replayRound === totalSnapshots - 1;

  const players = useMemo(() => {
    if (!replayData || replayRound < 0) return originalPlayers;

    const snapshot = replayData[replayRound];
    if (!snapshot) return originalPlayers;

    return originalPlayers.map((original) => {
      const snapshotPlayer = snapshot.players.find(
        (sp) => sp.id === original.player
      );
      if (!snapshotPlayer) return original;

      const top = (snapshotPlayer.board.top || []).filter(
        (c): c is string => c != null && c !== ""
      );
      const mid = (snapshotPlayer.board.mid || []).filter(
        (c): c is string => c != null && c !== ""
      );
      const bot = (snapshotPlayer.board.bot || []).filter(
        (c): c is string => c != null && c !== ""
      );

      const analysis = analyzeHand(
        { top, middle: mid, bottom: bot },
        spadesActive
      );

      return {
        ...original,
        analysis: {
          isFoul: analysis.isFoul,
          details: {
            top: analysis.details.top,
            mid: analysis.details.mid,
            bot: analysis.details.bot,
          },
          royalties: analysis.royalties,
          multiplier: analysis.multiplier,
          bonusMessage: analysis.bonusMessage,
        },
      };
    });
  }, [originalPlayers, replayData, replayRound, spadesActive]);

  /* ── Replay navigation ── */

  const navigateReplay = (direction: "prev" | "next") => {
    if (!replayData || totalSnapshots <= 1) return;
    setReplayRound((prev) =>
      direction === "next"
        ? (prev + 1) % totalSnapshots
        : (prev - 1 + totalSnapshots) % totalSnapshots
    );
  };

  /* ── Loading / not found ── */

  if (loading) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center px-4">
        <div className="font-[family-name:var(--font-anton)] text-lg text-[var(--color-gold)]">
          Loading...
        </div>
      </main>
    );
  }

  if (notFound || originalPlayers.length === 0) return <NotFound />;

  return (
    <main
      className="mx-auto max-w-[480px] px-4 py-6"
      style={{ paddingBottom: isReplayAvailable ? 96 : undefined }}
    >
      {/* Player cards */}
      <div className="flex flex-col gap-4">
        {players.map((player, idx) => {
          const isFoul = player.analysis.isFoul;

          /* Pairwise results vs each opponent */
          const pairs = players
            .filter((_, i) => i !== idx)
            .map((opp) => computePairH2H(player, opp));
          const totalH2H = pairs.reduce((sum, p) => sum + p.h2h, 0);

          /* Royalties: net per opponent (with pair multiplier) & gross */
          const d = player.analysis.details;
          const bruttoRoyalties =
            (d?.top?.pts || 0) + (d?.mid?.pts || 0) + (d?.bot?.pts || 0);
          const effectiveRoy = isFoul ? 0 : player.analysis.royalties;
          const myMult = player.analysis.multiplier || 1;
          const netRoy = players
            .filter((_, i) => i !== idx)
            .reduce((sum, opp) => {
              const oppMult = opp.analysis.multiplier || 1;
              const pairMult = Math.max(myMult, oppMult);
              const oppRoy = opp.analysis.isFoul ? 0 : opp.analysis.royalties;
              return sum + (effectiveRoy - oppRoy) * pairMult;
            }, 0);

          /* Total score: use pre-computed only on final round */
          const score =
            isFinalRound && scores && scores[player.player] != null
              ? scores[player.player]
              : totalH2H + netRoy;
          const scoreColor =
            score > 0
              ? "#4caf50"
              : score < 0
                ? "#ef5350"
                : "var(--color-muted)";

          /* Badges */
          const badges: { label: string; bg: string }[] = [];
          if (player.fantasyLand?.isActive) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const cards = (player.fantasyLand as any).cardsToReceive || 14;
            badges.push({ label: `FL${cards}`, bg: "#444" });
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
                    {player.analysis.multiplier > 1 &&
                      player.analysis.bonusMessage && (
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
                      )}
                  </div>
                  {/* Per-opponent result lines — only on final round */}
                  {isFinalRound && pairs.length > 0 && (
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
                      </div>
                    </div>
                  )}
                </div>
                {/* Score — only on final round */}
                {isFinalRound && (
                  <div
                    className="font-[family-name:var(--font-anton)] text-[32px] leading-none"
                    style={{ color: scoreColor }}
                  >
                    {score > 0 ? `+${score}` : score}
                  </div>
                )}
              </div>

              {/* Board — dim if foul, only on final round */}
              <div
                className="flex flex-col gap-2"
                style={{ opacity: isFoul && isFinalRound ? 0.5 : 1 }}
              >
                <BoardRow label="TOP" data={player.analysis.details.top} slotCount={3} />
                <BoardRow label="MID" data={player.analysis.details.mid} slotCount={5} />
                <BoardRow label="BOT" data={player.analysis.details.bot} slotCount={5} />
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
        <a
          href="/"
          className="mt-4 text-[12px] uppercase"
          style={{
            border: "1px solid rgba(255,215,0,0.3)",
            borderRadius: 20,
            padding: "8px 20px",
            color: "#ffd700",
            letterSpacing: "2px",
            textDecoration: "none",
          }}
        >
          Beta Live — Download Now
        </a>
      </div>

      {/* ── Replay navigation bar ── */}
      {isReplayAvailable && (
        <div
          className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-center gap-5 pb-6 pt-3"
          style={{
            background: "linear-gradient(to top, #0f1f18, #152b22)",
            borderTop: "1px solid rgba(255, 215, 0, 0.15)",
          }}
        >
          <button
            onClick={() => navigateReplay("prev")}
            className="flex items-center justify-center"
            style={{
              width: 36,
              height: 36,
              borderRadius: "50%",
              background: "rgba(255, 215, 0, 0.1)",
              border: "1px solid rgba(255, 215, 0, 0.3)",
              color: "#ffd700",
              fontSize: 18,
              lineHeight: 1,
            }}
          >
            &#x2039;
          </button>
          <span className="font-[family-name:var(--font-dm-mono)] text-sm font-bold text-[var(--color-gold)]">
            DRAW {replayRound + 1}/{totalSnapshots}
          </span>
          <button
            onClick={() => navigateReplay("next")}
            className="flex items-center justify-center"
            style={{
              width: 36,
              height: 36,
              borderRadius: "50%",
              background: "rgba(255, 215, 0, 0.1)",
              border: "1px solid rgba(255, 215, 0, 0.3)",
              color: "#ffd700",
              fontSize: 18,
              lineHeight: 1,
            }}
          >
            &#x203A;
          </button>
        </div>
      )}
    </main>
  );
}
