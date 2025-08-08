import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export function HashtagsList({
  hashtags,
  limit = 10,
}: {
  hashtags: string[];
  limit?: number;
}) {
  if (!hashtags || hashtags.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Hashtags</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-500">No hashtags found</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Trending Hashtags</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {hashtags.slice(0, limit).map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10"
            >
              #{tag}
            </span>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
