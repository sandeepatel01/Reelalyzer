"use client";

import { Comment } from "@/types/index";
import { StatCard } from "@/components/comments/stats-card";
import { TopComments } from "@/components/comments/top-comments";
import { SpamComments } from "@/components/comments/spam-comments";
import { EngagementTrend } from "@/components/comments/engagement-trend";
import { WordCloud } from "@/components/comments/word-cloud";
import { getCommentStats } from "@/lib/comment-utils";

interface CommentAnalysisProps {
  comments: Comment[];
}

export function CommentAnalysis({ comments }: CommentAnalysisProps) {
  const stats = getCommentStats(comments);

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Comments"
          value={stats.totalComments}
          icon="messageCircle"
        />
        <StatCard title="Avg Likes" value={stats.avgLikes} icon="thumbsUp" />
        <StatCard title="Avg Length" value={stats.avgLength} icon="type" />
        <StatCard
          title="Spam Comments"
          value={stats.spamCount}
          icon="alertTriangle"
          isWarning
        />
        <StatCard
          title="Positive"
          value={`${stats.positivePercent}%`}
          icon="smile"
          trend="up"
        />
        <StatCard
          title="Negative"
          value={`${stats.negativePercent}%`}
          icon="frown"
          trend={stats.negativePercent > 20 ? "down" : "neutral"}
        />
      </div>

      {/* Main Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TopComments comments={comments} />
        <SpamComments comments={comments} />
      </div>

      <EngagementTrend comments={comments} />
      <WordCloud comments={comments} />
    </div>
  );
}
