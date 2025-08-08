"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  url: z.string().url("Invalid URL").includes("instagram.com"),
});

export function ReelForm({ onSubmit }: { onSubmit: (url: string) => void }) {
  const form = useForm({
    resolver: zodResolver(formSchema),
  });

  return (
    <form
      onSubmit={form.handleSubmit((data) => onSubmit(data.url))}
      className="space-y-4"
    >
      <Input placeholder="Paste Instagram Reel URL" {...form.register("url")} />
      {form.formState.errors.url && (
        <p className="text-red-500 text-sm">
          {form.formState.errors.url.message}
        </p>
      )}
      <Button type="submit" disabled={form.formState.isSubmitting}>
        Analyze
      </Button>
    </form>
  );
}
