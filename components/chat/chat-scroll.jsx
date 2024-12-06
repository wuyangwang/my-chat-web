import { CircleArrowDown } from 'lucide-react'

export function ChatScroll({ onScroll }) {
	return (
		<div
			onClick={onScroll}
			className='cursor-pointer z-10 absolute bg-transparent bottom-[80px] left-1/2 transform -translate-x-1/2 -translate-y-1/2'
		>
			<CircleArrowDown className='h-8 w-8 text-primary animate-bounce' />
		</div>
	)
}
