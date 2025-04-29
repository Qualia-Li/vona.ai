import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Enception.ai - Get Discovered in AI Search Engines",
  description: "We help brands appear in AI-generated answers like Google AI Overview, ChatGPT, and Perplexity — using long-tail video content and multi-channel SEO.",
  keywords: ["AI SEO", "AI Search", "Content Optimization", "ChatGPT SEO", "Google AI", "Video SEO"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>
        <Toaster position="top-center" />
        {children}
      </body>
    </html>
  );
}
