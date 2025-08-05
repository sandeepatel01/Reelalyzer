"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();

  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Global Error Boundary:", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-6 p-4">
      <div className="max-w-md text-center space-y-4">
        <h1 className="text-4xl font-bold text-destructive">Oops!</h1>
        <h2 className="text-2xl font-semibold">
          {error.message || "Something went wrong!"}
        </h2>
        <p className="text-muted-foreground">
          We will automatically reported this error to our team. Please try
          again.
        </p>
      </div>
      <div className="flex gap-4">
        <Button
          variant="default"
          onClick={() => {
            reset();
          }}
        >
          Retry
        </Button>
        <Button
          variant="outline"
          onClick={() => {
            router.push("/");
          }}
        >
          Go Home
        </Button>
      </div>
    </div>
  );
}
