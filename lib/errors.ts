export class InstagramAPIError extends Error {
  constructor(message: string, public statusCode: number) {
    super(message);
    this.name = "InstagramAPIError";
  }
}

export class InvalidURLError extends Error {
  constructor() {
    super("Invalid Instagram Reel URL");
    this.name = "InvalidURLError";
  }
}

export class RateLimitError extends InstagramAPIError {
  constructor() {
    super("API rate limit exceeded", 429);
    this.name = "RateLimitError";
  }
}
