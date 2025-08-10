import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";
import Navbar from "@/components/home/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Realalyzer - Instagram Reel Analytics",
  description:
    "Reel Analyzer that takes an Instagram Reel URL and provides detailed analytics and insights.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased dark text-foreground bg-zinc-900`}
      >
        <Navbar />
        <main className="pt-24 pb-12 px-4 sm:px-6 md:px-8 lg:px-12 max-w-7xl mx-auto">
          {children}
        </main>
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
