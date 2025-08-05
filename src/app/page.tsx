import Link from 'next/link';
import { 
  Mic, 
  ShoppingCart, 
  Zap, 
  Play,
  ArrowRight,
  Star,
  MessageCircle,
  Eye,
  Plug
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-pink-600/10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center animate-fade-in-up">
            <div className="animate-fade-in-up animation-delay-100">
              <Badge className="mb-4 bg-purple-100 text-purple-700 hover:bg-purple-200">
                🚀 Now Live on Shopify App Store
              </Badge>
            </div>
            
            <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-6 animate-fade-in-up animation-delay-200">
              The AI Voice Chatbot<br />That Converts
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed animate-fade-in-up animation-delay-300">
              Transform your Shopify store with Vona's voice-first shopping assistant. 
              Customers talk, we transact. <span className="font-semibold text-purple-600">25% higher conversions</span> in under 300ms.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-fade-in-up animation-delay-400">
              <Link href="https://apps.shopify.com/search?q=vona" target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 text-lg hover:scale-105 transition-transform">
                  <Plug className="mr-2 h-5 w-5" />
                  Install on Shopify
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="https://calendly.com/quanlai/30min" target="_blank" rel="noopener noreferrer">
                <Button size="lg" variant="outline" className="px-8 py-4 text-lg hover:scale-105 transition-transform">
                  <Play className="mr-2 h-5 w-5" />
                  Book a Demo
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-4xl mx-auto animate-fade-in-up animation-delay-500">
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">25%</div>
                <div className="text-gray-600">Conversion Lift</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">40%</div>
                <div className="text-gray-600">Less Cart Abandonment</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">300ms</div>
                <div className="text-gray-600">Response Time</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">1hr</div>
                <div className="text-gray-600">Setup Time</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-900 mb-4">
              Conversational Commerce, Reimagined
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              No more click-through fatigue. Ask "What's a thoughtful gift under $50 for my mom?" 
              and get curated options instantly.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="group">
              <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-2">
                <CardHeader>
                  <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Mic className="h-6 w-6 text-purple-600" />
                  </div>
                  <CardTitle>Voice-First Shopping</CardTitle>
                  <CardDescription>
                    Zero-UI experience. Customers speak naturally, AI understands intent and finds perfect products.
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>

            <div className="group">
              <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-2">
                <CardHeader>
                  <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Eye className="h-6 w-6 text-blue-600" />
                  </div>
                  <CardTitle>Smart Behavior Tracking</CardTitle>
                  <CardDescription>
                    Monitors hover hesitation, exit intent, and scroll depth to proactively engage with tailored prompts.
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>

            <div className="group">
              <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-2">
                <CardHeader>
                  <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <ShoppingCart className="h-6 w-6 text-green-600" />
                  </div>
                  <CardTitle>Shopify Native Integration</CardTitle>
                  <CardDescription>
                    Creates carts, applies discounts, processes refunds securely through Shopify Admin API.
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>

            <div className="group">
              <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-2">
                <CardHeader>
                  <div className="h-12 w-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Zap className="h-6 w-6 text-orange-600" />
                  </div>
                  <CardTitle>One-Click Installation</CardTitle>
                  <CardDescription>
                    Low-code API integration in under an hour. No custom dev backlog required.
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="usecases" className="py-20 bg-gradient-to-r from-purple-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-900 mb-4">How Vona Works</h2>
            <p className="text-xl text-gray-600">From conversation to conversion in three simple steps</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="h-16 w-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="text-2xl font-bold mb-4">Customer Speaks</h3>
              <p className="text-gray-600">
                "I need a waterproof phone case for hiking that's under $30"
              </p>
            </div>

            <div className="text-center group">
              <div className="h-16 w-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="text-2xl font-bold mb-4">AI Understands & Searches</h3>
              <p className="text-gray-600">
                Neural search + real-time personalization finds perfect matches in under 300ms
              </p>
            </div>

            <div className="text-center group">
              <div className="h-16 w-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="text-2xl font-bold mb-4">Instant Transaction</h3>
              <p className="text-gray-600">
                Presents curated options, handles cart, applies discounts, completes purchase
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section id="testimonials" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-900 mb-4">Trusted by Forward-Thinking Brands</h2>
            <p className="text-xl text-gray-600">12 e-commerce brands are already seeing incredible results</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="group">
              <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4">
                    "Vona transformed our customer experience. Conversions up 25% and our customers love the voice interaction."
                  </p>
                  <div className="font-semibold">Sarah Chen</div>
                  <div className="text-sm text-gray-500">CEO, GreenLife Wellness</div>
                </CardContent>
              </Card>
            </div>

            <div className="group">
              <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4">
                    "Setup took 30 minutes. Cart abandonment dropped 40%. This is the future of e-commerce."
                  </p>
                  <div className="font-semibold">Marcus Rodriguez</div>
                  <div className="text-sm text-gray-500">Founder, TechGear Pro</div>
                </CardContent>
              </Card>
            </div>

            <div className="group">
              <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4">
                    "Our customers actually enjoy shopping now. Vona feels like having a personal sales assistant for every visitor."
                  </p>
                  <div className="font-semibold">Emma Thompson</div>
                  <div className="text-sm text-gray-500">CMO, Artisan Collective</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-pink-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div>
            <h2 className="text-5xl font-bold text-white mb-6">
              Ready to Transform Your Store?
            </h2>
            <p className="text-xl text-purple-100 mb-8">
              Join 12+ brands already seeing 25% higher conversions with voice commerce
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="https://apps.shopify.com/search?q=vona" target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 hover:scale-105 transition-transform px-8 py-4 text-lg">
                  <Plug className="mr-2 h-5 w-5" />
                  Install on Shopify - Free Trial
                </Button>
              </Link>
              <Link href="https://calendly.com/quanlai/30min" target="_blank" rel="noopener noreferrer">
                <Button size="lg" variant="outline" className="border-white hover:bg-white hover:text-purple-600 hover:scale-105 transition-all px-8 py-4 text-lg">
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Book a Demo
                </Button>
              </Link>
            </div>
            <p className="text-purple-200 text-sm mt-4">
              ⚡ One-hour setup • 💰 No credit card required • 🚀 Live in minutes
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}