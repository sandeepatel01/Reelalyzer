"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Comment } from "@/types/index";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

interface EngagementTrendProps {
  comments: Comment[];
}

export function EngagementTrend({ comments }: EngagementTrendProps) {
  // Group comments by date
  const dailyData = comments.reduce(
    (
      acc: Record<string, { date: string; comments: number; likes: number }>,
      comment
    ) => {
      const date = new Date(comment.timestamp).toLocaleDateString();
      if (!acc[date]) {
        acc[date] = { date, comments: 0, likes: 0 };
      }
      acc[date].comments++;
      acc[date].likes += comment.likes;
      return acc;
    },
    {}
  );

  const chartData = Object.values(dailyData).sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Comment Engagement Trend</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="comments"
                stroke="#8884d8"
                name="Comments"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="likes"
                stroke="#82ca9d"
                name="Total Likes"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
