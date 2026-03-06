'use client';

import { useState, useEffect } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { Coin, ChartData, PricePoint } from '@/types/coin';
import { formatPrice } from '@/lib/format';

interface PriceChartProps {
  coin: Coin;
}

export default function PriceChart({ coin }: PriceChartProps) {
  const [chartData, setChartData] = useState<PricePoint[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function fetchChart() {
      setLoading(true);
      try {
        const res = await fetch(`/api/chart/${coin.id}`);
        if (!res.ok) throw new Error('Failed to fetch chart');
        const data: ChartData = await res.json();
        if (!cancelled && data.prices) {
          const points: PricePoint[] = data.prices.map(([timestamp, price]) => ({
            time: new Date(timestamp).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            }),
            price,
          }));
          setChartData(points);
        }
      } catch (err) {
        console.error('Chart fetch error:', err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchChart();
    return () => {
      cancelled = true;
    };
  }, [coin.id]);

  const isPositive = coin.price_change_percentage_24h >= 0;
  const gradientColor = isPositive ? '#4ade80' : '#f87171';
  const gradientId = `chartGradient-${coin.id}`;

  if (loading) {
    return (
      <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 mb-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-full bg-gray-700 animate-pulse" />
          <div>
            <div className="h-5 w-32 bg-gray-700 rounded animate-pulse mb-1" />
            <div className="h-4 w-20 bg-gray-700 rounded animate-pulse" />
          </div>
        </div>
        <div className="h-[300px] bg-gray-800 rounded animate-pulse" />
      </div>
    );
  }

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={coin.image}
            alt={coin.name}
            width={32}
            height={32}
            className="rounded-full"
          />
          <div>
            <h2 className="text-lg font-semibold text-white">{coin.name}</h2>
            <span className="text-sm text-gray-400 uppercase">
              {coin.symbol}
            </span>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xl font-bold text-white">
            {formatPrice(coin.current_price)}
          </p>
          <p
            className={`text-sm font-medium ${
              isPositive ? 'text-green-400' : 'text-red-400'
            }`}
          >
            {isPositive ? '▲' : '▼'}{' '}
            {Math.abs(coin.price_change_percentage_24h).toFixed(2)}%
          </p>
        </div>
      </div>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={gradientColor} stopOpacity={0.3} />
                <stop
                  offset="100%"
                  stopColor={gradientColor}
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="time"
              stroke="#6b7280"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              interval="preserveStartEnd"
              minTickGap={60}
            />
            <YAxis
              stroke="#6b7280"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(val: number) => formatPrice(val)}
              domain={['auto', 'auto']}
              width={80}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1f2937',
                border: '1px solid #374151',
                borderRadius: '8px',
                color: '#fff',
              }}
              formatter={(value: number) => [formatPrice(value), 'Price']}
              labelStyle={{ color: '#9ca3af' }}
            />
            <Area
              type="monotone"
              dataKey="price"
              stroke={gradientColor}
              strokeWidth={2}
              fill={`url(#${gradientId})`}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
