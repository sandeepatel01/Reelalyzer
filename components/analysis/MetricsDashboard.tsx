import React from "react";
import { MetricsSkeletonLoader } from "./SkeletonLoader";
import { generateCardMetrics } from "@/lib/helper";
import { MetricsDashboardProps } from "@/types/analysis";
import { MetricCard } from "../cards/MetricCard";

export const MetricsDashboard: React.FC<MetricsDashboardProps> = ({
  metrics,
  isLoading = false,
}) => {
  const cardMetrics = React.useMemo(
    () => generateCardMetrics(metrics),
    [metrics]
  );

  if (isLoading) {
    return <MetricsSkeletonLoader />;
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {cardMetrics.map((metric) => (
        <MetricCard key={metric.title} metric={metric} />
      ))}
    </div>
  );
};
