'use client';

import { LineChart, Line, ResponsiveContainer } from 'recharts';

interface SparklineChartProps {
  data: number[];
}

export default function SparklineChart({ data }: SparklineChartProps) {
  if (!data || data.length === 0) return null;

  const isUp = data[data.length - 1] >= data[0];
  const chartData = data.map((price) => ({ price }));

  return (
    <div className="w-[100px] h-[40px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <Line
            type="monotone"
            dataKey="price"
            stroke={isUp ? '#4ade80' : '#f87171'}
            strokeWidth={1.5}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
