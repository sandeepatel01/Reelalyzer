"use client";
import { Suspense, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ReelAnalysisResponseUI } from "@/types";
import { analyzeText } from "@/lib/sentiment";
import { formatDistanceToNow } from "date-fns";
import { ErrorAlert } from "@/components/ErrorAlert";
import { HashtagsList } from "@/components/analysis/HashtagsList";
import { MetricsDashboard } from "@/components/analysis/MetricsDashboard";
import { UserProfile } from "@/components/analysis/UserProfile";
import Loader from "@/components/Loader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { SentimentTabs } from "@/components/analysis/SentimentTabs";
import { CommentAnalysis } from "@/components/comments/comment-analysis";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";

export default function AnalysisPage() {
  const params = useParams();
  const router = useRouter();
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
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-24">
        <div className="max-w-3xl mx-auto text-center">
          <Loader progress={progress} />
          <h3 className="mt-6 text-lg font-medium text-white">
            Analyzing your reel...
          </h3>
          <p className="mt-2 text-sm text-zinc-400">
            This may take a few moments
          </p>
          <Button
            onClick={() => router.push("/")}
            variant="outline"
            className="mt-6 border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white"
          >
            <Icons.arrowLeft className="mr-2 h-4 w-4" />
            Cancel Analysis
          </Button>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-24">
        <div className="max-w-3xl mx-auto">
          <ErrorAlert error={error} dismissible={false} />
          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              onClick={() => router.push("/")}
              className="bg-[#d87e36] hover:bg-[#b3692d]"
            >
              Try Another Reel
            </Button>
            <Button
              variant="outline"
              onClick={() => window.location.reload()}
              className="border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white"
            >
              Retry Analysis
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-8 pt-24">
      {/* Back button for mobile */}
      <div className="lg:hidden mb-6">
        <Button
          onClick={() => router.push("/")}
          variant="ghost"
          size="sm"
          className="text-zinc-400 hover:text-white"
        >
          <Icons.arrowLeft className="mr-2 h-4 w-4" />
          Back to analyzer
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left sidebar - Profile info */}
        <div className="lg:col-span-1 space-y-6">
          <UserProfile owner={data!.owner} />
          <Card className="bg-zinc-900/50 border-zinc-800">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 text-sm text-zinc-400">
                <Icons.calendar className="h-4 w-4" />
                <span>
                  Posted {formatDistanceToNow(new Date(data!.postedAt))} ago
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Hashtags moved here for better mobile layout */}
          <div className="lg:hidden">
            <HashtagsList hashtags={data!.hashtags} />
          </div>
        </div>

        {/* Main content area */}
        <div className="lg:col-span-3 space-y-6">
          {/* Metrics Dashboard */}
          <Suspense
            fallback={<Skeleton className="h-[180px] w-full rounded-xl" />}
          >
            <MetricsDashboard metrics={data!.metrics} />
          </Suspense>

          {/* Sentiment Analysis */}
          <Card className="bg-zinc-900/50 border-zinc-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Icons.sentiment className="h-5 w-5 text-[#d87e36]" />
                Sentiment Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Suspense
                fallback={<Skeleton className="h-[300px] w-full rounded-xl" />}
              >
                <SentimentTabs
                  caption={data!.caption || ""}
                  comments={data!.topComments.map((c) => ({
                    text: c.text,
                    sentiment: analyzeText(c.text),
                  }))}
                />
              </Suspense>
            </CardContent>
          </Card>

          {/* Comments Analysis */}
          <Card className="bg-zinc-900/50 border-zinc-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Icons.messageSquare className="h-5 w-5 text-[#d87e36]" />
                Top Comments Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Suspense
                fallback={<Skeleton className="h-[400px] w-full rounded-xl" />}
              >
                <CommentAnalysis comments={data!.topComments} />
              </Suspense>
            </CardContent>
          </Card>

          {/* Hashtags (desktop version) */}
          <div className="hidden lg:block">
            <HashtagsList hashtags={data!.hashtags} />
          </div>
        </div>
      </div>
    </div>
  );
}
