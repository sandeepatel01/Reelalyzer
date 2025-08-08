import { NextRequest, NextResponse } from "next/server";
import { validateReelInput } from "@/lib/validation";
import { analyzeReel, getCachedReelData } from "@/lib/apify-client";
import { ReelAnalysisResponse } from "@/types/index";
import { z } from "zod";

export async function POST(request: NextRequest) {
  try {
    // Validate input
    const body = await request.json();
    const { reelUrl } = validateReelInput(body);

    // Try to get cached data first
    let responseData: ReelAnalysisResponse;
    try {
      responseData = await getCachedReelData(reelUrl);
    } catch (cacheError) {
      console.warn("Cache miss, fetching fresh data", cacheError);
      responseData = await analyzeReel(reelUrl);
    }

    return NextResponse.json({
      success: true,
      data: responseData,
    });
  } catch (error: unknown) {
    console.error("Scraping error:", error);

    // Handle Zod validation errors
    if (error instanceof z.ZodError) {
      const firstError = error.issues[0];
      return NextResponse.json(
        {
          success: false,
          error: firstError.message || "Invalid input",
          code: "VALIDATION_ERROR",
        },
        { status: 400 }
      );
    }

    // Handle other errors
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

export const config = {
  runtime: "nodejs",
  maxDuration: 60,
};
