"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Comment } from "@/types/index";
import { detectSpamComments } from "@/lib/comment-utils";
import { Badge } from "@/components/ui/badge";

interface SpamCommentsProps {
  comments: Comment[];
  limit?: number;
}

export function SpamComments({ comments, limit = 5 }: SpamCommentsProps) {
  const spamComments = detectSpamComments(comments).slice(0, limit);

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Spam Comments {spamComments.length > 0 && `(${spamComments.length})`}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {spamComments.length > 0 ? (
          spamComments.map((comment) => (
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
                <div className="flex items-center justify-between">
                  <span className="font-medium text-sm">
                    {comment.ownerUsername || "Unknown"}
                  </span>
                  <Badge variant="destructive">Spam</Badge>
                </div>
                <p className="text-sm mt-1">{comment.text}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-sm text-muted-foreground text-center py-4">
            No spam comments detected
          </p>
        )}
      </CardContent>
    </Card>
  );
}
