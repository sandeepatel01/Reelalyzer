"use client";

import { useEffect, useRef } from "react";
import * as d3 from "d3";
import d3Cloud from "d3-cloud";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Comment } from "@/types/index";
import { processCommentsForWordCloud } from "@/lib/comment-utils";

interface WordCloudWord {
  text: string;
  size: number;
  value?: number;
  x?: number;
  y?: number;
  rotate?: number;
  font?: string;
  padding?: number;
}

export function WordCloud({
  comments,
  width = 600,
  height = 400,
  maxWords = 50,
  minWordLength = 4,
}: {
  comments: Comment[];
  width?: number;
  height?: number;
  maxWords?: number;
  minWordLength?: number;
}) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!comments?.length || !svgRef.current) return;

    const wordsData = processCommentsForWordCloud(
      comments,
      minWordLength,
      maxWords
    );
    if (!wordsData.length) {
      const svg = d3.select(svgRef.current);
      svg.selectAll("*").remove();
      svg
        .append("text")
        .text("No words to display")
        .attr("x", width / 2)
        .attr("y", height / 2)
        .attr("text-anchor", "middle")
        .style("font-family", "sans-serif");
      return;
    }

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const colorScale = d3.scaleOrdinal(d3.schemeTableau10);

    const layout = d3Cloud<WordCloudWord>()
      .size([width, height])
      .words(wordsData)
      .padding(5)
      .rotate(() => (Math.random() > 0.5 ? 0 : 90))
      .font("sans-serif")
      .fontSize((d: WordCloudWord) => d.size || 10)
      .on("end", (words: WordCloudWord[]) => draw(words, colorScale));

    layout.start();

    function draw(
      words: WordCloudWord[],
      colorScale: d3.ScaleOrdinal<string, string>
    ) {
      const group = svg
        .append("g")
        .attr("transform", `translate(${width / 2},${height / 2})`);

      group
        .selectAll("text")
        .data(words)
        .enter()
        .append("text")
        .style("font-size", (d) => `${d.size}px`)
        .style("font-family", (d) => d.font || "sans-serif")
        .style("fill", (_, i) => colorScale(i.toString()))
        .attr("text-anchor", "middle")
        .attr("transform", (d) => `translate(${[d.x, d.y]})rotate(${d.rotate})`)
        .text((d) => d.text)
        .attr("class", "word-cloud-text")
        .on("mouseover", function (event, d) {
          d3.select(this).style("font-weight", "bold");
          // Show tooltip with frequency count
          const tooltip = svg
            .append("g")
            .attr("class", "tooltip")
            .attr("transform", `translate(${event.pageX},${event.pageY - 20})`);

          tooltip
            .append("rect")
            .attr("width", 60)
            .attr("height", 20)
            .attr("fill", "white")
            .attr("stroke", "#ddd");

          tooltip
            .append("text")
            .attr("x", 30)
            .attr("y", 15)
            .attr("text-anchor", "middle")
            .text(`${d.value} uses`);
        })
        .on("mouseout", function () {
          d3.select(this).style("font-weight", "normal");
          svg.selectAll(".tooltip").remove();
        });
    }
  }, [comments, width, height, maxWords, minWordLength]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Most Used Words in Comments</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="w-full overflow-auto">
          <svg
            ref={svgRef}
            width={width}
            height={height}
            className="mx-auto"
            style={{ fontFamily: "sans-serif" }}
          />
        </div>
      </CardContent>
    </Card>
  );
}
