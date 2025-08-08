"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { formatDistanceToNow } from "date-fns";
import { Comment } from "@/types/index";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";

interface TopCommentsProps {
  comments: Comment[];
  limit?: number;
}

export function TopComments({ comments, limit = 5 }: TopCommentsProps) {
  const [sortBy, setSortBy] = useState<"likes" | "replies">("likes");

  const sortedComments = [...comments]
    .sort((a, b) => {
      const aValue = sortBy === "likes" ? a.likes : a.replyCount || 0;
      const bValue = sortBy === "likes" ? b.likes : b.replyCount || 0;
      return bValue - aValue;
    })
    .slice(0, limit);

  return (
    <Card className="bg-zinc-900/50 border-zinc-800">
      <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <CardTitle className="text-white flex items-center gap-2">
          <Icons.trophy className="h-5 w-5 text-[#d87e36]" />
          Top Comments by {sortBy === "likes" ? "Likes" : "Replies"}
        </CardTitle>
        <div className="flex gap-2">
          <Button
            variant={sortBy === "likes" ? "default" : "outline"}
            size="sm"
            onClick={() => setSortBy("likes")}
            className="bg-zinc-800 hover:bg-zinc-700 border-zinc-700 data-[state=on]:bg-[#d87e36] data-[state=on]:border-[#d87e36]"
          >
            <Icons.thumbsUp className="h-4 w-4 mr-2" />
            <span className="sr-only sm:not-sr-only">Likes</span>
          </Button>
          <Button
            variant={sortBy === "replies" ? "default" : "outline"}
            size="sm"
            onClick={() => setSortBy("replies")}
            className="bg-zinc-800 hover:bg-zinc-700 border-zinc-700 data-[state=on]:bg-[#d87e36] data-[state=on]:border-[#d87e36]"
          >
            <Icons.messageCircle className="h-4 w-4 mr-2" />
            <span className="sr-only sm:not-sr-only">Replies</span>
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {sortedComments.length > 0 ? (
          sortedComments.map((comment) => (
            <div
              key={comment.id}
              className="flex gap-3 p-3 rounded-lg hover:bg-zinc-800/50 transition-colors"
            >
              <Avatar className="h-9 w-9 flex-shrink-0 border border-zinc-700">
                <AvatarImage
                  src={`https://unavatar.io/${comment.ownerUsername}`}
                  alt={comment.ownerUsername}
                  className="object-cover"
                />
                <AvatarFallback className="bg-zinc-800 text-white">
                  {comment.ownerUsername?.charAt(0).toUpperCase() || "U"}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-medium text-sm text-white truncate">
                    {comment.ownerUsername || "Unknown"}
                  </span>
                  <span className="text-xs text-zinc-400">
                    {formatDistanceToNow(new Date(comment.timestamp))} ago
                  </span>
                </div>
                <p className="text-sm mt-1 text-zinc-300 break-words">
                  {comment.text}
                </p>
                <div className="flex items-center gap-4 mt-2">
                  <div className="flex items-center gap-1">
                    <Icons.thumbsUp className="h-3.5 w-3.5 text-[#d87e36]" />
                    <span className="text-xs text-zinc-400">
                      {comment.likes.toLocaleString()} likes
                    </span>
                  </div>
                  {comment.replyCount !== undefined && (
                    <div className="flex items-center gap-1">
                      <Icons.messageCircle className="h-3.5 w-3.5 text-blue-400" />
                      <span className="text-xs text-zinc-400">
                        {comment.replyCount.toLocaleString()} replies
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-6">
            <Icons.messageSquare className="mx-auto h-8 w-8 text-zinc-500" />
            <p className="mt-2 text-sm text-zinc-400">No comments available</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
