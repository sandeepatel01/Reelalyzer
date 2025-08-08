import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { formatDistanceToNow } from "date-fns";

export function TopComments({
  comments,
  limit = 5,
}: {
  comments: {
    text: string;
    likes: number;
    timestamp: string;
    ownerUsername?: string;
  }[];
  limit?: number;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Comments</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {comments.slice(0, limit).map((comment, index) => (
          <div key={index} className="flex gap-3">
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
                <span className="text-xs text-gray-500">
                  {formatDistanceToNow(new Date(comment.timestamp))} ago
                </span>
              </div>
              <p className="text-sm mt-1">{comment.text}</p>
              <div className="flex items-center gap-1 mt-1">
                <HeartIcon className="h-3 w-3 text-red-500" />
                <span className="text-xs text-gray-500">
                  {comment.likes} likes
                </span>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

function HeartIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  );
}
