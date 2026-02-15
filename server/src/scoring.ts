/**
 * Scoring logic for MDS-UPDRS Parts I & II.
 * Pure functions — no side effects, easy to unit-test.
 */

export type Severity = 'Mild' | 'Moderate' | 'Severe';

// ── Part I (Non-Motor): 13 questions, max 52 ────────────────────────
export function classifyPartI(score: number): Severity {
  if (score <= 10) return 'Mild';
  if (score <= 21) return 'Moderate';
  return 'Severe';
}

// ── Part II (Motor): 13 questions, max 52 ───────────────────────────
export function classifyPartII(score: number): Severity {
  if (score <= 12) return 'Mild';
  if (score <= 29) return 'Moderate';
  return 'Severe';
}

// ── Overall recommendation based on worst-case severity ─────────────
export function deriveResult(
  part1Severity: Severity,
  part2Severity: Severity,
): { riskLevel: Severity; recommendation: string; color: 'green' | 'orange' | 'red' } {
  if (part1Severity === 'Severe' || part2Severity === 'Severe') {
    return {
      riskLevel: 'Severe',
      recommendation: 'Must visit a doctor immediately.',
      color: 'red',
    };
  }

  if (part1Severity === 'Moderate' || part2Severity === 'Moderate') {
    return {
      riskLevel: 'Moderate',
      recommendation: 'Suggested to visit a doctor.',
      color: 'orange',
    };
  }

  return {
    riskLevel: 'Mild',
    recommendation: 'No immediate need to visit a doctor.',
    color: 'green',
  };
}
