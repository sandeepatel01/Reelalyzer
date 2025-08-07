import { NextRequest, NextResponse } from "next/server";
import { validateReelInput } from "@/lib/validation";
import { analyzeReel } from "@/lib/apify-client";
import { ReelAnalysisResponse, RawReelData } from "@/types/index";
import { z } from "zod";

export async function POST(request: NextRequest) {
  try {
    // Validate input
    const body = await request.json();
    const { reelUrl } = validateReelInput(body);

    // Analyze reel with timeout
    const rawData = (await Promise.race([
      analyzeReel(reelUrl),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Request timeout")), 30000)
      ),
    ])) as RawReelData;

    // Transform data
    const responseData: ReelAnalysisResponse = {
      id: rawData.id || `reel_${Date.now()}`,
      url: reelUrl,
      caption:
        typeof rawData.caption === "string" ? rawData.caption : undefined,
      metrics: {
        likes: Number(rawData.likeCount) || 0,
        comments: Number(rawData.commentCount) || 0,
        views: Number(rawData.playCount) || 0,
      },
      postedAt:
        typeof rawData.postedAt === "string"
          ? rawData.postedAt
          : new Date().toISOString(),
      owner: rawData.owner
        ? {
            username: String(rawData.owner.username || "unknown"),
            profilePicUrl: String(rawData.owner.profilePicUrl || ""),
          }
        : undefined,
      topComments: Array.isArray(rawData.comments)
        ? rawData.comments.slice(0, 5).map((c) => {
            const comment = c as Record<string, unknown>;
            return {
              text: String(comment?.text || ""),
              likes: Number(comment?.likes) || 0,
              timestamp:
                typeof comment?.postedAt === "string"
                  ? comment.postedAt
                  : new Date().toISOString(),
            };
          })
        : [],
      hashtags: Array.isArray(rawData.hashtags)
        ? rawData.hashtags.map(String).filter(Boolean)
        : [],
    };

    return NextResponse.json({
      success: true,
      data: responseData,
    });
  } catch (error: unknown) {
    console.error("Scraping error:", error);

    if (error instanceof z.ZodError) {
      const firstError = error.issues[0];
      return NextResponse.json(
        {
          success: false,
          error: firstError.message || "Invalid input",
        },
        { status: 400 }
      );
    }

    const errorMessage =
      error instanceof Error ? error.message : "Failed to analyze reel";

    return NextResponse.json(
      {
        success: false,
        error: errorMessage,
        code: "ANALYSIS_FAILED",
      },
      { status: 500 }
    );
  }
}
