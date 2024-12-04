'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import CanvasCursor from '@/components/anim/canvas-cursor'
import TextWriter from '@/components/anim/text-writer'
import { useChatStore } from '@/store'
import { getModels } from '@/service'
import Link from 'next/link'

export default function Home() {
	const models = useChatStore((state) => state.models)
	const setModels = useChatStore((state) => state.setModels)

	useEffect(() => {
		const fetchModel = async () => {
			let arr = await getModels()
			setModels(arr)
		}
		fetchModel()
	}, [setModels])

	return (
		<div className='h-full justify-center'>
			<div className='grid grid-cols-1 md:grid-cols-3 gap-10'>
				{models.map((model) => (
					<Card key={model.id} className='flex-1 max-w-[300px] mx-auto min-w-[260px] max-h-[200px]'>
						<CardHeader>
							<CardTitle>{model.name}</CardTitle>
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
			<div className='text-center mt-10 text-2xl font-bold'>
				<TextWriter text={'选择一个模型，开始加速吧！'} delay={0.2} loop />
			</div>
			<CanvasCursor />
		</div>
	)
}
