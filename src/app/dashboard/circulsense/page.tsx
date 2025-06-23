import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

export default function CirculSenseDashboard() {
  const landingPages = [
    {
      url: "https://pages.circulsense.com",
      title: "CirculSense - The World's ONLY Adaptive-Fit Smart Ring"
    },
    {
      url: "https://pages.circulsense.com/spo2",
      title: "Real-Time SpO2 Monitoring Smart Ring"
    },
    {
      url: "https://pages.circulsense.com/medical-grade-smart-rings",
      title: "Medical-Grade Health Monitoring Smart Ring"
    },
    {
      url: "https://pages.circulsense.com/sleep-apnea-monitoring",
      title: "Sleep Apnea Detection Smart Ring"
    }
  ]

  const youtubeContent = [
    {
      type: 'video',
      url: 'https://www.youtube.com/watch?v=MRVJnGpqxYE',
      title: 'Goodbye Smartwatches? The Future of Health Is On Your Finger',
    },
    {
      type: 'short',
      url: 'https://www.youtube.com/shorts/XgIFg0xJj8E',
      title: 'A Smart Ring That Tracks My Sleep, Stress & Health? Circul Review',
    },
    {
      type: 'short',
      url: 'https://www.youtube.com/shorts/67m86X88diQ',
      title: 'Can This Ring Really Track Your Health? Circul Ring Review',
    },
  ];

  const redditPosts = [
    {
      url: "https://www.reddit.com/r/SmartRings/comments/1km7n5s/whats_the_best_affordable_smart_ring_other_than/",
      title: "What's the best affordable smart ring other than Oura?",
      date: "11-May"
    },
    {
      url: "https://www.reddit.com/r/HubermanLab/comments/1km7onx/comment/ms838r1/?context=3",
      title: "Smart Ring Discussion - HubermanLab",
      date: "11-May"
    },
    {
      url: "https://www.reddit.com/r/ouraring/comments/1km7rgt/anyone_here_ever_tried_other_rings_just_for_spo2/",
      title: "Anyone here ever tried other rings just for SpO2?",
      date: "11-May"
    },
    {
      url: "https://www.reddit.com/r/Biohackers/comments/1km7t06/anyone_tracking_spo2_overnight_like_continuously/",
      title: "Anyone tracking SpO2 overnight like continuously?",
      date: "11-May"
    },
    {
      url: "https://www.reddit.com/r/SmartRings/comments/1kk3o9y/comment/mwy5e4u/",
      title: "Smart Ring Comparison Discussion",
      date: "9-Jun"
    },
    {
      url: "https://www.reddit.com/r/SmartRings/comments/1jps4hp/comment/mwy4yh9/",
      title: "CirculSense Ring Features Review",
      date: "9-Jun"
    },
    {
      url: "https://www.reddit.com/r/SmartRings/comments/1kvag2m/comment/mwy5tia/",
      title: "Smart Ring Technology Discussion",
      date: "9-Jun"
    },
    {
      url: "https://www.reddit.com/r/SmartRings/comments/1k31qv3/comment/mwy5zei/",
      title: "CirculSense vs Other Smart Rings",
      date: "9-Jun"
    }
  ]

  return (
    <div className="container mx-auto p-6">
      {/* Company Info */}
      <div className="flex items-center gap-6 mb-8">
        <Image 
          src="https://circulsense.com/cdn/shop/files/logo-p2.png?v=1746601447"
          alt="CirculSense Logo"
          width={200}
          height={60}
          unoptimized
          className="object-contain bg-black p-2"
        />
        <div>
          <h1 className="text-2xl font-bold">CirculSense</h1>
          <a href="https://circulsense.com" className="text-blue-600 hover:underline">
            circulsense.com
          </a>
        </div>
      </div>

      {/* Main Sections */}
      <div className="grid gap-6">
        {/* Content Created Section */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Content Created</h2>
          
          {/* Landing Pages */}
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-3">Landing Pages</h3>
            <div className="grid gap-3">
              {landingPages.map((page, i) => (
                <div key={i} className="border rounded-lg p-3">
                  <Badge>Landing Page</Badge>
                  <a href={page.url} className="block mt-2 text-blue-600 hover:underline truncate">
                    {page.url}
                  </a>
                  <p className="text-sm text-gray-600 mt-1">{page.title}</p>
                </div>
              ))}
            </div>
          </div>

          {/* YouTube Content */}
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-3">YouTube Content</h3>
            <div className="grid gap-3">
              {youtubeContent.map((content, i) => (
                <div key={i} className="border rounded-lg p-3">
                  <Badge>{content.type === 'video' ? 'Video' : 'Short'}</Badge>
                  <a href={content.url} className="block mt-2 text-blue-600 hover:underline truncate">
                    {content.url}
                  </a>
                  <p className="text-sm text-gray-600 mt-1">{content.title}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Reddit Posts */}
          <div>
            <h3 className="text-lg font-medium mb-3">Reddit Posts</h3>
            <div className="grid gap-3">
              {redditPosts.map((post, i) => (
                <div key={i} className="border rounded-lg p-3">
                  <div className="flex justify-between items-center">
                    <Badge>Reddit</Badge>
                    <span className="text-sm text-gray-500">{post.date}</span>
                  </div>
                  <a href={post.url} className="block mt-2 text-blue-600 hover:underline">
                    {post.title}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Indexed Counts Section */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Indexed Counts</h2>
          <p className="text-gray-600">Coming soon...</p>
        </Card>

        {/* Traffic Volume Section */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Traffic Volume</h2>
          <p className="text-gray-600">Coming soon...</p>
        </Card>
      </div>
    </div>
  )
} 