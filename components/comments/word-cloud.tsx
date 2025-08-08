"use client";

import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import d3Cloud from "d3-cloud";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Comment } from "@/types/index";
import { processCommentsForWordCloud } from "@/lib/comment-utils";
import { Icons } from "@/components/icons";

interface WordCloudWord {
  text: string;
  size: number;
  value?: number;
  x?: number;
  y?: number;
  rotate?: number;
}

export function WordCloud({
  comments,
  maxWords = 50,
  minWordLength = 4,
}: {
  comments: Comment[];
  maxWords?: number;
  minWordLength?: number;
}) {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 600, height: 400 });

  // Responsive width aur height ke liye
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.clientWidth;
        setDimensions({
          width: Math.min(containerWidth, 800),
          height: Math.min(containerWidth * 0.66, 500),
        });
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  useEffect(() => {
    if (!comments?.length || !svgRef.current) return;

    const wordsData = processCommentsForWordCloud(
      comments,
      minWordLength,
      maxWords
    );

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    if (!wordsData.length) {
      svg
        .append("text")
        .text("No words to display")
        .attr("x", "50%")
        .attr("y", "50%")
        .attr("text-anchor", "middle")
        .attr("fill", "#a1a1aa")
        .style("font-size", "14px");
      return;
    }

    // Aapke theme ke colors use karenge
    const colorScale = d3.scaleOrdinal([
      "#d87e36", // Primary orange
      "#8884d8", // Purple
      "#82ca9d", // Green
      "#ffc658", // Yellow
      "#ff8042", // Orange
    ]);

    const layout = d3Cloud<WordCloudWord>()
      .size([dimensions.width, dimensions.height])
      .words(wordsData)
      .padding(8) // Thoda padding badhaya
      .rotate(() => (Math.random() > 0.5 ? 0 : 90))
      .font("sans-serif")
      .fontSize((d) => d.size || 10)
      .on("end", draw);

    layout.start();

    function draw(words: WordCloudWord[]) {
      const group = svg
        .append("g")
        .attr(
          "transform",
          `translate(${dimensions.width / 2},${dimensions.height / 2})`
        );

      group
        .selectAll("text")
        .data(words)
        .enter()
        .append("text")
        .style("font-size", (d) => `${d.size}px`)
        .style("font-family", "sans-serif")
        .style("fill", (_, i) => colorScale(i.toString()))
        .attr("text-anchor", "middle")
        .attr(
          "transform",
          (d: WordCloudWord) =>
            `translate(${[d.x || 0, d.y || 0]})rotate(${d.rotate || 0})`
        )
        .text((d) => d.text)
        .on("mouseover", function (event: MouseEvent, d: WordCloudWord) {
          d3.select(this).style("font-weight", "bold").style("opacity", "0.9");

          // Improved tooltip
          const [x, y] = d3.pointer(event);
          const tooltip = svg
            .append("g")
            .attr("class", "tooltip")
            .attr("transform", `translate(${x},${y - 20})`);

          tooltip
            .append("rect")
            .attr("width", 70)
            .attr("height", 24)
            .attr("rx", 4)
            .attr("fill", "#18181b")
            .attr("stroke", "#3f3f46");

          tooltip
            .append("text")
            .attr("x", 35)
            .attr("y", 16)
            .attr("text-anchor", "middle")
            .attr("fill", "white")
            .style("font-size", "12px")
            .text(`${d.value}x`);
        })
        .on("mouseout", function () {
          d3.select(this).style("font-weight", "normal").style("opacity", "1");
          svg.selectAll(".tooltip").remove();
        });
    }
  }, [comments, dimensions, maxWords, minWordLength]);

  return (
    <Card className="bg-zinc-900/50 border-zinc-800 w-full">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Icons.cloud className="h-5 w-5 text-[#d87e36]" />
          Most Used Words in Comments
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div
          ref={containerRef}
          className="w-full h-[300px] sm:h-[400px] overflow-hidden relative"
        >
          <svg
            ref={svgRef}
            width={dimensions.width}
            height={dimensions.height}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{ fontFamily: "sans-serif" }}
          />
        </div>
      </CardContent>
    </Card>
  );
}
