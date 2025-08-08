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
      value: metrics.likes.toLocaleString(), // Format numbers with commas
      icon: <Icons.heart className="h-4 w-4" />,
    },
    {
      title: "Comments",
      value: metrics.comments.toLocaleString(),
      icon: <Icons.messageCircle className="h-4 w-4" />,
    },
    {
      title: "Views",
      value: metrics.views.toLocaleString(),
      icon: <Icons.eye className="h-4 w-4" />,
    },
    {
      title: "Engagement Rate",
      value: `${engagement.toFixed(2)}%`,
      icon: <Icons.trendingUp className="h-4 w-4" />,
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
}

function MetricCard({ title, value, icon }: MetricCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon && <span className="text-muted-foreground">{icon}</span>}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
      </CardContent>
    </Card>
  );
}
