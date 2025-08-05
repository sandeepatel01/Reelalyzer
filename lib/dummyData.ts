import { ReelComment, SentimentVariant, HashtagStats } from "@/types/analysis";

export function generateDummyAnalysis(url: string) {
  const now = new Date();
  const postedDate = new Date();
  postedDate.setDate(now.getDate() - Math.floor(Math.random() * 7));

  // Current metrics
  const currentViews = Math.floor(Math.random() * 1000000) + 50000;
  const currentLikes = Math.floor(Math.random() * 100000) + 5000;
  const currentComments = Math.floor(Math.random() * 5000) + 100;
  const currentEngagement = parseFloat((Math.random() * 10 + 2).toFixed(2));

  // Generate comments
  const comments: ReelComment[] = Array.from({ length: 20 }, (_, i) => ({
    id: `comment-${i}`,
    text: [
      "Awesome content! 👍",
      "Love this! ❤️",
      "Not my favorite 😕",
      "Great job! 👏",
      "Could be better 🤔",
      "Amazing! 😍",
    ][Math.floor(Math.random() * 6)],
    username: `user${Math.floor(Math.random() * 1000)}`,
    likes: Math.floor(Math.random() * 500),
    sentiment: ["positive", "neutral", "negative", "mixed"][
      Math.floor(Math.random() * 4)
    ] as SentimentVariant,
    isSpam: Math.random() > 0.8,
  }));

  // Generate hashtags
  const hashtags: HashtagStats[] = [
    {
      tag: "travel",
      reach: Math.floor(Math.random() * 50000) + 10000,
      posts: Math.floor(Math.random() * 10000) + 1000,
    },
    {
      tag: "adventure",
      reach: Math.floor(Math.random() * 30000) + 5000,
      posts: Math.floor(Math.random() * 8000) + 500,
    },
    {
      tag: "nature",
      reach: Math.floor(Math.random() * 40000) + 8000,
      posts: Math.floor(Math.random() * 9000) + 800,
    },
  ];

  return {
    user: {
      username: "dummy_user",
      profilePic: "/default-profile.jpg",
      bio: "Digital creator | Photography enthusiast",
      followers: Math.floor(Math.random() * 100000) + 1000,
      following: Math.floor(Math.random() * 1000) + 100,
      isVerified: Math.random() > 0.5,
      isBusiness: Math.random() > 0.5,
      isProfessional: Math.random() > 0.5,
    },
    metrics: {
      views: currentViews,
      likes: currentLikes,
      comments: currentComments,
      shares: Math.floor(Math.random() * 3000) + 50,
      engagementRate: currentEngagement,
      duration: `${Math.floor(Math.random() * 60) + 10}s`,
      postedAt: postedDate,
      previousMetrics: {
        views: Math.floor(currentViews * (0.7 + Math.random() * 0.6)),
        likes: Math.floor(currentLikes * (0.7 + Math.random() * 0.6)),
        comments: Math.floor(currentComments * (0.7 + Math.random() * 0.6)),
        engagementRate: parseFloat(
          (currentEngagement * (0.7 + Math.random() * 0.6)).toFixed(2)
        ),
      },
    },
    caption: "Check out this amazing view! #travel #adventure #nature",
    sentiment: {
      overall: {
        positive: Math.floor(Math.random() * 60) + 30,
        neutral: Math.floor(Math.random() * 30) + 10,
        negative: Math.floor(Math.random() * 20) + 5,
      },
      breakdown: {
        positive: Math.floor(Math.random() * 60) + 30,
        neutral: Math.floor(Math.random() * 30) + 10,
        negative: Math.floor(Math.random() * 20) + 5,
      },
      caption: {
        text: "Check out this amazing view! #travel #adventure #nature",
        label:
          Math.random() > 0.3
            ? "positive"
            : Math.random() > 0.6
            ? "negative"
            : "neutral",
        score: parseFloat(Math.random().toFixed(2)),
      },
    },
    comments,
    hashtags,
  };
}
