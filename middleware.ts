import { NextResponse, NextRequest } from "next/server";

const rateLimitMap = new Map<string, { count: number; lastReset: number }>();
const CLEANUP_INTERVAL = 60 * 1000;

setInterval(() => {
  const now = Date.now();
  for (const [ip, entry] of rateLimitMap.entries()) {
    if (now > entry.lastReset + CLEANUP_INTERVAL) {
      rateLimitMap.delete(ip);
    }
  }
}, CLEANUP_INTERVAL);

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (pathname.startsWith("/api/analyze")) {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0] ||
      request.headers.get("x-real-ip") ||
      "127.0.0.1";

    const limit = parseInt(process.env.RATE_LIMIT || "10", 10);
    const windowMs = 60 * 1000; // 1 minute

    const current = rateLimitMap.get(ip) || { count: 0, lastReset: Date.now() };

    if (Date.now() > current.lastReset + windowMs) {
      current.count = 0;
      current.lastReset = Date.now();
    }

    if (current.count >= limit) {
      return NextResponse.json(
        {
          error: "Too many requests. Please try again later.",
          retryAfter: Math.ceil(
            (current.lastReset + windowMs - Date.now()) / 1000
          ),
        },
        { status: 429 }
      );
    }

    current.count++;
    rateLimitMap.set(ip, current);
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/api/analyze",
};
