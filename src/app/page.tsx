'use client';

import { useState } from 'react';
import { Coin } from '@/types/coin';
import { useCoins } from '@/hooks/useCoins';
import Header from '@/components/Header';
import StatsBar from '@/components/StatsBar';
import PriceChart from '@/components/PriceChart';
import CoinTable from '@/components/CoinTable';

export default function Home() {
  const { coins, loading, error, lastUpdated, countdown } = useCoins();
  const [selectedCoin, setSelectedCoin] = useState<Coin | null>(null);

  const handleSelectCoin = (coin: Coin) => {
    setSelectedCoin((prev) => (prev?.id === coin.id ? null : coin));
  };

  return (
    <main className="min-h-screen bg-gray-950 px-4 py-6 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <Header
          lastUpdated={lastUpdated}
          countdown={countdown}
          loading={loading}
        />

        {error && (
          <div className="bg-red-900/30 border border-red-800 rounded-lg p-4 mb-6">
            <p className="text-red-400 text-sm">
              Failed to load data: {error}. Retrying...
            </p>
          </div>
        )}

        <StatsBar coins={coins} />

        {selectedCoin && <PriceChart coin={selectedCoin} />}

        <CoinTable
          coins={coins}
          selectedCoinId={selectedCoin?.id || null}
          onSelectCoin={handleSelectCoin}
        />
      </div>
    </main>
  );
}
