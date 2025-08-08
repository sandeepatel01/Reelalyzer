"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ReelForm } from "@/components/ReelForm";
import { ErrorAlert } from "@/components/ErrorAlert";

export default function Home() {
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (url: string) => {
    if (!url) {
      setError("Please enter a valid URL");
      return;
    }

    const encodedUrl = encodeURIComponent(url);
    router.push(`/analysis/${encodedUrl}`);
  };

  return (
    <div className="container mx-auto p-4 md:p-8 lg:p-12">
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6">
        Instagram Reel Analyzer
      </h1>

      <ReelForm onSubmit={handleSubmit} />
      {error && <ErrorAlert error={error} />}
    </div>
  );
}
