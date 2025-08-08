"use client";
import { useEffect, useRef } from "react";
import * as d3 from "d3";
import cloud from "d3-cloud";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

type Word = {
  text: string;
  value: number;
};

type WordCloudWord = {
  text: string;
  size: number;
  x?: number;
  y?: number;
};

export function WordCloud({
  comments,
  width = 500,
  height = 300,
}: {
  comments: { text: string; likes: number }[];
  width?: number;
  height?: number;
}) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!comments.length || !svgRef.current) return;

    // Step 1: Process comments into words
    const wordsMap = comments
      .flatMap((comment) => {
        const cleanedText = comment.text.replace(/[^\w\s]/gi, "");
        return cleanedText.toLowerCase().split(/\s+/);
      })
      .filter((word) => word.length > 3)
      .reduce((acc: Record<string, number>, word: string) => {
        acc[word] = (acc[word] || 0) + 1;
        return acc;
      }, {});

    // Step 2: Convert to WordCloudWord format
    const words: WordCloudWord[] = Object.entries(wordsMap)
      .map(([text, value]) => ({
        text,
        size: value * 10 + 10,
        value,
      }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 50);

    if (words.length === 0) return;

    // Step 3: Clear previous SVG
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    // Step 4: Create word cloud layout
    const layout = cloud()
      .size([width, height])
      .words(words)
      .padding(5)
      .rotate(() => 0)
      .font("sans-serif")
      .fontSize((d) => d.size || 10)
      .on("end", (words: WordCloudWord[]) => {
        svg
          .append("g")
          .attr("transform", `translate(${width / 2},${height / 2})`)
          .selectAll("text")
          .data(words)
          .enter()
          .append("text")
          .style("font-size", (d) => `${d.size}px`)
          .style("fill", "#3b82f6") // Blue color
          .attr("text-anchor", "middle")
          .attr(
            "transform",
            (d) => `translate(${[d.x || 0, d.y || 0]})rotate(0)`
          )
          .text((d) => d.text);
      });

    layout.start();
  }, [comments, height, width]);

  if (!comments.length) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Comment Word Cloud</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-500">No comments to analyze</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Comment Word Cloud</CardTitle>
      </CardHeader>
      <CardContent>
        <svg
          ref={svgRef}
          width={width}
          height={height}
          className="w-full h-[300px]"
        />
      </CardContent>
    </Card>
  );
}
