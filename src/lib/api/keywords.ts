interface QueryMetricsResponse {
  query: string;
  volume: number;
  ai_likelihood: number;
  difficulty: number;
  purchase_intent: string | null;
  success: boolean;
  message: string;
}

export async function analyzeQuery(query: string): Promise<QueryMetricsResponse> {
  const response = await fetch('/api/analyze-query', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query }),
  });

  if (!response.ok) {
    throw new Error('Failed to analyze query');
  }

  const data = await response.json();
  return {
    ...data,
    purchase_intent: data.purchase_intent === 'N/A' ? null : data.purchase_intent
  };
}

export async function analyzeKeywords(queries: string[]): Promise<QueryMetricsResponse[]> {
  // Run queries in parallel with Promise.all
  const results = await Promise.all(
    queries.map(query => analyzeQuery(query))
  );
  return results;
} 