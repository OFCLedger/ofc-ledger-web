// ============================================================
// PAIRWISE COMPARISON — ported from OFC-Scorekeeper
// Reference: supabase/functions/_shared/scoring.ts → comparePlayers()
// Keep this function's branching in lockstep with that file.
// ============================================================

export interface RowDetail {
  rankValue: number;
}

export interface PairAnalysis {
  isFoul: boolean;
  multiplier: number;
  royalties: number;
  shootingTheMoon?: boolean;
  details: { top: RowDetail; mid: RowDetail; bot: RowDetail };
}

export interface PairPlayer {
  analysis: PairAnalysis;
  fantasyLandState?: { isActive: boolean };
  fantasyLand?: { isActive: boolean };
}

export interface PairResult {
  label: string;
  h2h: number;
  royaltyContribution: number;
  // Each player's own multiplier in the pair, for formatMultiplierText.
  // Empty when the result between the pair is a fixed 0 (both foul, or
  // both Shooting the Moon) — same rule as app/results.tsx's vsResults.
  factors: number[];
}

/**
 * Mirrors the per-player Shooting the Moon check inside comparePlayers()
 * (p1STM/p2STM in scoring.ts): active rule, this hand actually shot the
 * moon, not fouled, and either the rule allows it during Fantasy Land or
 * this player wasn't in FL this hand. Shared by comparePairDetailed below
 * and by the hand/[id] page's "🌙 STM" pill, so the badge can never
 * disagree with the score it's describing.
 */
export function isShootingTheMoon(
  p: PairPlayer,
  stmActive: boolean,
  stmInFL: boolean
): boolean {
  if (!p?.analysis) return false;
  const wasInFL = !!(p.fantasyLandState?.isActive || p.fantasyLand?.isActive);
  return stmActive && !p.analysis.isFoul && !!p.analysis.shootingTheMoon && (stmInFL || !wasInFL);
}

/**
 * Same branching as comparePlayers() in scoring.ts, but splits the net
 * score into the hand-vs-hand component and the royalty component so the
 * UI can keep showing them on separate lines. h2h + royaltyContribution
 * always sums to exactly what comparePlayers() returns for the same pair.
 */
export function comparePairDetailed(
  p1: PairPlayer,
  p2: PairPlayer,
  stmActive: boolean = false,
  stmPoints: number = 20,
  stmInFL: boolean = false
): PairResult {
  if (!p1?.analysis || !p2?.analysis) {
    return { label: "-", h2h: 0, royaltyContribution: 0, factors: [] };
  }

  const p1Foul = p1.analysis.isFoul;
  const p2Foul = p2.analysis.isFoul;
  const m1 = p1.analysis.multiplier || 1;
  const m2 = p2.analysis.multiplier || 1;
  const mult = m1 * m2;
  const factors = [m1, m2];

  // Both foul — nobody wins.
  if (p1Foul && p2Foul) {
    return { label: "FOUL", h2h: 0, royaltyContribution: 0, factors: [] };
  }

  // Shooting the Moon override — trumps hand-vs-hand and royalties entirely.
  const p1STM = isShootingTheMoon(p1, stmActive, stmInFL);
  const p2STM = isShootingTheMoon(p2, stmActive, stmInFL);

  if (p1STM || p2STM) {
    if (p1STM && p2STM) return { label: "STM", h2h: 0, royaltyContribution: 0, factors: [] };
    const raw = p1STM ? stmPoints : -stmPoints;
    return { label: "STM", h2h: raw * mult, royaltyContribution: 0, factors };
  }

  // One-sided foul — fixed 6-point scoop plus the live player's royalties.
  if (p1Foul && !p2Foul) {
    return {
      label: "FOUL",
      h2h: -6 * mult,
      royaltyContribution: -p2.analysis.royalties * mult,
      factors,
    };
  }
  if (!p1Foul && p2Foul) {
    return {
      label: "SCOOP",
      h2h: 6 * mult,
      royaltyContribution: p1.analysis.royalties * mult,
      factors,
    };
  }

  // Normal row-by-row comparison, +3/-3 for a clean scoop.
  const rows = ["top", "mid", "bot"] as const;
  let p1Wins = 0;
  let p2Wins = 0;
  let score = 0;
  for (const r of rows) {
    const a = p1.analysis.details[r].rankValue;
    const b = p2.analysis.details[r].rankValue;
    if (a > b) {
      score++;
      p1Wins++;
    } else if (a < b) {
      score--;
      p2Wins++;
    }
  }
  if (p1Wins === 3) score += 3;
  if (p2Wins === 3) score -= 3;

  const label = p1Wins === 3 ? "SCOOP" : `${p1Wins}-${p2Wins}`;

  return {
    label,
    h2h: score * mult,
    royaltyContribution: (p1.analysis.royalties - p2.analysis.royalties) * mult,
    factors,
  };
}

/**
 * Faithful port of comparePlayers() from
 * supabase/functions/_shared/scoring.ts — same signature and return value
 * (net score for p1 vs p2, from p1's perspective).
 */
export function comparePlayers(
  p1: PairPlayer,
  p2: PairPlayer,
  stmActive: boolean = false,
  stmPoints: number = 20,
  stmInFL: boolean = false
): number {
  const { h2h, royaltyContribution } = comparePairDetailed(p1, p2, stmActive, stmPoints, stmInFL);
  return h2h + royaltyContribution;
}
