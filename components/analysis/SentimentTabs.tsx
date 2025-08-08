"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { cn } from "@/lib/utils";
import { SentimentBadge } from "./SentimentBadge";
import { analyzeText } from "@/lib/sentiment";

type Sentiment = "positive" | "negative" | "neutral";

interface SentimentTabsProps {
  caption: string;
  comments: {
    text: string;
    sentiment: Sentiment;
  }[];
}

export function SentimentTabs({ caption, comments }: SentimentTabsProps) {
  // 1. Analyze caption sentiment
  const captionSentiment = analyzeText(caption);

  // 2. Calculate sentiment breakdown
  const sentimentCounts = {
    positive: comments.filter((c) => c.sentiment === "positive").length,
    negative: comments.filter((c) => c.sentiment === "negative").length,
    neutral: comments.filter((c) => c.sentiment === "neutral").length,
  };

  // 3. Calculate percentages
  const totalComments = comments.length;
  const sentimentPercentages = {
    positive: Math.round((sentimentCounts.positive / totalComments) * 100),
    negative: Math.round((sentimentCounts.negative / totalComments) * 100),
    neutral: Math.round((sentimentCounts.neutral / totalComments) * 100),
  };

  // 4. Prepare chart data
  const chartData = [
    {
      name: "Positive",
      value: sentimentPercentages.positive,
      type: "positive",
    },
    {
      name: "Negative",
      value: sentimentPercentages.negative,
      type: "negative",
    },
    { name: "Neutral", value: sentimentPercentages.neutral, type: "neutral" },
  ];

  // 5. Determine overall sentiment
  const overallSentiment =
    sentimentPercentages.positive > sentimentPercentages.negative
      ? "positive"
      : sentimentPercentages.negative > sentimentPercentages.positive
      ? "negative"
      : "neutral";

  return (
    <Tabs defaultValue="overview" className="space-y-4">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="caption">Caption</TabsTrigger>
        <TabsTrigger value="comments">Comments</TabsTrigger>
      </TabsList>

      {/* Overview Tab */}
      <TabsContent value="overview" className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Overall Sentiment</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-4">
              <SentimentBadge
                sentiment={overallSentiment}
                className="text-lg px-6 py-2"
              />
              <div className="h-[250px] w-full">
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
                      label={({ name, percent = 0 }) =>
                        `${name} ${(percent * 100).toFixed(0)}%`
                      }
                    >
                      {chartData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={
                            entry.type === "positive"
                              ? "#10b981"
                              : entry.type === "negative"
                              ? "#ef4444"
                              : "#f59e0b"
                          }
                        />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Sentiment Breakdown</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {chartData.map((item) => (
                <div key={item.name} className="space-y-2">
                  <div className="flex justify-between">
                    <span className="capitalize">{item.name}</span>
                    <span>{item.value}%</span>
                  </div>
                  <Progress
                    value={item.value}
                    className={cn("h-2", {
                      "[&>div]:bg-green-500": item.type === "positive",
                      "[&>div]:bg-red-500": item.type === "negative",
                      "[&>div]:bg-yellow-500": item.type === "neutral",
                    })}
                  />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </TabsContent>

      {/* Caption Tab */}
      <TabsContent value="caption">
        <Card>
          <CardHeader>
            <CardTitle>Caption Analysis</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-lg italic">&quot;{caption}&quot;</p>
            <div className="flex items-center gap-4">
              <SentimentBadge sentiment={captionSentiment} />
              <span className="text-sm text-gray-500">
                {captionSentiment === "positive" && "Mostly positive tone"}
                {captionSentiment === "negative" && "Mostly negative tone"}
                {captionSentiment === "neutral" && "Neutral or mixed tone"}
              </span>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      {/* Comments Tab */}
      <TabsContent value="comments">
        <Card>
          <CardHeader>
            <CardTitle>Top Comments Sentiment</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {comments.slice(0, 20).map((comment, index) => (
                <div key={index} className="border p-3 rounded-lg">
                  <p className="text-sm mb-2">&quot;{comment.text}&quot;</p>
                  <SentimentBadge
                    sentiment={comment.sentiment}
                    className="text-xs"
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
