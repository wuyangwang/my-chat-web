import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { getModels } from '@/actions/getModels'

export default async function Home() {
	const models = await getModels()

	return (
		<div className='flex h-full justify-center'>
			<div className='grid grid-cols-1 md:grid-cols-3 gap-10'>
				{models.map((model) => (
					<Card key={model.id} className='flex-1 max-w-[300px] max-h-[200px]'>
						<CardHeader>
							<CardTitle>{model.name}</CardTitle>
							<CardDescription>{model.desc}</CardDescription>
						</CardHeader>
						<CardFooter>
							<Button className='w-full'>开始</Button>
						</CardFooter>
					</Card>
				))}
			</div>
		</div>
	)
}
