import * as React from 'react'

import { ScrollArea } from '@/components/ui/scroll-area'

const ChatList = React.forwardRef(({ children, setShowScroll }, ref) => {
	const onScroll = (event) => {
		const target = event.currentTarget
		const scrollTop = target.scrollTop
		const maxScrollTop = target.scrollHeight - target.clientHeight

		if (maxScrollTop - scrollTop > 50) {
			setShowScroll(true)
		} else {
			setShowScroll(false)
		}
	}

	return (
		<div className='flex-1 bg-muted/40 rounded-xl overflow-hidden'>
			<ScrollArea
				className='flex flex-col p-4 gap-6 h-full overflow-y-auto '
				ref={ref}
				onScroll={onScroll}
			>
				{children}
			</ScrollArea>
		</div>
	)
})

ChatList.displayName = 'ChatList'

export { ChatList }
