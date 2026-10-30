// ============================================================
// MULTIPLIER TEXT — ported from OFC-Scorekeeper
// Reference: app/lib/multiplierChip.ts → formatMultiplierText()
// Pure display formatting — does not compute the multiplier itself.
// ============================================================

/**
 * Faithful port of formatMultiplierText() from app/lib/multiplierChip.ts.
 * Takes each player's own multiplier in the pair (analysis.multiplier || 1)
 * and builds a readable chain, own factor first. Factors equal to 1 never
 * show ("x1" never appears) and are filtered out before building the chain.
 */
export function formatMultiplierText(factors: number[]): string | null {
  const contributing = factors.filter((f) => f !== 1);
  if (contributing.length === 0) return null;
  if (contributing.length === 1) return `x${contributing[0]}`;
  const product = contributing.reduce((acc, f) => acc * f, 1);
  return `${contributing.map((f) => `x${f}`).join(" ")} = x${product}`;
}
