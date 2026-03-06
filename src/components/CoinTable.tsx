'use client';

import Image from 'next/image';
import { Coin } from '@/types/coin';
import { formatPrice, formatMarketCap, formatVolume } from '@/lib/format';
import ChangeIndicator from './ChangeIndicator';
import SparklineChart from './SparklineChart';

interface CoinTableProps {
  coins: Coin[];
  selectedCoinId: string | null;
  onSelectCoin: (coin: Coin) => void;
}

function TableSkeleton() {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden">
      <div className="p-4">
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className="flex items-center gap-4 py-3 border-b border-gray-800 last:border-0"
          >
            <div className="w-6 h-4 bg-gray-700 rounded animate-pulse" />
            <div className="w-8 h-8 bg-gray-700 rounded-full animate-pulse" />
            <div className="flex-1">
              <div className="h-4 w-24 bg-gray-700 rounded animate-pulse mb-1" />
              <div className="h-3 w-12 bg-gray-700 rounded animate-pulse" />
            </div>
            <div className="h-4 w-20 bg-gray-700 rounded animate-pulse" />
            <div className="h-4 w-16 bg-gray-700 rounded animate-pulse" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function CoinTable({
  coins,
  selectedCoinId,
  onSelectCoin,
}: CoinTableProps) {
  if (coins.length === 0) {
    return <TableSkeleton />;
  }

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-800 text-gray-400 text-sm">
              <th className="text-left py-3 px-4 font-medium">#</th>
              <th className="text-left py-3 px-4 font-medium">Coin</th>
              <th className="text-right py-3 px-4 font-medium">Price</th>
              <th className="text-right py-3 px-4 font-medium">24h</th>
              <th className="text-right py-3 px-4 font-medium hidden md:table-cell">
                Market Cap
              </th>
              <th className="text-right py-3 px-4 font-medium hidden md:table-cell">
                Volume
              </th>
              <th className="text-right py-3 px-4 font-medium hidden sm:table-cell">
                7d
              </th>
            </tr>
          </thead>
          <tbody>
            {coins.map((coin) => {
              const isSelected = selectedCoinId === coin.id;
              return (
                <tr
                  key={coin.id}
                  onClick={() => onSelectCoin(coin)}
                  className={`border-b border-gray-800 last:border-0 cursor-pointer transition-colors hover:bg-gray-800/50 ${
                    isSelected ? 'bg-gray-800' : ''
                  }`}
                >
                  <td className="py-3 px-4 text-gray-400 text-sm">
                    {coin.market_cap_rank}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <Image
                        src={coin.image}
                        alt={coin.name}
                        width={28}
                        height={28}
                        className="rounded-full"
                      />
                      <div>
                        <p className="font-medium text-white text-sm">
                          {coin.name}
                        </p>
                        <p className="text-xs text-gray-400 uppercase">
                          {coin.symbol}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-right text-white text-sm font-medium">
                    {formatPrice(coin.current_price)}
                  </td>
                  <td className="py-3 px-4 text-right text-sm">
                    <ChangeIndicator
                      change={coin.price_change_percentage_24h}
                    />
                  </td>
                  <td className="py-3 px-4 text-right text-gray-300 text-sm hidden md:table-cell">
                    {formatMarketCap(coin.market_cap)}
                  </td>
                  <td className="py-3 px-4 text-right text-gray-300 text-sm hidden md:table-cell">
                    {formatVolume(coin.total_volume)}
                  </td>
                  <td className="py-3 px-4 text-right hidden sm:table-cell">
                    <SparklineChart
                      data={coin.sparkline_in_7d?.price || []}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
