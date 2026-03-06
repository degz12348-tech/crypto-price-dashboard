'use client';

interface HeaderProps {
  lastUpdated: Date | null;
  countdown: number;
  loading: boolean;
}

export default function Header({ lastUpdated, countdown, loading }: HeaderProps) {
  return (
    <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white">
          Crypto Dashboard
        </h1>
        {lastUpdated && (
          <p className="text-sm text-gray-400 mt-1">
            Last updated: {lastUpdated.toLocaleTimeString()}
          </p>
        )}
      </div>
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <span
            className={`w-2 h-2 rounded-full ${
              loading ? 'bg-yellow-400 animate-pulse' : 'bg-green-400'
            }`}
          />
          <span className="text-sm text-gray-400">
            {loading ? 'Updating...' : 'Live'}
          </span>
        </div>
        <div className="bg-gray-800 rounded-full px-3 py-1 text-sm text-gray-300">
          Refresh in {countdown}s
        </div>
      </div>
    </header>
  );
}
