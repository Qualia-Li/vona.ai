import { NextRequest, NextResponse } from 'next/server';

// Fake product data (same as in demo page)
const fakeProducts = [
  {
    id: 1,
    name: "Wireless Noise-Canceling Headphones",
    price: 299.99,
    rating: 4.5,
    reviews: 2341,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
    category: "Electronics",
    description: "Premium wireless headphones with active noise cancellation and 30-hour battery life."
  },
  {
    id: 2,
    name: "Organic Cotton T-Shirt",
    price: 29.99,
    rating: 4.8,
    reviews: 567,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
    category: "Fashion",
    description: "Soft, breathable organic cotton t-shirt available in multiple colors."
  },
  {
    id: 3,
    name: "Smart Home Security Camera",
    price: 149.99,
    rating: 4.3,
    reviews: 1203,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop",
    category: "Home Security",
    description: "HD security camera with night vision, motion detection, and smartphone alerts."
  },
  {
    id: 4,
    name: "Yoga Mat with Carrying Strap",
    price: 39.99,
    rating: 4.6,
    reviews: 892,
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=400&fit=crop",
    category: "Fitness",
    description: "Non-slip yoga mat with extra cushioning and convenient carrying strap."
  },
  {
    id: 5,
    name: "Ceramic Coffee Mug Set",
    price: 24.99,
    rating: 4.7,
    reviews: 445,
    image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&h=400&fit=crop",
    category: "Home & Kitchen",
    description: "Set of 2 handcrafted ceramic coffee mugs with ergonomic handles."
  },
  {
    id: 6,
    name: "Bluetooth Portable Speaker",
    price: 79.99,
    rating: 4.4,
    reviews: 1567,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop",
    category: "Electronics",
    description: "Waterproof portable speaker with 360-degree sound and 12-hour battery."
  }
];

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();
    
    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    // Azure OpenAI configuration
    const azureEndpoint = process.env.AZURE_OPENAI_API_BASE;
    const apiKey = process.env.AZURE_OPENAI_API_KEY;
    
    if (!azureEndpoint || !apiKey) {
      // Fallback to rule-based response if Azure OpenAI is not configured
      const fallbackResponse = generateFallbackResponse(message);
      return NextResponse.json(fallbackResponse);
    }

    try {
      // Call Azure OpenAI
      const response = await fetch(`${azureEndpoint}/openai/deployments/gpt-4/chat/completions?api-version=2024-02-15-preview`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'api-key': apiKey,
        },
        body: JSON.stringify({
          messages: [
            {
              role: 'system',
              content: `You are Vona, an AI voice shopping assistant for an e-commerce store. Your job is to help customers find products based on their natural language queries. 

Available products: ${JSON.stringify(fakeProducts)}

Instructions:
- Be conversational and helpful
- Understand natural language queries about products
- Recommend relevant products from the available list
- Keep responses concise but friendly
- Focus on helping customers find what they're looking for
- If a customer asks for something not in the list, suggest similar alternatives

Respond with a helpful message that addresses their request.`
            },
            {
              role: 'user',
              content: message
            }
          ],
          max_tokens: 150,
          temperature: 0.7,
        }),
      });

      if (!response.ok) {
        throw new Error('Azure OpenAI request failed');
      }

      const data = await response.json();
      const assistantMessage = data.choices[0]?.message?.content || 'I apologize, but I had trouble understanding your request. Could you please try again?';
      
      // Find relevant products based on the message
      const relevantProducts = findRelevantProducts(message);
      
      return NextResponse.json({
        message: assistantMessage,
        products: relevantProducts
      });

    } catch (azureError) {
      console.error('Azure OpenAI error:', azureError);
      // Fallback to rule-based response
      const fallbackResponse = generateFallbackResponse(message);
      return NextResponse.json(fallbackResponse);
    }

  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

function findRelevantProducts(message: string) {
  const lowerMessage = message.toLowerCase();
  let relevantProducts = [];

  if (lowerMessage.includes('headphone') || lowerMessage.includes('audio')) {
    relevantProducts = fakeProducts.filter(p => p.category === 'Electronics' && p.name.toLowerCase().includes('headphone'));
  } else if (lowerMessage.includes('yoga') || lowerMessage.includes('fitness') || lowerMessage.includes('exercise')) {
    relevantProducts = fakeProducts.filter(p => p.category === 'Fitness');
  } else if (lowerMessage.includes('coffee') || lowerMessage.includes('mug') || lowerMessage.includes('cup')) {
    relevantProducts = fakeProducts.filter(p => p.name.toLowerCase().includes('coffee') || p.name.toLowerCase().includes('mug'));
  } else if (lowerMessage.includes('security') || lowerMessage.includes('camera') || lowerMessage.includes('home')) {
    relevantProducts = fakeProducts.filter(p => p.category === 'Home Security');
  } else if (lowerMessage.includes('shirt') || lowerMessage.includes('clothing') || lowerMessage.includes('fashion')) {
    relevantProducts = fakeProducts.filter(p => p.category === 'Fashion');
  } else if (lowerMessage.includes('speaker') || lowerMessage.includes('music') || lowerMessage.includes('bluetooth')) {
    relevantProducts = fakeProducts.filter(p => p.name.toLowerCase().includes('speaker'));
  } else {
    relevantProducts = fakeProducts.slice(0, 3);
  }

  return relevantProducts;
}

function generateFallbackResponse(message: string) {
  const lowerMessage = message.toLowerCase();
  let responseText = "";
  const relevantProducts = findRelevantProducts(message);

  if (lowerMessage.includes('headphone') || lowerMessage.includes('audio')) {
    responseText = "I found some great wireless headphones for you! Here are my top recommendations:";
  } else if (lowerMessage.includes('yoga') || lowerMessage.includes('fitness') || lowerMessage.includes('exercise')) {
    responseText = "Perfect! I have some excellent fitness products that would make great gifts:";
  } else if (lowerMessage.includes('coffee') || lowerMessage.includes('mug') || lowerMessage.includes('cup')) {
    responseText = "Here are some beautiful coffee mugs I think you'll love:";
  } else if (lowerMessage.includes('security') || lowerMessage.includes('camera') || lowerMessage.includes('home')) {
    responseText = "I have some excellent home security cameras that would be perfect for you:";
  } else if (lowerMessage.includes('shirt') || lowerMessage.includes('clothing') || lowerMessage.includes('fashion')) {
    responseText = "Here are some great clothing options I found:";
  } else if (lowerMessage.includes('speaker') || lowerMessage.includes('music') || lowerMessage.includes('bluetooth')) {
    responseText = "I found some amazing portable speakers for you:";
  } else {
    responseText = "Here are some popular products I think you might like:";
  }

  return {
    message: responseText,
    products: relevantProducts
  };
}