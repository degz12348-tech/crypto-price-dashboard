"use client";

import { useState, useEffect } from "react";
import { useCoins } from "@/hooks/useCoins";
import type { Coin } from "@/types/coin";
import CoinCard from "./CoinCard";
import CoinDetail from "./CoinDetail";
import Header from "./Header";

function LoadingSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className="rounded-xl border border-gray-800 bg-gray-900 p-4 animate-pulse"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-full bg-gray-800" />
            <div className="flex-1">
              <div className="h-4 bg-gray-800 rounded w-20 mb-1" />
              <div className="h-3 bg-gray-800 rounded w-10" />
            </div>
          </div>
          <div className="h-6 bg-gray-800 rounded w-24 mb-2" />
          <div className="h-[60px] bg-gray-800 rounded" />
        </div>
      ))}
    </div>
  );
}

export default function Dashboard() {
  const { coins, isLoading, error, refresh } = useCoins();
  const [selectedCoin, setSelectedCoin] = useState<Coin | null>(null);
  const [lastRefresh, setLastRefresh] = useState<Date | null>(null);

  useEffect(() => {
    if (coins && !isLoading) {
      setLastRefresh(new Date());
    }
  }, [coins, isLoading]);

  const handleRefresh = () => {
    refresh();
  };

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Header lastRefresh={lastRefresh} onRefresh={handleRefresh} isLoading={isLoading} />
        <div className="flex flex-col items-center justify-center py-20">
          <div className="text-red-400 text-lg mb-4">Failed to load cryptocurrency data</div>
          <button
            onClick={handleRefresh}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Header lastRefresh={lastRefresh} onRefresh={handleRefresh} isLoading={isLoading} />

      {selectedCoin && (
        <CoinDetail coin={selectedCoin} onClose={() => setSelectedCoin(null)} />
      )}

      {isLoading && !coins ? (
        <LoadingSkeleton />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {coins?.map((coin) => (
            <CoinCard
              key={coin.id}
              coin={coin}
              onClick={() =>
                setSelectedCoin(selectedCoin?.id === coin.id ? null : coin)
              }
              isSelected={selectedCoin?.id === coin.id}
            />
          ))}
        </div>
      )}
    </div>
  );
}
