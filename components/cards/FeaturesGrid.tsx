import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Icons } from "@/components/icons";

const features = [
  {
    title: "Performance Metrics",
    description: "Track views, likes, shares and engagement rates",
    icon: <Icons.analytics className="h-6 w-6" />,
  },
  {
    title: "Sentiment Analysis",
    description: "Understand audience emotions from comments",
    icon: <Icons.sentiment className="h-6 w-6" />,
  },
  {
    title: "Content Optimization",
    description: "Get actionable insights to improve your reels",
    icon: <Icons.optimize className="h-6 w-6" />,
  },
  {
    title: "Competitive Analysis",
    description: "Compare with similar creators in your niche",
    icon: <Icons.compare className="h-6 w-6" />,
  },
];

export function FeaturesGrid() {
  return (
    <section className="w-full py-12 md:py-24">
      <div className="container grid gap-8 px-4 md:px-6">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
            Powerful Analytics Features
          </h2>
          <p className="max-w-[600px] mx-auto text-gray-500 md:text-xl dark:text-gray-400">
            Everything you need to understand and grow your Instagram presence
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="p-2 rounded-full bg-primary/10">
                    {feature.icon}
                  </div>
                  <div>
                    <CardTitle>{feature.title}</CardTitle>
                    <CardDescription>{feature.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
