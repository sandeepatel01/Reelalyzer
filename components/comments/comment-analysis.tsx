"use client";

import { Comment } from "@/types/index";
import { StatCard } from "@/components/comments/stats-card";
import { TopComments } from "@/components/comments/top-comments";
import { SpamComments } from "@/components/comments/spam-comments";
import { EngagementTrend } from "@/components/comments/engagement-trend";
import { WordCloud } from "@/components/comments/word-cloud";
import { getCommentStats } from "@/lib/comment-utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Icons } from "@/components/icons";

interface CommentAnalysisProps {
  comments: Comment[];
}

export function CommentAnalysis({ comments }: CommentAnalysisProps) {
  const stats = getCommentStats(comments);

  return (
    <div className="space-y-6">
      {/* Stats Overview - Improved with consistent colors */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        <StatCard
          title="Total Comments"
          value={stats.totalComments}
          icon="messageCircle"
          className="bg-zinc-900/50 border-zinc-800"
        />
        <StatCard
          title="Avg Likes"
          value={stats.avgLikes}
          icon="thumbsUp"
          className="bg-zinc-900/50 border-zinc-800"
        />
        <StatCard
          title="Avg Length"
          value={stats.avgLength}
          icon="type"
          className="bg-zinc-900/50 border-zinc-800"
        />
        <StatCard
          title="Spam Comments"
          value={stats.spamCount}
          icon="alertTriangle"
          isWarning
          className="bg-zinc-900/50 border-zinc-800"
        />
        <StatCard
          title="Positive"
          value={`${stats.positivePercent}%`}
          icon="smile"
          trend="up"
          className="bg-zinc-900/50 border-zinc-800"
        />
        <StatCard
          title="Negative"
          value={`${stats.negativePercent}%`}
          icon="frown"
          trend={stats.negativePercent > 20 ? "down" : "neutral"}
          className="bg-zinc-900/50 border-zinc-800"
        />
      </div>

      {/* Main Analysis - Better grid layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <TopComments comments={comments} />
        <SpamComments comments={comments} />
      </div>

      {/* Engagement Trend - Improved styling */}
      <Card className="bg-zinc-900/50 border-zinc-800">
        <CardHeader className="border-b border-zinc-800">
          <CardTitle className="flex items-center gap-2 text-white">
            <Icons.trendingUp className="h-5 w-5 text-[#d87e36]" />
            Engagement Trend
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <EngagementTrend comments={comments} />
        </CardContent>
      </Card>

      {/* Word Cloud - Better responsive behavior */}
      <Card className="bg-zinc-900/50 border-zinc-800">
        <CardHeader className="border-b border-zinc-800">
          <CardTitle className="flex items-center gap-2 text-white">
            <Icons.cloud className="h-5 w-5 text-[#d87e36]" />
            Most Used Words
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <WordCloud comments={comments} />
        </CardContent>
      </Card>
    </div>
  );
}
