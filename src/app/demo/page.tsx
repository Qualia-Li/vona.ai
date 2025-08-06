'use client';

import { useState, useEffect } from 'react';
import { Mic, MicOff, ShoppingCart, Star, Search, MessageCircle, X, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { motion, AnimatePresence } from 'framer-motion';

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
  const [showHoverTooltip, setShowHoverTooltip] = useState(false);
  const [hoverTimer, setHoverTimer] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Completely disable hover detection when chat is open
    if (isChatOpen) {
      setShowHoverTooltip(false);
      return;
    }

    let isMouseMoving = false;
    let moveTimeout: NodeJS.Timeout;
    
    const handleMouseMove = () => {
      setShowHoverTooltip(false);
      isMouseMoving = true;
      
      // Clear existing timers
      if (hoverTimer) {
        clearTimeout(hoverTimer);
      }
      if (moveTimeout) {
        clearTimeout(moveTimeout);
      }
      
      // Set timeout to detect when mouse stops moving
      moveTimeout = setTimeout(() => {
        isMouseMoving = false;
        
        // Only show tooltip if mouse has stopped moving and chat is still not open
        if (!isMouseMoving && !isChatOpen) {
          const timer = setTimeout(() => {
            if (!isChatOpen && !isMouseMoving) {
              setShowHoverTooltip(true);
            }
          }, 2000);
          setHoverTimer(timer);
        }
      }, 100);
    };

    const handleMouseLeave = () => {
      if (hoverTimer) {
        clearTimeout(hoverTimer);
      }
      if (moveTimeout) {
        clearTimeout(moveTimeout);
      }
      setShowHoverTooltip(false);
      isMouseMoving = false;
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      if (hoverTimer) {
        clearTimeout(hoverTimer);
      }
      if (moveTimeout) {
        clearTimeout(moveTimeout);
      }
    };
  }, [isChatOpen, hoverTimer]);

  // Clear tooltip when chat opens
  useEffect(() => {
    if (isChatOpen) {
      setShowHoverTooltip(false);
      if (hoverTimer) {
        clearTimeout(hoverTimer);
      }
    }
  }, [isChatOpen, hoverTimer]);

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
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-20 flex items-end justify-end p-4 z-50"
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            setIsChatOpen(false);
          }
        }}
      >
        <motion.div 
          initial={{ scale: 0.8, opacity: 0, x: 100, y: 100 }}
          animate={{ scale: 1, opacity: 1, x: 0, y: 0 }}
          exit={{ scale: 0.8, opacity: 0, x: 100, y: 100 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="bg-white rounded-2xl shadow-2xl w-96 h-[500px] flex flex-col overflow-hidden border border-slate-200 relative z-60"
          onClick={(e) => e.stopPropagation()}
          onMouseDown={(e) => e.stopPropagation()}
          onMouseUp={(e) => e.stopPropagation()}
          onMouseMove={(e) => e.stopPropagation()}
        >
          {/* Chat Header */}
          <motion.div 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-slate-700 to-slate-800 text-white"
          >
            <div className="flex items-center gap-2">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              >
                <MessageCircle className="h-5 w-5" />
              </motion.div>
              <span className="font-semibold">Vona AI Assistant</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                setIsChatOpen(false);
              }}
              className="text-white hover:bg-slate-600 transition-colors"
            >
              <X className="h-4 w-4" />
            </Button>
          </motion.div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          <AnimatePresence initial={false}>
            {messages.map((message, index) => (
              <motion.div 
                key={index} 
                initial={{ opacity: 0, y: 20, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ 
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 500,
                  damping: 30
                }}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className={`max-w-[80%] p-3 rounded-2xl shadow-sm ${
                    message.role === 'user'
                      ? 'bg-gradient-to-r from-slate-600 to-slate-700 text-white'
                      : 'bg-gradient-to-r from-slate-50 to-slate-100 text-slate-900 border border-slate-200'
                  }`}
                >
                  {message.content}
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>
          
          {/* Product Recommendations */}
          <AnimatePresence>
            {messages
              .filter(m => m.role === 'assistant' && m.products)
              .slice(-1)[0]?.products?.slice(0, 2)
              .map((product, idx) => (
                <motion.div 
                  key={product.id}
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: 0.2 + idx * 0.1 }}
                  whileHover={{ scale: 1.02, y: -2 }}
                  className="bg-gradient-to-r from-blue-50 to-slate-50 rounded-xl p-3 border border-slate-200 shadow-sm"
                >
                  <div className="flex gap-3">
                    <motion.img 
                      whileHover={{ scale: 1.1 }}
                      src={product.image} 
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded-lg shadow-sm"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-sm text-gray-900">{product.name}</h4>
                      <div className="flex items-center gap-1 my-1">
                        <Star className="h-3 w-3 text-yellow-400 fill-current" />
                        <span className="text-xs text-gray-600">{product.rating}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-700">${product.price}</span>
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                          <Button size="sm" className="text-xs bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800">
                            Add to Cart
                          </Button>
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
          </AnimatePresence>

          {isLoading && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-start"
            >
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 text-gray-900 p-3 rounded-xl border border-gray-200">
                <div className="flex items-center space-x-2">
                  <motion.div 
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                    className="w-2 h-2 bg-slate-400 rounded-full"
                  />
                  <motion.div 
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: 0.1 }}
                    className="w-2 h-2 bg-slate-400 rounded-full"
                  />
                  <motion.div 
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                    className="w-2 h-2 bg-slate-400 rounded-full"
                  />
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Example Prompts */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="p-3 border-t bg-gradient-to-r from-slate-50 to-blue-50"
        >
          <p className="text-xs text-gray-600 mb-2">Try asking:</p>
          <div className="flex flex-wrap gap-1">
            {examplePrompts.slice(0, 2).map((prompt, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="outline"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSendMessage(prompt);
                  }}
                  className="text-xs h-7 px-2 border-slate-200 hover:bg-slate-100 hover:border-slate-300"
                >
                  {prompt.length > 25 ? prompt.substring(0, 25) + '...' : prompt}
                </Button>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Chat Input */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="p-4 border-t bg-white"
        >
          <div className="flex gap-2">
            <input
              type="text"
              value={currentInput}
              onChange={(e) => {
                e.stopPropagation();
                setCurrentInput(e.target.value);
              }}
              onKeyPress={(e) => {
                e.stopPropagation();
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleSendMessage(currentInput);
                }
              }}
              onClick={(e) => e.stopPropagation()}
              onFocus={(e) => {
                e.stopPropagation();
                setShowHoverTooltip(false);
              }}
              onBlur={(e) => e.stopPropagation()}
              placeholder="Ask about products..."
              className="flex-1 px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all"
            />
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  handleVoiceInput();
                }}
                size="sm"
                className={`${isListening ? 'bg-red-500 hover:bg-red-600' : 'bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800'} transition-all duration-200`}
              >
                <motion.div
                  animate={isListening ? { scale: [1, 1.2, 1] } : {}}
                  transition={{ duration: 1, repeat: isListening ? Infinity : 0 }}
                >
                  {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                </motion.div>
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  handleSendMessage(currentInput);
                }}
                size="sm"
                className="bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800 transition-all duration-200"
              >
                <Send className="h-4 w-4" />
              </Button>
            </motion.div>
          </div>
        </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-slate-50 to-blue-50 py-16">
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
              <span className="text-slate-700 font-semibold"> Try our AI shopping assistant!</span>
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-black hover:bg-gray-800 text-white px-8 py-4">
                Shop Collection
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                onClick={() => {
                  setShowHoverTooltip(false);
                  setIsChatOpen(true);
                }}
                className="px-8 py-4 border-slate-600 text-slate-600 hover:bg-slate-50"
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
                  <div className="h-12 w-12 bg-slate-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <ShoppingCart className="h-6 w-6 text-slate-600" />
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
      <AnimatePresence>
        {!isChatOpen && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  className="fixed bottom-6 right-6 z-40"
                >
                  <motion.div
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    animate={{ 
                      y: [0, -4, 0]
                    }}
                    transition={{ 
                      y: { duration: 2, repeat: Infinity }
                    }}
                    className="rounded-full shadow-2xl"
                    style={{
                      filter: 'drop-shadow(0 10px 25px rgba(71, 85, 105, 0.4))'
                    }}
                  >
                    <Button
                      onClick={() => {
                        setShowHoverTooltip(false);
                        setIsChatOpen(true);
                      }}
                      className="h-14 w-14 rounded-full bg-gradient-to-br from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800 border-0 p-0 shadow-lg"
                    >
                      <motion.div
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
                      >
                        <MessageCircle className="h-6 w-6" />
                      </motion.div>
                    </Button>
                  </motion.div>
                </motion.div>
              </TooltipTrigger>
              <TooltipContent side="right" className="bg-gradient-to-r from-slate-700 to-slate-800 text-white border-slate-200">
                <p>What can I help you today?</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </AnimatePresence>

      {/* Hover Tooltip - Shows after 2 seconds */}
      <AnimatePresence>
        {showHoverTooltip && !isChatOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: 50 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.8, x: 50 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-20 right-8 z-50 bg-gradient-to-r from-slate-700 to-slate-800 text-white px-4 py-2 rounded-xl shadow-lg border border-slate-600 cursor-pointer"
            onClick={() => {
              setShowHoverTooltip(false);
              setIsChatOpen(true);
            }}
          >
            <p className="text-sm">What can I help you today?</p>
            <div className="absolute -bottom-1 right-6 w-3 h-3 bg-slate-700 rotate-45 border-r border-b border-slate-600" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Window Modal */}
      {isChatOpen && <ChatWindow />}
    </div>
  );
}