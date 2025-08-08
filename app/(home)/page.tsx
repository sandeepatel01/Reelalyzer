// app/page.tsx
"use client";
import { useState } from "react";
import { ReelAnalysisResponseUI } from "@/types";
import { analyzeText } from "@/lib/sentiment";
import { formatDistanceToNow } from "date-fns";
import { ErrorAlert } from "@/components/ErrorAlert";
import { HashtagsList } from "@/components/HashtagsList";
import { MetricsCard } from "@/components/MetricsCard";
import { ReelForm } from "@/components/ReelForm";
import { ReelSkeleton } from "@/components/ReelSkeleton";
import { SentimentBadge } from "@/components/SentimentBadge";
import { TopComments } from "@/components/TopComments";
import { UserProfile } from "@/components/UserProfile";
import { WordCloud } from "@/components/WordCloud";

export default function Home() {
  const [data, setData] = useState<ReelAnalysisResponseUI | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (url: string) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        body: JSON.stringify({ reelUrl: url }),
      });
      const result = await res.json();
      if (result.success) setData(result.data);
      else setError(result.error || "Failed to analyze reel");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 md:p-8 lg:p-12">
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6">
        Instagram Reel Analyzer
      </h1>

      <ReelForm onSubmit={handleSubmit} />

      {loading && <ReelSkeleton />}
      {error && <ErrorAlert error={error} />}

      {data && (
        <div className="mt-8 space-y-6">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
            <UserProfile owner={data.owner} />
            <p className="text-sm text-gray-500">
              Posted {formatDistanceToNow(new Date(data.postedAt))} ago
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <MetricsCard metrics={data.metrics} />
            <SentimentBadge sentiment={analyzeText(data.caption || "")} />
            <HashtagsList hashtags={data.hashtags} />
          </div>

          <WordCloud comments={data.topComments} />

          <div className="w-full lg:w-3/4">
            <TopComments comments={data.topComments} />
          </div>
        </div>
      )}
    </div>
  );
}
