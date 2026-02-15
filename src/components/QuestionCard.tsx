import React from 'react';
import { Question } from '../types';

interface QuestionCardProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  selectedValue: number | null;
  onSelect: (value: number) => void;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  questionNumber,
  totalQuestions,
  selectedValue,
  onSelect,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-md p-5 sm:p-6 w-full max-w-lg mx-auto">
      {/* Category badge */}
      <span className="inline-block text-xs font-semibold uppercase tracking-wide text-medical-700 bg-medical-100 px-3 py-1 rounded-full mb-3">
        {question.category}
      </span>

      {/* Question number + text */}
      <p className="text-sm text-gray-400 mb-1">
        Question {questionNumber} of {totalQuestions}
      </p>
      <h2 className="text-lg sm:text-xl font-semibold text-gray-800 leading-snug mb-5">
        {question.question}
      </h2>

      {/* Options — large tap targets */}
      <div className="flex flex-col gap-3">
        {question.options.map((option, idx) => {
          const isSelected = selectedValue === idx;
          return (
            <button
              key={idx}
              type="button"
              onClick={() => onSelect(idx)}
              className={`option-btn w-full text-left px-4 py-3 rounded-xl border-2 text-sm sm:text-base font-medium
                ${
                  isSelected
                    ? 'border-medical-600 bg-medical-50 text-medical-700'
                    : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50'
                }`}
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default QuestionCard;