import React, { Suspense } from "react";
import type { Metadata } from "next";
import { HeroSection } from "@/components/home/HeroSection";
import { FeaturesGrid } from "@/components/cards/FeaturesGrid";
import { ExampleReels } from "@/components/ExampleReels";
import { UrlInputForm } from "@/components/forms/UrlInputForm";
import { Skeleton } from "@/components/ui/skeleton";

export const metadata: Metadata = {
  title: "Home | Realalyzer",
  description:
    "Reel Analyzer that takes an Instagram Reel URL and provides detailed analytics and insights.",
};

export default function Home() {
  return (
    <main className="flex-1">
      <HeroSection />
      <section
        id="analyze-now"
        className="w-full py-12 bg-gray-50 dark:bg-gray-800"
      >
        <div className="container max-w-3xl px-4 md:px-6">
          <UrlInputForm />
        </div>
      </section>
      <Suspense fallback={<Skeleton className="h-[400px] w-full" />}>
        <FeaturesGrid />
      </Suspense>
      <ExampleReels />
    </main>
  );
}
