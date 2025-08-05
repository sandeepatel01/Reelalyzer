// utils.ts
import { Icons } from "@/components/icons";
import { MetricCardData, ReelMetrics, TrendDirection } from "@/types/analysis";

export const formatLargeNumber = (num: number): string => {
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M`;
  }
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}K`;
  }
  return num.toString();
};

export const calculateChange = (current: number, previous?: number): number => {
  if (!previous || previous === 0) return 0;
  return parseFloat((((current - previous) / previous) * 100).toFixed(1));
};

export const determineTrend = (change: number): TrendDirection => {
  if (change > 0) return "up";
  if (change < 0) return "down";
  return "neutral";
};

export const getTrendColor = (trend: TrendDirection): string => {
  switch (trend) {
    case "up":
      return "text-green-500 dark:text-green-400";
    case "down":
      return "text-red-500 dark:text-red-400";
    default:
      return "text-yellow-500 dark:text-yellow-400";
  }
};

export const generateCardMetrics = (metrics: ReelMetrics): MetricCardData[] => {
  return [
    {
      title: "Views",
      value: formatLargeNumber(metrics.views),
      icon: <Icons.eye className="h-4 w-4" />,
      change: calculateChange(metrics.views, metrics.previousMetrics?.views),
      trend: determineTrend(
        calculateChange(metrics.views, metrics.previousMetrics?.views)
      ),
    },
    {
      title: "Engagement Rate",
      value: `${metrics.engagementRate.toFixed(1)}%`,
      icon: <Icons.trendingUp className="h-4 w-4" />,
      change: calculateChange(
        metrics.engagementRate,
        metrics.previousMetrics?.engagementRate
      ),
      trend: determineTrend(
        calculateChange(
          metrics.engagementRate,
          metrics.previousMetrics?.engagementRate
        )
      ),
    },
    {
      title: "Likes",
      value: formatLargeNumber(metrics.likes),
      icon: <Icons.heart className="h-4 w-4" />,
      change: calculateChange(metrics.likes, metrics.previousMetrics?.likes),
      trend: determineTrend(
        calculateChange(metrics.likes, metrics.previousMetrics?.likes)
      ),
    },
    {
      title: "Comments",
      value: formatLargeNumber(metrics.comments),
      icon: <Icons.messageCircle className="h-4 w-4" />,
      change: calculateChange(
        metrics.comments,
        metrics.previousMetrics?.comments
      ),
      trend: determineTrend(
        calculateChange(metrics.comments, metrics.previousMetrics?.comments)
      ),
    },
  ];
};
