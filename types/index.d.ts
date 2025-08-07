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

export const rawDataSchema = z.object({
  id: z.string().optional(),
  caption: z.string().optional(),
  likeCount: z.coerce.number().optional(),
  commentCount: z.coerce.number().optional(),
  playCount: z.coerce.number().optional(),
  postedAt: z.string().optional(),
  owner: z
    .object({
      username: z.string().optional(),
      profilePicUrl: z.string().url().optional(),
    })
    .optional(),
  comments: z
    .array(
      z.object({
        text: z.string(),
        likes: z.coerce.number().optional(),
        postedAt: z.string().optional(),
      })
    )
    .optional(),
  hashtags: z.array(z.string()).optional(),
});
