'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Youtube, MessageSquare, Layout } from 'lucide-react';

const workflowSteps = [
	{
		icon: <Youtube className='w-8 h-8' />,
		title: 'YouTube Content',
		description: 'AI-optimized video content generation',
	},
	{
		icon: <MessageSquare className='w-8 h-8' />,
		title: 'Reddit & Social',
		description: 'Strategic UGC distribution',
	},
	{
		icon: <Layout className='w-8 h-8' />,
		title: 'Product Pages',
		description: 'AI-friendly landing pages',
	},
];

export const Solution = () => {
	return (
		<section className='py-24 bg-white'>
			<div className='container px-4 mx-auto'>
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.5 }}
					className='max-w-4xl mx-auto text-center'
				>
					<h2 className='mb-6 text-4xl font-bold text-gray-900'>We optimize content for AI search, not just Google.</h2>
					<p className='mb-16 text-xl text-gray-600'>
						Our AI agent system generates and distributes long-tail content — including YouTube videos, Reddit posts,
						and product pages — to influence how AIs respond.
					</p>

					<div className='relative'>
						<div className='grid grid-cols-1 gap-8 md:grid-cols-3'>
							{workflowSteps.map((step, index) => (
								<motion.div
									key={index}
									initial={{ opacity: 0, y: 20 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true }}
									transition={{ duration: 0.5, delay: index * 0.1 }}
									className='relative'
								>
									<div className='p-6 bg-gray-50 rounded-lg border border-gray-200 h-full'>
										<div className='flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full text-blue-600'>
											{step.icon}
										</div>
										<h3 className='mb-2 text-xl font-semibold text-gray-900'>{step.title}</h3>
										<p className='text-gray-600'>{step.description}</p>
									</div>
									{index < workflowSteps.length - 1 && (
										<div className='hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2'>
											<ArrowRight className='w-6 h-6 text-gray-400' />
										</div>
									)}
								</motion.div>
							))}
						</div>

						<motion.div
							initial={{ opacity: 0, y: 40 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.5, delay: 0.4 }}
							className='mt-16 p-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg text-white'
						>
							<div className='flex flex-col md:flex-row items-center justify-between'>
								<div className='mb-6 md:mb-0'>
									<h4 className='text-2xl font-semibold'>AI Response Engine</h4>
									<p className='text-blue-100'>Optimized content distribution for maximum AI visibility</p>
								</div>
								<div className='flex items-center space-x-2'>
									<span className='px-4 py-2 bg-white/10 rounded-lg'>ChatGPT</span>
									<span className='px-4 py-2 bg-white/10 rounded-lg'>Google AI</span>
									<span className='px-4 py-2 bg-white/10 rounded-lg'>Perplexity</span>
								</div>
							</div>
						</motion.div>
					</div>
				</motion.div>
			</div>
		</section>
	);
};
