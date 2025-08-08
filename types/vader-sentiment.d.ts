declare module "vader-sentiment" {
  class SentimentIntensityAnalyzer {
    polarity_scores(text: string): {
      compound: number;
      neg: number;
      neu: number;
      pos: number;
    };
  }

  export = SentimentIntensityAnalyzer;
}
