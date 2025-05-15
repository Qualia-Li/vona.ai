'use client';

import { ArrowUpDown, LayoutGrid, Table as TableIcon } from 'lucide-react';
import { useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Toggle } from '@/components/ui/toggle';
import { useKeywordsStore } from '@/lib/store/keywordsStore';

type SortField = 'volume' | 'aiOverviewLikelihood' | 'optimizationDifficulty' | 'purchaseIntent';
type SortOrder = 'asc' | 'desc';
type ViewMode = 'table' | 'card';

export default function KeywordsPage() {
	const keywords = useKeywordsStore((state) => state.keywords);
	const deleteKeyword = useKeywordsStore((state) => state.deleteKeyword);
	const [sortField, setSortField] = useState<SortField>('volume');
	const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
	const [viewMode, setViewMode] = useState<ViewMode>('table');

	const handleSort = (field: SortField) => {
		if (sortField === field) {
			setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
		} else {
			setSortField(field);
			setSortOrder('desc');
		}
	};

	const sortedKeywords = [...keywords].sort((a, b) => {
		const multiplier = sortOrder === 'asc' ? 1 : -1;
		const aValue = a[sortField] || 0;
		const bValue = b[sortField] || 0;
		return (aValue - bValue) * multiplier;
	});

	return (
		<div>
			<div className='flex justify-between items-center mb-8'>
				<div>
					<h1 className='text-4xl font-bold'>Keyword Suggestions</h1>
					<p className='text-muted-foreground mt-2'>Customize and manage your target keywords for AI optimization.</p>
				</div>
				<div className='flex items-center gap-4'>
					<div className='flex items-center border rounded-lg p-1'>
						<Toggle
							pressed={viewMode === 'table'}
							onPressedChange={() => setViewMode('table')}
							size='sm'
							className='data-[state=on]:bg-muted'
						>
							<TableIcon className='h-4 w-4' />
						</Toggle>
						<Toggle
							pressed={viewMode === 'card'}
							onPressedChange={() => setViewMode('card')}
							size='sm'
							className='data-[state=on]:bg-muted'
						>
							<LayoutGrid className='h-4 w-4' />
						</Toggle>
					</div>
					<Button className='relative group'>
						Add Custom Keyword
						<span className='absolute -top-8 left-1/2 -translate-x-1/2 bg-secondary-foreground text-secondary px-2 py-1 rounded text-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap'>
							Coming soon...
						</span>
					</Button>
				</div>
			</div>

			{viewMode === 'table' ? (
				<div className='rounded-md border'>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Keyword</TableHead>
								<TableHead>
									<Button variant='ghost' onClick={() => handleSort('volume')} className='flex items-center gap-1'>
										Volume
										<ArrowUpDown className='h-4 w-4' />
									</Button>
								</TableHead>
								<TableHead>
									<Button
										variant='ghost'
										onClick={() => handleSort('aiOverviewLikelihood')}
										className='flex items-center gap-1'
									>
										AI Likelihood
										<ArrowUpDown className='h-4 w-4' />
									</Button>
								</TableHead>
								<TableHead>
									<Button
										variant='ghost'
										onClick={() => handleSort('optimizationDifficulty')}
										className='flex items-center gap-1'
									>
										Difficulty
										<ArrowUpDown className='h-4 w-4' />
									</Button>
								</TableHead>
								<TableHead>
									<Button
										variant='ghost'
										onClick={() => handleSort('purchaseIntent')}
										className='flex items-center gap-1'
									>
										Purchase Intent
										<ArrowUpDown className='h-4 w-4' />
									</Button>
								</TableHead>
								<TableHead className='text-right'>Actions</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{sortedKeywords.map((keyword) => (
								<TableRow key={keyword.id}>
									<TableCell className='font-medium'>
										<div>
											{keyword.term}
											{keyword.isCustom && (
												<Badge variant='secondary' className='ml-2'>
													Custom
												</Badge>
											)}
										</div>
									</TableCell>
									<TableCell>{keyword.volume.toLocaleString()}</TableCell>
									<TableCell>
										<div className='w-32'>
											<Progress value={keyword.aiOverviewLikelihood} className='h-2' />
											<span className='text-sm text-muted-foreground'>{keyword.aiOverviewLikelihood}%</span>
										</div>
									</TableCell>
									<TableCell>
										<div className='w-32'>
											<Progress value={keyword.optimizationDifficulty} className='h-2' />
											<span className='text-sm text-muted-foreground'>{keyword.optimizationDifficulty}%</span>
										</div>
									</TableCell>
									<TableCell>
										<div className='w-32'>
											{keyword.purchaseIntent ? (
												<>
													<Progress value={keyword.purchaseIntent} className='h-2' />
													<span className='text-sm text-muted-foreground'>{keyword.purchaseIntent}%</span>
												</>
											) : (
												<span className='text-sm text-muted-foreground'>N/A</span>
											)}
										</div>
									</TableCell>
									<TableCell className='text-right'>
										<Button variant='ghost' size='sm' onClick={() => deleteKeyword(keyword.id)}>
											Delete
										</Button>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</div>
			) : (
				<div className='grid gap-4'>
					{sortedKeywords.map((keyword) => (
						<Card key={keyword.id}>
							<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
								<div>
									<CardTitle className='text-lg font-medium'>{keyword.term}</CardTitle>
									{keyword.isCustom && (
										<Badge variant='secondary' className='mt-1'>
											Custom
										</Badge>
									)}
								</div>
								<div className='flex gap-2'>
									<Button variant='ghost' size='sm' onClick={() => deleteKeyword(keyword.id)}>
										Delete
									</Button>
								</div>
							</CardHeader>
							<CardContent>
								<div className='grid gap-4'>
									<div className='grid grid-cols-3 gap-4'>
										<div>
											<div className='text-sm font-medium mb-2'>AI Overview Likelihood</div>
											<Progress value={keyword.aiOverviewLikelihood} className='h-2' />
											<div className='text-sm text-muted-foreground mt-1'>{keyword.aiOverviewLikelihood}%</div>
										</div>
										<div>
											<div className='text-sm font-medium mb-2'>Optimization Difficulty</div>
											<Progress value={keyword.optimizationDifficulty} className='h-2' />
											<div className='text-sm text-muted-foreground mt-1'>{keyword.optimizationDifficulty}%</div>
										</div>
										{keyword.purchaseIntent && (
											<div>
												<div className='text-sm font-medium mb-2'>Purchase Intent</div>
												<Progress value={keyword.purchaseIntent} className='h-2' />
												<div className='text-sm text-muted-foreground mt-1'>{keyword.purchaseIntent}%</div>
											</div>
										)}
									</div>
									<div className='flex gap-2'>
										<Badge>Volume: {keyword.volume.toLocaleString()}</Badge>
									</div>
								</div>
							</CardContent>
						</Card>
					))}
				</div>
			)}
		</div>
	);
}
