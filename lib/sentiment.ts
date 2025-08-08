import Sentiment from "sentiment";

type SentimentResult = "positive" | "negative" | "neutral";

const analyzer = new Sentiment();

export const analyzeText = (text: string): SentimentResult => {
  if (!text?.trim()) return "neutral";

  try {
    const result = analyzer.analyze(text);
    return result.score > 0.2
      ? "positive"
      : result.score < -0.2
      ? "negative"
      : "neutral";
  } catch {
    return "neutral";
  }
};
