import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

export default function KeywordsPage() {
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold">Keyword Suggestions</h1>
          <p className="text-muted-foreground mt-2">
            Customize and manage your target keywords for AI optimization.
          </p>
        </div>
        <Button>Add Custom Keyword</Button>
      </div>

      <div className="grid gap-4">
        {/* Example Keyword Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-medium">best online shopping</CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">Edit</Button>
              <Button variant="ghost" size="sm">Delete</Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <div className="text-sm font-medium mb-2">AI Overview Likelihood</div>
                  <Progress value={85} className="h-2" />
                  <div className="text-sm text-muted-foreground mt-1">85%</div>
                </div>
                <div>
                  <div className="text-sm font-medium mb-2">Optimization Difficulty</div>
                  <Progress value={65} className="h-2" />
                  <div className="text-sm text-muted-foreground mt-1">65%</div>
                </div>
                <div>
                  <div className="text-sm font-medium mb-2">Purchase Intent</div>
                  <Progress value={90} className="h-2" />
                  <div className="text-sm text-muted-foreground mt-1">90%</div>
                </div>
              </div>
              <div className="flex gap-2">
                <Badge>High Intent</Badge>
                <Badge variant="outline">E-commerce</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Example Keyword Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-medium">discount electronics</CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">Edit</Button>
              <Button variant="ghost" size="sm">Delete</Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <div className="text-sm font-medium mb-2">AI Overview Likelihood</div>
                  <Progress value={75} className="h-2" />
                  <div className="text-sm text-muted-foreground mt-1">75%</div>
                </div>
                <div>
                  <div className="text-sm font-medium mb-2">Optimization Difficulty</div>
                  <Progress value={45} className="h-2" />
                  <div className="text-sm text-muted-foreground mt-1">45%</div>
                </div>
                <div>
                  <div className="text-sm font-medium mb-2">Purchase Intent</div>
                  <Progress value={85} className="h-2" />
                  <div className="text-sm text-muted-foreground mt-1">85%</div>
                </div>
              </div>
              <div className="flex gap-2">
                <Badge>Medium Intent</Badge>
                <Badge variant="outline">Electronics</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 