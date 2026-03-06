"use client";

import Image from "next/image";
import type { Coin } from "@/types/coin";
import { useCoinChart } from "@/hooks/useCoinChart";
import PriceChart from "./PriceChart";

interface CoinDetailProps {
  coin: Coin;
  onClose: () => void;
}

function formatLargeNumber(num: number): string {
  if (num >= 1e12) return `$${(num / 1e12).toFixed(2)}T`;
  if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`;
  if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`;
  return `$${num.toLocaleString()}`;
}

export default function CoinDetail({ coin, onClose }: CoinDetailProps) {
  const { chartData, isLoading } = useCoinChart(coin.id);
  const isPositive = coin.price_change_percentage_24h >= 0;

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Image
            src={coin.image}
            alt={coin.name}
            width={40}
            height={40}
            className="rounded-full"
          />
          <div>
            <h2 className="text-2xl font-bold text-white">{coin.name}</h2>
            <span className="text-gray-400 uppercase">{coin.symbol}</span>
          </div>
        </div>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-gray-800 rounded-lg"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      <div className="mb-6">
        {isLoading ? (
          <div className="h-[300px] bg-gray-800 rounded-lg animate-pulse" />
        ) : chartData?.prices ? (
          <PriceChart prices={chartData.prices} />
        ) : (
          <div className="h-[300px] flex items-center justify-center text-gray-500">
            Unable to load chart data
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-gray-800 rounded-lg p-3">
          <span className="text-xs text-gray-400 block mb-1">Price</span>
          <span className="text-white font-semibold">
            ${coin.current_price.toLocaleString(undefined, { maximumFractionDigits: 6 })}
          </span>
        </div>
        <div className="bg-gray-800 rounded-lg p-3">
          <span className="text-xs text-gray-400 block mb-1">24h Change</span>
          <span
            className={`font-semibold ${isPositive ? "text-green-500" : "text-red-500"}`}
          >
            {isPositive ? "+" : ""}
            {coin.price_change_percentage_24h.toFixed(2)}%
          </span>
        </div>
        <div className="bg-gray-800 rounded-lg p-3">
          <span className="text-xs text-gray-400 block mb-1">Market Cap</span>
          <span className="text-white font-semibold">
            {formatLargeNumber(coin.market_cap)}
          </span>
        </div>
        <div className="bg-gray-800 rounded-lg p-3">
          <span className="text-xs text-gray-400 block mb-1">Volume (24h)</span>
          <span className="text-white font-semibold">
            {formatLargeNumber(coin.total_volume)}
          </span>
        </div>
      </div>
    </div>
  );
}
