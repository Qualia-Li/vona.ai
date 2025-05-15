'use client'

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AIOverview from "@/components/AIOverview/AIOverviewCard";
import { useAIOverview } from "@/lib/store/useAIOverview";
import { useEffect } from "react";
import AIOverviewCard from "@/components/AIOverview/AIOverviewCard";
import OptimizationAnalysis from "@/components/OptimizationAnalysis/OptimizationAnalysis";

export default function QueryAnalysisPage() {
  const { data, setData } = useAIOverview();

  useEffect(() => {
    // Simulating data fetch - replace with actual API call
    setData([
      {
        type: "paragraph",
        snippet: "Android Runtime (ART) is the virtual machine that runs apps and some system services on Android devices. ART works by:",
        reference_indexes: [0, 2, 3],
      },
      {
        type: "list",
        list: [
          {
            title: "Compiling code ahead of time",
            snippet: "ART uses Ahead of Time (AOT) compilation to compile code before the app is executed. This is different from Dalvik, the previous virtual machine, which used Just In Time (JIT) compilation. AOT compilation makes the machine code ready before the app runs, which significantly improves runtime performance.",
            reference_indexes: [3, 4],
          },
          {
            title: "Generating a profile",
            snippet: "When an app is first run, ART interprets methods that aren't AOT-compiled. It then generates a local profile based on how the app is executed. If the app was installed with a dex metadata file, ART combines the local profile with the cloud profile.",
            reference_indexes: [1],
          },
          {
            title: "Recompiling the app",
            snippet: "When the device is idle and charging, a compilation daemon re-compiles the app based on the profile generated during the first few runs.",
            reference_indexes: [1],
          }
        ],
      },
      {
        type: "paragraph",
        snippet: "ART has been the default virtual machine for Android since Android 5.0 (Lollipop). However, some older devices may still use Dalvik if they haven't been updated to a newer version of Android.",
        reference_indexes: [2],
      }
    ], 
    [
      {
        title: "Android runtime and Dalvik | Android Open Source Project",
        link: "https://source.android.com/docs/core/runtime#:~:text=Android%20runtime%20(ART)%20is%20the,major%20features%20implemented%20by%20ART.",
        snippet: "Aug 26, 2024 — Android runtime (ART) is the managed runtime used by apps and some system services on Android. ART and its predecessor...",
        source: "Android Open Source Project",
        index: 0,
        difficulty: "hard"
      },
      {
        title: "Configure ART - Android Open Source Project",
        link: "https://source.android.com/docs/core/runtime/configure",
        snippet: "How ART works * An application is initially installed with a dex metadata ( . dm ) file distributed by Play Store, which contains...",
        source: "Android Open Source Project",
        index: 1,
        difficulty: "hard"
      },
      {
        title: "Android Runtime 101: ART Component of Android Architecture",
        link: "https://medium.com/@acceldia/android-runtime-101-art-component-of-android-architecture-7b89d701c71e",
        snippet: "Mar 3, 2023 — Summary. In the mobile device domain, different operating systems (OS) exist. Android OS has become highly popular and ...",
        source: "Medium",
        index: 2,
        difficulty: "medium"
      }
    ]);
  }, [setData]);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold">Query Analysis</h1>
        <p className="text-muted-foreground mt-2">
          Detailed analysis of your target keywords and their potential in AI
          search results.
        </p>
      </div>

      <Tabs defaultValue="best-online-shopping" className="space-y-4">
        <TabsList>
          <TabsTrigger value="best-online-shopping">
            best online shopping
          </TabsTrigger>
          <TabsTrigger value="discount-electronics">
            discount electronics
          </TabsTrigger>
        </TabsList>

        <AIOverviewCard data={data} />

        <TabsContent value="best-online-shopping" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>AI Overview Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="text-sm font-medium mb-2">
                      AI Trigger Potential
                    </div>
                    <Progress value={78} className="h-2" />
                    <div className="text-sm text-muted-foreground mt-1">
                      78%
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-medium mb-2">Content Gaps</div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">Pricing comparison</Badge>
                        <span className="text-sm text-muted-foreground">
                          High priority
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">
                          Technical specifications
                        </Badge>
                        <span className="text-sm text-muted-foreground">
                          Medium priority
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <OptimizationAnalysis referenceList={data?.references || []} />
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Competitor Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <Badge>Strong presence on Reddit</Badge>
                  <span className="text-sm text-muted-foreground">
                    Multiple active discussions and product recommendations
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <Badge>Limited Quora coverage</Badge>
                  <span className="text-sm text-muted-foreground">
                    Opportunity for detailed answers and expert insights
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="discount-electronics" className="space-y-4">
          {/* Similar structure as above, with different values */}
        </TabsContent>
      </Tabs>
    </div>
  );
} 