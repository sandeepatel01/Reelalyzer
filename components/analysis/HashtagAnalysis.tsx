import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { HashtagStats } from "@/types/analysis";

export function HashtagAnalysis({ hashtags }: { hashtags: HashtagStats[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Hashtag Performance</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {hashtags.map((hashtag) => (
            <Badge
              key={hashtag.tag}
              variant="outline"
              className="flex items-center gap-2"
            >
              #{hashtag.tag}
              <span className="text-xs text-muted-foreground">
                {hashtag.reach.toLocaleString()} reach
              </span>
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
