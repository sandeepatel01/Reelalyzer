"use client";

import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";

const FormSchema = z.object({
  reelUrl: z
    .string()
    .min(1, "URL is required")
    .url({
      message: "Please enter a valid URL",
    })
    .refine(
      (url) =>
        url.includes("instagram.com/reel/") || url.includes("instagram.com/p/"),
      "Must be an Instagram Reel or Post URL"
    )
    .refine(
      (url) => {
        try {
          const urlObj = new URL(url);
          return (
            urlObj.hostname === "www.instagram.com" ||
            urlObj.hostname === "instagram.com"
          );
        } catch {
          return false;
        }
      },
      {
        message: "Only Instagram.com URLs are allowed",
      }
    ),
});

export function UrlInputForm() {
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      reelUrl: "",
    },
    mode: "onChange",
  });

  const { isSubmitting, isValid } = form.formState;

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      toast.info("Processing your Reel...", {
        description: "We're analyzing your content",
        duration: 2000,
      });

      const url = new URL(data.reelUrl);
      const pathParts = url.pathname.split("/");
      const reelId = pathParts[2];

      // Small delay for better UX
      await new Promise((resolve) => setTimeout(resolve, 500));
      router.push(`/analysis/${reelId}`);
    } catch (error) {
      toast.error("Failed to analyze", {
        description: "Please check the URL and try again",
      });
    }
  }

  useEffect(() => {
    form.setFocus("reelUrl");
  }, [form]);

  return (
    <div className="w-full max-w-2xl mx-auto p-4 md:p-6 lg:p-8 bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-800">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 dark:text-white">
              Instagram Reel Analyzer
            </h2>
            <p className="text-center text-gray-600 dark:text-gray-400">
              Get detailed analytics for any public Instagram Reel
            </p>
          </div>

          <FormField
            control={form.control}
            name="reelUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base md:text-lg">Reel URL</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      placeholder="https://www.instagram.com/reel/..."
                      className="h-14 text-base pl-12 pr-4 rounded-lg"
                      autoComplete="off"
                      {...field}
                    />
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect x="2" y="4" width="20" height="16" rx="2" />
                        <path d="M7 15h0M12 15h0M17 15h0M7 10h0M12 10h0M17 10h0" />
                      </svg>
                    </div>
                  </div>
                </FormControl>
                <FormDescription className="text-sm md:text-base">
                  Paste the link to any public Instagram Reel or Post
                </FormDescription>
                <FormMessage className="text-sm" />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full h-14 text-lg font-medium rounded-lg transition-all hover:shadow-md"
            disabled={!isValid || isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-2"
                >
                  <line x1="22" y1="12" x2="18" y2="12" />
                  <line x1="6" y1="12" x2="2" y2="12" />
                  <line x1="12" y1="6" x2="12" y2="2" />
                  <line x1="12" y1="22" x2="12" y2="18" />
                  <circle cx="12" cy="12" r="4" />
                </svg>
                Analyze Now
              </>
            )}
          </Button>

          <div className="text-center text-sm text-gray-500 dark:text-gray-400">
            <p>We don&#39;t store your data. Analysis is done in real-time.</p>
          </div>
        </form>
      </Form>
    </div>
  );
}
