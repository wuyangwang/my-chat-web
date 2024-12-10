import { CircleArrowDown } from 'lucide-react'
import { memo } from 'react'
import { motion } from 'framer-motion'

const ChatScroll = memo(({ onScroll }) => {
	return (
		<motion.div
			onClick={onScroll}
			className='cursor-pointer z-10 absolute bg-transparent bottom-[80px] left-1/2 transform -translate-x-1/2 -translate-y-1/2'
			initial={{ opacity: 0, y: 10 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: 10 }}
			transition={{ duration: 0.2 }}
		>
			<CircleArrowDown className='h-8 w-8 text-primary hover:text-primary/80 animate-bounce' />
		</motion.div>
	)
})

ChatScroll.displayName = 'ChatScroll'
export { ChatScroll }
