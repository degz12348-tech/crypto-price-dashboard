'use client';

interface ChangeIndicatorProps {
  change: number;
}

export default function ChangeIndicator({ change }: ChangeIndicatorProps) {
  const isPositive = change >= 0;

  return (
    <span
      className={`inline-flex items-center gap-1 font-medium ${
        isPositive ? 'text-green-400' : 'text-red-400'
      }`}
    >
      <span className="text-xs">{isPositive ? '▲' : '▼'}</span>
      {Math.abs(change).toFixed(2)}%
    </span>
  );
}
