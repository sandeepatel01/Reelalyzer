import { ApifyClient } from "apify-client";
import { unstable_cache } from "next/cache";
import { z } from "zod";
import { ReelAnalysisResponse } from "@/types/index";

// Schema for raw data validation
const rawDataSchema = z.object({
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

let apifyClient: ApifyClient | null = null;

export const getApifyClient = () => {
  if (!apifyClient) {
    const token = process.env.NEXT_PUBLIC_APIFY_TOKEN;
    if (!token) throw new Error("Apify token not configured");
    apifyClient = new ApifyClient({ token });
  }
  return apifyClient;
};

export const analyzeReel = async (reelUrl: string) => {
  const client = getApifyClient();
  const actor = process.env.NEXT_PUBLIC_APIFY_ACTOR;

  if (!actor) throw new Error("Apify actor not configured");

  try {
    const run = await client.actor(actor).call(
      {
        startUrls: [{ url: reelUrl }],
        maxPostComments: 20,
        resultsLimit: 1,
        proxyConfiguration: {
          useApifyProxy: true,
          apifyProxyGroups: ["RESIDENTIAL"],
        },
      },
      {
        timeout: 30000,
      }
    );

    const { items } = await client.dataset(run.defaultDatasetId).listItems();
    const rawData = rawDataSchema.parse(items[0]);

    return transformData(reelUrl, rawData);
  } catch (error) {
    console.error("Apify error:", error);
    throw new Error("Failed to fetch reel data");
  }
};

// Cached version with 1 hour revalidation
export const getCachedReelData = unstable_cache(
  async (reelUrl: string) => {
    const data = await analyzeReel(reelUrl);
    return { ...data, cached: false };
  },
  ["reel-data"],
  { revalidate: 3600 }
);

// Data transformer
const transformData = (
  reelUrl: string,
  rawData: z.infer<typeof rawDataSchema>
): ReelAnalysisResponse => {
  return {
    id: rawData.id || `reel_${Date.now()}`,
    url: reelUrl,
    caption: rawData.caption,
    metrics: {
      likes: rawData.likeCount || 0,
      comments: rawData.commentCount || 0,
      views: rawData.playCount || 0,
    },
    postedAt: rawData.postedAt || new Date().toISOString(),
    owner: rawData.owner
      ? {
          username: rawData.owner.username || "unknown",
          profilePicUrl: rawData.owner.profilePicUrl || "",
        }
      : undefined,
    topComments:
      rawData.comments?.slice(0, 5).map((c) => ({
        text: c.text,
        likes: c.likes || 0,
        timestamp: c.postedAt || new Date().toISOString(),
      })) || [],
    hashtags: rawData.hashtags || [],
  };
};
