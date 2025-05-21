import { Instagram, Twitter, MapPin } from 'lucide-react'
import Link from 'next/link'

export function Footer() {
  return (
    <footer className="border-t">
      <div className="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
        <div className="flex justify-center space-x-6 md:order-2">
          <Link
            href="https://www.instagram.com/enception_ai/"
            target="_blank"
            className="text-gray-400 hover:text-purple-600"
          >
            <span className="sr-only">Instagram</span>
            <Instagram className="h-6 w-6" />
          </Link>
          <Link
            href="https://twitter.com/enception_ai"
            target="_blank"
            className="text-gray-400 hover:text-purple-600"
          >
            <span className="sr-only">Twitter</span>
            <Twitter className="h-6 w-6" />
          </Link>
        </div>
        <div className="mt-8 md:mt-0 flex flex-col items-start">
          <nav className="flex justify-center space-x-6 md:order-2 mb-4">
            <Link
              href="/about"
              className="text-sm leading-6 text-gray-600 hover:text-purple-600"
            >
              About
            </Link>
            <Link
              href="/career"
              className="text-sm leading-6 text-gray-600 hover:text-purple-600"
            >
              Careers
            </Link>
          </nav>
          <p className="text-center text-xs leading-5 text-gray-500">
            &copy; {new Date().getFullYear()} Enception, Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
} 