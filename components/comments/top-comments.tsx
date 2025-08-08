"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { formatDistanceToNow } from "date-fns";
import { Comment } from "@/types/index";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";

interface TopCommentsProps {
  comments: Comment[];
  limit?: number;
  sortBy?: "likes" | "replies";
}

export function TopComments({
  comments,
  limit = 5,
  sortBy = "likes",
}: TopCommentsProps) {
  const sortedComments = [...comments]
    .sort((a, b) => {
      const aValue = sortBy === "likes" ? a.likes : a.replyCount || 0;
      const bValue = sortBy === "likes" ? b.likes : b.replyCount || 0;
      return bValue - aValue;
    })
    .slice(0, limit);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>
          Top Comments by {sortBy === "likes" ? "Likes" : "Replies"}
        </CardTitle>
        <div className="flex gap-2">
          <Button
            variant={sortBy === "likes" ? "default" : "outline"}
            size="sm"
            onClick={() => (sortBy = "likes")}
          >
            <Icons.thumbsUp className="h-4 w-4 mr-2" />
            Likes
          </Button>
          <Button
            variant={sortBy === "replies" ? "default" : "outline"}
            size="sm"
            onClick={() => (sortBy = "replies")}
          >
            <Icons.messageCircle className="h-4 w-4 mr-2" />
            Replies
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {sortedComments.map((comment) => (
          <div key={comment.id} className="flex gap-3">
            <Avatar className="h-8 w-8">
              <AvatarImage
                src={`https://unavatar.io/${comment.ownerUsername}`}
                alt={comment.ownerUsername}
              />
              <AvatarFallback>
                {comment.ownerUsername?.charAt(0).toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="font-medium text-sm">
                  {comment.ownerUsername || "Unknown"}
                </span>
                <span className="text-xs text-muted-foreground">
                  {formatDistanceToNow(new Date(comment.timestamp))} ago
                </span>
              </div>
              <p className="text-sm mt-1">{comment.text}</p>
              <div className="flex items-center gap-4 mt-1">
                <div className="flex items-center gap-1">
                  <Icons.thumbsUp className="h-3 w-3 text-red-500" />
                  <span className="text-xs text-muted-foreground">
                    {comment.likes} likes
                  </span>
                </div>
                {comment.replyCount !== undefined && (
                  <div className="flex items-center gap-1">
                    <Icons.messageCircle className="h-3 w-3 text-blue-500" />
                    <span className="text-xs text-muted-foreground">
                      {comment.replyCount} replies
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
