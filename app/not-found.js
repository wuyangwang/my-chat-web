import { Button } from '@/components/ui/button'
import Link from 'next/link'

export const runtime = 'edge'

export default function NotFound() {
	return (
		<div className='flex flex-col items-center justify-center h-screen w-screen bg-background'>
			<div>
				<h1 className='text-foreground text-center font-bold text-3xl'>404</h1>
				<h2 className='text-muted-foreground text-xl'>This page could not be found.</h2>
			</div>
			<Link href='/'>
				<Button className='mt-4 self-start'>Back to home</Button>
			</Link>
		</div>
	)
}
