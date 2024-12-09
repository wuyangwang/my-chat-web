import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

import Bounce from '../anim/bounce'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { aiToolList } from '@/utils'

export function ModelToolList() {
	return (
		<div className='grid grid-cols-1 md:grid-cols-3 gap-10'>
			{aiToolList.map((model, idx) => (
				<Bounce key={model.id} delay={idx * 0.1}>
					<Card className='flex-1 max-w-[300px] mx-auto min-w-[260px] max-h-[200px]'>
						<CardHeader>
							<CardTitle>{model.title}</CardTitle>
							<CardDescription className='min-h-16'>{model.desc}</CardDescription>
						</CardHeader>
						<CardFooter>
							<Button className='w-full z-50' asChild>
								<Link href={model.url}>开始</Link>
							</Button>
						</CardFooter>
					</Card>
				</Bounce>
			))}
		</div>
	)
}
