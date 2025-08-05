"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container grid items-center gap-6 px-4 md:px-6 lg:grid-cols-2">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
            Instagram Reel Analytics
            <span className="text-primary"> Made Simple</span>
          </h1>
          <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
            Get detailed insights into your Instagram Reels performance. Analyze
            engagement, sentiment, and optimize your content strategy.
          </p>
          <div className="flex flex-col gap-2 min-[400px]:flex-row">
            <Link href="#analyze-now">
              <Button size="lg">Analyze Now</Button>
            </Link>
            <Button variant="outline" size="lg">
              How It Works
            </Button>
          </div>
        </div>
        <Image
          src="/images/hero-image.webp"
          alt="Analytics Dashboard"
          width={600}
          height={400}
          className="mx-auto aspect-video overflow-hidden rounded-xl object-cover"
          priority
        />
      </div>
    </section>
  );
}
