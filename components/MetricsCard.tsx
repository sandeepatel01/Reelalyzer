import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ReelAnalysisResponse } from "@/types/index";

export function MetricsCard({
  metrics,
}: {
  metrics: ReelAnalysisResponse["metrics"];
}) {
  const engagement = ((metrics.likes + metrics.comments) / metrics.views) * 100;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Performance Metrics</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <MetricItem label="Likes" value={metrics.likes} />
        <MetricItem label="Comments" value={metrics.comments} />
        <MetricItem label="Views" value={metrics.views} />
        <MetricItem
          label="Engagement Rate"
          value={`${engagement.toFixed(2)}%`}
        />
      </CardContent>
    </Card>
  );
}

function MetricItem({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div className="flex justify-between">
      <span className="text-gray-600">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}
