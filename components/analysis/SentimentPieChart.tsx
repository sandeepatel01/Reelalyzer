"use client";

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

// Define type for color mapping
type SentimentType = "positive" | "neutral" | "negative";

const COLORS: Record<SentimentType, string> = {
  positive: "#10b981",
  neutral: "#f59e0b",
  negative: "#ef4444",
};

// Define type for chart data
interface ChartDataItem {
  name: string;
  value: number;
  type: SentimentType;
  percent?: number;
}

export function SentimentPieChart({
  data,
}: {
  data: { positive: number; neutral: number; negative: number };
}) {
  const chartData: ChartDataItem[] = [
    { name: "Positive", value: data.positive, type: "positive" },
    { name: "Neutral", value: data.neutral, type: "neutral" },
    { name: "Negative", value: data.negative, type: "negative" },
  ];

  return (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            label={({
              name,
              percent = 0,
            }: {
              name: string;
              percent?: number;
            }) => `${name} ${(percent * 100).toFixed(0)}%`}
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[entry.type]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
