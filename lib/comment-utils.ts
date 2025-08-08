import { Comment, CommentStats, SortDirection, SortKey } from "@/types/index";

// Calculate comment statistics
export function getCommentStats(comments: Comment[]): CommentStats {
  const totalComments = comments.length;
  if (totalComments === 0) {
    return {
      totalComments: 0,
      avgLikes: 0,
      avgLength: 0,
      spamCount: 0,
      positivePercent: 0,
      negativePercent: 0,
    };
  }

  const avgLikes =
    comments.reduce((sum, c) => sum + (c.likes || 0), 0) / totalComments;
  const avgLength =
    comments.reduce((sum, c) => sum + (c.text?.length || 0), 0) / totalComments;

  const spamCount = detectSpamComments(comments).length;

  const sentimentCounts = comments.reduce(
    (acc, c) => {
      if (c.sentiment === "positive") acc.positive++;
      if (c.sentiment === "negative") acc.negative++;
      return acc;
    },
    { positive: 0, negative: 0 }
  );

  return {
    totalComments,
    avgLikes: Math.round(avgLikes),
    avgLength: Math.round(avgLength),
    spamCount,
    positivePercent: Math.round(
      (sentimentCounts.positive / totalComments) * 100
    ),
    negativePercent: Math.round(
      (sentimentCounts.negative / totalComments) * 100
    ),
  };
}

// Detect spam comments
export function detectSpamComments(comments: Comment[]): Comment[] {
  return comments.filter((comment) => {
    const text = comment.text?.toLowerCase() || "";
    const isShort = text.length < 15;
    const hasLinks = /http|www|.com|.in|bit.ly|link/i.test(text);
    const isGeneric = /nice|good|awesome|great|thanks|check out|visit/i.test(
      text
    );
    const hasEmojis =
      (text.match(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g) || []).length > 3;

    return isShort || hasLinks || isGeneric || hasEmojis;
  });
}

// Analyze sentiment (basic implementation)
export function analyzeSentiment(
  text: string
): "positive" | "negative" | "neutral" {
  const positiveWords = [
    "good",
    "great",
    "awesome",
    "love",
    "amazing",
    "best",
    "excellent",
    "happy",
  ];
  const negativeWords = [
    "bad",
    "hate",
    "worst",
    "disappointed",
    "poor",
    "terrible",
    "awful",
    "sad",
  ];

  const score = (text?.toLowerCase() || "").split(/\W+/).reduce((sum, word) => {
    if (positiveWords.includes(word)) return sum + 1;
    if (negativeWords.includes(word)) return sum - 1;
    return sum;
  }, 0);

  return score > 0 ? "positive" : score < 0 ? "negative" : "neutral";
}

// Sort comments
export function sortComments(
  comments: Comment[],
  key: SortKey,
  direction: SortDirection
): Comment[] {
  return [...comments].sort((a, b) => {
    let aValue: number, bValue: number;

    if (key === "timestamp") {
      aValue = new Date(a[key] || 0).getTime();
      bValue = new Date(b[key] || 0).getTime();
    } else {
      aValue = Number(a[key]) || 0;
      bValue = Number(b[key]) || 0;
    }

    return direction === "asc" ? aValue - bValue : bValue - aValue;
  });
}

// Process comments for word cloud
export function processCommentsForWordCloud(
  comments: Comment[],
  minWordLength = 4,
  maxWords = 50
): { text: string; size: number; value: number }[] {
  const stopWords = new Set([
    "the",
    "and",
    "this",
    "that",
    "for",
    "with",
    "your",
    "have",
    "are",
    "was",
    "but",
    "not",
    "you",
    "they",
    "their",
    "from",
    "just",
    "like",
    "what",
    "about",
  ]);

  const wordsMap = comments
    .flatMap((c) => (c.text?.toLowerCase() || "").split(/\W+/))
    .filter(
      (word) => word && word.length >= minWordLength && !stopWords.has(word)
    )
    .reduce((acc: Record<string, number>, word) => {
      acc[word] = (acc[word] || 0) + 1;
      return acc;
    }, {});

  return Object.entries(wordsMap)
    .map(([text, value]) => ({ text, value: Number(value) }))
    .sort((a, b) => b.value - a.value)
    .slice(0, maxWords)
    .map((word) => ({
      text: word.text,
      size: Math.log2(word.value) * 10 + 10,
      value: word.value,
    }));
}
