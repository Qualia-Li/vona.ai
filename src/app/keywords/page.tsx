'use client'

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useKeywordsStore } from "@/lib/store/keywordsStore";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import { ArrowUpDown } from "lucide-react";

type SortField = 'volume' | 'aiOverviewLikelihood' | 'optimizationDifficulty' | 'purchaseIntent'
type SortOrder = 'asc' | 'desc'

export default function KeywordsPage() {
  const keywords = useKeywordsStore((state) => state.keywords);
  const deleteKeyword = useKeywordsStore((state) => state.deleteKeyword);
  const [sortField, setSortField] = useState<SortField>('volume');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };

  const sortedKeywords = [...keywords].sort((a, b) => {
    const multiplier = sortOrder === 'asc' ? 1 : -1;
    const aValue = a[sortField] || 0;
    const bValue = b[sortField] || 0;
    return (aValue - bValue) * multiplier;
  });

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

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Keyword</TableHead>
              <TableHead>
                <Button 
                  variant="ghost" 
                  onClick={() => handleSort('volume')}
                  className="flex items-center gap-1"
                >
                  Volume
                  <ArrowUpDown className="h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button 
                  variant="ghost" 
                  onClick={() => handleSort('aiOverviewLikelihood')}
                  className="flex items-center gap-1"
                >
                  AI Likelihood
                  <ArrowUpDown className="h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button 
                  variant="ghost" 
                  onClick={() => handleSort('optimizationDifficulty')}
                  className="flex items-center gap-1"
                >
                  Difficulty
                  <ArrowUpDown className="h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button 
                  variant="ghost" 
                  onClick={() => handleSort('purchaseIntent')}
                  className="flex items-center gap-1"
                >
                  Purchase Intent
                  <ArrowUpDown className="h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedKeywords.map((keyword) => (
              <TableRow key={keyword.id}>
                <TableCell className="font-medium">
                  <div>
                    {keyword.term}
                    {keyword.isCustom && (
                      <Badge variant="secondary" className="ml-2">Custom</Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell>{keyword.volume.toLocaleString()}</TableCell>
                <TableCell>
                  <div className="w-32">
                    <Progress value={keyword.aiOverviewLikelihood} className="h-2" />
                    <span className="text-sm text-muted-foreground">
                      {keyword.aiOverviewLikelihood}%
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="w-32">
                    <Progress value={keyword.optimizationDifficulty} className="h-2" />
                    <span className="text-sm text-muted-foreground">
                      {keyword.optimizationDifficulty}%
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="w-32">
                    {keyword.purchaseIntent ? (
                      <>
                        <Progress value={keyword.purchaseIntent} className="h-2" />
                        <span className="text-sm text-muted-foreground">
                          {keyword.purchaseIntent}%
                        </span>
                      </>
                    ) : (
                      <span className="text-sm text-muted-foreground">N/A</span>
                    )}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => deleteKeyword(keyword.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
} 