'use client';

import { useState } from 'react';
import { Mic, MicOff, ShoppingCart, Star, Search, MessageCircle, X, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

// Fake product data
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
    image: "https://images.unsplash.com/photo-1514228742587-6b1558fcf93a?w=400&h=400&fit=crop",
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

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  products?: typeof fakeProducts;
}

const examplePrompts = [
  "Show me wireless headphones under $300",
  "I need a gift for someone who loves yoga",
  "What's your best-selling coffee mug?",
  "Find me a security camera for home"
];

export default function DemoPage() {
  const [isListening, setIsListening] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content: "Hi! I'm Vona, your voice shopping assistant. What can I help you find today?"
    }
  ]);
  const [currentInput, setCurrentInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleVoiceInput = async () => {
    if (!isListening) {
      // Start listening
      setIsListening(true);
      
      if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
        const recognition = new SpeechRecognition();
        
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'en-US';

        recognition.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          setCurrentInput(transcript);
          handleSendMessage(transcript);
        };

        recognition.onerror = () => {
          setIsListening(false);
        };

        recognition.onend = () => {
          setIsListening(false);
        };

        recognition.start();
      } else {
        // Fallback for browsers without speech recognition
        const sampleQueries = [
          "Show me wireless headphones under $300",
          "I need a gift for someone who loves yoga",
          "What coffee mugs do you have?",
          "Find me a security camera for my home"
        ];
        const randomQuery = sampleQueries[Math.floor(Math.random() * sampleQueries.length)];
        setCurrentInput(randomQuery);
        setTimeout(() => {
          handleSendMessage(randomQuery);
          setIsListening(false);
        }, 1500);
      }
    } else {
      setIsListening(false);
    }
  };

  const handleSendMessage = async (message: string) => {
    if (!message.trim()) return;

    const userMessage: ChatMessage = { role: 'user', content: message };
    setMessages(prev => [...prev, userMessage]);
    setCurrentInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message })
      });

      if (response.ok) {
        const data = await response.json();
        const assistantMessage: ChatMessage = {
          role: 'assistant',
          content: data.message,
          products: data.products
        };
        setMessages(prev => [...prev, assistantMessage]);
      } else {
        // Fallback response
        const assistantMessage = createFallbackResponse(message);
        setMessages(prev => [...prev, assistantMessage]);
      }
    } catch (error) {
      // Fallback response
      const assistantMessage = createFallbackResponse(message);
      setMessages(prev => [...prev, assistantMessage]);
    }

    setIsLoading(false);
  };

  const createFallbackResponse = (userMessage: string): ChatMessage => {
    const lowerMessage = userMessage.toLowerCase();
    let relevantProducts = fakeProducts;
    let responseText = "";

    if (lowerMessage.includes('headphone') || lowerMessage.includes('audio')) {
      relevantProducts = fakeProducts.filter(p => p.category === 'Electronics' && p.name.toLowerCase().includes('headphone'));
      responseText = "I found some great wireless headphones for you! Here are my top recommendations:";
    } else if (lowerMessage.includes('yoga') || lowerMessage.includes('fitness') || lowerMessage.includes('exercise')) {
      relevantProducts = fakeProducts.filter(p => p.category === 'Fitness');
      responseText = "Perfect! I have some excellent fitness products that would make great gifts:";
    } else if (lowerMessage.includes('coffee') || lowerMessage.includes('mug') || lowerMessage.includes('cup')) {
      relevantProducts = fakeProducts.filter(p => p.name.toLowerCase().includes('coffee') || p.name.toLowerCase().includes('mug'));
      responseText = "Here are some beautiful coffee mugs I think you'll love:";
    } else if (lowerMessage.includes('security') || lowerMessage.includes('camera') || lowerMessage.includes('home')) {
      relevantProducts = fakeProducts.filter(p => p.category === 'Home Security');
      responseText = "I have some excellent home security cameras that would be perfect for you:";
    } else if (lowerMessage.includes('shirt') || lowerMessage.includes('clothing') || lowerMessage.includes('fashion')) {
      relevantProducts = fakeProducts.filter(p => p.category === 'Fashion');
      responseText = "Here are some great clothing options I found:";
    } else if (lowerMessage.includes('speaker') || lowerMessage.includes('music') || lowerMessage.includes('bluetooth')) {
      relevantProducts = fakeProducts.filter(p => p.name.toLowerCase().includes('speaker'));
      responseText = "I found some amazing portable speakers for you:";
    } else {
      relevantProducts = fakeProducts.slice(0, 3);
      responseText = "Here are some popular products I think you might like:";
    }

    return {
      role: 'assistant',
      content: responseText,
      products: relevantProducts
    };
  };

  const ProductCard = ({ product }: { product: typeof fakeProducts[0] }) => (
    <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <div className="aspect-square overflow-hidden rounded-t-lg">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <CardContent className="p-4">
        <div className="space-y-2">
          <h3 className="font-semibold text-lg leading-tight">{product.name}</h3>
          <div className="flex items-center gap-1">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={`h-3 w-3 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                />
              ))}
            </div>
            <span className="text-xs text-gray-500">({product.reviews})</span>
          </div>
          <p className="text-sm text-gray-600 text-ellipsis overflow-hidden" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>{product.description}</p>
          <div className="flex items-center justify-between pt-2">
            <span className="text-xl font-bold">${product.price}</span>
            <Button size="sm" className="bg-black hover:bg-gray-800">
              Add to Cart
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const ChatWindow = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end justify-end p-4 z-50">
      <div className="bg-white rounded-lg shadow-2xl w-96 h-[500px] flex flex-col">
        {/* Chat Header */}
        <div className="flex items-center justify-between p-4 border-b bg-purple-600 text-white rounded-t-lg">
          <div className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5" />
            <span className="font-semibold">Vona AI Assistant</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsChatOpen(false)}
            className="text-white hover:bg-purple-700"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.map((message, index) => (
            <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-[80%] p-3 rounded-lg ${
                  message.role === 'user'
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-100 text-gray-900'
                }`}
              >
                {message.content}
              </div>
            </div>
          ))}
          
          {/* Product Recommendations */}
          {messages
            .filter(m => m.role === 'assistant' && m.products)
            .slice(-1)[0]?.products?.slice(0, 2)
            .map(product => (
              <div key={product.id} className="bg-gray-50 rounded-lg p-3 border">
                <div className="flex gap-3">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">{product.name}</h4>
                    <div className="flex items-center gap-1 my-1">
                      <Star className="h-3 w-3 text-yellow-400 fill-current" />
                      <span className="text-xs">{product.rating}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-purple-600">${product.price}</span>
                      <Button size="sm" className="text-xs bg-purple-600 hover:bg-purple-700">
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-100 text-gray-900 p-3 rounded-lg">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Example Prompts */}
        <div className="p-3 border-t bg-gray-50">
          <p className="text-xs text-gray-600 mb-2">Try asking:</p>
          <div className="flex flex-wrap gap-1">
            {examplePrompts.slice(0, 2).map((prompt, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => handleSendMessage(prompt)}
                className="text-xs h-7 px-2"
              >
                {prompt.length > 25 ? prompt.substring(0, 25) + '...' : prompt}
              </Button>
            ))}
          </div>
        </div>

        {/* Chat Input */}
        <div className="p-4 border-t">
          <div className="flex gap-2">
            <input
              type="text"
              value={currentInput}
              onChange={(e) => setCurrentInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(currentInput)}
              placeholder="Ask about products..."
              className="flex-1 px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
            <Button
              onClick={handleVoiceInput}
              size="sm"
              className={`${isListening ? 'bg-red-600 hover:bg-red-700' : 'bg-purple-600 hover:bg-purple-700'}`}
            >
              {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
            </Button>
            <Button
              onClick={() => handleSendMessage(currentInput)}
              size="sm"
              className="bg-purple-600 hover:bg-purple-700"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-50 to-pink-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* label of demo store */}
            <div className="text-sm text-gray-600 mb-4">
              Demo Store
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
              Premium Electronics & More
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Discover the latest in tech, fashion, and lifestyle products. 
              <span className="text-purple-600 font-semibold"> Try our AI shopping assistant!</span>
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-black hover:bg-gray-800 text-white px-8 py-4">
                Shop Collection
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                onClick={() => setIsChatOpen(true)}
                className="px-8 py-4 border-purple-600 text-purple-600 hover:bg-purple-50"
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                Try AI Assistant
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-8">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {['Electronics', 'Fashion', 'Home & Kitchen', 'Fitness'].map((category) => (
              <Card key={category} className="text-center hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <div className="h-12 w-12 bg-purple-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <ShoppingCart className="h-6 w-6 text-purple-600" />
                  </div>
                  <h3 className="font-semibold">{category}</h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">Featured Products</h2>
            <Button variant="outline">View All</Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {fakeProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Floating Chat Launcher */}
      {!isChatOpen && (
        <Button
          onClick={() => setIsChatOpen(true)}
          className="fixed bottom-6 left-6 h-14 w-14 rounded-full bg-purple-600 hover:bg-purple-700 shadow-lg z-40 p-0"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      )}

      {/* Chat Window Modal */}
      {isChatOpen && <ChatWindow />}
    </div>
  );
}