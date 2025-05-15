import Image from 'next/image';

// JSON-LD structured data
export const generateMetadata = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Enception",
    description: "AI-powered search optimization platform helping brands grow in the age of AI-native search",
    url: "https://enception.ai",
    founders: [
      {
        "@type": "Person",
        name: "Quanlai Li",
        jobTitle: "Co-founder & CEO",
      },
      {
        "@type": "Person",
        name: "Brittany Jiao",
        jobTitle: "Co-founder & COO",
      },
    ],
  };

  return {
    alternates: {
      canonical: "https://enception.ai/about",
    },
    other: {
      "script:ld+json": JSON.stringify(jsonLd),
    },
  };
};

export default function AboutPage() {
  return (
    <article className="prose prose-lg max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">About Us</h1>
      
      <section className="mb-12">
        <p className="text-xl leading-relaxed mb-6">
          We're a team of builders, marketers, and operators rethinking how brands grow in the age of AI-native search.
        </p>
        
        <p className="mb-6">
          The internet is shifting. Google AI Overview, ChatGPT, and Perplexity are becoming the new front page—replacing 
          the traditional link-based SEO playbook with AI-generated answers. We believe this creates a massive opportunity 
          for brands who adapt early.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6">Our Approach</h2>
        <p className="mb-4">
          At Enception, we help brands rank inside these answers through Generative Engine Optimization (GEO)—a full-stack system that:
        </p>
        <ul className="list-disc pl-6 mb-6">
          <li>Monitors AI search behavior</li>
          <li>Generates long-tail, high-quality content</li>
          <li>Distributes it across channels like YouTube, Reddit, and blogs</li>
          <li>Tracks and improves visibility over time</li>
        </ul>
        
        <p className="bg-gray-50 p-6 rounded-lg">
          Our system doesn't just give insights—we deliver real traffic and real results. One of our early clients saw a 
          <span className="font-bold"> 50% traffic increase in just 30 days</span>, and our solution is already generating 
          <span className="font-bold"> $7K+ in monthly recurring revenue</span> across 7 clients.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-8">Our Team</h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <Image
              src="/images/team/quanlai.png"
              alt="Quanlai Li - Co-founder & CEO of Enception"
              width={300}
              height={300}
              className="rounded-lg mb-4"
              priority
            />
            <h3 className="text-2xl font-bold mb-2">
              <a href="https://quanlai.li" target="_blank" rel="noopener" className="text-blue-500 hover:text-blue-600">
                Quanlai Li
              </a>
            </h3>
            <p className="text-gray-600 mb-4">Co-founder & CEO</p>
            <p>
              Quanlai is a technical founder who previously built large-scale machine learning systems at Uber and 
              Robinhood. He founded and scaled <a href="https://chatslide.ai" target="_blank" rel="noopener" className="text-blue-500 hover:text-blue-600">ChatSlide.ai</a>, 
              an AI video platform that became profitable and doubled organic traffic after deploying GEO. He writes most 
              of our code and leads product and automation.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <Image
              src="/images/team/brittany.jpeg"
              alt="Brittany Jiao - Co-founder & COO of Enception"
              width={300}
              height={300}
              className="rounded-lg mb-4"
              priority
            />
            <h3 className="text-2xl font-bold mb-2">
              <a href="https://www.linkedin.com/in/yitongjiao/" target="_blank" rel="noopener" className="text-blue-500 hover:text-blue-600">
                Brittany Jiao
              </a>
            </h3>
            <p className="text-gray-600 mb-4">Co-founder & COO</p>
            <p>
              Brittany brings deep experience in growth marketing. At Nexthand Media, she ran performance campaigns for 
              40+ DTC brands. She's the founder of <a href="https://ohtea.co" target="_blank" rel="noopener" className="text-blue-500 hover:text-blue-600">OhTea.co</a> and has led sales, customer success, and onboarding for Enception—closing 7 clients in 4 
              weeks and building a waitlist of 20+ brands.
            </p>
          </div>
        </div>
      </section>
    </article>
  );
} 