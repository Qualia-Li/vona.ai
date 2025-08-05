import Image from 'next/image';
import { Metadata } from 'next';

// JSON-LD structured data
export const generateMetadata = () => {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Vona by Enception',
    description: 'AI-powered search optimization platform helping brands grow in the age of AI-native search',
    url: 'https://tryvona.ai',
    founders: [
      {
        '@type': 'Person',
        name: 'Quanlai Li',
        jobTitle: 'Co-founder & CEO',
      },
      {
        '@type': 'Person',
        name: 'Brittany Jiao',
        jobTitle: 'Co-founder & COO',
      },
    ],
  };

  return {
    alternates: {
      canonical: 'https://tryvona.ai/career',
    },
    other: {
      'script:ld+json': JSON.stringify(jsonLd),
    },
  };
};

// export const metadata: Metadata = {
        //   title: 'Careers at Vona by Enception | Join Our Team',
        //   description: 'Join Vona by Enception and help shape the future of AI-powered search optimization. View our open positions in engineering, marketing, and internships.',
//   alternates: {
  //     canonical: 'https://tryvona.ai/careers',
//   },
// };

export default function CareersPage() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      {/* Hero Section */}
      <div className="z-10 max-w-5xl w-full items-center justify-between text-sm lg:flex mb-12">
        <h1 className="text-6xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Careers at Vona by Enception
        </h1>
      </div>

      {/* How to Apply Section */}
      <div className="w-full max-w-5xl mb-16">
        <div className="group rounded-xl border border-transparent p-8 bg-gradient-to-r from-purple-600/10 to-pink-600/10">
          <h2 className="text-2xl font-bold mb-4">How to Apply</h2>
          <p className="text-lg">
            Share your resume, portfolio, and a cover letter detailing your journey and interest in the role. 
            Send your applications to <a href="mailto:quanlai@enception.ai" className="text-purple-600 hover:text-purple-700">quanlai@enception.ai</a>.
          </p>
        </div>
      </div>

      {/* Engineering Section */}
      <section className="w-full max-w-5xl mb-16">
        <h2 className="text-4xl font-bold mb-8 flex items-center gap-2">
          <span>🧑🏽‍💻</span>
          <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Engineering</span>
        </h2>
        
        {/* Full-time Positions */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold mb-6 text-gray-700">Full-time Positions</h3>
          <div className="group rounded-xl border p-8 hover:border-gray-300 hover:bg-gray-100 transition-colors">
            <h3 className="text-2xl font-bold mb-2">Tech Lead / Founding Engineer</h3>
            <p className="text-gray-600 mb-4">Palo Alto / San Jose, California • Full-Time</p>
            
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold mb-2">Role Overview:</h4>
                <p className="text-gray-700">As the Tech Lead at Vona by Enception, you will play a crucial role in shaping the technical direction of the company. You will lead building and scaling AI-powered products, ensuring high performance, reliability, and seamless user experiences.</p>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Key Responsibilities:</h4>
                <ul className="list-disc pl-5 space-y-1 text-gray-700">
                  <li>Hands-on development of backend services, microservices architecture, and AI integrations</li>
                  <li>Write, review, and optimize code while following best practices</li>
                  <li>Lead the technical architecture and development of Vona by Enception's AI-driven workspace</li>
                  <li>Design and optimize systems for high performance</li>
                  <li>Implement and deploy cutting-edge AI models</li>
                  <li>Oversee backend infrastructure on AWS</li>
                  <li>Mentor and guide engineers</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Required Qualifications:</h4>
                <ul className="list-disc pl-5 space-y-1 text-gray-700">
                  <li>5+ years of experience in software engineering</li>
                  <li>Proven hands-on leadership experience</li>
                  <li>Strong programming skills in Python, JavaScript, FastAPI, and TailwindUI</li>
                  <li>Proficiency in AWS services</li>
                  <li>Experience with microservices and container orchestration</li>
                  <li>Experience with various databases (Postgres, DynamoDB, Qdrant, Neo4j)</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Benefits:</h4>
                <ul className="list-disc pl-5 space-y-1 text-gray-700">
                  <li>Equity Options</li>
                  <li>Visa Sponsorship</li>
                  <li>Flexible Work Environment</li>
                  <li>Professional Development</li>
                  <li>Impactful Role</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Engineering Internships */}
        <div>
          <h3 className="text-2xl font-bold mb-6 text-gray-700">Internships</h3>
          <div className="grid gap-8">
            {/* LLM Fine-Tuning Intern */}
            <div className="group rounded-xl border p-8 hover:border-gray-300 hover:bg-gray-100 transition-colors">
              <h3 className="text-2xl font-bold mb-2">LLM Fine-Tuning Intern</h3>
              <p className="text-gray-600 mb-4">Palo Alto / San Jose, California</p>
              
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-2">Role Overview:</h4>
                  <p className="text-gray-700">
                    We are seeking an LLM Fine-Tuning Intern to join our dynamic team. In this role, you will fine-tune large 
                    language models (LLMs) on GPU clusters using data and compute resources provided by Vona by Enception. The position 
                    also includes contributing to the writing of a workshop paper and submitting it for publication.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Responsibilities:</h4>
                  <ul className="list-disc pl-5 space-y-1 text-gray-700">
                    <li>Fine-tune large language models (LLMs) on GPU clusters using provided resources</li>
                    <li>Contribute to the writing of a workshop paper and submit it for publication</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Requirements:</h4>
                  <ul className="list-disc pl-5 space-y-1 text-gray-700">
                    <li>Currently pursuing or completed a degree in Computer Science, Software Engineering, or related field</li>
                    <li>Basic understanding of AI research and machine learning</li>
                    <li>Strong analytical and problem-solving skills</li>
                    <li>Excellent attention to detail and communication skills</li>
                    <li>Familiarity with GPU clusters and machine learning frameworks is a plus</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Software Development Intern */}
            <div className="group rounded-xl border p-8 hover:border-gray-300 hover:bg-gray-100 transition-colors">
              <h3 className="text-2xl font-bold mb-2">Software Development Intern</h3>
              <p className="text-gray-600 mb-4">Palo Alto / San Jose, California</p>
              
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-2">Role Overview:</h4>
                  <p className="text-gray-700">
                    We are seeking talented Software Development Interns to join our dynamic engineering team. This is an 
                    exciting opportunity to work on cutting-edge AI-powered software while gaining invaluable industry experience. 
                    Our previous interns have gone on to secure full-time positions at leading tech companies including Google, 
                    Meta, and TikTok.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Responsibilities:</h4>
                  <ul className="list-disc pl-5 space-y-1 text-gray-700">
                    <li>Develop and maintain features for our web application using modern frameworks</li>
                    <li>Write clean, efficient, and well-documented code</li>
                    <li>Collaborate with senior engineers on architecture and implementation</li>
                    <li>Participate in code reviews and technical discussions</li>
                    <li>Debug and optimize application performance</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Requirements:</h4>
                  <ul className="list-disc pl-5 space-y-1 text-gray-700">
                    <li>Currently pursuing a degree in Computer Science or related field</li>
                    <li>Strong programming fundamentals and problem-solving skills</li>
                    <li>Experience with JavaScript/TypeScript and React</li>
                    <li>Familiarity with modern web development practices</li>
                    <li>Excellent communication and teamwork skills</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">What We Provide:</h4>
                  <ul className="list-disc pl-5 space-y-1 text-gray-700">
                    <li>Mentorship from experienced engineers</li>
                    <li>Hands-on experience with latest technologies</li>
                    <li>Exposure to full software development lifecycle</li>
                    <li>Competitive compensation</li>
                    <li>Potential for full-time conversion</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sales Section - New */}
      <section className="w-full max-w-5xl mb-16">
        <h2 className="text-4xl font-bold mb-8 flex items-center gap-2">
          <span>💼</span>
          <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Sales</span>
        </h2>
        
        <div className="group rounded-xl border p-8 hover:border-gray-300 hover:bg-gray-100 transition-colors">
          <h3 className="text-2xl font-bold mb-2">Enterprise Sales Executive</h3>
          <p className="text-gray-600 mb-4">Palo Alto / San Jose, California • Full-Time</p>
          
          <div className="space-y-6">
            <div>
              <h4 className="font-semibold mb-2">Role Overview:</h4>
              <p className="text-gray-700">
                We're looking for an experienced Enterprise Sales Executive to drive our revenue growth by selling our 
                AI-powered search optimization solutions to enterprise clients. This role will be instrumental in expanding 
                our market presence and building long-term relationships with key accounts.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Responsibilities:</h4>
              <ul className="list-disc pl-5 space-y-1 text-gray-700">
                <li>Develop and execute strategic sales plans to meet or exceed revenue targets</li>
                <li>Build and maintain relationships with enterprise-level clients</li>
                <li>Create compelling presentations and proposals for potential clients</li>
                <li>Collaborate with product and engineering teams to understand client needs</li>
                <li>Navigate complex sales cycles and multi-stakeholder decision processes</li>
                <li>Maintain accurate sales forecasts and pipeline management</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Requirements:</h4>
              <ul className="list-disc pl-5 space-y-1 text-gray-700">
                <li>5+ years of enterprise software sales experience</li>
                <li>Proven track record of closing enterprise deals ($100K+ ARR)</li>
                <li>Experience selling AI/ML or SaaS solutions preferred</li>
                <li>Strong understanding of enterprise sales cycles</li>
                <li>Excellent presentation and negotiation skills</li>
                <li>Bachelor's degree in Business, Marketing, or related field</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Benefits:</h4>
              <ul className="list-disc pl-5 space-y-1 text-gray-700">
                <li>Competitive base salary + uncapped commission</li>
                <li>Equity package</li>
                <li>Flexible work environment</li>
                <li>Professional development budget</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Marketing Section */}
      <section className="w-full max-w-5xl mb-16">
        <h2 className="text-4xl font-bold mb-8 flex items-center gap-2">
          <span>📈</span>
          <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Marketing</span>
        </h2>
        
        <div className="group rounded-xl border p-8 hover:border-gray-300 hover:bg-gray-100 transition-colors">
          <h3 className="text-2xl font-bold mb-2">Social Media Marketing Specialist</h3>
          <p className="text-gray-600 mb-4">Palo Alto / San Jose, California</p>
          
          <div className="space-y-6">
            <div>
              <h4 className="font-semibold mb-2">Role Overview:</h4>
              <p className="text-gray-700">
                We are seeking a Social Media Marketing Specialist to enhance our online presence and drive traffic conversions. 
                This role involves creating and posting engaging content on social media platforms and earning commissions based 
                on the traffic conversions generated from your efforts.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Responsibilities:</h4>
              <ul className="list-disc pl-5 space-y-1 text-gray-700">
                <li>Develop and execute social media strategies to increase brand awareness</li>
                <li>Create and post engaging content across various social media platforms</li>
                <li>Monitor social media channels and respond to audience interactions</li>
                <li>Analyze performance metrics and optimize strategies for better engagement</li>
                <li>Collaborate with the marketing team to align social media efforts with overall marketing goals</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Requirements:</h4>
              <ul className="list-disc pl-5 space-y-1 text-gray-700">
                <li>Proven experience in social media marketing</li>
                <li>Strong understanding of social media platforms and trends</li>
                <li>Excellent communication and creative skills</li>
                <li>Ability to analyze data and derive actionable insights</li>
                <li>Self-motivated with a results-driven approach</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Compensation:</h4>
              <ul className="list-disc pl-5 space-y-1 text-gray-700">
                <li>Base salary with commission opportunities based on traffic conversions</li>
                <li>Potential for bonuses based on performance</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
