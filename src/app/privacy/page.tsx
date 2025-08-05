import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | Vona by Enception',
  description: 'Learn how Vona by Enception collects, uses, and protects your personal information.',
  alternates: {
    canonical: 'https://tryvona.ai/privacy',
  },
};

export default function PrivacyPage() {
  return (
    <main className='flex min-h-screen flex-col items-center p-24'>
      {/* Hero Section */}
      <div className='z-10 max-w-5xl w-full items-center justify-between text-sm lg:flex mb-12'>
        <h1 className='text-6xl font-bold bg-gradient-to-r from-[#6659df] to-pink-600 bg-clip-text text-transparent pb-1'>
          Privacy Policy
        </h1>
      </div>

      <div className='max-w-4xl w-full space-y-12'>
        {/* Last Updated Section */}
        <div className='text-sm text-gray-500'>
          Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
        </div>

        {/* Introduction */}
        <section className='group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100'>
          <h2 className='text-2xl font-semibold mb-4'>Introduction</h2>
          <p className='text-gray-600 mb-4'>
            At Vona, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and
            safeguard your information when you use our services.
          </p>
        </section>

        {/* Information We Collect */}
        <section className='group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100'>
          <h2 className='text-2xl font-semibold mb-4'>Information We Collect</h2>
          <p className='text-gray-600 mb-4'>We collect information that you provide directly to us, including:</p>
          <ul className='list-disc pl-6 text-gray-600 space-y-2'>
            <li>Account information (name, email, password)</li>
            <li>Company information</li>
            <li>Payment information</li>
            <li>Usage data and analytics</li>
            <li>Communication preferences</li>
          </ul>
        </section>

        {/* How We Use Your Information */}
        <section className='group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100'>
          <h2 className='text-2xl font-semibold mb-4'>How We Use Your Information</h2>
          <p className='text-gray-600 mb-4'>We use the collected information to:</p>
          <ul className='list-disc pl-6 text-gray-600 space-y-2'>
            <li>Provide and maintain our services</li>
            <li>Improve and personalize user experience</li>
            <li>Process payments and prevent fraud</li>
            <li>Send administrative information</li>
            <li>Provide customer support</li>
          </ul>
        </section>

        {/* Data Security */}
        <section className='group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100'>
          <h2 className='text-2xl font-semibold mb-4'>Data Security</h2>
          <p className='text-gray-600 mb-4'>
            We implement appropriate technical and organizational security measures to protect your personal information.
            However, no method of transmission over the Internet is 100% secure.
          </p>
        </section>

        {/* Data Sharing */}
        <section className='group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100'>
          <h2 className='text-2xl font-semibold mb-4'>Data Sharing and Disclosure</h2>
          <p className='text-gray-600 mb-4'>We may share your information with:</p>
          <ul className='list-disc pl-6 text-gray-600 space-y-2'>
            <li>Service providers and business partners</li>
            <li>Legal authorities when required by law</li>
            <li>Other parties with your consent</li>
          </ul>
        </section>

        {/* Your Rights */}
        <section className='group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100'>
          <h2 className='text-2xl font-semibold mb-4'>Your Rights</h2>
          <p className='text-gray-600 mb-4'>You have the right to:</p>
          <ul className='list-disc pl-6 text-gray-600 space-y-2'>
            <li>Access your personal information</li>
            <li>Correct inaccurate data</li>
            <li>Request deletion of your data</li>
            <li>Object to data processing</li>
            <li>Data portability</li>
          </ul>
        </section>

        {/* Cookies */}
        <section className='group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100'>
          <h2 className='text-2xl font-semibold mb-4'>Cookies and Tracking</h2>
          <p className='text-gray-600 mb-4'>
            We use cookies and similar tracking technologies to track activity on our services and hold certain
            information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
          </p>
        </section>

        {/* Changes to Privacy Policy */}
        <section className='group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100'>
          <h2 className='text-2xl font-semibold mb-4'>Changes to This Privacy Policy</h2>
          <p className='text-gray-600 mb-4'>
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new
            Privacy Policy on this page and updating the "Last Updated" date.
          </p>
        </section>

        {/* Contact Information */}
        <section className='group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100'>
          <h2 className='text-2xl font-semibold mb-4'>Contact Us</h2>
          <p className='text-gray-600'>
            If you have any questions about this Privacy Policy, please contact us at{' '}
            <a href='mailto:brittany@enception.ai' className='text-[#6659df] hover:text-[#6659df]/90'>
              brittany@enception.ai
            </a>
          </p>
        </section>
      </div>
    </main>
  );
} 