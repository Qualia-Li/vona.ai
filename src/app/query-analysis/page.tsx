import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function QueryAnalysisPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold">Query Analysis</h1>
        <p className="text-muted-foreground mt-2">
          Detailed analysis of your target keywords and their potential in AI search results.
        </p>
      </div>

      <Tabs defaultValue="best-online-shopping" className="space-y-4">
        <TabsList>
          <TabsTrigger value="best-online-shopping">best online shopping</TabsTrigger>
          <TabsTrigger value="discount-electronics">discount electronics</TabsTrigger>
        </TabsList>

        <TabsContent value="best-online-shopping" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>AI Overview Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="text-sm font-medium mb-2">AI Trigger Potential</div>
                    <Progress value={78} className="h-2" />
                    <div className="text-sm text-muted-foreground mt-1">78%</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium mb-2">Content Gaps</div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">Pricing comparison</Badge>
                        <span className="text-sm text-muted-foreground">High priority</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">Technical specifications</Badge>
                        <span className="text-sm text-muted-foreground">Medium priority</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Optimization Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="text-sm font-medium mb-2">Optimization Difficulty</div>
                    <Progress value={65} className="h-2" />
                    <div className="text-sm text-muted-foreground mt-1">65% - Moderate</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium mb-2">Conversion Difficulty</div>
                    <Progress value={45} className="h-2" />
                    <div className="text-sm text-muted-foreground mt-1">45% - Low</div>
                  </div>
                </div>
              </CardContent>
            </Card>
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