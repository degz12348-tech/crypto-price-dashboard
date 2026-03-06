"use client";

import { useState, useEffect } from "react";

interface HeaderProps {
  lastRefresh: Date | null;
  onRefresh: () => void;
  isLoading: boolean;
}

export default function Header({ lastRefresh, onRefresh, isLoading }: HeaderProps) {
  const [countdown, setCountdown] = useState(30);

  useEffect(() => {
    if (!lastRefresh) return;

    const interval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - lastRefresh.getTime()) / 1000);
      setCountdown(Math.max(0, 30 - elapsed));
    }, 1000);

    return () => clearInterval(interval);
  }, [lastRefresh]);

  return (
    <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Crypto Dashboard</h1>
        <p className="text-gray-400 text-sm mt-1">
          Top 10 cryptocurrencies by market cap
        </p>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <span
            className={`w-2 h-2 rounded-full ${isLoading ? "bg-yellow-500 animate-pulse" : "bg-green-500"}`}
          />
          {isLoading ? (
            "Refreshing..."
          ) : (
            <>Refresh in {countdown}s</>
          )}
        </div>
        <button
          onClick={onRefresh}
          disabled={isLoading}
          className="px-3 py-1.5 text-sm bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg text-gray-300 transition-colors disabled:opacity-50"
        >
          Refresh
        </button>
      </div>
    </header>
  );
}
