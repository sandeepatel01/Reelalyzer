import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Icons } from "@/components/icons";

export function HashtagsList({
  hashtags,
  limit = 15,
}: {
  hashtags: string[];
  limit?: number;
}) {
  if (!hashtags || hashtags.length === 0) {
    return (
      <Card className="bg-zinc-900/50 border-zinc-800">
        <CardHeader className="p-4 sm:p-6">
          <CardTitle className="text-white flex items-center gap-2 text-sm sm:text-base">
            <Icons.hash className="h-4 w-4 text-[#d87e36]" />
            Hashtags
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 sm:p-6 pt-0">
          <p className="text-sm text-zinc-400">
            No hashtags found in this reel
          </p>
        </CardContent>
      </Card>
    );
  }

  const displayedHashtags = hashtags.slice(0, limit);
  const remainingCount = hashtags.length - displayedHashtags.length;

  return (
    <Card className="bg-zinc-900/50 border-zinc-800">
      <CardHeader className="p-4 sm:p-6">
        <CardTitle className="text-white flex items-center gap-2 text-sm sm:text-base">
          <Icons.hash className="h-4 w-4 text-[#d87e36]" />
          Trending Hashtags
          <span className="text-xs text-zinc-400 ml-auto">
            {hashtags.length} total
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 sm:p-6 pt-0">
        <div className="flex flex-wrap gap-2">
          {displayedHashtags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center rounded-lg bg-zinc-800/50 px-3 py-1.5 text-xs sm:text-sm font-medium text-[#d87e36] border border-zinc-700 hover:bg-zinc-800 hover:border-[#d87e36]/50 transition-colors"
            >
              #{tag.toLowerCase()}
            </span>
          ))}
          {remainingCount > 0 && (
            <span className="inline-flex items-center rounded-lg bg-zinc-800/20 px-3 py-1.5 text-xs text-zinc-400 border border-zinc-800">
              +{remainingCount} more
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
