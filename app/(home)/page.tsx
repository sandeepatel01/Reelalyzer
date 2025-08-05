import React from "react";
import type { Metadata } from "next";
import { HeroSection } from "@/components/home/HeroSection";

export const metadata: Metadata = {
  title: "Home | Realalyzer",
  description:
    "Reel Analyzer that takes an Instagram Reel URL and provides detailed analytics and insights.",
};

const page = () => {
  return (
    <div>
      <HeroSection />
    </div>
  );
};

export default page;
