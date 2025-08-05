import { unstable_cache } from "next/cache";
import { generateDummyAnalysis } from "./dummyData";

// Temporary function - will replace with real API calls later
export const fetchReelAnalysis = unstable_cache(
  async (url: string) => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    return generateDummyAnalysis(url);
  },
  ["reel-analysis"],
  { revalidate: 3600 } // 1 hour cache
);
