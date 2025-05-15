"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { analyzeWebsite } from "@/lib/api/website";
import { useAnalysisStore } from "@/lib/store/analysis";
import type { WebsiteStore } from "@/lib/store/analysis";
import { Website } from "@/types";

export default function WebsiteInputPage() {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const setResults = useAnalysisStore(
    (state: WebsiteStore) => state.setResults
  );

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const data = await analyzeWebsite(url);
      setResults(data);
      router.push(`/keywords?url=${encodeURIComponent(url)}`);
    } catch (error) {
      console.error('Error analyzing website:', error);
      alert('Failed to analyze website. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-4xl font-bold mb-4">Get Started with Enception</h1>
      <p className="text-muted-foreground mb-8">
        Enter your website URL to begin optimizing your content for AI search engines.
      </p>
      
      <Card>
        <CardHeader>
          <CardTitle>Website Analysis</CardTitle>
          <CardDescription>
            We'll analyze your website's metadata, content, and current search visibility.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAnalyze} className="space-y-4">
            <div className="flex gap-2">
              <Input 
                type="url" 
                placeholder="https://your-website.com"
                className="flex-1"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                required
              />
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Analyzing..." : "Analyze"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <div className="mt-8 grid gap-4">
        <Card>
          <CardHeader>
            <CardTitle>How it Works</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">1</div>
                <div>
                  <h3 className="font-medium">Website Scan</h3>
                  <p className="text-sm text-muted-foreground">We analyze your website's current content and metadata.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">2</div>
                <div>
                  <h3 className="font-medium">AI Analysis</h3>
                  <p className="text-sm text-muted-foreground">Our AI evaluates your site's potential for AI search visibility.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">3</div>
                <div>
                  <h3 className="font-medium">Optimization Plan</h3>
                  <p className="text-sm text-muted-foreground">Get a customized plan to improve your AI search presence.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 