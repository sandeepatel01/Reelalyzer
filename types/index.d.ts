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
  cached?: boolean;
}

// Raw API data types
export type RawReelData = z.infer<typeof rawDataSchema>;
export type RawComment = z.infer<typeof rawDataSchema>["comments"][number];
