"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Comment } from "@/types/index";
import { detectSpamComments } from "@/lib/comment-utils";
import { Badge } from "@/components/ui/badge";
import { Icons } from "@/components/icons";

interface SpamCommentsProps {
  comments: Comment[];
  limit?: number;
}

export function SpamComments({ comments, limit = 5 }: SpamCommentsProps) {
  const spamComments = detectSpamComments(comments).slice(0, limit);

  return (
    <Card className="bg-zinc-900/50 border-zinc-800">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Icons.alertTriangle className="h-5 w-5 text-red-400" />
          Spam Comments {spamComments.length > 0 && `(${spamComments.length})`}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {spamComments.length > 0 ? (
          spamComments.map((comment) => (
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
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="font-medium text-sm text-white truncate">
                    {comment.ownerUsername || "Unknown"}
                  </span>
                  <Badge
                    variant="destructive"
                    className="bg-red-900/50 border border-red-800 text-red-400"
                  >
                    Spam
                  </Badge>
                </div>
                <p className="text-sm mt-1 text-zinc-300 break-words">
                  {comment.text}
                </p>
                {comment.likes > 0 && (
                  <div className="flex items-center gap-1 mt-2">
                    <Icons.thumbsUp className="h-3.5 w-3.5 text-zinc-500" />
                    <span className="text-xs text-zinc-400">
                      {comment.likes.toLocaleString()} likes
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-6">
            <Icons.checkCircle className="mx-auto h-8 w-8 text-green-400" />
            <p className="mt-2 text-sm text-zinc-400">
              No spam comments detected
            </p>
            <p className="text-xs text-zinc-500 mt-1">
              Good job maintaining clean comments!
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
