import express, { Request, Response } from 'express';
import cors from 'cors';
import { classifyPartI, classifyPartII, deriveResult } from './scoring';

const app = express();
const PORT = 3001;

// ── Middleware ───────────────────────────────────────────────────────
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

// ── Types (mirrored from shared types.ts) ───────────────────────────
interface ApiPayload {
  part1Scores: number[];
  part2Scores: number[];
}

interface ScreeningResult {
  riskLevel: 'Mild' | 'Moderate' | 'Severe';
  recommendation: string;
  color: 'green' | 'orange' | 'red';
  breakdown: { part1Score: number; part2Score: number };
}

// ── Validation helper ───────────────────────────────────────────────
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

// ── POST /api/calculate-risk ────────────────────────────────────────
app.post('/api/calculate-risk', (req: Request, res: Response) => {
  try {
    const body = req.body as ApiPayload;

    const part1 = validateScores(body.part1Scores, 'part1Scores');
    const part2 = validateScores(body.part2Scores, 'part2Scores');

    const part1Score = part1.reduce((sum, v) => sum + v, 0);
    const part2Score = part2.reduce((sum, v) => sum + v, 0);

    const part1Severity = classifyPartI(part1Score);
    const part2Severity = classifyPartII(part2Score);
    const { riskLevel, recommendation, color } = deriveResult(part1Severity, part2Severity);

    const result: ScreeningResult = {
      riskLevel,
      recommendation,
      color,
      breakdown: { part1Score, part2Score },
    };

    return res.json(result);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Invalid request';
    return res.status(400).json({ error: message });
  }
});

// ── Start ───────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
