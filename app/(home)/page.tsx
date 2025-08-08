"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ReelForm } from "@/components/forms/ReelForm";
import { ErrorAlert } from "@/components/ErrorAlert";

export default function Home() {
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (url: string) => {
    if (!url) {
      setError("Kripya ek valid URL daalein");
      return;
    }

    const encodedUrl = encodeURIComponent(url);
    router.push(`/analysis/${encodedUrl}`);
  };

  return (
    <>
      <div className="w-full max-w-3xl mx-auto">
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-[#d87e36] bg-clip-text text-transparent">
            Instagram Reel Analyzer
          </h1>
          <p className="text-zinc-400 text-sm sm:text-base md:text-lg">
            Get detailed insights into your Instagram Reels performance. Analyze
            engagement, sentiment, and optimize your content strategy like a
            pro.
          </p>
        </div>

        <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 sm:p-8 shadow-lg">
          <ReelForm onSubmit={handleSubmit} />
          {error && <ErrorAlert error={error} />}
        </div>
      </div>
    </>
  );
}
