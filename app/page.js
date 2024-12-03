import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import CanvasCursor from '@/components/anim/canvas-cursor'
import TextWriter from '@/components/anim/text-writer'
import { getModels } from '@/actions/getModels'

export const runtime = 'edge'

export default async function Home() {
	const models = await getModels()

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
							<Button className='w-full z-50'>开始</Button>
						</CardFooter>
					</Card>
				))}
			</div>
			<div className='text-center mt-10 text-2xl font-bold'>
				<TextWriter text={'选择一个模型，开始AI加速吧！'} delay={0.1} loop />
			</div>
			<CanvasCursor />
		</div>
	)
}
