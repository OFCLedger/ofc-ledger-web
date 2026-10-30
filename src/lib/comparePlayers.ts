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
    return { label: "-", h2h: 0, royaltyContribution: 0 };
  }

  const p1Foul = p1.analysis.isFoul;
  const p2Foul = p2.analysis.isFoul;
  const m1 = p1.analysis.multiplier || 1;
  const m2 = p2.analysis.multiplier || 1;
  const mult = m1 * m2;

  // Both foul — nobody wins.
  if (p1Foul && p2Foul) {
    return { label: "FOUL", h2h: 0, royaltyContribution: 0 };
  }

  // Shooting the Moon override — trumps hand-vs-hand and royalties entirely.
  const p1WasInFL = !!(p1.fantasyLandState?.isActive || p1.fantasyLand?.isActive);
  const p2WasInFL = !!(p2.fantasyLandState?.isActive || p2.fantasyLand?.isActive);
  const p1STM = stmActive && !p1Foul && !!p1.analysis.shootingTheMoon && (stmInFL || !p1WasInFL);
  const p2STM = stmActive && !p2Foul && !!p2.analysis.shootingTheMoon && (stmInFL || !p2WasInFL);

  if (p1STM || p2STM) {
    if (p1STM && p2STM) return { label: "STM", h2h: 0, royaltyContribution: 0 };
    const raw = p1STM ? stmPoints : -stmPoints;
    return { label: "STM", h2h: raw * mult, royaltyContribution: 0 };
  }

  // One-sided foul — fixed 6-point scoop plus the live player's royalties.
  if (p1Foul && !p2Foul) {
    return {
      label: "FOUL",
      h2h: -6 * mult,
      royaltyContribution: -p2.analysis.royalties * mult,
    };
  }
  if (!p1Foul && p2Foul) {
    return {
      label: "SCOOP",
      h2h: 6 * mult,
      royaltyContribution: p1.analysis.royalties * mult,
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

  const label = p1Wins === 3 ? "SCOOP" : `${p1Wins}–${p2Wins}`;

  return {
    label,
    h2h: score * mult,
    royaltyContribution: (p1.analysis.royalties - p2.analysis.royalties) * mult,
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
