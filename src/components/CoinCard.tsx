"use client";

import Image from "next/image";
import type { Coin } from "@/types/coin";
import SparklineChart from "./SparklineChart";

interface CoinCardProps {
  coin: Coin;
  onClick: () => void;
  isSelected: boolean;
}

function formatPrice(price: number): string {
  if (price >= 1) {
    return price.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  }
  return `$${price.toPrecision(4)}`;
}

export default function CoinCard({ coin, onClick, isSelected }: CoinCardProps) {
  const isPositive = coin.price_change_percentage_24h >= 0;
  const changeColor = isPositive ? "text-green-500" : "text-red-500";
  const arrow = isPositive ? "\u25B2" : "\u25BC";

  // Sample sparkline data to reduce points for mini chart
  const sparklineData = coin.sparkline_in_7d?.price ?? [];
  const sampled =
    sparklineData.length > 50
      ? sparklineData.filter(
          (_, i) => i % Math.ceil(sparklineData.length / 50) === 0
        )
      : sparklineData;

  return (
    <button
      onClick={onClick}
      className={`w-full text-left rounded-xl border p-4 transition-all duration-200 hover:border-gray-600 hover:bg-gray-800/50 ${
        isSelected
          ? "border-blue-500 bg-gray-800/70"
          : "border-gray-800 bg-gray-900"
      }`}
    >
      <div className="flex items-center gap-3 mb-3">
        <Image
          src={coin.image}
          alt={coin.name}
          width={32}
          height={32}
          className="rounded-full"
        />
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-white truncate">{coin.name}</h3>
          <span className="text-sm text-gray-400 uppercase">{coin.symbol}</span>
        </div>
        <span className="text-xs text-gray-500 bg-gray-800 px-2 py-0.5 rounded-full">
          #{coin.market_cap_rank}
        </span>
      </div>

      <div className="flex items-end justify-between mb-2">
        <span className="text-xl font-bold text-white">
          {formatPrice(coin.current_price)}
        </span>
        <span className={`text-sm font-medium ${changeColor} flex items-center gap-1`}>
          <span className="text-xs">{arrow}</span>
          {Math.abs(coin.price_change_percentage_24h).toFixed(2)}%
        </span>
      </div>

      {sampled.length > 0 && (
        <SparklineChart data={sampled} positive={isPositive} />
      )}
    </button>
  );
}
