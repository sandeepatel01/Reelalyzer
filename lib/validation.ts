import { z } from "zod";

export const reelInputSchema = z.object({
  reelUrl: z
    .string()
    .url()
    .refine((url) => url.includes("instagram.com/reel/"), {
      message: "Invalid Instagram Reel URL",
    }),
});

export const validateReelInput = (data: unknown) => {
  return reelInputSchema.parse(data);
};
