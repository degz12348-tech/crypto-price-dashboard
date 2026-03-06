"use client";

import { AreaChart, Area, ResponsiveContainer } from "recharts";

interface SparklineChartProps {
  data: number[];
  positive: boolean;
}

export default function SparklineChart({ data, positive }: SparklineChartProps) {
  const color = positive ? "#22c55e" : "#ef4444";
  const chartData = data.map((price, i) => ({ i, price }));

  return (
    <ResponsiveContainer width="100%" height={60}>
      <AreaChart data={chartData}>
        <defs>
          <linearGradient id={`gradient-${positive}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity={0.3} />
            <stop offset="100%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
        <Area
          type="monotone"
          dataKey="price"
          stroke={color}
          strokeWidth={1.5}
          fill={`url(#gradient-${positive})`}
          isAnimationActive={false}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
