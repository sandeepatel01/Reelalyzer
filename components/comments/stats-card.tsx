"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Icons } from "@/components/icons";

interface StatCardProps {
  title: string;
  value: number | string;
  icon?: keyof typeof Icons;
  trend?: "up" | "down" | "neutral";
  change?: number;
  isWarning?: boolean;
}

export function StatCard({
  title,
  value,
  icon,
  trend,
  change,
  isWarning,
}: StatCardProps) {
  const Icon = icon ? Icons[icon] : null;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {Icon && <Icon className="h-4 w-4 text-muted-foreground" />}
      </CardHeader>
      <CardContent>
        <div
          className={`text-2xl font-bold ${isWarning ? "text-orange-500" : ""}`}
        >
          {value}
        </div>
        {trend && change !== undefined && (
          <p className={`text-xs mt-1 ${getTrendColor(trend)}`}>
            {change > 0 ? "+" : ""}
            {change}% {trend === "up" ? "↑" : trend === "down" ? "↓" : "→"}
          </p>
        )}
      </CardContent>
    </Card>
  );
}

function getTrendColor(trend: "up" | "down" | "neutral"): string {
  switch (trend) {
    case "up":
      return "text-green-500";
    case "down":
      return "text-red-500";
    default:
      return "text-yellow-500";
  }
}
