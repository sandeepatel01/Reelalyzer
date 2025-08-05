"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { SentimentPieChart } from "./SentimentPieChart";
import { getBadgeVariant, formatPercentage } from "@/lib/helper";
import { SentimentAnalysisData } from "@/types/analysis";

interface SentimentAnalysisTabsProps {
  caption: string;
  sentiment: SentimentAnalysisData;
}

export function SentimentAnalysisTabs({
  caption,
  sentiment,
}: SentimentAnalysisTabsProps) {
  return (
    <Tabs defaultValue="overview" className="space-y-4">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="caption">Caption</TabsTrigger>
        <TabsTrigger value="comments">Comments</TabsTrigger>
      </TabsList>

      <TabsContent value="overview" className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Overall Sentiment</CardTitle>
            </CardHeader>
            <CardContent>
              <SentimentPieChart data={sentiment.overall} />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Sentiment Breakdown</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {Object.entries(sentiment.breakdown).map(([label, value]) => (
                <div key={label} className="space-y-1">
                  <div className="flex justify-between">
                    <span className="capitalize">{label}</span>
                    <span>{value}%</span>
                  </div>
                  <Progress value={value} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </TabsContent>

      <TabsContent value="caption">
        <Card>
          <CardHeader>
            <CardTitle>Caption Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg italic mb-4">&quot;{caption}&quot;</p>
            <div className="flex gap-4 items-center">
              <Badge variant={getBadgeVariant(sentiment.caption.score)}>
                {sentiment.caption.label}
              </Badge>
              <span>
                Confidence: {formatPercentage(sentiment.caption.score)}
              </span>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
