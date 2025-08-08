import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ReelAnalysisResponseUI } from "@/types/index";
import { Icons } from "@/components/icons";
import React from "react";

export function MetricsDashboard({
  metrics,
}: {
  metrics: ReelAnalysisResponseUI["metrics"];
}) {
  const engagement = ((metrics.likes + metrics.comments) / metrics.views) * 100;

  const cardMetrics = [
    {
      title: "Likes",
      value: metrics.likes.toLocaleString(),
      icon: <Icons.heart className="h-4 w-4 text-[#d87e36]" />,
    },
    {
      title: "Comments",
      value: metrics.comments.toLocaleString(),
      icon: <Icons.messageCircle className="h-4 w-4 text-[#d87e36]" />,
    },
    {
      title: "Views",
      value: metrics.views.toLocaleString(),
      icon: <Icons.eye className="h-4 w-4 text-[#d87e36]" />,
    },
    {
      title: "Engagement Rate",
      value: `${engagement.toFixed(2)}%`,
      icon: <Icons.trendingUp className="h-4 w-4 text-[#d87e36]" />,
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {cardMetrics.map((metric) => (
        <MetricCard
          key={metric.title}
          title={metric.title}
          value={metric.value}
          icon={metric.icon}
        />
      ))}
    </div>
  );
}

interface MetricCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  trend?: "up" | "down" | "neutral";
}

function MetricCard({ title, value, icon, trend }: MetricCardProps) {
  return (
    <Card className="bg-zinc-900/50 border-zinc-800 hover:border-[#d87e36]/50 transition-colors">
      <CardHeader className="flex flex-row items-center justify-between p-4 pb-2 space-y-0">
        <CardTitle className="text-sm font-medium text-zinc-300">
          {title}
        </CardTitle>
        <div className="flex items-center gap-1">
          {trend === "up" && (
            <Icons.trendingUp className="h-3 w-3 text-green-500" />
          )}
          {trend === "down" && (
            <Icons.trendingDown className="h-3 w-3 text-red-500" />
          )}
          {icon}
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="text-2xl font-bold text-white">{value}</div>
      </CardContent>
    </Card>
  );
}
