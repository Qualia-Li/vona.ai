import { Metadata } from 'next';
import { Check } from 'lucide-react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const metadata: Metadata = {
  title: 'Pricing | Enception',
  description: 'Choose the right plan for your AI-powered search optimization needs with Enception.',
  alternates: {
    canonical: 'https://enception.ai/pricing',
  },
};

export default function PricingPage() {
  return (
    <main className='container mx-auto flex min-h-screen flex-col items-center px-4 py-12 md:px-8'>
      {/* Hero Section */}
      <div className='mx-auto max-w-3xl text-center'>
        <h1 className='text-4xl md:text-6xl font-bold mb-4'>
          <span className='inline-block bg-gradient-to-r from-[#6659df] via-[#a567d4] to-[#e95b9d] bg-clip-text text-transparent pb-1'>
            Simple, Transparent Pricing
          </span>
        </h1>
        <p className='text-muted-foreground'>
          Choose the plan that best fits your needs. All plans include a 14-day free trial.
        </p>
      </div>

      {/* Pricing Grid */}
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 w-full max-w-7xl mt-12'>
        {/* Basic Plan */}
        <Card className='relative flex flex-col'>
          <CardHeader>
            <CardTitle>Basic</CardTitle>
            <CardDescription>
              <div className='flex items-baseline gap-2 mt-2'>
                <span className='text-3xl font-bold'>$299</span>
                <span className='text-muted-foreground'>/month</span>
              </div>
            </CardDescription>
          </CardHeader>
          <CardContent className='flex-grow'>
            <ul className='space-y-3'>
              <li className='flex items-center gap-2'>
                <Check className='h-5 w-5 text-[#6659df]' />
                <span>3 AI-generated scripts per month</span>
              </li>
              <li className='flex items-center gap-2'>
                <Check className='h-5 w-5 text-[#6659df]' />
                <span>1 active AI agent</span>
              </li>
              <li className='flex items-center gap-2'>
                <Check className='h-5 w-5 text-[#6659df]' />
                <span>Basic dashboard access</span>
              </li>
              <li className='flex items-center gap-2'>
                <Check className='h-5 w-5 text-[#6659df]' />
                <span>AI Visibility Score (limited view)</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button
              asChild
              className='w-full'
            >
              <Link href='https://www.enception.ai/account/login'>Get Started Now</Link>
            </Button>
          </CardFooter>
        </Card>

        {/* Growth Plan */}
        <Card className='relative flex flex-col border-[#6659df]/20'>
          <Badge className='absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#6659df] to-pink-600'>
            Most Popular
          </Badge>
          <CardHeader>
            <CardTitle>Growth</CardTitle>
            <CardDescription>
              <div className='flex items-baseline gap-2 mt-2'>
                <span className='text-3xl font-bold'>$499</span>
                <span className='text-muted-foreground'>/month</span>
              </div>
            </CardDescription>
          </CardHeader>
          <CardContent className='flex-grow'>
            <ul className='space-y-3'>
              <li className='flex items-center gap-2'>
                <Check className='h-5 w-5 text-[#6659df]' />
                <span>Unlimited content generation</span>
              </li>
              <li className='flex items-center gap-2'>
                <Check className='h-5 w-5 text-[#6659df]' />
                <span>All 3 AI agents</span>
              </li>
              <li className='flex items-center gap-2'>
                <Check className='h-5 w-5 text-[#6659df]' />
                <span>Full AI visibility tracking</span>
              </li>
              <li className='flex items-center gap-2'>
                <Check className='h-5 w-5 text-[#6659df]' />
                <span>Unlimited Videos</span>
              </li>
              <li className='flex items-center gap-2'>
                <Check className='h-5 w-5 text-[#6659df]' />
                <span>5 team members</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button asChild className='w-full'>
              <Link href='https://www.enception.ai/account/login'>Get Started Now</Link>
            </Button>
          </CardFooter>
        </Card>

        {/* Enterprise Plan */}
        <Card className='relative flex flex-col'>
          <CardHeader>
            <CardTitle>Enterprise</CardTitle>
            <CardDescription>
              <div className='flex items-baseline gap-2 mt-2'>
                <span className='text-3xl font-bold'>Custom Pricing</span>
              </div>
            </CardDescription>
          </CardHeader>
          <CardContent className='flex-grow'>
            <ul className='space-y-3'>
              <li className='flex items-center gap-2'>
                <Check className='h-5 w-5 text-[#6659df]' />
                <span>Everything in Pro, plus</span>
              </li>
              <li className='flex items-center gap-2'>
                <Check className='h-5 w-5 text-[#6659df]' />
                <span>Customizable AI models and prompt tuning</span>
              </li>
              <li className='flex items-center gap-2'>
                <Check className='h-5 w-5 text-[#6659df]' />
                <span>Dedicated account manager</span>
              </li>
              <li className='flex items-center gap-2'>
                <Check className='h-5 w-5 text-[#6659df]' />
                <span>Private brand training on Reddit & YouTube data</span>
              </li>
              <li className='flex items-center gap-2'>
                <Check className='h-5 w-5 text-[#6659df]' />
                <span>API Access and Integration Support</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button
              asChild
              className='w-full'
            >
              <Link href='mailto:brittany@enception.ai'>Contact Sales</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* FAQ Section */}
      <div className='w-full max-w-4xl mt-24'>
        <h2 className='text-2xl md:text-3xl font-bold mb-8 text-center'>Frequently Asked Questions</h2>
        <Accordion type='single' collapsible className='w-full'>
          <AccordionItem value='payment'>
            <AccordionTrigger>What payment methods do you accept?</AccordionTrigger>
            <AccordionContent>
              We accept all major credit cards, including Visa, Mastercard, and American Express. For Enterprise plans,
              we also support wire transfers and invoicing.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value='change-plan'>
            <AccordionTrigger>Can I change my plan later?</AccordionTrigger>
            <AccordionContent>
              Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing
              cycle.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value='trial'>
            <AccordionTrigger>Do you offer a free trial?</AccordionTrigger>
            <AccordionContent>
              Yes, we offer a 14-day free trial on our Growth plan. No credit card required to start.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value='support'>
            <AccordionTrigger>What kind of support do you provide?</AccordionTrigger>
            <AccordionContent>
              All plans include email support. Growth plans include priority support, while Enterprise plans come with
              24/7 dedicated support and a personal account manager.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      {/* Mobile-specific CTA */}
      <div className='fixed bottom-0 left-0 right-0 p-4 bg-white border-t lg:hidden'>
        <Button asChild className='w-full bg-gradient-to-r from-[#6659df] to-pink-600 text-white'>
          <Link href='https://www.enception.ai/account/login'>Get Started Now</Link>
        </Button>
      </div>
    </main>
  );
} 