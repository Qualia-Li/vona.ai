import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service | Enception',
  description: 'Terms of Service and legal agreements for using Enception\'s AI-powered search optimization platform.',
  alternates: {
    canonical: 'https://enception.ai/terms',
  },
};

export default function TermsPage() {
  return (
    <main className='flex min-h-screen flex-col items-center p-24'>
      {/* Hero Section */}
      <div className='z-10 max-w-5xl w-full items-center justify-between text-sm lg:flex mb-12'>
        <h1 className='text-6xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent'>
          Terms of Service
        </h1>
      </div>

      <div className='max-w-4xl w-full space-y-12'>
        {/* Last Updated Section */}
        <div className='text-sm text-gray-500'>
          Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
        </div>

        {/* Introduction */}
        <section className='group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100'>
          <h2 className='text-2xl font-semibold mb-4'>Welcome to Enception</h2>
          <p className='text-gray-600 mb-4'>
            These Terms of Service ("Terms") govern your access to and use of Enception's website, products, and
            services ("Services"). Please read these Terms carefully before using our Services.
          </p>
          <p className='text-gray-600'>
            By using our Services, you agree to be bound by these Terms. If you disagree with any part of the Terms, you
            may not access our Services.
          </p>
        </section>

        {/* Services Description */}
        <section className='group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100'>
          <h2 className='text-2xl font-semibold mb-4'>Our Services</h2>
          <p className='text-gray-600 mb-4'>
            Enception provides AI-powered search optimization solutions to help brands improve their visibility in
            AI-generated search results. Our Services include, but are not limited to:
          </p>
          <ul className='list-disc pl-6 text-gray-600 space-y-2'>
            <li>AI search behavior monitoring and analysis</li>
            <li>Content generation and optimization</li>
            <li>Multi-channel content distribution</li>
            <li>Performance tracking and analytics</li>
          </ul>
        </section>

        {/* User Responsibilities */}
        <section className='group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100'>
          <h2 className='text-2xl font-semibold mb-4'>User Responsibilities</h2>
          <p className='text-gray-600 mb-4'>When using our Services, you agree to:</p>
          <ul className='list-disc pl-6 text-gray-600 space-y-2'>
            <li>Provide accurate and complete information</li>
            <li>Maintain the security of your account credentials</li>
            <li>Use the Services in compliance with applicable laws and regulations</li>
            <li>Respect intellectual property rights</li>
            <li>Not engage in any unauthorized or harmful activities</li>
          </ul>
        </section>

        {/* Intellectual Property */}
        <section className='group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100'>
          <h2 className='text-2xl font-semibold mb-4'>Intellectual Property</h2>
          <p className='text-gray-600 mb-4'>
            The Services and their original content, features, and functionality are owned by Enception and are
            protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.
          </p>
        </section>

        {/* Privacy */}
        <section className='group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100'>
          <h2 className='text-2xl font-semibold mb-4'>Privacy</h2>
          <p className='text-gray-600 mb-4'>
            Your privacy is important to us. Our Privacy Policy explains how we collect, use, and protect your personal
            information. By using our Services, you agree to our Privacy Policy.
          </p>
        </section>

        {/* Limitation of Liability */}
        <section className='group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100'>
          <h2 className='text-2xl font-semibold mb-4'>Limitation of Liability</h2>
          <p className='text-gray-600 mb-4'>
            In no event shall Enception be liable for any indirect, incidental, special, consequential, or punitive
            damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.
          </p>
        </section>

        {/* Changes to Terms */}
        <section className='group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100'>
          <h2 className='text-2xl font-semibold mb-4'>Changes to Terms</h2>
          <p className='text-gray-600 mb-4'>
            We reserve the right to modify or replace these Terms at any time. We will provide notice of any changes by
            posting the new Terms on this page. Your continued use of the Services after any changes constitutes
            acceptance of those changes.
          </p>
        </section>

        {/* Contact Information */}
        <section className='group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100'>
          <h2 className='text-2xl font-semibold mb-4'>Contact Us</h2>
          <p className='text-gray-600'>
            If you have any questions about these Terms, please contact us at{' '}
            <a href='mailto:quanlai@enception.ai' className='text-purple-600 hover:text-purple-700'>
              quanlai@enception.ai
            </a>
          </p>
        </section>
      </div>
    </main>
  );
} 