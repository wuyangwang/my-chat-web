import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import { aiToolList } from '@/utils'

export function ModelToolList() {
	return (
		<div className='grid grid-cols-1 md:grid-cols-3 gap-10'>
			{aiToolList.map((model) => (
				<Card key={model.id} className='flex-1 max-w-[300px] mx-auto min-w-[260px] max-h-[200px]'>
					<CardHeader>
						<CardTitle>{model.title}</CardTitle>
						<CardDescription>{model.desc}</CardDescription>
					</CardHeader>
					<CardFooter>
						<Button className='w-full z-50' asChild>
							<Link href={model.url}>开始</Link>
						</Button>
					</CardFooter>
				</Card>
			))}
		</div>
	)
}
