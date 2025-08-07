export interface Comment {
  text: string;
  likes: number;
  timestamp: string;
}

export interface Owner {
  username: string;
  profilePicUrl: string;
}

export interface ReelMetrics {
  likes: number;
  comments: number;
  views: number;
}

export interface ReelAnalysisResponse {
  id: string;
  url: string;
  caption?: string;
  metrics: ReelMetrics;
  postedAt: string;
  owner?: Owner;
  topComments: Comment[];
  hashtags: string[];
}

// Raw API data types
export interface RawComment {
  text?: unknown;
  likes?: unknown;
  postedAt?: unknown;
}

export interface RawOwner {
  username?: unknown;
  profilePicUrl?: unknown;
}

export interface RawReelData {
  id?: string;
  caption?: string;
  likeCount?: unknown;
  commentCount?: unknown;
  playCount?: unknown;
  postedAt?: string;
  owner?: RawOwner;
  comments?: unknown[];
  hashtags?: unknown[];
}
