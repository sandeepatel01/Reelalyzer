import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getTrendColor } from "@/lib/metricsHelper";
import { MetricCardData } from "@/types/analysis";

interface MetricCardProps {
  metric: MetricCardData;
}

export const MetricCard: React.FC<MetricCardProps> = ({ metric }) => {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
        <span className="text-muted-foreground">{metric.icon}</span>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{metric.value}</div>
        <p className="text-xs text-muted-foreground mt-1">
          <span className={getTrendColor(metric.trend)}>
            {metric.change > 0 ? "+" : ""}
            {metric.change}% vs previous
          </span>
        </p>
      </CardContent>
    </Card>
  );
};
