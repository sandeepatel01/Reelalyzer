"use client";

import { Comment } from "@/types/index";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts";

interface EngagementTrendProps {
  comments: Comment[];
}

export function EngagementTrend({ comments }: EngagementTrendProps) {
  // Group comments by date (improved for mobile)
  const dailyData = comments.reduce(
    (
      acc: Record<string, { date: string; comments: number; likes: number }>,
      comment
    ) => {
      const date = new Date(comment.timestamp);
      const dateStr = date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });

      if (!acc[dateStr]) {
        acc[dateStr] = { date: dateStr, comments: 0, likes: 0 };
      }
      acc[dateStr].comments++;
      acc[dateStr].likes += comment.likes;
      return acc;
    },
    {}
  );

  const chartData = Object.values(dailyData).sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#3f3f46" />
          <XAxis dataKey="date" stroke="#a1a1aa" tick={{ fontSize: 12 }} />
          <YAxis stroke="#a1a1aa" tick={{ fontSize: 12 }} />
          <Tooltip
            contentStyle={{
              backgroundColor: "#18181b",
              borderColor: "#3f3f46",
              borderRadius: "0.5rem",
            }}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="comments"
            stroke="#d87e36"
            name="Comments"
            strokeWidth={2}
            dot={{ r: 3 }}
            activeDot={{ r: 5 }}
          />
          <Line
            type="monotone"
            dataKey="likes"
            stroke="#8884d8"
            name="Total Likes"
            strokeWidth={2}
            dot={{ r: 3 }}
            activeDot={{ r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
