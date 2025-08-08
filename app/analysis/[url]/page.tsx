"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { ReelAnalysisResponseUI } from "@/types";
import { analyzeText } from "@/lib/sentiment";
import { formatDistanceToNow } from "date-fns";
import { ErrorAlert } from "@/components/ErrorAlert";
import { HashtagsList } from "@/components/HashtagsList";
import { MetricsCard } from "@/components/MetricsCard";
import { SentimentBadge } from "@/components/SentimentBadge";
import { TopComments } from "@/components/TopComments";
import { UserProfile } from "@/components/UserProfile";
import { WordCloud } from "@/components/WordCloud";
import Loader from "@/components/Loader";

export default function AnalysisPage() {
  const params = useParams();
  const [data, setData] = useState<ReelAnalysisResponseUI | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => (prev < 90 ? prev + 5 : prev));
    }, 500);

    const fetchData = async () => {
      try {
        const decodedUrl = decodeURIComponent(params.url as string);
        const res = await fetch("/api/analyze", {
          method: "POST",
          body: JSON.stringify({ reelUrl: decodedUrl }),
        });

        clearInterval(progressInterval);
        setProgress(100);

        // Small delay for smooth progress completion
        await new Promise((resolve) => setTimeout(resolve, 300));

        const result = await res.json();
        if (result.success) {
          setData(result.data);
        } else {
          setError(result.error || "Failed to analyze reel");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => clearInterval(progressInterval);
  }, [params.url]);

  if (loading) {
    return (
      <div className="container mx-auto p-4 md:p-8 lg:p-12">
        <Loader progress={progress} />
        <div className="text-center mt-6">
          <button
            onClick={() => (window.location.href = "/")}
            className="text-sm text-red-500 hover:underline px-4 py-2 border border-red-200 rounded-lg hover:bg-red-50 transition-colors"
          >
            Cancel Analysis
          </button>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-4 md:p-8 lg:p-12">
        <ErrorAlert error={error} />
        <div className="text-center mt-6">
          <button
            onClick={() => (window.location.href = "/")}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Try Another Reel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1 space-y-6">
          <UserProfile owner={data!.owner} />
          <p className="text-sm text-gray-500">
            Posted {formatDistanceToNow(new Date(data!.postedAt))} ago
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <MetricsCard metrics={data!.metrics} />
          <SentimentBadge sentiment={analyzeText(data!.caption || "")} />
          <HashtagsList hashtags={data!.hashtags} />
        </div>

        <WordCloud comments={data!.topComments} />

        <div className="w-full lg:w-3/4">
          <TopComments comments={data!.topComments} />
        </div>
      </div>
    </div>
  );
}
