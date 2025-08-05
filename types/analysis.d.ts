export interface UserProfile {
  username: string;
  profilePic: string;
  bio: string;
  followers: number;
  following: number;
  isVerified: boolean;
  isBusiness: boolean;
  isProfessional: boolean;
}

export interface ReelMetrics {
  views: number;
  likes: number;
  comments: number;
  shares: number;
  engagementRate: number;
  duration: string;
  postedAt: Date;
  previousMetrics?: {
    views?: number;
    likes?: number;
    comments?: number;
    engagementRate?: number;
  };
}

export type TrendDirection = "up" | "down" | "neutral";

export interface MetricCardData {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend: TrendDirection;
  change?: number;
}

export interface MetricsDashboardProps {
  metrics: ReelMetrics;
  isLoading?: boolean;
}

export interface SentimentAnalysisData {
  overall: {
    positive: number;
    neutral: number;
    negative: number;
  };
  breakdown: {
    positive: number;
    neutral: number;
    negative: number;
  };
  caption: {
    text: string;
    label: string;
    score: number;
  };
}

export type SentimentVariant = "positive" | "negative" | "neutral" | "mixed";

export interface ReelComment {
  id: string;
  text: string;
  username: string;
  likes: number;
  sentiment: SentimentVariant;
  isSpam?: boolean;
}

export type SortKey = "likes" | "sentiment";
export type SortDirection = "asc" | "desc";

export interface HashtagStats {
  tag: string;
  reach: number;
  posts: number;
}
