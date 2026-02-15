import type { Handler, HandlerEvent, HandlerResponse } from '@netlify/functions';

// ── Scoring logic (ported from server/src/scoring.ts) ───────────────
type Severity = 'Mild' | 'Moderate' | 'Severe';

function classifyPartI(score: number): Severity {
  if (score <= 10) return 'Mild';
  if (score <= 21) return 'Moderate';
  return 'Severe';
}

function classifyPartII(score: number): Severity {
  if (score <= 12) return 'Mild';
  if (score <= 29) return 'Moderate';
  return 'Severe';
}

function deriveResult(
  p1: Severity,
  p2: Severity,
): { riskLevel: Severity; recommendation: string; color: 'green' | 'orange' | 'red' } {
  if (p1 === 'Severe' || p2 === 'Severe') {
    return { riskLevel: 'Severe', recommendation: 'Must visit a doctor immediately.', color: 'red' };
  }
  if (p1 === 'Moderate' || p2 === 'Moderate') {
    return { riskLevel: 'Moderate', recommendation: 'Suggested to visit a doctor.', color: 'orange' };
  }
  return { riskLevel: 'Mild', recommendation: 'No immediate need to visit a doctor.', color: 'green' };
}

// ── Validation ──────────────────────────────────────────────────────
function validateScores(scores: unknown, label: string): number[] {
  if (!Array.isArray(scores) || scores.length !== 13) {
    throw new Error(`${label} must be an array of exactly 13 values.`);
  }
  for (let i = 0; i < scores.length; i++) {
    const v = scores[i];
    if (!Number.isInteger(v) || v < 0 || v > 4) {
      throw new Error(`${label}[${i}] must be an integer between 0 and 4. Got: ${v}`);
    }
  }
  return scores as number[];
}

// ── CORS headers ────────────────────────────────────────────────────
const headers: Record<string, string> = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Content-Type': 'application/json',
};

// ── Handler ─────────────────────────────────────────────────────────
const handler: Handler = async (event: HandlerEvent): Promise<HandlerResponse> => {
  // Handle CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  try {
    const body = JSON.parse(event.body || '{}');

    const part1 = validateScores(body.part1Scores, 'part1Scores');
    const part2 = validateScores(body.part2Scores, 'part2Scores');

    const part1Score = part1.reduce((s, v) => s + v, 0);
    const part2Score = part2.reduce((s, v) => s + v, 0);

    const p1Sev = classifyPartI(part1Score);
    const p2Sev = classifyPartII(part2Score);
    const { riskLevel, recommendation, color } = deriveResult(p1Sev, p2Sev);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        riskLevel,
        recommendation,
        color,
        breakdown: { part1Score, part2Score },
      }),
    };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Invalid request';
    return { statusCode: 400, headers, body: JSON.stringify({ error: message }) };
  }
};

export { handler };
