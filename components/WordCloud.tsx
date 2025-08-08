"use client";
import { useEffect, useRef } from "react";
import * as d3 from "d3";
import d3Cloud from "d3-cloud";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

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
  comments: { text: string; likes?: number }[];
  width?: number;
  height?: number;
  maxWords?: number;
  minWordLength?: number;
}) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!comments?.length || !svgRef.current) return;

    // Process comments into word data
    const wordsData = processComments(comments, minWordLength, maxWords);
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

    // Clear previous render
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    // Set up color scale
    const colorScale = d3.scaleOrdinal(d3.schemeTableau10);

    // Create word cloud layout
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
        .on("mouseover", function () {
          d3.select(this).style("font-weight", "bold");
        })
        .on("mouseout", function () {
          d3.select(this).style("font-weight", "normal");
        });
    }
  }, [comments, width, height, maxWords, minWordLength]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Top Keywords</CardTitle>
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

function processComments(
  comments: { text: string; likes?: number }[],
  minWordLength: number,
  maxWords: number
): WordCloudWord[] {
  // Combine all comments into one string
  const allText = comments
    .map((c) => c.text)
    .join(" ")
    .toLowerCase();

  // Extract words and count frequencies
  const wordsMap = allText
    .split(/[\s,.!?;:"'()]+/)
    .filter((word) => word.length >= minWordLength)
    .reduce((acc: Record<string, number>, word) => {
      acc[word] = (acc[word] || 0) + 1;
      return acc;
    }, {});

  // Convert to array and sort by frequency
  return Object.entries(wordsMap)
    .map(([text, value]) => ({ text, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, maxWords)
    .map((word) => ({
      text: word.text,
      size: Math.log2(word.value) * 10 + 10, // Logarithmic scaling
      value: word.value,
    }));
}
