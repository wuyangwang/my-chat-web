import * as React from 'react'

import { ScrollArea } from '@/components/ui/scroll-area'

const ChatMessageList = React.forwardRef(({ children }, ref) => {
	return (
		<div className='flex-1 bg-muted/40 rounded-xl overflow-hidden'>
			<ScrollArea className='flex flex-col p-4 gap-6 h-full' ref={ref}>
				{children}
			</ScrollArea>
		</div>
	)
})

ChatMessageList.displayName = 'ChatMessageList'

export { ChatMessageList }
