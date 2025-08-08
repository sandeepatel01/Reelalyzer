import { z } from "zod";

export const reelInputSchema = z.object({
  reelUrl: z
    .string()
    .url()
    .refine(
      (url) => {
        try {
          const parsed = new URL(url);
          return parsed.hostname.includes("instagram.com");
        } catch {
          return false;
        }
      },
      {
        message: "Must be a valid Instagram Reel or Post URL",
      }
    )
    .transform((url) => {
      // Clean URL by removing query parameters
      const parsed = new URL(url);
      if (parsed.hostname === "instagram.com") {
        return `https://www.instagram.com${parsed.pathname}`;
      }
      return `${parsed.origin}${parsed.pathname}`;
    }),
});

export const validateReelInput = (data: unknown) => {
  return reelInputSchema.parse(data);
};

export const rawDataSchema = z.object({
  id: z.string().optional(),
  caption: z.string().optional(),
  likeCount: z.coerce.number().optional(),
  likesCount: z.coerce.number().optional(),
  commentCount: z.coerce.number().optional(),
  commentsCount: z.coerce.number().optional(),
  playCount: z.coerce.number().optional(),
  videoViewCount: z.coerce.number().optional(),
  videoPlayCount: z.coerce.number().optional(),
  postedAt: z.string().optional(),
  timestamp: z.string().optional(),
  ownerUsername: z.string().optional(),
  ownerProfilePicUrl: z.string().url().optional(),
  ownerId: z.string().optional(),
  owner: z
    .object({
      username: z.string().optional(),
      profilePicUrl: z.string().url().optional(),
      id: z.string().optional(),
      is_verified: z.boolean().optional(),
    })
    .optional(),
  comments: z
    .array(
      z.object({
        text: z.string(),
        likes: z.coerce.number().optional(),
        likesCount: z.coerce.number().optional(),
        postedAt: z.string().optional(),
        timestamp: z.string().optional(),
        ownerUsername: z.string().optional(),
      })
    )
    .optional(),
  latestComments: z.array(z.any()).optional(),
  hashtags: z.array(z.string()).optional(),
  musicInfo: z
    .object({
      artist_name: z.string().optional(),
      song_name: z.string().optional(),
    })
    .optional(),
});
