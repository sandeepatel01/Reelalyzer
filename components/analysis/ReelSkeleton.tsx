import { Skeleton } from "@/components/ui/skeleton";

export function ReelSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-10 w-full" /> {/* Input skeleton */}
      <div className="flex items-center gap-2">
        <Skeleton className="h-12 w-12 rounded-full" />{" "}
        {/* Profile pic skeleton */}
        <Skeleton className="h-4 w-32" /> {/* Username skeleton */}
      </div>
      <div className="grid grid-cols-3 gap-4">
        <Skeleton className="h-24 w-full" /> {/* Metrics skeleton */}
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-24 w-full" />
      </div>
    </div>
  );
}
