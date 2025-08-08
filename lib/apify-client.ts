import { ApifyClient } from "apify-client";
import { unstable_cache } from "next/cache";
import { z } from "zod";
import { ApifyReelData, RawComment, ReelAnalysisResponse } from "@/types/index";
import { rawDataSchema } from "./validation";

let apifyClient: ApifyClient | null = null;

export const getApifyClient = () => {
  if (!apifyClient) {
    const token = process.env.APIFY_TOKEN;
    if (!token) throw new Error("Apify token not configured");
    apifyClient = new ApifyClient({
      token,
      timeoutSecs: 60,
    });
  }
  return apifyClient;
};

export const analyzeReel = async (reelUrl: string) => {
  const client = getApifyClient();
  const actor = process.env.APIFY_ACTOR;

  if (!actor) throw new Error("Apify actor not configured");

  try {
    console.log("Starting Apify call for URL:", reelUrl);

    let parsed: URL;
    try {
      parsed = new URL(reelUrl);
    } catch (err) {
      console.error("Invalid URL passed to analyzeReel: ", err);
      throw new Error("Invalid URL passed to analyzeReel: " + String(reelUrl));
    }

    // Standardize URL format
    const cleanUrl = `${parsed.protocol}//${parsed.hostname}${parsed.pathname}`;

    const apifyPattern = /^https:\/\/(www\.)?instagram\.com\/.+/i;
    if (!apifyPattern.test(cleanUrl)) {
      throw new Error(
        `cleanUrl does not match Apify pattern: ${cleanUrl}. Expected https://(www.)?instagram.com/...`
      );
    }

    const payload = {
      directUrls: [cleanUrl],
      maxPostComments: 20,
      resultsLimit: 1,
      proxyConfiguration: {
        useApifyProxy: true,
        apifyProxyGroups: ["SHADER", "RESIDENTIAL"],
      },
      resultsType: "posts",
      searchType: "hashtag",
      extendOutputFunction: (data: ApifyReelData) => ({
        ...data,
        likeCount: data.likeCount || 0,
        commentCount: data.commentCount || 0,
        playCount: data.playCount || data.videoPlayCount || 0,
      }),
    };

    console.log("Calling Apify actor with payload:", JSON.stringify(payload));

    const run = await client.actor(actor).call(payload, {
      timeout: 60000,
    });

    console.log("Apify run completed, fetching dataset items");
    const { items } = await client.dataset(run.defaultDatasetId).listItems();

    if (!items || items.length === 0) {
      throw new Error("No data returned from Apify");
    }

    console.log("Raw API response:", JSON.stringify(items[0], null, 2));
    const rawData = rawDataSchema.parse(items[0]);

    return transformData(cleanUrl, rawData);
  } catch (error) {
    console.error("Apify error details:", {
      error,
      message: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : "No stack trace",
    });
    throw new Error(
      `Failed to fetch reel data: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
};

export const getCachedReelData = unstable_cache(
  async (reelUrl: string) => {
    const data = await analyzeReel(reelUrl);
    return { ...data, cached: true };
  },
  ["reel-data"],
  { revalidate: 3600 }
);

const transformData = (
  reelUrl: string,
  rawData: z.infer<typeof rawDataSchema>
): ReelAnalysisResponse => {
  // Combine all available comments
  const allComments = [
    ...(rawData.comments || []),
    ...(rawData.latestComments || []),
  ];

  return {
    id: rawData.id || `reel_${Date.now()}`,
    url: reelUrl,
    caption: rawData.caption,
    metrics: {
      likes: rawData.likesCount || rawData.likeCount || 0,
      comments: rawData.commentsCount || rawData.commentCount || 0,
      views:
        rawData.videoPlayCount ||
        rawData.playCount ||
        rawData.videoViewCount ||
        0,
    },
    postedAt: rawData.timestamp || rawData.postedAt || new Date().toISOString(),
    owner: {
      username: rawData.ownerUsername || rawData.owner?.username || "unknown",
      profilePicUrl:
        rawData.ownerProfilePicUrl || rawData.owner?.profilePicUrl || "",
      id: rawData.ownerId || rawData.owner?.id || "",
      isVerified: rawData.owner?.is_verified || false,
    },
    topComments: allComments.slice(0, 5).map((c: RawComment) => ({
      id: c.id || `comment_${Math.random().toString(36).substring(2, 9)}`,
      text: c.text,
      likes: c.likes || c.likesCount || 0,
      timestamp: c.timestamp || c.postedAt || new Date().toISOString(),
      ownerUsername: c.ownerUsername || "",
    })),
    hashtags: rawData.hashtags || [],
    musicInfo: rawData.musicInfo
      ? {
          artistName: rawData.musicInfo.artist_name,
          songName: rawData.musicInfo.song_name,
        }
      : undefined,
  };
};
