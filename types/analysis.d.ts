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
  value: string;
  icon: React.ReactNode;
  trend: TrendDirection;
  change: number;
}

export interface MetricsDashboardProps {
  metrics: ReelMetrics;
  isLoading?: boolean;
}
