'use client';

import { Coin } from '@/types/coin';
import { formatMarketCap } from '@/lib/format';

interface StatsBarProps {
  coins: Coin[];
}

export default function StatsBar({ coins }: StatsBarProps) {
  if (coins.length === 0) return null;

  const totalMarketCap = coins.reduce((sum, coin) => sum + coin.market_cap, 0);

  const bestPerformer = coins.reduce((best, coin) =>
    coin.price_change_percentage_24h > best.price_change_percentage_24h
      ? coin
      : best
  );

  const worstPerformer = coins.reduce((worst, coin) =>
    coin.price_change_percentage_24h < worst.price_change_percentage_24h
      ? coin
      : worst
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
      <div className="bg-gray-900 border border-gray-800 rounded-lg p-4">
        <p className="text-sm text-gray-400 mb-1">Total Market Cap</p>
        <p className="text-lg font-semibold text-white">
          {formatMarketCap(totalMarketCap)}
        </p>
      </div>
      <div className="bg-gray-900 border border-gray-800 rounded-lg p-4">
        <p className="text-sm text-gray-400 mb-1">Best Performer (24h)</p>
        <div className="flex items-center gap-2">
          <p className="text-lg font-semibold text-green-400">
            {bestPerformer.symbol.toUpperCase()}
          </p>
          <span className="text-sm text-green-400">
            +{bestPerformer.price_change_percentage_24h.toFixed(2)}%
          </span>
        </div>
      </div>
      <div className="bg-gray-900 border border-gray-800 rounded-lg p-4">
        <p className="text-sm text-gray-400 mb-1">Worst Performer (24h)</p>
        <div className="flex items-center gap-2">
          <p className="text-lg font-semibold text-red-400">
            {worstPerformer.symbol.toUpperCase()}
          </p>
          <span className="text-sm text-red-400">
            {worstPerformer.price_change_percentage_24h.toFixed(2)}%
          </span>
        </div>
      </div>
    </div>
  );
}
