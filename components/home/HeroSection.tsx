"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto grid items-center gap-8 px-4 md:px-6 lg:grid-cols-2 lg:gap-12">
        <div className="space-y-6 text-center lg:text-left">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
            Instagram Reel Analytics
            <span className="text-primary"> Made Simple</span>
          </h1>
          <p className="max-w-[600px] mx-auto lg:mx-0 text-lg text-gray-600 md:text-xl dark:text-gray-300">
            Get detailed insights into your Instagram Reels performance. Analyze
            engagement, sentiment, and optimize your content strategy like a
            pro.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Link href="#analyze-now">
              <Button size="lg" className="w-full sm:w-auto px-8 py-6 text-lg">
                Analyze Now
              </Button>
            </Link>
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto px-8 py-6 text-lg"
            >
              How It Works
            </Button>
          </div>
        </div>
        <div className="relative aspect-video w-full h-auto rounded-xl overflow-hidden shadow-2xl">
          <Image
            src="https://images.unsplash.com/photo-1611162616475-46b635cb6868?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80"
            alt="Social media analytics dashboard"
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-black/10 dark:from-black/50 dark:to-black/30" />
        </div>
      </div>
    </section>
  );
}
