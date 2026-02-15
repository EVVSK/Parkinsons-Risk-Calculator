import React, { useState, useEffect, useCallback } from 'react';
import { questionData } from '../data/questions';
import { ApiPayload, ScreeningResult } from '../types';
import QuestionCard from './QuestionCard';
import ProgressBar from './ProgressBar';
import ResultScreen from './ResultScreen';

const STORAGE_KEY = 'parkinson-screening-answers';
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api/calculate-risk';

const allQuestions = [...questionData.part1, ...questionData.part2];
const TOTAL = allQuestions.length; // 26

const ScreeningFlow: React.FC = () => {
  // ── State ────────────────────────────────────────────────────────
  const [answers, setAnswers] = useState<(number | null)[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length === TOTAL) return parsed;
      }
    } catch { /* ignore corrupt data */ }
    return Array(TOTAL).fill(null);
  });

  const [currentIndex, setCurrentIndex] = useState<number>(() => {
    // Start at first unanswered question
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          const firstUnanswered = parsed.findIndex((v: number | null) => v === null);
          return firstUnanswered === -1 ? 0 : firstUnanswered;
        }
      }
    } catch { /* ignore */ }
    return 0;
  });

  const [result, setResult] = useState<ScreeningResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ── Persist answers to localStorage ──────────────────────────────
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(answers));
  }, [answers]);

  // ── Handlers ─────────────────────────────────────────────────────
  const handleSelect = useCallback((value: number) => {
    setAnswers((prev) => {
      const next = [...prev];
      next[currentIndex] = value;
      return next;
    });
  }, [currentIndex]);

  const goNext = () => {
    if (currentIndex < TOTAL - 1) setCurrentIndex((i) => i + 1);
  };

  const goBack = () => {
    if (currentIndex > 0) setCurrentIndex((i) => i - 1);
  };

  const handleSubmit = async () => {
    // All must be answered
    if (answers.some((a) => a === null)) {
      setError('Please answer all questions before submitting.');
      return;
    }

    setLoading(true);
    setError(null);

    const payload: ApiPayload = {
      part1Scores: answers.slice(0, 13) as number[],
      part2Scores: answers.slice(13, 26) as number[],
    };

    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || `Server error: ${res.status}`);
      }

      const data: ScreeningResult = await res.json();
      setResult(data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to connect to server.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setAnswers(Array(TOTAL).fill(null));
    setCurrentIndex(0);
    setResult(null);
    setError(null);
    localStorage.removeItem(STORAGE_KEY);
  };

  // ── Result screen ───────────────────────────────────────────────
  if (result) {
    return <ResultScreen result={result} answers={answers as number[]} onReset={handleReset} />;
  }

  // ── Derived values ──────────────────────────────────────────────
  const currentQuestion = allQuestions[currentIndex];
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === TOTAL - 1;
  const currentAnswered = answers[currentIndex] !== null;
  const allAnswered = answers.every((a) => a !== null);
  const part: 1 | 2 = currentIndex < 13 ? 1 : 2;
  const partOffset = part === 1 ? 0 : 13;
  const partCurrent = currentIndex - partOffset + 1;

  return (
    <div className="min-h-screen flex flex-col px-4 py-6 sm:py-10">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
          Parkinson's Risk Screening
        </h1>
        <p className="text-sm text-medical-600 font-medium mt-1">
          Based on the MDS-UPDRS Scale
        </p>
        <p className="mt-2 inline-block bg-amber-50 text-amber-700 text-xs font-semibold px-3 py-1 rounded-full border border-amber-200">
          ⏱ Based on the past week (including today)
        </p>
      </div>

      {/* Progress */}
      <ProgressBar current={partCurrent} total={13} part={part} />

      {/* Question card */}
      <QuestionCard
        question={currentQuestion}
        questionNumber={currentIndex + 1}
        totalQuestions={TOTAL}
        selectedValue={answers[currentIndex]}
        onSelect={handleSelect}
      />

      {/* Error message */}
      {error && (
        <p className="text-center text-red-600 text-sm font-medium mt-4">{error}</p>
      )}

      {/* Navigation */}
      <div className="flex justify-between items-center w-full max-w-lg mx-auto mt-6 gap-3">
        <button
          type="button"
          onClick={goBack}
          disabled={isFirst}
          className={`px-5 py-3 rounded-xl font-semibold text-sm transition
            ${isFirst
              ? 'bg-gray-100 text-gray-300 cursor-not-allowed'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300 active:scale-95'
            }`}
        >
          ← Back
        </button>

        {isLast ? (
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!allAnswered || loading}
            className={`flex-1 px-5 py-3 rounded-xl font-bold text-sm text-white transition
              ${!allAnswered || loading
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-medical-600 hover:bg-medical-700 active:scale-95'
              }`}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Calculating…
              </span>
            ) : (
              'Submit Screening'
            )}
          </button>
        ) : (
          <button
            type="button"
            onClick={goNext}
            disabled={!currentAnswered}
            className={`flex-1 px-5 py-3 rounded-xl font-bold text-sm text-white transition
              ${!currentAnswered
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-medical-600 hover:bg-medical-700 active:scale-95'
              }`}
          >
            Next →
          </button>
        )}
      </div>

      {/* Quick-nav dots */}
      <div className="flex flex-wrap justify-center gap-1.5 mt-6 max-w-lg mx-auto">
        {answers.map((a, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setCurrentIndex(i)}
            title={`Question ${i + 1}`}
            className={`w-6 h-6 rounded-full text-[10px] font-bold transition
              ${i === currentIndex
                ? 'ring-2 ring-medical-500 ring-offset-1'
                : ''
              }
              ${a !== null
                ? 'bg-medical-500 text-white'
                : 'bg-gray-200 text-gray-400'
              }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ScreeningFlow;
