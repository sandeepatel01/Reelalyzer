import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type Sentiment = "positive" | "negative" | "neutral";

export function SentimentBadge({
  sentiment,
  className,
}: {
  sentiment: Sentiment;
  className?: string;
}) {
  const sentimentConfig = {
    positive: {
      label: "Positive",
      color: "bg-green-500 hover:bg-green-600",
    },
    negative: {
      label: "Negative",
      color: "bg-red-500 hover:bg-red-600",
    },
    neutral: {
      label: "Neutral",
      color: "bg-gray-500 hover:bg-gray-600",
    },
  };

  return (
    <Badge
      className={cn(
        "text-white font-medium",
        sentimentConfig[sentiment].color,
        className
      )}
    >
      {sentimentConfig[sentiment].label}
    </Badge>
  );
}
