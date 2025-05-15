import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";
import { MainNav } from "@/components/layout/main-nav";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Enception - AI-Powered SEO Platform",
  description: "Optimize your website's visibility with AI-powered SEO tools",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="border-b">
          <div className="flex h-16 items-center px-4">
            <div className="mr-8 flex">
              <h1 className="text-xl font-bold">Enception</h1>
            </div>
            <MainNav />
          </div>
        </div>
        <main className="container mx-auto py-6">{children}</main>
      </body>
    </html>
  );
}
