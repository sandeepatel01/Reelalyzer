import { z } from "zod";

export const reelInputSchema = z.object({
  reelUrl: z
    .string()
    .url()
    .refine(
      (url) => {
        try {
          const parsed = new URL(url);
          return (
            parsed.hostname.includes("instagram.com") &&
            parsed.pathname.includes("/reel/")
          );
        } catch {
          return false;
        }
      },
      {
        message: "Must be a valid Instagram Reel URL",
      }
    )
    .transform((url) => {
      // Clean URL by removing query parameters
      const parsed = new URL(url);
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
