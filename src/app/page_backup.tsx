import { CTA } from '@/components/sections/CTA';
import { Features } from '@/components/sections/Features';
import { Footer } from '@/components/sections/Footer';
import { Hero } from '@/components/sections/Hero';
import { Problem } from '@/components/sections/Problem';
import { Solution } from '@/components/sections/Solution';

export default function Home() {
	return (
		<main>
			<Hero />
			<Problem />
			<Solution />
			<Features />
			<CTA />
			<Footer />
		</main>
	);
}
