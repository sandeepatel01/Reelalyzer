import { Suspense } from "react";
import { notFound } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { CommentsAnalysis } from "@/components/analysis/CommentsAnalysis";
import { HashtagAnalysis } from "@/components/analysis/HashtagAnalysis";
import { MetricsDashboard } from "@/components/analysis/MetricsDashboard";
import UserProfileCard from "@/components/cards/UserProfileCard";
import { SentimentAnalysisTabs } from "@/components/analysis/SentimentAnalysisTabs";

export default async function AnalysisPage({
  params,
}: {
  params: { url: string };
}) {
  const decodedUrl = decodeURIComponent(params.url);

  if (!decodedUrl.includes("instagram.com/reel/")) {
    return notFound();
  }

  const analysisData = await fetchReelAnalysis(decodedUrl);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Sidebar - User Profile */}
        <div className="lg:col-span-1 space-y-6">
          <Suspense fallback={<Skeleton className="h-[200px] w-full" />}>
            <UserProfileCard user={analysisData.user} />
          </Suspense>
        </div>

        {/* Main Content Area */}
        <div className="lg:col-span-3 space-y-6">
          {/* Metrics Dashboard */}
          <Suspense fallback={<Skeleton className="h-[180px] w-full" />}>
            <MetricsDashboard metrics={analysisData.metrics} />
          </Suspense>

          {/* Sentiment Analysis */}
          <Card>
            <CardContent className="pt-6">
              <Suspense fallback={<Skeleton className="h-[300px] w-full" />}>
                <SentimentAnalysisTabs
                  caption={analysisData.caption}
                  sentiment={analysisData.sentiment}
                />
              </Suspense>
            </CardContent>
          </Card>

          {/* Comments Analysis */}
          <Card>
            <CardContent className="pt-6">
              <Suspense fallback={<Skeleton className="h-[400px] w-full" />}>
                <CommentsAnalysis comments={analysisData.comments} />
              </Suspense>
            </CardContent>
          </Card>

          {/* Hashtag Analysis */}
          <Card>
            <CardContent className="pt-6">
              <Suspense fallback={<Skeleton className="h-[200px] w-full" />}>
                <HashtagAnalysis hashtags={analysisData.hashtags} />
              </Suspense>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
