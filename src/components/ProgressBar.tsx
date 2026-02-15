import React from 'react';

interface ProgressBarProps {
  current: number;
  total: number;
  part: 1 | 2;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ current, total, part }) => {
  const pct = Math.round((current / total) * 100);

  return (
    <div className="w-full max-w-lg mx-auto mb-4">
      {/* Section label */}
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-xs font-semibold uppercase tracking-wide text-gray-500">
          Part {part === 1 ? 'I — Non-Motor' : 'II — Motor'}
        </span>
        <span className="text-xs font-medium text-gray-400">
          {current}/{total}
        </span>
      </div>

      {/* Bar */}
      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-medical-500 rounded-full transition-all duration-300 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
