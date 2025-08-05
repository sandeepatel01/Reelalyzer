"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { getCommentsBadgeVariant, sortComments } from "@/lib/helper";
import { ReelComment, SortKey, SortDirection } from "@/types/analysis";

export function CommentsAnalysis({ comments }: { comments: ReelComment[] }) {
  const [sortConfig, setSortConfig] = useState<{
    key: SortKey;
    direction: SortDirection;
  }>({
    key: "likes",
    direction: "desc",
  });

  const sortedComments = sortComments(
    comments,
    sortConfig.key,
    sortConfig.direction
  );
  const topComments = sortedComments.slice(0, 10);
  const controversialComments = sortedComments
    .filter((c) => c.sentiment === "mixed")
    .slice(0, 10);

  const toggleSort = (key: SortKey) => {
    setSortConfig((prev) => ({
      key,
      direction:
        prev.key === key ? (prev.direction === "asc" ? "desc" : "asc") : "desc",
    }));
  };

  return (
    <Tabs defaultValue="top">
      <div className="flex items-center justify-between mb-4">
        <TabsList>
          <TabsTrigger value="top">Top Comments</TabsTrigger>
          <TabsTrigger value="controversial">Controversial</TabsTrigger>
          <TabsTrigger value="spam">Spam Detection</TabsTrigger>
        </TabsList>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => toggleSort("likes")}
          >
            <Icons.thumbsUp className="h-4 w-4 mr-2" />
            {sortConfig.key === "likes" &&
              (sortConfig.direction === "asc" ? "↑" : "↓")}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => toggleSort("sentiment")}
          >
            <Icons.sentiment className="h-4 w-4 mr-2" />
            {sortConfig.key === "sentiment" &&
              (sortConfig.direction === "asc" ? "↑" : "↓")}
          </Button>
        </div>
      </div>

      <TabsContent value="top">
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Comment</TableHead>
                <TableHead className="text-right">Likes</TableHead>
                <TableHead className="text-right">Sentiment</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {topComments.map((comment) => (
                <TableRow key={comment.id}>
                  <TableCell className="font-medium">{comment.text}</TableCell>
                  <TableCell className="text-right">{comment.likes}</TableCell>
                  <TableCell className="text-right">
                    <Badge variant={getCommentsBadgeVariant(comment.sentiment)}>
                      {comment.sentiment}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </TabsContent>

      <TabsContent value="controversial">
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Comment</TableHead>
                <TableHead className="text-right">Likes</TableHead>
                <TableHead className="text-right">Sentiment</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {controversialComments.map((comment) => (
                <TableRow key={comment.id}>
                  <TableCell className="font-medium">{comment.text}</TableCell>
                  <TableCell className="text-right">{comment.likes}</TableCell>
                  <TableCell className="text-right">
                    <Badge variant={getCommentsBadgeVariant(comment.sentiment)}>
                      {comment.sentiment}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
