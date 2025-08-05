"use client";

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

const FormSchema = z.object({
  reelUrl: z
    .string()
    .url({
      message: "Please enter a valid URL",
    })
    .refine(
      (url) => url.includes("instagram.com/reel/"),
      "Must be an Instagram Reel URL"
    ),
});

export function UrlInputForm() {
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      reelUrl: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    // Redirect to analysis page with URL parameter
    router.push(`/analysis?url=${encodeURIComponent(data.reelUrl)}`);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <FormField
          control={form.control}
          name="reelUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Instagram Reel URL</FormLabel>
              <FormControl>
                <Input
                  placeholder="https://www.instagram.com/reel/..."
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Paste the full URL of any public Instagram Reel
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          Analyze Reel
        </Button>
      </form>
    </Form>
  );
}
