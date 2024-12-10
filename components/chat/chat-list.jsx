import * as React from 'react'

import { ScrollArea } from '@/components/ui/scroll-area'

const ChatList = React.forwardRef(({ children }, ref) => {
	return (
		<div className='flex-1 bg-muted/40 rounded-xl overflow-hidden'>
			<ScrollArea className='p-4 h-full' ref={ref}>
				{children}
			</ScrollArea>
		</div>
	)
})

ChatList.displayName = 'ChatList'

export { ChatList }
