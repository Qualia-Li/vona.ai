'use client'

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { LinkPreview } from "@/components/ui/link-preview"

export default function WonderfurDashboard() {
  const landingPages = [
    {
      url: "https://wonderfur.vercel.app/pages/age-specific-nutrition-tailoring-diets-for-puppies-adults-and-senior-dogs",
      title: "Age-Specific Nutrition: Tailoring Diets for Puppies, Adults, and Senior Dogs",
      status: "deploying"
    },
    {
      url: "https://wonderfur.vercel.app/pages/beyond-kibble-why-a-balanced-diet-is-crucial-for-your-dogs-longevity",
      title: "Beyond Kibble: Why a Balanced Diet is Crucial for Your Dog's Longevity",
      status: "deploying"
    },
    {
      url: "https://wonderfur.vercel.app/pages/decoding-pet-food-labels-a-scientific-guide-for-australian-consumers",
      title: "Decoding Pet Food Labels: A Scientific Guide for Australian Consumers",
      status: "deploying"
    },
    {
      url: "https://wonderfur.vercel.app/pages/feeding-your-feline-understanding-your-cats-unique-nutritional-needs",
      title: "Feeding Your Feline: Understanding Your Cat's Unique Nutritional Needs",
      status: "deploying"
    },
    {
      url: "https://wonderfur.vercel.app/pages/hydration-for-hounds-the-overlooked-pillar-of-canine-health",
      title: "Hydration for Hounds: The Overlooked Pillar of Canine Health",
      status: "deploying"
    },
    {
      url: "https://wonderfur.vercel.app/pages/kitten-to-cat-nutritional-milestones-for-healthy-feline-development",
      title: "Kitten to Cat: Nutritional Milestones for Healthy Feline Development",
      status: "deploying"
    },
    {
      url: "https://wonderfur.vercel.app/pages/micronutrients-for-pets-essential-vitamins-and-minerals-for-a-thriving-life",
      title: "Micronutrients for Pets: Essential Vitamins and Minerals for a Thriving Life",
      status: "deploying"
    },
    {
      url: "https://wonderfur.vercel.app/pages/the-humanization-of-pets-why-quality-nutrition-matters-more-than-ever",
      title: "The Humanization of Pets: Why Quality Nutrition Matters More Than Ever",
      status: "deploying"
    },
    {
      url: "https://wonderfur.vercel.app/pages/the-role-of-macronutrients-in-your-cats-optimal-health-protein-fats-and-carbs-explained",
      title: "The Role of Macronutrients in Your Cat's Optimal Health: Protein, Fats, and Carbs Explained",
      status: "deploying"
    },
    {
      url: "https://wonderfur.vercel.app/pages/the-science-of-pet-nutrition-what-every-australian-pet-owner-needs-to-know",
      title: "The Science of Pet Nutrition: What Every Australian Pet Owner Needs to Know",
      status: "deploying"
    }
  ]

  const youtubeContent: { type: 'video' | 'short'; url: string; title: string }[] = [
  ];

  const redditPosts = [
    {
      url: "https://www.reddit.com/r/HubermanLab/comments/1kki9bs/is_there_any_episode_about_pets_nutritions/",
      title: "Is there any episode about pets nutritions?",
      date: "29-May"
    },
    {
      url: "https://www.reddit.com/r/AskVet/comments/1lobqye/dog_having_digestion_issues_any_advice_australia/",
      title: "Dog having digestion issues, any advice? (Australia)",
      date: "29-June"
    },
    {
      url: "https://www.reddit.com/r/vet/comments/1lqkcbr/should_i_give_my_dogs_nutritions_like_omega3/",
      title: "Should I give my dogs nutritions like Omega3?",
      date: "02-Jul"
    }
  ]

  const quoraAnswers: { url: string; title: string; date: string }[] = [
    // {
    //   url: "https://www.quora.com/What-is-the-best-affordable-smart-ring-other-than-Oura",
    //   title: "What's the best affordable smart ring other than Oura?",
    //   date: "11-May"
    // }
  ]

  const indexedCounts = {
    internet: {
      platform: "Internet",
      count: 78,
      icon: "🌐",
      searchUrl: "https://www.google.com/search?q=wonderfur"
    },
    reddit: {
      platform: "Reddit",
      count: 374,
      icon: "🔸",
      searchUrl: "https://www.google.com/search?q=site:reddit.com+wonderfur"
    },
    youtube: {
      platform: "YouTube",
      count: 256,
      icon: "📺",
      searchUrl: "https://www.google.com/search?q=site:youtube.com+wonderfur"
    }
  }

  return (
    <div className='container mx-auto p-6'>
      {/* Company Info */}
      <div className='flex items-center gap-6 mb-8'>
        <Image
          src='https://wonderfur.vercel.app/images/logo.svg'
          alt='Wonderfur Logo'
          width={200}
          height={60}
          unoptimized
          className='object-contain p-2'
        />
        <div>
          <h1 className='text-2xl font-bold'>Wonderfur</h1>
          <a href='https://wonderfur.com' className='text-blue-600 hover:underline'>
            wonderfur.com
          </a>
        </div>
      </div>

      {/* Main Sections */}
      <div className='grid gap-6'>
        {/* Content Created Section */}
        <Card className='p-6'>
          <h2 className='text-xl font-semibold mb-4'>Content Created</h2>

          {/* Landing Pages */}
          <div className='mb-6'>
            <h3 className='text-lg font-medium mb-3'>Landing Pages</h3>
            <div className='grid gap-4'>
              {landingPages.map((page, i) => (
                <div key={i}>
                  <div className='flex justify-between items-center mb-2'>
                    <Badge className='mb-2'>Landing Page</Badge>
                    {page.status === 'deploying' && <Badge variant='secondary'>Deploying...</Badge>}
                  </div>
                  <LinkPreview url={page.url} title={page.title} />
                </div>
              ))}
            </div>
          </div>

          {/* YouTube Content */}
          <div className='mb-6'>
            <h3 className='text-lg font-medium mb-3'>YouTube Content</h3>
            <div className='grid gap-4'>
              {youtubeContent.map((content, i) => (
                <div key={i}>
                  <Badge className='mb-2'>{content.type === 'video' ? 'Video' : 'Short'}</Badge>
                  <LinkPreview url={content.url} title={content.title} />
                </div>
              ))}
            </div>
          </div>

          {/* Reddit Posts */}
          <div>
            <h3 className='text-lg font-medium mb-3'>Reddit Posts</h3>
            <div className='grid gap-4'>
              {redditPosts.map((post, i) => (
                <div key={i}>
                  <div className='flex justify-between items-center mb-2'>
                    <Badge>Reddit</Badge>
                    <span className='text-sm text-gray-500'>{post.date}</span>
                  </div>
                  <LinkPreview url={post.url} title={post.title} />
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Quora Answers */}
        <Card className='p-6'>
          <h2 className='text-xl font-semibold mb-4'>Quora Answers</h2>
          <div className='grid gap-4'>
            {quoraAnswers.map((answer, i) => (
              <div key={i}>
                <Badge>Quora</Badge>
                <LinkPreview url={answer.url} title={answer.title} />
              </div>
            ))}

            {quoraAnswers.length === 0 && <p className='text-gray-500'>Coming soon...</p>}
          </div>
        </Card>

        {/* Indexed Counts Section */}
        <Card className='p-6'>
          <h2 className='text-xl font-semibold mb-4'>Indexed Counts</h2>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
            {Object.values(indexedCounts).map((platform) => (
              <a
                key={platform.platform}
                href={platform.searchUrl}
                target='_blank'
                rel='noopener noreferrer'
                className='border rounded-lg p-4 text-center transition-all hover:shadow-lg hover:border-blue-300 cursor-pointer'
              >
                <div className='text-4xl mb-2'>{platform.icon}</div>
                <h3 className='text-lg font-medium mb-2'>{platform.platform}</h3>
                <div className='text-3xl font-bold text-blue-600'>{platform.count}</div>
                <div className='text-sm text-gray-600 mt-1'>mentions</div>
              </a>
            ))}
          </div>
        </Card>

        {/* Traffic Volume Section */}
        <Card className='p-6'>
          <h2 className='text-xl font-semibold mb-4'>Traffic Volume</h2>
          <p className='text-gray-600'>Coming soon...</p>
        </Card>
      </div>
    </div>
  );
} 