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
