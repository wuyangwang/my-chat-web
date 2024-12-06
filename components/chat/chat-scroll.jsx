import { CircleArrowDown } from 'lucide-react'

export function ChatScroll() {
	const onScroll = () => {
		window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
	}

	return (
		<div
			onClick={onScroll}
			className='cursor-pointer absolute bg-transparent bottom-[68px] left-1/2 transform -translate-x-1/2 -translate-y-1/2'
		>
			<CircleArrowDown className='h-8 w-8 text-primary animate-bounce' />
		</div>
	)
}
