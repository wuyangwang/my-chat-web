import { Button } from '@/components/ui/button'
import Link from 'next/link'

// export const runtime = 'edge'

export default function NotFound() {
	return (
		<div className='flex flex-col items-center justify-center h-full w-full bg-background'>
			<div>
				<h1 className='text-foreground text-center font-bold text-3xl'>404</h1>
				<h2 className='text-muted-foreground text-xl'>抱歉，页面没有找到.</h2>
			</div>
			<Link href='/'>
				<Button className='mt-4 self-start'>返回首页</Button>
			</Link>
		</div>
	)
}
