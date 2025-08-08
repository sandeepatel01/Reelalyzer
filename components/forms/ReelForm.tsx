"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  url: z
    .string()
    .min(1, "URL required for analysis")
    .url("Invalid URL")
    .refine(
      (url) => url.includes("instagram.com") || url.includes("instagr.am"),
      "Instagram Reel URL required"
    ),
});

export function ReelForm({ onSubmit }: { onSubmit: (url: string) => void }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(formSchema),
  });

  return (
    <form
      onSubmit={handleSubmit((data) => onSubmit(data.url))}
      className="space-y-4"
    >
      <div>
        <Input
          placeholder="Instagram Reel URL paste karein..."
          className="py-6 text-base"
          {...register("url")}
        />
        {errors.url && (
          <p className="mt-2 text-sm text-red-500">
            {errors.url.message as string}
          </p>
        )}
      </div>
      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-[#d87e36] font-bold hover:bg-[#8b5122] py-6 text-base cursor-pointer"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Processing...
          </>
        ) : (
          "Analyze"
        )}
      </Button>
    </form>
  );
}
