/** Single screening question from the MDS-UPDRS scale */
export interface Question {
  id: string;
  category: string;
  question: string;
  options: string[];
}

/** Full questionnaire split into Part I (Non-Motor) and Part II (Motor) */
export interface QuestionnaireData {
  part1: Question[];
  part2: Question[];
}

/** Payload sent to POST /api/calculate-risk */
export interface ApiPayload {
  part1Scores: number[];
  part2Scores: number[];
}

/** Score breakdown returned alongside the risk assessment */
export interface ScoreBreakdown {
  part1Score: number;
  part2Score: number;
}

/** Result returned from the screening API */
export interface ScreeningResult {
  riskLevel: 'Mild' | 'Moderate' | 'Severe';
  recommendation: string;
  color: 'green' | 'orange' | 'red';
  breakdown: ScoreBreakdown;
}