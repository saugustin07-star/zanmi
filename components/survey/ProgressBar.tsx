'use client';

interface ProgressBarProps {
  current: number;
  total: number;
  score: number;
}

export default function ProgressBar({ current, total, score }: ProgressBarProps) {
  const percent = Math.round((current / total) * 100);

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-bold text-zdark/60">
          Question {current} of {total}
        </span>
        <div className="flex items-center gap-1.5 bg-zyellow/20 px-3 py-1 rounded-full">
          <span className="text-lg">⭐</span>
          <span className="text-sm font-bold text-zdark">{score} pts</span>
        </div>
      </div>
      <div className="w-full h-4 bg-zdark/10 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-brand rounded-full progress-fill"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
