import { NextResponse, NextRequest } from "next/server";

const rateLimitMap = new Map<string, { count: number; lastReset: number }>();

export async function analysisRateLimit(request: NextRequest) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0] ||
    request.headers.get("x-real-ip") ||
    "127.0.0.1";

  const limit = parseInt(process.env.NEXT_PUBLIC_RATE_LIMIT || "10", 10);
  const windowMs = 60 * 1000; // 1 minute

  const current = rateLimitMap.get(ip) || { count: 0, lastReset: Date.now() };

  if (Date.now() > current.lastReset + windowMs) {
    current.count = 0;
    current.lastReset = Date.now();
  }

  if (current.count >= limit) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 }
    );
  }

  current.count++;
  rateLimitMap.set(ip, current);

  return NextResponse.next();
}

export const config = {
  matcher: "/api/scrape",
};
