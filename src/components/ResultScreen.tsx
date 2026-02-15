import React from 'react';
import { ScreeningResult } from '../types';
import { questionData } from '../data/questions';

interface ResultScreenProps {
  result: ScreeningResult;
  answers: number[];
  onReset: () => void;
}

const allQuestions = [...questionData.part1, ...questionData.part2];

// ── Color map ──────────────────────────────────────────────────────
const colorMap = {
  green: {
    bg: 'bg-green-50',
    border: 'border-green-300',
    text: 'text-green-800',
    badge: 'bg-green-500',
    icon: '✅',
  },
  orange: {
    bg: 'bg-orange-50',
    border: 'border-orange-300',
    text: 'text-orange-800',
    badge: 'bg-orange-500',
    icon: '⚠️',
  },
  red: {
    bg: 'bg-red-50',
    border: 'border-red-300',
    text: 'text-red-800',
    badge: 'bg-red-600',
    icon: '🚨',
  },
};

// ── Severity label for each part ───────────────────────────────────
function partSeverity(score: number, part: 1 | 2): string {
  if (part === 1) {
    if (score <= 10) return 'Mild';
    if (score <= 21) return 'Moderate';
    return 'Severe';
  }
  if (score <= 12) return 'Mild';
  if (score <= 29) return 'Moderate';
  return 'Severe';
}

// ── PDF generation (plain-text report) ─────────────────────────────
function generateReport(result: ScreeningResult, answers: number[]): void {
  const lines: string[] = [];
  lines.push('═══════════════════════════════════════════════════════');
  lines.push('  PARKINSON\'S RISK SCREENING REPORT');
  lines.push('  MDS-UPDRS Parts I & II');
  lines.push('═══════════════════════════════════════════════════════');
  lines.push('');
  lines.push(`Date: ${new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' })}`);
  lines.push(`Time: ${new Date().toLocaleTimeString('en-IN')}`);
  lines.push('');
  lines.push('───────────────────────────────────────────────────────');
  lines.push('RESULT SUMMARY');
  lines.push('───────────────────────────────────────────────────────');
  lines.push(`Overall Risk Level : ${result.riskLevel.toUpperCase()}`);
  lines.push(`Recommendation     : ${result.recommendation}`);
  lines.push(`Part I  Score      : ${result.breakdown.part1Score} / 52  (${partSeverity(result.breakdown.part1Score, 1)})`);
  lines.push(`Part II Score      : ${result.breakdown.part2Score} / 52  (${partSeverity(result.breakdown.part2Score, 2)})`);
  lines.push(`Combined Score     : ${result.breakdown.part1Score + result.breakdown.part2Score} / 104`);
  lines.push('');
  lines.push('───────────────────────────────────────────────────────');
  lines.push('PART I — NON-MOTOR EXPERIENCES (Questions 1.1–1.13)');
  lines.push('───────────────────────────────────────────────────────');
  for (let i = 0; i < 13; i++) {
    const q = allQuestions[i];
    lines.push(`[${q.id}] ${q.category}`);
    lines.push(`  Q: ${q.question}`);
    lines.push(`  A: ${q.options[answers[i]]}`);
    lines.push('');
  }
  lines.push('───────────────────────────────────────────────────────');
  lines.push('PART II — MOTOR EXPERIENCES (Questions 2.1–2.13)');
  lines.push('───────────────────────────────────────────────────────');
  for (let i = 13; i < 26; i++) {
    const q = allQuestions[i];
    lines.push(`[${q.id}] ${q.category}`);
    lines.push(`  Q: ${q.question}`);
    lines.push(`  A: ${q.options[answers[i]]}`);
    lines.push('');
  }
  lines.push('───────────────────────────────────────────────────────');
  lines.push('DISCLAIMER');
  lines.push('───────────────────────────────────────────────────────');
  lines.push('This screening tool is NOT a diagnosis. It is based on the');
  lines.push('MDS-UPDRS Parts I & II self-assessment scale and is intended');
  lines.push('only to help you decide whether to consult a doctor.');
  lines.push('Please share this report with your healthcare provider.');
  lines.push('');

  const blob = new Blob([lines.join('\n')], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `parkinsons-screening-report-${new Date().toISOString().slice(0, 10)}.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// ── Component ──────────────────────────────────────────────────────
const ResultScreen: React.FC<ResultScreenProps> = ({ result, answers, onReset }) => {
  const c = colorMap[result.color];
  const p1Sev = partSeverity(result.breakdown.part1Score, 1);
  const p2Sev = partSeverity(result.breakdown.part2Score, 2);

  return (
    <div className="min-h-screen flex flex-col items-center px-4 py-8 sm:py-12">
      {/* Alert banner */}
      <div className={`w-full max-w-lg rounded-2xl border-2 ${c.border} ${c.bg} p-6 text-center mb-6`}>
        <span className="text-4xl mb-3 block">{c.icon}</span>
        <h2 className={`text-2xl font-bold ${c.text} mb-2`}>
          {result.riskLevel} Risk
        </h2>
        <p className={`text-base font-medium ${c.text}`}>
          {result.recommendation}
        </p>
      </div>

      {/* Score breakdown card */}
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-md p-6 mb-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Score Breakdown</h3>

        <div className="grid grid-cols-2 gap-4">
          {/* Part I */}
          <div className="bg-gray-50 rounded-xl p-4 text-center">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Part I — Non-Motor</p>
            <p className="text-3xl font-bold text-gray-800">{result.breakdown.part1Score}<span className="text-base text-gray-400">/52</span></p>
            <span className={`inline-block mt-2 text-xs font-bold text-white px-3 py-0.5 rounded-full
              ${p1Sev === 'Mild' ? 'bg-green-500' : p1Sev === 'Moderate' ? 'bg-orange-500' : 'bg-red-600'}`}>
              {p1Sev}
            </span>
          </div>

          {/* Part II */}
          <div className="bg-gray-50 rounded-xl p-4 text-center">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Part II — Motor</p>
            <p className="text-3xl font-bold text-gray-800">{result.breakdown.part2Score}<span className="text-base text-gray-400">/52</span></p>
            <span className={`inline-block mt-2 text-xs font-bold text-white px-3 py-0.5 rounded-full
              ${p2Sev === 'Mild' ? 'bg-green-500' : p2Sev === 'Moderate' ? 'bg-orange-500' : 'bg-red-600'}`}>
              {p2Sev}
            </span>
          </div>
        </div>

        {/* Thresholds legend */}
        <div className="mt-5 text-xs text-gray-400 space-y-1">
          <p>Part I thresholds: 0–10 Mild · 11–21 Moderate · ≥22 Severe</p>
          <p>Part II thresholds: 0–12 Mild · 13–29 Moderate · ≥30 Severe</p>
        </div>
      </div>

      {/* Actions */}
      <div className="w-full max-w-lg flex flex-col sm:flex-row gap-3">
        <button
          type="button"
          onClick={() => generateReport(result, answers)}
          className="flex-1 px-5 py-3 rounded-xl font-bold text-sm text-white bg-medical-600 hover:bg-medical-700 active:scale-95 transition"
        >
          📄 Download Report
        </button>
        <button
          type="button"
          onClick={onReset}
          className="flex-1 px-5 py-3 rounded-xl font-bold text-sm text-gray-700 bg-gray-200 hover:bg-gray-300 active:scale-95 transition"
        >
          ↻ Start Over
        </button>
      </div>

      {/* Disclaimer */}
      <p className="max-w-lg text-center text-xs text-gray-400 mt-6 leading-relaxed">
        This screening tool is <strong>not a diagnosis</strong>. It is based on the MDS-UPDRS 
        Parts I &amp; II self-assessment scale. Please consult a healthcare professional 
        for a proper evaluation.
      </p>
    </div>
  );
};

export default ResultScreen;
