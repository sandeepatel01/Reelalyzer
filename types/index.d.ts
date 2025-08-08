import { z } from "zod";
import { rawDataSchema } from "@/lib/validation";

export interface Comment {
  text: string;
  likes: number;
  timestamp: string;
  ownerUsername?: string;
}

export interface Owner {
  username: string;
  profilePicUrl: string;
  id: string;
  isVerified?: boolean;
}

export interface ReelMetrics {
  likes: number;
  comments: number;
  views: number;
}

export interface MusicInfo {
  artistName?: string;
  songName?: string;
}

export interface ApifyReelData {
  likeCount?: number;
  likesCount?: number;
  commentCount?: number;
  commentsCount?: number;
  playCount?: number;
  videoPlayCount?: number;
  videoViewCount?: number;
  ownerProfilePicUrl?: string;
}

export interface ReelAnalysisResponse {
  id: string;
  url: string;
  caption?: string;
  metrics: ReelMetrics;
  postedAt: string;
  owner: Owner;
  topComments: Comment[];
  hashtags: string[];
  musicInfo?: MusicInfo;
  cached?: boolean;
}

export type RawReelData = z.infer<typeof rawDataSchema>;
export type RawComment = z.infer<typeof rawDataSchema>["comments"][number];
