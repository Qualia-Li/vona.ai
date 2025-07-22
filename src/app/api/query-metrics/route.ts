import { NextRequest, NextResponse } from 'next/server';

interface QueryMetricsResponse {
  query: string;
  volume: number;
  ai_likelihood: number;  // 0-100
  difficulty: number;    // 0-100
  purchase_intent: 'N/A' | 'Low' | 'Medium' | 'High';
}

function calculateAILikelihood(query: string): number {
  // Simple heuristics for AI likelihood
  const aiRelatedTerms = ['ai', 'artificial intelligence', 'machine learning', 'gpt', 'chatgpt', 'automation'];
  const actionTerms = ['create', 'generate', 'analyze', 'transform', 'convert', 'build', 'train'];
  
  const queryLower = query.toLowerCase();
  let score = 0;

  // Check for AI-related terms
  if (aiRelatedTerms.some(term => queryLower.includes(term))) {
    score += 50;
  }

  // Check for action verbs
  if (actionTerms.some(term => queryLower.includes(term))) {
    score += 30;
  }

  // Add points for specific content creation terms
  if (queryLower.includes('content') || queryLower.includes('document') || queryLower.includes('presentation')) {
    score += 20;
  }

  return Math.min(score, 100);
}

function calculateDifficulty(query: string): number {
  const complexityFactors = [
    'custom',
    'personalized',
    'dynamic',
    'advanced',
    'professional',
    'seamless',
    'tailored',
    'multimodal'
  ];
  
  const queryLower = query.toLowerCase();
  let score = 40; // Base difficulty

  // Add points for each complexity factor
  complexityFactors.forEach(factor => {
    if (queryLower.includes(factor)) {
      score += 10;
    }
  });

  return Math.min(score, 100);
}

function determinePurchaseIntent(query: string): 'N/A' | 'Low' | 'Medium' | 'High' {
  const queryLower = query.toLowerCase();
  
  // High intent keywords
  if (queryLower.includes('buy') || queryLower.includes('price') || queryLower.includes('cost')) {
    return 'High';
  }
  
  // Medium intent keywords
  if (queryLower.includes('compare') || queryLower.includes('best') || queryLower.includes('review')) {
    return 'Medium';
  }
  
  // Low intent keywords
  if (queryLower.includes('how') || queryLower.includes('what') || queryLower.includes('guide')) {
    return 'Low';
  }
  
  return 'N/A';
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { query } = body;

    if (!query || typeof query !== 'string') {
      return NextResponse.json(
        { error: 'Query parameter is required and must be a string' },
        { status: 400 }
      );
    }

    const metrics: QueryMetricsResponse = {
      query,
      volume: 0, // This would typically come from a real search volume API
      ai_likelihood: calculateAILikelihood(query),
      difficulty: calculateDifficulty(query),
      purchase_intent: determinePurchaseIntent(query)
    };

    return NextResponse.json(metrics);
  } catch (error) {
    console.error('Error processing query metrics:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 