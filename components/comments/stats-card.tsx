"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Icons } from "@/components/icons";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: number | string;
  icon?: keyof typeof Icons;
  trend?: "up" | "down" | "neutral";
  change?: number;
  isWarning?: boolean;
  className?: string;
}

export function StatCard({
  title,
  value,
  icon,
  trend,
  change,
  isWarning,
  className,
}: StatCardProps) {
  const Icon = icon ? Icons[icon] : null;

  return (
    <Card className={cn("bg-zinc-900/50 border-zinc-800", className)}>
      <CardHeader className="flex flex-row items-center justify-between p-4">
        <CardTitle className="text-sm font-medium text-zinc-400">
          {title}
        </CardTitle>
        {Icon && (
          <Icon
            className={cn(
              "h-4 w-4",
              isWarning ? "text-orange-500" : "text-[#d87e36]"
            )}
          />
        )}
      </CardHeader>
      <CardContent className="px-4 pb-4">
        <div
          className={cn(
            "text-2xl font-bold",
            isWarning ? "text-orange-500" : "text-white"
          )}
        >
          {value}
        </div>
        {trend && change !== undefined && (
          <p
            className={cn(
              "text-xs mt-1 flex items-center",
              getTrendColor(trend, change)
            )}
          >
            {change > 0 ? "+" : ""}
            {change}% {getTrendIcon(trend)}
          </p>
        )}
      </CardContent>
    </Card>
  );
}

function getTrendColor(
  trend: "up" | "down" | "neutral",
  change: number
): string {
  if (change === 0) return "text-zinc-400";
  return trend === "up"
    ? "text-green-400"
    : trend === "down"
    ? "text-red-400"
    : "text-yellow-400";
}

function getTrendIcon(trend: "up" | "down" | "neutral") {
  switch (trend) {
    case "up":
      return <Icons.arrowUp className="h-3 w-3 ml-1" />;
    case "down":
      return <Icons.arrowDown className="h-3 w-3 ml-1" />;
    default:
      return <Icons.minus className="h-3 w-3 ml-1" />;
  }
}
