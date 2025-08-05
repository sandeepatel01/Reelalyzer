import { Button } from "@/components/ui/button";
import { DEMO_REELS } from "@/lib/constants";

export function ExampleReels() {
  return (
    <section className="w-full py-12">
      <div className="container grid gap-8 px-4 md:px-6">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl">
            Try with Example Reels
          </h2>
          <p className="max-w-[600px] mx-auto text-gray-500 dark:text-gray-400">
            Get started quickly by analyzing these demo reels
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-4">
          {DEMO_REELS.map((reel) => (
            <Button
              key={reel.id}
              variant="outline"
              className="flex items-center gap-2"
              asChild
            >
              <a href={`/analysis?url=${encodeURIComponent(reel.url)}`}>
                <span className="truncate max-w-[160px]">{reel.title}</span>
              </a>
            </Button>
          ))}
        </div>
      </div>
    </section>
  );
}
