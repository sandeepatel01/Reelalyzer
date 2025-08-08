"use client";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export function ErrorAlert({
  error,
  dismissible = false,
}: {
  error: string;
  dismissible?: boolean;
}) {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <Alert
      variant="destructive"
      className="relative border-red-600/50 bg-zinc-900 backdrop-blur-sm"
    >
      <div className="flex items-start gap-3">
        <ExclamationTriangleIcon className="h-5 w-5 mt-0.5 text-red-600 flex-shrink-0" />
        <div className="flex-1">
          <AlertTitle className="text-red-600 font-medium">Error</AlertTitle>
          <AlertDescription className="text-red-500 dark:text-red-400">
            {error}
          </AlertDescription>
        </div>
      </div>

      {dismissible && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 top-2 h-6 w-6 text-red-600 hover:bg-red-600/20"
          onClick={() => setIsVisible(false)}
          aria-label="Dismiss error"
        >
          <X className="h-3 w-3" />
        </Button>
      )}
    </Alert>
  );
}
