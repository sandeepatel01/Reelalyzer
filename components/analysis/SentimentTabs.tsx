"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";
import { cn } from "@/lib/utils";
import { SentimentBadge } from "./SentimentBadge";
import { analyzeText } from "@/lib/sentiment";
import { Icons } from "@/components/icons";

type Sentiment = "positive" | "negative" | "neutral";

interface SentimentTabsProps {
  caption: string;
  comments: {
    text: string;
    sentiment: Sentiment;
  }[];
}

export function SentimentTabs({ caption, comments }: SentimentTabsProps) {
  const captionSentiment = analyzeText(caption);

  const sentimentCounts = {
    positive: comments.filter((c) => c.sentiment === "positive").length,
    negative: comments.filter((c) => c.sentiment === "negative").length,
    neutral: comments.filter((c) => c.sentiment === "neutral").length,
  };

  const totalComments = comments.length;
  const sentimentPercentages = {
    positive: Math.round((sentimentCounts.positive / totalComments) * 100),
    negative: Math.round((sentimentCounts.negative / totalComments) * 100),
    neutral: Math.round((sentimentCounts.neutral / totalComments) * 100),
  };

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

  const overallSentiment =
    sentimentPercentages.positive > sentimentPercentages.negative
      ? "positive"
      : sentimentPercentages.negative > sentimentPercentages.positive
      ? "negative"
      : "neutral";

  return (
    <Tabs defaultValue="overview" className="space-y-4">
      <TabsList className="bg-zinc-800 border border-zinc-700 flex flex-wrap">
        <TabsTrigger
          value="overview"
          className="data-[state=active]:bg-[#d87e36] data-[state=active]:text-white flex-1"
        >
          Overview
        </TabsTrigger>
        <TabsTrigger
          value="caption"
          className="data-[state=active]:bg-[#d87e36] data-[state=active]:text-white flex-1"
        >
          Caption
        </TabsTrigger>
        <TabsTrigger
          value="comments"
          className="data-[state=active]:bg-[#d87e36] data-[state=active]:text-white flex-1"
        >
          Comments
        </TabsTrigger>
      </TabsList>

      {/* Overview Tab */}
      <TabsContent value="overview" className="space-y-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Overall Sentiment Card */}
          <Card className="bg-zinc-900/50 border-zinc-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Icons.pieChart className="h-5 w-5 text-[#d87e36]" />
                Overall Sentiment
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-4">
              <SentimentBadge
                sentiment={overallSentiment}
                className="text-lg px-6 py-2"
              />
              <div className="w-full h-[250px] sm:h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={chartData}
                      cx="50%"
                      cy="50%"
                      outerRadius="70%"
                      dataKey="value"
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
                    <Legend verticalAlign="bottom" height={36} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <p className="text-sm text-zinc-400 text-center">
                Based on analysis of {totalComments} comments
              </p>
            </CardContent>
          </Card>

          {/* Sentiment Breakdown Card */}
          <Card className="bg-zinc-900/50 border-zinc-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Icons.barChart className="h-5 w-5 text-[#d87e36]" />
                Sentiment Breakdown
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {chartData.map((item) => (
                <div key={item.name} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="capitalize text-zinc-300">
                      {item.name}
                    </span>
                    <span className="text-zinc-400">{item.value}%</span>
                  </div>
                  <Progress
                    value={item.value}
                    className={cn("h-2 bg-zinc-700", {
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
        <Card className="bg-zinc-900/50 border-zinc-800">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Icons.fileText className="h-5 w-5 text-[#d87e36]" />
              Caption Analysis
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-zinc-800/50 p-4 rounded-lg border border-zinc-700">
              <p className="text-zinc-300 italic">&quot;{caption}&quot;</p>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <SentimentBadge sentiment={captionSentiment} />
              <span className="text-sm text-zinc-400">
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
        <Card className="bg-zinc-900/50 border-zinc-800">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Icons.messageSquare className="h-5 w-5 text-[#d87e36]" />
              Top Comments Sentiment
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {comments.slice(0, 20).map((comment, index) => (
                <div
                  key={index}
                  className="border border-zinc-700 p-3 rounded-lg bg-zinc-800/30 hover:bg-zinc-800/50 transition-colors"
                >
                  <p className="text-sm text-zinc-300 mb-2">
                    &quot;{comment.text}&quot;
                  </p>
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
