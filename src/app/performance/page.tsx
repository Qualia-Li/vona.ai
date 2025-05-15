import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function PerformancePage() {
	return (
		<div>
			<div className='mb-8'>
				<h1 className='text-4xl font-bold'>Performance Monitoring</h1>
				<p className='text-muted-foreground mt-2'>
					Track your content's performance across AI search results and platforms.
				</p>
			</div>

			<Tabs defaultValue='overview' className='space-y-4'>
				<TabsList>
					<TabsTrigger value='overview'>Overview</TabsTrigger>
					<TabsTrigger value='keywords'>Keywords</TabsTrigger>
					<TabsTrigger value='platforms'>Platforms</TabsTrigger>
				</TabsList>

				<TabsContent value='overview' className='space-y-4'>
					<div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
						<Card>
							<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
								<CardTitle className='text-sm font-medium'>Total Keywords</CardTitle>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									viewBox='0 0 24 24'
									fill='none'
									stroke='currentColor'
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth='2'
									className='h-4 w-4 text-muted-foreground'
								>
									<path d='M12 2v20M2 12h20' />
								</svg>
							</CardHeader>
							<CardContent>
								<div className='text-2xl font-bold'>24</div>
								<p className='text-xs text-muted-foreground'>+2 from last month</p>
							</CardContent>
						</Card>
						<Card>
							<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
								<CardTitle className='text-sm font-medium'>AI Overview Rate</CardTitle>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									viewBox='0 0 24 24'
									fill='none'
									stroke='currentColor'
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth='2'
									className='h-4 w-4 text-muted-foreground'
								>
									<path d='M16 16v-4a4 4 0 00-8 0v4M12 16v4M8 8l8 8M16 8l-8 8' />
								</svg>
							</CardHeader>
							<CardContent>
								<div className='text-2xl font-bold'>45%</div>
								<p className='text-xs text-muted-foreground'>+12% from last month</p>
							</CardContent>
						</Card>
						<Card>
							<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
								<CardTitle className='text-sm font-medium'>Total Impressions</CardTitle>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									viewBox='0 0 24 24'
									fill='none'
									stroke='currentColor'
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth='2'
									className='h-4 w-4 text-muted-foreground'
								>
									<path d='M22 12h-4l-3 9L9 3l-3 9H2' />
								</svg>
							</CardHeader>
							<CardContent>
								<div className='text-2xl font-bold'>12.4k</div>
								<p className='text-xs text-muted-foreground'>+24% from last month</p>
							</CardContent>
						</Card>
						<Card>
							<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
								<CardTitle className='text-sm font-medium'>Click-through Rate</CardTitle>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									viewBox='0 0 24 24'
									fill='none'
									stroke='currentColor'
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth='2'
									className='h-4 w-4 text-muted-foreground'
								>
									<path d='M12 2v20M2 12h20' />
								</svg>
							</CardHeader>
							<CardContent>
								<div className='text-2xl font-bold'>2.4%</div>
								<p className='text-xs text-muted-foreground'>+0.3% from last month</p>
							</CardContent>
						</Card>
					</div>

					<Card>
						<CardHeader>
							<CardTitle>Top Performing Keywords</CardTitle>
						</CardHeader>
						<CardContent>
							<div className='space-y-4'>
								<div>
									<div className='flex justify-between mb-2'>
										<div className='font-medium'>best online shopping</div>
										<div className='text-muted-foreground'>Rank #12</div>
									</div>
									<Progress value={45} className='h-2' />
									<div className='flex justify-between mt-1 text-sm'>
										<div className='text-muted-foreground'>AI Overview Rate: 45%</div>
										<div className='text-muted-foreground'>1,200 impressions</div>
									</div>
								</div>
								<div>
									<div className='flex justify-between mb-2'>
										<div className='font-medium'>discount electronics</div>
										<div className='text-muted-foreground'>Rank #18</div>
									</div>
									<Progress value={38} className='h-2' />
									<div className='flex justify-between mt-1 text-sm'>
										<div className='text-muted-foreground'>AI Overview Rate: 38%</div>
										<div className='text-muted-foreground'>980 impressions</div>
									</div>
								</div>
							</div>
						</CardContent>
					</Card>
				</TabsContent>

				<TabsContent value='keywords' className='space-y-4'>
					{/* Detailed keyword performance metrics */}
				</TabsContent>

				<TabsContent value='platforms' className='space-y-4'>
					{/* Platform-specific performance metrics */}
				</TabsContent>
			</Tabs>
		</div>
	);
}
