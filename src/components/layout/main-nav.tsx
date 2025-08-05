'use client';

import Link from 'next/link';
import Image from 'next/image';

export function MainNav() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className='flex items-center justify-between w-full'>
      <Link href='/' className='flex items-center'>
        <Image
          src='/images/vona_logo.png'
          alt='Vona'
          width={120}
          height={40}
          className='h-8 w-auto'
        />
      </Link>
      
      <div className='hidden md:flex items-center space-x-8'>
        <button 
          onClick={() => scrollToSection('features')}
          className='text-gray-700 hover:text-purple-600 transition-colors font-medium'
        >
          Features
        </button>
        <button 
          onClick={() => scrollToSection('usecases')}
          className='text-gray-700 hover:text-purple-600 transition-colors font-medium'
        >
          Use Cases
        </button>
        <button 
          onClick={() => scrollToSection('testimonials')}
          className='text-gray-700 hover:text-purple-600 transition-colors font-medium'
        >
          Testimonials
        </button>
      </div>
    </nav>
  );
}
