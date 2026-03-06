"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface PriceChartProps {
  prices: [number, number][];
}

export default function PriceChart({ prices }: PriceChartProps) {
  const chartData = prices.map(([timestamp, price]) => ({
    date: new Date(timestamp).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    }),
    time: new Date(timestamp).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    }),
    price,
  }));

  const minPrice = Math.min(...prices.map(([, p]) => p));
  const maxPrice = Math.max(...prices.map(([, p]) => p));
  const isPositive = prices[prices.length - 1][1] >= prices[0][1];
  const color = isPositive ? "#22c55e" : "#ef4444";

  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={chartData}>
        <defs>
          <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity={0.3} />
            <stop offset="100%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis
          dataKey="date"
          stroke="#6b7280"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          interval="preserveStartEnd"
        />
        <YAxis
          stroke="#6b7280"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          domain={[minPrice * 0.999, maxPrice * 1.001]}
          tickFormatter={(v: number) =>
            v >= 1 ? `$${v.toLocaleString()}` : `$${v.toPrecision(4)}`
          }
          width={80}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "#1f2937",
            border: "1px solid #374151",
            borderRadius: "8px",
            color: "#f3f4f6",
          }}
          formatter={(value: number) => [
            `$${value.toLocaleString(undefined, { maximumFractionDigits: 6 })}`,
            "Price",
          ]}
          labelFormatter={(_, payload) => {
            if (payload?.[0]?.payload) {
              return `${payload[0].payload.date} ${payload[0].payload.time}`;
            }
            return "";
          }}
        />
        <Area
          type="monotone"
          dataKey="price"
          stroke={color}
          strokeWidth={2}
          fill="url(#chartGradient)"
          isAnimationActive={false}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
